var Actions = require("./ShowsActions.js"),
    createSelector = require("reselect").createSelector,
    /* This function is a more limited version of React's immutability helper.  It will
     * clone only parts of the state that will be mutated so the parts that are unchanged
     * will be shared with the original state */
    setAtPath = require("ui-library/src/util/ReduxUtils.js").setAtPath,
    pushAtPath = require("ui-library/src/util/ReduxUtils.js").pushAtPath,
    _ = require("underscore");

var initialState = {
    rows: [],
    hasNext: false,
    hasPrev: false,
    pendingNext: false,
    pendingPrev: false,
    advancedSearch: false,
    activeTab: 0,
    filters: {},
    position: {},
    editingRowInputs: {},
    editingRowErrors: {},
    addWizardShowing: false,
    addWizardErrors: {},
    addWizardFields: {}
};

/*
* We mock the data. Normally this would come from the server.
*/
var mockShows = require("../mocks").Shows;
var mockGenres = require("../mocks").Genres;
var mockStatuses = require("../mocks").StatusEnum;

/*
* We mock the data so need to manually keep track of lastId.
*/
var lastId = 0;

/*
* Check whether row satisfies all set genre filters
*/
function hasGenreFilters (filters, row) {
    for (var genre in mockGenres) {
        if (filters[genre] && row.genres.indexOf(mockGenres[genre]) === -1) {
            return false;
        }
    }
    return true;
}

/*
* Check whether row satisfies all set status filters
*/
function hasStatusFilters (filters, row) {
    for (var status in mockStatuses) {
        if (filters[status] && row.status !== mockStatuses[status]) {
            return false;
        }
    }
    return true;
}

/*
* Get index of object with id within array of items
*/
function getIndexOfId (items, id) {
    for (var i = 0; i < items.length; i += 1) {
        if (items[i].id.toString() === id.toString()) {
            return i;
        }
    }
    return -1;
}

/*
 * Reselect is a library which creates functions that only get evaluated when the inputs change. By
 * using this library, we dont have to worry about re-filtering the rows on every state change, but
 * only when the outcome will potentially be different.
 */
var batchSelector = createSelector(
    function (state) { return state.filters; },
    function (state) { return state.rows; },
    function (filters, rows) {
        //in this contrived example, we take the input rows (typically something we got from the server
        //and apply a filter to it.  In a real example we would divide the results into batches of some
        //size or more often, re-query the server and let the endpoint perform the filtering.
        rows = rows.filter(function (row) {
            return (!filters.text || row.title.toLowerCase().indexOf(filters.text.toLowerCase()) > -1) &&
              hasGenreFilters(filters, row) &&
              hasStatusFilters(filters, row);
        });

        //generate a few batches of data so that the InfiniteScroller can be seen in action paging in/out
        //batches
        var batches = [];

        for (var i = 0; i < rows.length; i += 50) {
            batches.push({ id: parseInt(i / 50), data: rows.slice(i, i + 50) });
        }

        return batches;
    });

/*
 * Since our data is hardcoded, we need to apply the selector once here.  Normally we would apply it when
 * the request returned from the server with the rows.
 */
for (var i = 0; i < mockShows.length; i += 1) {
    initialState.rows.push(mockShows[i]);
}

initialState.batches = batchSelector(initialState);

/*
* Initialize lastId for showing add
*/
lastId = initialState.rows.length;

/*
 * This is barebones reducer that just knows how to filter and switch sections.  In a real app, we would either
 * combine this with out reducers or have additional logic.
 */
module.exports = function (state, action) {
    var nextState = _.clone(state);

    window.pushAtPath = pushAtPath;
    window.clone = _.clone;

    switch (action.type) {
        case Actions.Types.SHOWS_SET:
            //Summaries cannot be longer then 250 characters
            if (action.path[0] === "addWizardFields" && action.path[1] === "summary") {
                setAtPath(nextState, ["addWizardErrors", "summaryMaxLength"], action.value.length >= 250);
            }
            if (action.path[0] === "editingRowInputs" && action.path[1] === "summary") {
                setAtPath(nextState, ["editingRowErrors", "summaryMaxLength"], action.value.length >= 250);
            }
            setAtPath(nextState, action.path, action.value);
            break;
        case Actions.Types.SHOWS_FILTER:
            setAtPath(nextState, ["filters", action.name], action.value);
            nextState.batches = batchSelector(nextState);
            break;
        case Actions.Types.SHOWS_ADD:
            lastId += 1;
            var id = lastId;
            nextState = pushAtPath(nextState, "rows", {
                id: id,
                title: action.title,
                genres: action.genres,
                status: action.status,
                summary: action.summary
            });
            nextState.batches = batchSelector(nextState);
            break;
        case Actions.Types.SHOWS_ADD_WIZARD_RESET:
            setAtPath(nextState, "addWizardShowing", initialState.addWizardShowing);
            setAtPath(nextState, "addWizardErrors", initialState.addWizardErrors);
            setAtPath(nextState, "addWizardFields", initialState.addWizardFields);
            break;
        case Actions.Types.SHOWS_EDIT:
            var row = state.rows[getIndexOfId(state.rows, action.id)];
            setAtPath(nextState, "editingRowInputs", {
                id: row.id,
                title: row.title,
                summary: row.summary
            });
            Object.keys(mockStatuses).forEach(function (status) {
                if (mockStatuses[status] === row.status) {
                    setAtPath(nextState, ["editingRowInputs", "status"], status);
                }
            });
            row.genres.forEach(function (genre) {
                setAtPath(nextState, ["editingRowInputs", genre.id], true);
            });
            break;
        case Actions.Types.SHOWS_EDIT_SAVE:
            setAtPath(nextState, ["rows", getIndexOfId(state.rows, action.id)], {
                id: action.id,
                title: action.title,
                genres: action.genres,
                status: action.status,
                summary: action.summary
            });
            setAtPath(nextState, "editingRowInputs", initialState.editingRowInputs);
            nextState.batches = batchSelector(nextState);
            break;
        case Actions.Types.SHOWS_EDIT_CANCEL:
            setAtPath(nextState, "editingRowInputs", initialState.editingRowInputs);
            setAtPath(nextState, "editingRowErrors", initialState.editingRowErrors);
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

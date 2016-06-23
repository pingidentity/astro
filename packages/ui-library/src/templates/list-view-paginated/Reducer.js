var Actions = require("./Actions.js"),
    createSelector = require("reselect").createSelector,
    /* This function is a more limited version of React's immutability helper.  It will
     * clone only parts of the state that will be mutated so the parts that are unchanged
     * will be shared with the original state */
    update = require("re-mutable");

var initialState = {
    rows: {
        all: [],
        filtered: [],
        page: []
    },
    advancedSearch: false,
    filters: {},
    page: 1,
    perPage: 10
};

/*
 * Reselect is a library which creates functions that only get evaluated when the inputs change. By
 * using this library, we dont have to worry about re-filtering the rows on every state change, but
 * only when the outcome will potentially be different.
 */
var filterSelector = createSelector(
    function (state) { return state.filters; },
    function (state) { return state.rows; },
    function (filters, rows) {
        //in this contrived example, we take the input rows (typically something we got from the server
        //and apply a filter to it.  In a real example we would divide the results into batches of some
        //size or more often, re-query the server and let the endpoint perform the filtering.
        rows = rows.all.filter(function (row) {
            return (!filters.text || row.title.indexOf(filters.text) > -1) &&
              (!filters.even || row.id % 2 === 0) &&
              (!filters.odd || row.id % 2 === 1);
        });

        return rows;
    });

var pageSelector = createSelector(
    function (state) { return state.page; },
    function (state) { return state.filters; },
    function (state) { return state.rows; },
    function (page, filters, rows) {
        var pageStart = (page - 1) * initialState.perPage,
            pageEnd = pageStart + initialState.perPage;

        return rows.filtered.slice(pageStart, pageEnd);
    });

/*
 * Since our data is hardcoded, we need to apply the selector once here.  Normally we would apply it when
 * the request returned from the server with the rows.
 */
for (var i = 1; i < 51; i += 1) {
    initialState.rows.all.push({ id: i, title: "Row " + i, subtitle: "subtitle for row " + i });
}

initialState.rows.filtered = filterSelector(initialState);
initialState.rows.page = pageSelector(initialState);

/*
 * This is barebones reduces that just knows how to filter and switch sections.  In a real app, we would either
 * combine this with out reducers or have additional logic.
 */
module.exports = function (state, action) {
    var nextState = state;

    switch (action.type) {
        case Actions.Types.LIST_VIEW_SET:
            nextState = update.set(nextState, action.path, action.value);
            break;
        case Actions.Types.LIST_VIEW_FILTER:
            nextState = update.set(nextState, ["filters", action.name], action.value);
            nextState = update.set(nextState, ["rows", "filtered"], filterSelector(nextState));
            nextState = update.set(nextState, ["rows", "page"], pageSelector(nextState));
            break;
        case Actions.Types.LIST_VIEW_PAGE:
            nextState = update.set(nextState, ["page"], action.page);
            nextState = update.set(nextState, ["rows", "page"], pageSelector(nextState));
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

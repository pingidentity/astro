var Actions = require("./Actions.js"),
    createSelector = require("reselect").createSelector,
    /* This function is a more limited version of React's immutability helper.  It will
     * clone only parts of the state that will be mutated so the parts that are unchanged
     * will be shared with the original state */
    setAtPath = require("../../util/ReduxUtils.js").setAtPath,
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
    position: {}
};

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
            return (!filters.text || row.title.indexOf(filters.text) > -1) &&
              (!filters.even || row.id % 2 === 0) &&
              (!filters.odd || row.id % 2 === 1);
        });

        //generate a few batches of data so that the InfiniteScroller can be seen in action paging in/out
        //batches
        var batches = [];

        for (var i = 0; i < rows.length; i += 20) {
            batches.push({ id: parseInt(i / 20), data: rows.slice(i, i + 20) });
        }

        return batches;
    });

/*
 * Since our data is hardcoded, we need to apply the selector once here.  Normally we would apply it when
 * the request returned from the server with the rows.
 */
for (var i = 1; i < 51; i += 1) {
    initialState.rows.push({ id: i, title: i.toString(), subtitle: "subtitle for row " + i });
}

initialState.batches = batchSelector(initialState);

/*
 * This is barebones reduces that just knows how to filter and switch sections.  In a real app, we would either
 * combine this with out reducers or have additional logic.
 */
module.exports = function (state, action) {
    var nextState = _.clone(state);

    switch (action.type) {
        case Actions.Types.LIST_VIEW_SET:
            setAtPath(nextState, action.path, action.value);
            break;
        case Actions.Types.LIST_VIEW_FILTER:
            setAtPath(nextState, ["filters", action.name], action.value);
            nextState.batches = batchSelector(nextState);
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

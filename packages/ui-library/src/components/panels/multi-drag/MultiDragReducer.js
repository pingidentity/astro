var Actions = require("./MultiDragActions.js"),
    deepClone = require("clone"),
    update = require("re-mutable"),
    FilterUtils = require("../../../util/FilterUtils.js");

var initialState = {
    columns: []
};

/**
 * @typedef {object} MultiDrag~searchAction
 *
 * @property {string} fieldName
 *    The field name to use in the search.
 * @property {number} column
 *    The index of the column whose rows to search.
 * @property {string} filter
 *    The value of the filter string to use in the search.
 */

/**
 * @function MultiDrag~search
 *
 * @desc Applies filters to the rows in the specified column's state
 *    by searching each row's field name for the filter value.
 *
 * @param {object} state
 *    The state to apply the search to. Can be a clone of the current state
 *    or some next state that is the result of other actions that already changed the current state.
 * @param {MultiDrag~searchAction} action
 *    The search action object to use in the search.
 *
 * @return {object}
 *    The next state with the filters applied.
 */
function search (state, action) {
    var filterStr = action.filter || "";
    var filterFn = FilterUtils.getFilterFunction(filterStr, action.fieldName);

    var next = update(state)
        .set(["columns", action.column, "filter"], filterStr)
        .set(["columns", action.column, "filterFieldName"], action.fieldName)
        .end();

    if (filterStr.length > 0) {
        next = update.set(next, ["columns", action.column, "filteredRows"],
            state.columns[action.column].rows.filter(filterFn));
    } else {
        next = update.set(next, ["columns", action.column, "filteredRows"],
            state.columns[action.column].rows);
    }

    return next;
}

/**
 * @typedef {object} MultiDrag~moveAction
 *
 * @property {MultiDrag~MoveObject} from
 *    The dragged MultiDrag~MoveObject.
 * @property {MultiDrag~MoveObject} to
 *    The target MultiDrag~MoveObject.
 */

/**
 * @function MultiDrag~move
 *
 * @desc Applies the move to the state of the source and destination columns.
 *
 * @param {object} state
 *    The state to apply the move to. Can be a clone of the current state
 *    or some next state that is the result of other actions that already changed the current state.
 * @param {MultiDrag~moveAction} action
 *    The move action object to use in the move.
 *
 * @return {object}
 *    The next state with the move applied.
 */
function move (state, action) {
    var row = state.columns[action.from.column].rows[action.from.index];

    return update(state)
        .unset(["columns", action.from.column, "rows", action.from.index])
        .splice(["columns", action.to.column, "rows"], action.to.index, 0, row)
        .unset(["placeholder"]).end();
}

/**
 * @typedef {object} MultiDrag~initAction
 * @private
 * @ignore
 *
 * @property {object[]} data
 *    The columns data to initialize the state with.
 */

/**
 * @function MultiDrag~init
 * @private
 * @ignore
 *
 * @desc Initializes the state's columns.
 *
 * @param {object} state
 *    The state to apply the initialization to. Can be a clone of the current state
 *    or some next state that is the result of other actions that already changed the current state.
 * @param {MultiDrag~initAction} action
 *    The init action object to use in the initialization.
 *
 * @return {object}
 *    The next state with the initialization applied.
 */
function init (state, action) {
    return update.set(state, ["columns"], deepClone(action.data));
}

/**
 * @function MultiDrag~reapplyFilters
 *
 * @desc Reapply all current state's filters to the specified state.
 *
 * @param {object} state
 *    The state to reapply all current state's filters to. Can be a clone of the current state
 *    or some next state that is the result of other actions that already changed the current state.
 *
 * @return {object}
 *    The next state will all the current state's filters applied.
 */
function reapplyFilters (state) {
    state.columns.forEach(function (column, index) {
        state = search(state, {
            column: index,
            filter: column.filter,
            fieldName: column.filterFieldName
        });
    });

    return state;
}

module.exports = function (state, action) {
    var next;

    switch (action.type) {
        case Actions.Types.MULTIDRAG_SET:
            next = update.set(state, action.path, action.value);
            break;
        case Actions.Types.MULTIDRAG_MOVE:
            next = move(state, action);
            break;
        case Actions.Types.MULTIDRAG_FILTER:
            next = search(state, action);
            break;
        case Actions.Types.MULTIDRAG_INIT:
            next = init(state, action);
            break;
        case Actions.Types.MULTIDRAG_APPEND:
            next = update.concat(state, ["columns", action.column, "rows"], action.data);
            break;
        case Actions.Types.MULTIDRAG_PREPEND:
            next = update.prepend(state, ["columns", action.column, "rows"], action.data);
            break;
        default:
            return state || initialState;
    }

    //since we render based on the filteredRows property, update them after a move.  If there is
    //no filter search() will return a reference to rows
    next = reapplyFilters(next);

    return next;
};

module.exports.search = search;
module.exports.move = move;
module.exports.reapplyFilters = reapplyFilters;

import Actions from "./MultiDragActions";
import deepClone from "clone";
import update from "re-mutable";
import FilterUtils from "../../../util/FilterUtils.js";

const initialState = {
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
 * @function MultiDrag~setSearch
 *
 * @desc Sets search filter for column rows
 *
 * @param {object} state
 *    The state to apply the search to. Can be a clone of the current state
 *    or some next state that is the result of other actions that already changed the current state.
 * @param {MultiDrag~searchAction} action
 *    The search action object to use in the search.
 *
 * @return {object}
 *    The next state
 */
function setSearch (state, action) {
    const searchStr = action.filter || "";

    return update(state)
        .set(["columns", action.column, "search"], searchStr)
        .set(["columns", action.column, "searchFieldName"], action.fieldName)
        .end();
}

/**
 * @function MultiDrag~applyFilters
 *
 * @desc Apply all the current filters in the state
 *
 * @param {object} state
 *    The state to reapply all current state's filters to. Can be a clone of the current state
 *    or some next state that is the result of other actions that already changed the current state.
 *
 * @return {object}
 *    The next state will all the current state's filters applied.
 */
function applyFilters (state, transform) {
    let next = state;

    next.columns.forEach(function (column, index) {
        const searchStr = column.search || "";
        const searchFn = FilterUtils.getFilterFunction(searchStr, column.searchFieldName);

        const categoryStr = column.category || "";
        const categoryFn = item => categoryStr === "" || (item.categoryId || item.category) === categoryStr;

        const filterFn = item => searchFn(item) && categoryFn(item);

        if ((searchStr + categoryStr).length > 0) {
            next = update.set(next, ["columns", index, "filteredRows"],
                column.rows.filter(filterFn));
        } else {
            next = update.set(next, ["columns", index, "filteredRows"],
                column.rows);
        }
    });

    return transform ? {
        ...next,
        columns: next.columns.map(({ filteredRows, rows, ...column }) => ({
            filteredRows: transform(filteredRows),
            rows: transform(rows), ...column
        }))
    } : next;
}

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
    return applyFilters(setSearch(state, action));
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

module.exports = function (state, action) {
    let next;

    switch (action.type) {
        case Actions.Types.MULTIDRAG_SET:
            next = update.set(state, action.path, action.value);
            break;
        case Actions.Types.MULTIDRAG_MOVE:
            next = move(state, action);
            break;
        case Actions.Types.MULTIDRAG_FILTER:
            next = setSearch(state, action);
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
    next = applyFilters(next);

    return next;
};

module.exports.search = search;
module.exports.move = move;
module.exports.reapplyFilters = applyFilters;

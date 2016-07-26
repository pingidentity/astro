var keyMirror = require("fbjs/lib/keyMirror");

/**
* @enum {string}
* @desc An enum of MultiDrag action types.
*/
exports.Types = keyMirror({
    MULTIDRAG_SET: null,
    MULTIDRAG_PREPEND: null,
    MULTIDRAG_APPEND: null,
    MULTIDRAG_MOVE: null,
    MULTIDRAG_INIT: null,
    MULTIDRAG_FILTER: null
});

/**
* @function MultiDrag~set
* @desc Set a specific value at path in the MultiDrag store state.
*
* @param {string} path
*    The path to set value at.
* @param {*} value
*    The value to set at path.
*
* @return {object}
*    The action.
*/
exports.set = function (path, value) {
    return {
        type: exports.Types.MULTIDRAG_SET,
        path: path,
        value: value
    };
};

/**
* @function MultiDrag~move
* @desc Move a row from one position to another.
*
* @param {MultiDrag~MoveObject} from
*    The dragged MultiDrag~MoveObject.
* @param {MultiDrag~MoveObject} to
*    The target MultiDrag~MoveObject.
*
* @return {object}
*    The action.
*/
exports.move = function (from, to) {
    return {
        type: exports.Types.MULTIDRAG_MOVE,
        from: from,
        to: to
    };
};

/**
* @function MultiDrag~prepend
* @desc Prepends rows to the the column.
*
* @param {string} column
*    The column to prepend rows to.
* @param {object[]} data
*    The rows to prepend to the column.
*
* @return {object}
*    The action.
*/
exports.prepend = function (column, data) {
    return {
        type: exports.Types.MULTIDRAG_PREPEND,
        column: column,
        data: data
    };
};

/**
* @function MultiDrag~append
* @desc Appends rows to the the column.
*
* @param {string} column
*    The column to append rows to.
* @param {object[]} data
*    The rows to append to the column.
*
* @return {object}
*    The action.
*/
exports.append = function (column, data) {
    return {
        type: exports.Types.MULTIDRAG_APPEND,
        column: column,
        data: data
    };
};

/**
* @function MultiDrag~init
* @desc Initializes the component state's colums.
*
* @param {object[]} data
*    The columns data to initialize the component with.
*
* @return {object}
*    The action.
*/
exports.init = function (data) {
    return {
        type: exports.Types.MULTIDRAG_INIT,
        data: data
    };
};

/**
* @function MultiDrag~filterField
* @desc Filters down the rows in a column by searching each row's field name for the filter value.
*
* @param {string} fieldName
*    The field name to use in the search.
* @param {number} column
*    The index of the column whose rows to search.
* @param {string} filter
*    The value of the filter string to use in the search.
*
* @return {object}
*    The action.
*/
exports.filterField = function (fieldName, column, filter) {
    return {
        type: exports.Types.MULTIDRAG_FILTER,
        column: column,
        filter: filter,
        fieldName: fieldName
    };
};

/**
* @function MultiDrag~filter
* @desc Filters down all rows in column by searching each row's fields for the filter value.
*
* @param {number} column
*    The index of the column whose rows to search.
* @param {string} filter
*    The value of the filter string to use in the search.
*
* @return {object}
*    The action.
*/
exports.filter = exports.filterField.bind(null, null);

/**
* @function MultiDrag~placeholder
* @desc Sets a placeholder preview for drag.
*
* @param {MultiDrag~previewLocation} to
*    The location to render the drag preview at.
*
* @return {object}
*    The action.
*/
exports.placeholder = exports.set.bind(null, ["placeholder"]);

/**
* @function MultiDrag~clearPlaceholder
* @desc Removes the preview placholder for drag.
*
* @return {object}
*    The action.
*/
exports.clearPlaceholder = exports.set.bind(null, ["placeholder"], null);

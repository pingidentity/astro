var keyMirror = require("fbjs/lib/keyMirror");

/**
 * @enum {string}
 * @alias Actions.Types
 * @memberof Grid
 * @desc An enum of Grid action types.
 */
exports.Types = keyMirror({
    GRID_SET_PAGINATION: null,
    GRID_TOGGLE_ROW: null,
    GRID_INIT: null,
    GRID_SET_ALL: null,
    GRID_SET: null
});

/**
* @alias Actions.init
* @memberof Grid
* @desc Initialize the Grid store's state with data.
*
* @param {string} id
*    The id of the Grid to initialize.
* @param {object} data
*    The data to use in initialization.
*
* @return {object}
*    The action.
*/
exports.init = function (id, data) {
    return {
        type: exports.Types.GRID_INIT,
        id: id,
        data: data
    };
};


/**
* @alias Actions.toggleRow
* @memberof Grid
* @desc Toggles the row at index of the Grid specified by id.
*
* @param {string} id
*    The id of the Grid the row belongs to.
* @param {number} index
*    The index of the row to toggle.
*
* @return {object}
*    The action.
*/
exports.toggleRow = function (id, index) {
    return {
        type: exports.Types.GRID_TOGGLE_ROW,
        id: id,
        index: index
    };
};

/**
* @alias Actions.setFieldInAllRows
* @memberof Grid
* @desc Sets value at field name for all rows in the Grid specified by id.
*
* @param {string} id
*    The id of the Grid to set.
* @param {number} fieldName
*    The field name to set the value for.
* @param {*} value
*    The value to set.
*
* @return {object}
*    The action.
*/
exports.setFieldInAllRows = function (id, fieldName, value) {
    return {
        type: exports.Types.GRID_SET_ALL,
        id: id,
        fieldName: fieldName,
        value: value
    };
};

/**
* @alias Actions.set
* @memberof Grid
* @desc Set a specific value at path in the Grid store state.
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
        type: exports.Types.GRID_SET,
        path: path,
        value: value
    };
};

/**
* @alias Actions.setPagination
* @memberof Grid
* @desc Sets the pagination values for the the Grid specified by id.
*
* @param {string} id
*    The id of the Grid to set.
* @param {number} firstColumn
*    The first column for pagination.
* @param {number} lastColumn
*    The last column for pagination.
* @param {number} currentPage
*    The current page for pagination.
*
* @return {object}
*    The action.
*/
exports.setPagination = function (id, firstColumn, lastColumn, currentPage) {
    return {
        type: exports.Types.GRID_SET_PAGINATION,
        id: id,
        firstColumn: firstColumn,
        lastColumn: lastColumn,
        currentPage: currentPage
    };
};

/**
* @alias Actions.setField
* @memberof Grid
* @desc Set a specific value for the field name in the row at index of the Grid specified by id.
*
* @param {string} fieldName
*    The name of the field to set.
* @param {number} id
*    The id of the Grid to set.
* @param {number} rowIndex
*    The index of the row to set.
* @param {*} value
*    The value to set.
*
* @return {object}
*    The action.
*/
exports.setField = function (fieldName, id, rowIndex, value) {
    return exports.set([id, "rows", rowIndex, fieldName], value);
};

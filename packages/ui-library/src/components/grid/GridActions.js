var keyMirror = require("fbjs/lib/keyMirror");

/**
 * @enum {string}
 * @desc An enum of Grid action types.
 */
exports.Types = keyMirror({
    GRID_SET_PAGINATION: null,
    GRID_TOGGLE_ROW: null,
    GRID_INIT: null,
    GRID_SET_ALL: null,
    GRID_SET: null
});

exports.init = function (id, data) {
    return {
        type: exports.Types.GRID_INIT,
        id: id,
        data: data
    };
};

exports.toggleRow = function (id, index) {
    return {
        type: exports.Types.GRID_TOGGLE_ROW,
        id: id,
        index: index
    };
};

exports.setFieldInAllRows = function (id, fieldName, value) {
    return {
        type: exports.Types.GRID_SET_ALL,
        id: id,
        fieldName: fieldName,
        value: value
    };
};

exports.set = function (path, value) {
    return {
        type: exports.Types.GRID_SET,
        path: path,
        value: value
    };
};

exports.setPagination = function (id, firstColumn, lastColumn, currentPage) {
    return {
        type: exports.Types.GRID_SET_PAGINATION,
        id: id,
        firstColumn: firstColumn,
        lastColumn: lastColumn,
        currentPage: currentPage
    };
};

exports.setField = function (fieldName, id, rowIndex, value) {
    return exports.set([id, "rows", rowIndex, fieldName], value);
};

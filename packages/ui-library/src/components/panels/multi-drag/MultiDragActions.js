var keyMirror = require("fbjs/lib/keyMirror");

exports.Types = keyMirror({
    MULTIDRAG_SET: null,
    MULTIDRAG_PREPEND: null,
    MULTIDRAG_APPEND: null,
    MULTIDRAG_MOVE: null,
    MULTIDRAG_INIT: null,
    MULTIDRAG_FILTER: null
});

exports.set = function (path, value) {
    return {
        type: exports.Types.MULTIDRAG_SET,
        path: path,
        value: value
    };
};

exports.move = function (from, to) {
    return {
        type: exports.Types.MULTIDRAG_MOVE,
        from: from,
        to: to
    };
};

exports.prepend = function (column, data) {
    return {
        type: exports.Types.MULTIDRAG_PREPEND,
        column: column,
        data: data
    };
};

exports.append = function (column, data) {
    return {
        type: exports.Types.MULTIDRAG_APPEND,
        column: column,
        data: data
    };
};

exports.init = function (data) {
    return {
        type: exports.Types.MULTIDRAG_INIT,
        data: data
    };
};

exports.filterField = function (fieldName, column, filter) {
    return {
        type: exports.Types.MULTIDRAG_FILTER,
        column: column,
        filter: filter,
        fieldName: fieldName
    };
};

exports.filter = exports.filterField.bind(null, null);
exports.placeholder = exports.set.bind(null, ["placeholder"]);
exports.clearPlaceholder = exports.set.bind(null, ["placeholder"], null);

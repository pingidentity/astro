var keyMirror = require("fbjs/lib/keyMirror");

exports.Types = keyMirror({
    LIST_VIEW_SET: null,
    LIST_VIEW_FILTER: null,
    LIST_VIEW_PAGE: null,
    LIST_VIEW_REORDER: null,
});

exports.set = function (path, value) {
    return {
        type: exports.Types.LIST_VIEW_SET,
        path: path,
        value: value
    };
};

exports.setFilter = function (name, value) {
    return {
        type: exports.Types.LIST_VIEW_FILTER,
        name: name,
        value: value
    };
};

exports.setPage = function (page) {
    return {
        type: exports.Types.LIST_VIEW_PAGE,
        page: page
    };
};

exports.reorder = function (from, to) {
    return {
        type: exports.Types.LIST_VIEW_REORDER,
        from,
        to
    };
};

exports.setExpandedSearch = exports.set.bind(null, "advancedSearch");

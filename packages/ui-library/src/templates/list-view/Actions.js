var keyMirror = require("fbjs/lib/keyMirror");

exports.Types = keyMirror({
    LIST_VIEW_SET: null,
    LIST_VIEW_FILTER: null
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

exports.setActiveTab = exports.set.bind(null, "activeTab");
exports.setExpandedSearch = exports.set.bind(null, "advancedSearch");
exports.setPosition = exports.set.bind(null, "position");

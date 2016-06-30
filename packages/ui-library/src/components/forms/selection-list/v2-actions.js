var keyMirror = require("fbjs/lib/keyMirror");

var Types = keyMirror({
    QUERY_STRING_UPDATE: null,
    LIST_ITEMS_UPDATE: null
});
exports.Types = Types;

exports.updateQueryString = function (componentId, queryString) {
    return {
        type: Types.QUERY_STRING_UPDATE,
        componentId: componentId,
        queryString: queryString
    };
};

exports.updateListItems = function (componentId, items) {
    return {
        type: Types.LIST_ITEMS_UPDATE,
        componentId: componentId,
        items: items
    };
};

var keyMirror = require("fbjs/lib/keyMirror");

exports.Types = keyMirror({
    HEADER_TOGGLE_ITEM: null,
    HEADER_INIT: null
});

exports.init = function (tree) {
    return {
        type: exports.Types.HEADER_INIT,
        tree: tree
    };
};

exports.toggleItem = function (id) {
    return {
        type: exports.Types.HEADER_TOGGLE_ITEM,
        id: id
    };
};

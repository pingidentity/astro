var keyMirror = require("fbjs/lib/keyMirror");

exports.Types = keyMirror({
    HELP_DISMISS: null,
    HELP_NEXT: null,
    HELP_PREV: null,
    HELP_SHOW: null
});

exports.next = function () {
    return {
        type: exports.Types.HELP_NEXT
    };
};

exports.prev = function () {
    return {
        type: exports.Types.HELP_PREV
    };
};

exports.dismiss = function () {
    return {
        type: exports.Types.HELP_DISMISS
    };
};

exports.show = function () {
    return {
        type: exports.Types.HELP_SHOW
    };
};

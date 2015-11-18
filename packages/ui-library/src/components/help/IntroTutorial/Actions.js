var keyMirror = require("react/lib/keyMirror");

exports.Types = keyMirror({
    HELP_DISMISS: null,
    HELP_NEXT: null,
    HELP_PREV: null
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

var keyMirror = require("fbjs/lib/keyMirror");

exports.Types = keyMirror({
    EDIT_VIEW_SET_INPUT: null,
    EDIT_VIEW_SAVE: null
});

exports.setInput = function (name, value) {
    return {
        type: exports.Types.EDIT_VIEW_SET_INPUT,
        name: name,
        value: value
    };
};

exports.saveForm = function () {
    return {
        type: exports.Types.EDIT_VIEW_SAVE
    };
};

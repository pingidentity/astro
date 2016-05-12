var keyMirror = require("fbjs/lib/keyMirror");

exports.Types = keyMirror({
    EDIT_VIEW_SET_INPUT: null,
    EDIT_VIEW_SAVE: null,
    EDIT_VIEW_TOGGLE_SECTION: null
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

exports.toggleSection = function (index, expand) {
    return {
        type: exports.Types.EDIT_VIEW_TOGGLE_SECTION,
        index: index,
        expand: expand
    };
};

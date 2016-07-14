var keyMirror = require("fbjs/lib/keyMirror");

exports.Types = keyMirror({
    EDIT_VIEW_SET_INPUT: null,
    EDIT_VIEW_SAVE: null,
    EDIT_VIEW_SET_ROCKERBUTTON: null
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

exports.setActiveRockerButton = function (activeRockerButton) {
    return {
        type: exports.Types.EDIT_VIEW_SET_ROCKERBUTTON,
        name: activeRockerButton.label,
        index: activeRockerButton.index
    };
};

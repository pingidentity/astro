var keyMirror = require("fbjs/lib/keyMirror");

/*
 * In order to not interfere with the reducer in the regular WizardDemo, this view
 * implements its own action types (remember that actions will be broadcast to ALL reducers.
 *
 * The wizard Reducer was written with the expectation of it being the only one on a given page.
 */

exports.Types = keyMirror({
    WIZARD_VIEW_SET: null,
    WIZARD_VIEW_RESET: null,
    WIZARD_VIEW_EDIT: null,
    WIZARD_VIEW_ADD_ROW: null
});

exports.set = function (path, value) {
    return {
        type: exports.Types.WIZARD_VIEW_SET,
        path: path,
        value: value
    };
};

exports.reset = function () {
    return {
        type: exports.Types.WIZARD_VIEW_RESET
    };
};

exports.edit = function (number) {
    return {
        type: exports.Types.WIZARD_VIEW_EDIT,
        number: number
    };
};

exports.addComplexRow = function () {
    return {
        type: exports.Types.WIZARD_VIEW_ADD_ROW
    };
};

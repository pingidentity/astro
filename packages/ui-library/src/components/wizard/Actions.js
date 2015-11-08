var keyMirror = require("react/lib/keyMirror");

exports.Types = keyMirror({
    WIZARD_NEXT: null,
    WIZARD_EDIT: null,
    WIZARD_CHOOSE: null
});

exports.next = function () {
    return {
        type: exports.Types.WIZARD_NEXT
    };
};

exports.choose = function (choice, numSteps) {
    return {
        type: exports.Types.WIZARD_CHOOSE,
        choice: choice,
        numSteps: numSteps
    };
};

exports.edit = function (number) {
    return {
        type: exports.Types.WIZARD_EDIT,
        number: number
    };
};


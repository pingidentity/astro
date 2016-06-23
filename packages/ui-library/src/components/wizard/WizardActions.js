var keyMirror = require("fbjs/lib/keyMirror");

exports.Types = keyMirror({
    WIZARD_NEXT: null,
    WIZARD_EDIT: null,
    WIZARD_CHOOSE: null,
    WIZARD_RESET: null
});

exports.reset = function (id) {
    return {
        type: exports.Types.WIZARD_RESET,
        id: id
    };
};

exports.next = function (id) {
    return {
        type: exports.Types.WIZARD_NEXT,
        id: id
    };
};

exports.choose = function (id, choice, numSteps) {
    if (typeof(id) !== "string" || typeof(choice) !== "number" || typeof(numSteps) !== "number") {
        numSteps = choice;
        choice = id;
        id = null;
    }

    return {
        type: exports.Types.WIZARD_CHOOSE,
        id: id,
        choice: choice,
        numSteps: numSteps
    };
};

exports.edit = function (id, number) {
    if (typeof(id) !== "string" || typeof(number) !== "number") {
        number = id;
        id = null;
    }

    return {
        type: exports.Types.WIZARD_EDIT,
        id: id,
        number: number
    };
};

var keyMirror = require("fbjs/lib/keyMirror");

/**
 * @enum {string}
 * @alias Wizard~Types
 * @ignore
 */
exports.Types = keyMirror({
    WIZARD_NEXT: null,
    WIZARD_EDIT: null,
    WIZARD_CHOOSE: null,
    WIZARD_RESET: null
});

/**
 * @function Wizard~reset
 * @param {string} id
 *          Identifier
 * @returns {{type: null, id: *}}
 *          Object with type and id
 */
exports.reset = function (id) {
    return {
        type: exports.Types.WIZARD_RESET,
        id: id
    };
};

/**
 * @function Wizard~next
 * @param {string} id
 *          Identifier
 * @returns {{type: null, id: *}}
 *          Object with type and id
 */
exports.next = function (id) {
    return {
        type: exports.Types.WIZARD_NEXT,
        id: id
    };
};

/**
 * @function
 * @private
 * @desc Build and return the wizard choice.
 * @param {string} id
 *          Identifier for the wizard step.
 * @param {number} choice
 *          Choice or step of the wizard.
 * @param {number} numSteps
 *          Total number of steps.
 * @returns {Wizard~choice}
 *          Returns an object of type, id, choice, and number of steps.
 */
var _buildWizardChoice = function (id, choice, numSteps) {
    if (typeof(id) !== "string") {
        id = null;
    }

    return {
        type: exports.Types.WIZARD_CHOOSE,
        id: id,
        choice: choice,
        numSteps: numSteps
    };
};

/**
 * @function Wizard~choose
 * @deprecated
 * @desc Use change instead
 * @param {string} id
 *           Identifier for the wizard step.
 * @param {number} choice
 *           Step of the wizard.
 * @param {number} numSteps
 *           Total number of steps.
 * @returns {Wizard~choice}
 *           WizardActions choice object with type, id, choice, numSteps
 */
exports.choose = function (id, choice, numSteps) {
    //choice passed as id and numsteps passed as choice.
    if (typeof(id) !== "string" || typeof(choice) !== "number" || typeof(numSteps) !== "number") {
        numSteps = choice;
        choice = id;
        id = null;
    }
    return _buildWizardChoice (id, choice, numSteps);
};

/**
 * @function Wizard~pick
 * @desc Replacement for WizardActions~choose, which takes the object used by Wizard#Choose~onValueChange.
 * @param {Wizard#WizardActions~choice} choice
 *           Details of the action choice.
 * @returns {Wizard#WizardActions~choice}
 *           WizardActions choice object with type, id, choice, numSteps
 */
exports.pick = function (choice) {
    return _buildWizardChoice (choice.id, choice.choice, choice.numSteps);
};

/**
 * @function Wizard~edit
 * @desc Edit a step in the wizard
 * @param {string} id
 *          Identifier for the wizard step
 * @param {number} number
 *          Step number
 * @returns {Wizard~choice}
 *           WizardActions choice object with type, id, choice, numSteps
 */
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

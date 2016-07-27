var keyMirror = require("fbjs/lib/keyMirror");

/**
 * @enum {string}
 * @alias Actions.Types
 * @memberof Wizard
 */
exports.Types = keyMirror({
    WIZARD_NEXT: null,
    WIZARD_EDIT: null,
    WIZARD_CHOOSE: null,
    WIZARD_RESET: null
});

/**
 * @alias Actions.reset
 * @memberof Wizard
 * @param {string} id
 *          Wizard identifier
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
 * @alias Actions.next
 * @memberof Wizard
 * @param {string} id
 *          Wizard identifier
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
 *          Wizard identifier.
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
 * @alias Actions.choose
 * @memberof Wizard
 * @deprecated
 * @desc Use change instead
 * @param {string} id
 *           Wizard identifier.
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
 * @alias Actions.pick
 * @memberof Wizard
 * @desc Replacement for WizardActions~choose, which takes the object used by Wizard#Choose~onValueChange.
 *
 * @param {string} id
 *           Wizard identifier.
 * @param {Wizard#WizardActions~choice} choice
 *           Details of the action choice.
 * @returns {Wizard#WizardActions~choice}
 *           WizardActions choice object with type, id, choice, numSteps
 */
exports.pick = function (id, choice) {
    return _buildWizardChoice (id, choice.choice, choice.numSteps);
};

/**
 * @alias Actions.edit
 * @memberof Wizard
 * @desc Edit a step in the wizard
 * @param {string} id
 *          Wizard identifier.
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

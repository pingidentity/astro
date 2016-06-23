var Actions = require("./WizardActions.js"),
    update = require("re-mutable"),
    _ = require("underscore");

var initialState = { choices: [], activeStep: 1, numSteps: 2 };

/*
 * To maintain backwards compatibility, if no id is set in the action, update the variable in the state
 * otherwise create an object with the given id and set the variable as a property of this object.
 */
function setFor (state, id, path, value) {
    if (id || id === "0") {
        if (typeof(state[id]) === "undefined") {
            state[id] = initialState;
        }
        return update.set(state, [id].concat(path), value);
    } else {
        return update.set(state, path, value);
    }
}

var reducer = function (state, action) {
    var nextState = _.clone(state);

    switch (action.type) {
        case Actions.Types.WIZARD_RESET:
            if (action.id || action.id === "0") {
                nextState = update.set(nextState, [action.id], initialState);
                if (state[action.id]) {
                    nextState = update.set(nextState, [action.id, "numSteps"], state[action.id].numSteps);
                }
            } else {
                nextState = update.set(initialState, ["numSteps"], state.numSteps);
            }
            break;
        case Actions.Types.WIZARD_EDIT:
            state = (action.id || action.id === "0") ? state[action.id] : state;

            nextState = setFor(nextState, action.id, ["activeStep"], action.number);
            nextState = setFor(nextState, action.id, ["choices"], state.choices.slice(0, action.number));
            break;
        case Actions.Types.WIZARD_NEXT:
            state = (action.id || action.id === "0") ? state[action.id] : state;

            nextState = setFor(nextState, action.id, ["activeStep"], state.activeStep + 1);
            break;
        case Actions.Types.WIZARD_CHOOSE:
            state = (action.id || action.id === "0") ? state[action.id] : state;

            nextState = setFor(nextState, action.id, ["choices", state.activeStep - 1], action.choice);
            nextState = setFor(nextState, action.id, ["numSteps"], action.numSteps);
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

module.exports = reducer;

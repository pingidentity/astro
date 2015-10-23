var Actions = require('./Actions.js'),
    _ = require('underscore');

var initState = {
    choices: [],
    activeStep: 1,
    numSteps: 2
};

var reducer = function (state, action) {
    var nextState = _.clone(state || initState);

    switch (action.type) {
        case Actions.Types.WIZARD_EDIT:
            nextState.activeStep = action.number;
            nextState.choices = state.choices.slice(0, action.number);
            break;
        case Actions.Types.WIZARD_NEXT:
            nextState.activeStep += 1;
            break;
        case Actions.Types.WIZARD_CHOOSE:
            nextState.choices[state.activeStep - 1] = action.choice;
            nextState.numSteps = action.numSteps;
            break;
    }

    return nextState;
};

module.exports = reducer;

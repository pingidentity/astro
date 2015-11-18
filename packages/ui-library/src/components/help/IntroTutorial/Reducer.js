var Actions = require("./Actions.js"),
    _ = require("underscore");

var initialState = {
    visible: true,
    active: 0,
    steps: []
};

module.exports = function (state, action) {
    var nextState = _.clone(state || initialState);

    switch (action.type) {
        case Actions.Types.HELP_NEXT:
            nextState.active += 1;
            break;
        case Actions.Types.HELP_PREV:
            nextState.active -= 1;
            break;
        case Actions.Types.HELP_DISMISS:
            nextState.visible = false;
            break;
    }

    return nextState;
};

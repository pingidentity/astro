var Actions = require("./Actions.js"),
    _ = require("underscore");

var initialState = {
    visible: true,
    active: 0
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
        case Actions.Types.HELP_SHOW:
            nextState.active = 0;
            nextState.visible = true;
            break;
        case Actions.Types.HELP_DISMISS:
            nextState.visible = false;
            break;
    }

    return nextState;
};

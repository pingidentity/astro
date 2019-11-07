var Actions = require("./Actions.js"),
    update = require("re-mutable");

var initialState = {
    code: {},
    lightMode: false,
};

module.exports = function (state, action) {
    var nextState = state;

    switch (action.type) {
        case Actions.Types.SET:
            nextState = update.set(nextState, action.path, action.value);
            break;
        case Actions.Types.TOGGLE_LIGHTMODE:
            nextState = update.set(nextState, "lightMode", !nextState.lightMode);
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

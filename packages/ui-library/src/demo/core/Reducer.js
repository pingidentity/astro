var Actions = require("./Actions.js"),
    update = require("re-mutable");

var initialState = {
    code: {},
    leftNav: {
        lightMode: false,
        legacyNav: false,
        removeTopContent: false,
    }
};

module.exports = function (state, action) {
    var nextState = state;

    switch (action.type) {
        case Actions.Types.SET:
            nextState = update.set(nextState, action.path, action.value);
            break;
        case Actions.Types.TOGGLE_NAVMODE:
            nextState = update.set(nextState, ["leftNav", action.path], !nextState.leftNav[action.path]);
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

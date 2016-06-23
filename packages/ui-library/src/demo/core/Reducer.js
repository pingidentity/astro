var Actions = require("./Actions.js"),
    update = require("re-mutable");

var initialState = {
    code: {}
};

module.exports = function (state, action) {
    var nextState = state;

    switch (action.type) {
        case Actions.Types.SET:
            nextState = update.set(nextState, action.path, action.value);
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

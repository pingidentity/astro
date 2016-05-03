var Actions = require("./Actions.js"),
    deepClone = require("clone"),
    _ = require("underscore");

var initialState = {
    tree: []
};

module.exports = function (state, action) {
    var nextState = _.clone(state);

    switch (action.type) {
        case Actions.Types.HEADER_TOGGLE_ITEM:
            nextState.openNode = null;

            if (state.openNode !== action.id) {
                nextState.openNode = action.id;
            }
            break;
        case Actions.Types.HEADER_INIT:
            nextState.tree = deepClone(action.tree);
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

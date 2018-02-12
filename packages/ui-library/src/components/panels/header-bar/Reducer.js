var Actions = require("./Actions.js"),
    deepClone = require("clone"),
    _ = require("underscore");

var initialState = {
    tree: [],
    openNode: ""
};

module.exports = function(state = initialState, action) {
    var nextState = _.clone(state);

    switch (action.type) {
        case Actions.Types.HEADER_TOGGLE_ITEM:
            nextState.openNode = "";

            if (state.openNode !== action.id) {
                nextState.openNode = action.id;
            }
            break;
        case Actions.Types.HEADER_INIT:
            nextState.tree = deepClone(action.tree);
            break;
        case Actions.Types.HEADER_SET_ENVIRONMENT:
            nextState.environmentSelected = action.environment;
            break;
        case Actions.Types.HEADER_SET_NAV:
            nextState.navSelected = action.currentNav;
            break;
        case Actions.Types.HEADER_SET_MARKET:
            nextState.marketSelected = action.market;
            break;
        default:
            return state;
    }

    return nextState;
};

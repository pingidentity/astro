var _ = require("underscore"),
    Actions = require("./MessagesActions.js"),
    update = require("re-mutable");

var initialState = {};

function deleteMessageAt (state, containerId, index) {
    clearTimeout(state[containerId][index].timer);
    return update.unset(state, [containerId, index]);
}

module.exports = function (state, action) {
    //each action is responsible for cloning the state before modifying
    var nextState = state;

    switch (action.type) {
        case Actions.Types.ADD_MESSAGE:
            if (typeof(nextState[action.containerId]) === "undefined") {
                nextState = update.set(nextState, [action.containerId], []);
            }
            nextState = update.push(nextState, [action.containerId], _.defaults({ type: action.status }, action));
            break;
        case Actions.Types.REMOVE_MESSAGE:
            var index = _.findIndex(nextState[action.containerId], { index: action.messageId });

            if (index > -1) {
                nextState = deleteMessageAt(nextState, action.containerId, index);
            }
            break;
        case Actions.Types.REMOVE_AT:
            if (nextState[action.containerId].length > action.index) {
                nextState = deleteMessageAt(nextState, action.containerId, action.index);
            }
            break;
        case Actions.Types.SHIFT_MESSAGE:
            if (nextState.messages.length > 0) {
                nextState = deleteMessageAt(nextState, action.containerId, 0);
            }
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

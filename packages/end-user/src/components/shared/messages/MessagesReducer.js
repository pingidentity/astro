var _ = require("underscore"),
    Actions = require("./MessagesActions.js"),
    update = require("re-mutable");

var initialState = {};

function deleteMessageAt(state, containerId, index) {
    clearTimeout(state[containerId][index].timer);
    return update.unset(state, [containerId, index]);
}

function emptyContainer(state, containerId) {
    return update.set(state, [containerId], []);
}

function updateProgressAt(state, containerId, index, percent) {
    return update.set(state, [containerId, index, "progress", "percent"], percent);
}

module.exports = function (state, action) {
    //each action is responsible for cloning the state before modifying
    var nextState = state;

    switch (action.type) {
        case Actions.Types.ADD_MESSAGE:
            if (typeof (nextState[action.containerId]) === "undefined") {
                nextState = emptyContainer(nextState, action.containerId);
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
        case Actions.Types.REMOVE_ALL_MESSAGES:
            nextState = emptyContainer(nextState, action.containerId);
            break;
        case Actions.Types.SHIFT_MESSAGE:
            if (nextState.messages.length > 0) {
                nextState = deleteMessageAt(nextState, action.containerId, 0);
            }
            break;
        case Actions.Types.UPDATE_PROGRESS:
            var index = _.findIndex(nextState[action.containerId], { index: action.messageId });

            if (index > -1) {
                nextState = updateProgressAt(nextState, action.containerId, index, action.percent);
            }
            break;
        case Actions.Types.UPDATE_MINIMIZED:
            var index = _.findIndex(nextState[action.containerId], { index: action.messageId });

            if (index > -1) {
                nextState = update.set(nextState, [action.containerId, index, "minimized"], action.minimized);
            }
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

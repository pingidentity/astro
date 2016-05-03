var Actions = require("./Actions.js"),
    _ = require("underscore"),
    setAtPath = require("../../util/ReduxUtils.js").setAtPath;

var initialState = {
    code: {}
};

module.exports = function (state, action) {
    var nextState = _.clone(state);

    switch (action.type) {
        case Actions.Types.SET:
            setAtPath(nextState, action.path, action.value);
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

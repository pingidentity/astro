var Actions = require("./Actions.js"),
    _ = require("underscore");

var initialState = {
    inputs: {
        address1: null,
        address2: null,
        addressType: "",
        alternateAddress1: null,
        alternateAddress2: null,
        alternateAddressType: "",
        firstName: null,
        lastName: null,
        userActive: false,
        userGroup: null,
        username: null
    },
    activeRockerButton: 0
};


/*
 * This is barebones reduces that just knows how to update the input values and change the active
 * rocker-button.  In a real app, we would either combine this with out reducers or have additional
 * logic.
 */
module.exports = function (state, action) {
    var nextState = _.clone(state);

    switch (action.type) {
        case Actions.Types.EDIT_VIEW_SET_INPUT:
            nextState.inputs[action.name] = action.value;
            break;
        case Actions.Types.EDIT_VIEW_SAVE:
            // make API call(s) to save data stored in the app state
            break;
        case Actions.Types.EDIT_VIEW_SET_ROCKERBUTTON:
            nextState.activeRockerButton = action.index;
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

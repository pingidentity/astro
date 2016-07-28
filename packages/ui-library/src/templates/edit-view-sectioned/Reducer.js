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
        username: null,
        saving: false,
        dirty: false
    }
};


/*
 * This is barebones reduces that just knows how to update the input values.  In a real app, we
 * would either combine this with out reducers or have additional logic.
 */
module.exports = function (state, action) {
    var nextState = _.clone(state);

    switch (action.type) {
        case Actions.Types.EDIT_VIEW_SET_INPUT:
            nextState.inputs[action.name] = action.value;
            // set dirty once an input is set - can be changed to more complex dirty checking logic
            nextState.inputs.dirty = true;
            break;
        case Actions.Types.EDIT_VIEW_SAVE:
            // make API call(s) to save data stored in the app state
            // sets saving once save is clicked - can be changed to more complex save logic
            nextState.inputs.saving = true;
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

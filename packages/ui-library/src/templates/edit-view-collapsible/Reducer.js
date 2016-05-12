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
    expandedSections: [1]
};


/*
 * This is barebones reduces that just knows how to update the input values and manage the collapsed
 * state for each row.  In a real app, we would either combine this with out reducers or have
 * additional logic.
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
        case Actions.Types.EDIT_VIEW_TOGGLE_SECTION:
            var sectionIndex = state.expandedSections.indexOf(action.index),
                sectionExpanded = sectionIndex > -1;

            if (action.expand && !sectionExpanded) {
                nextState.expandedSections.push(action.index);

            } else if (!action.expand && sectionExpanded) {
                nextState.expandedSections.splice(sectionIndex, 1);
            }
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

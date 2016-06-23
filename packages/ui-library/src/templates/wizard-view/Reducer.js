var Actions = require("./Actions.js"),
    update = require("re-mutable");

var initialState = {
    showing: false,
    fields: {
        complex: [{}]
    }
};

/*
 * In order to not interfere with the reducer in the regular WizardDemo, this view
 * implements its own action types (remember that actions will be broadcast to ALL reducers.
 *
 * The wizard Reducer was written with the expectation of it being the only one on a given page.
 */
var reducer = function (state, action) {
    var nextState = state;

    switch (action.type) {
        case Actions.Types.WIZARD_VIEW_ADD_ROW:
            nextState = update.push(nextState, ["fields", "complex"], {});
            break;
        case Actions.Types.WIZARD_VIEW_SET:
            nextState = update.set(nextState, action.path, action.value);
            break;
        case Actions.Types.WIZARD_VIEW_RESET:
            nextState = initialState;
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

module.exports = reducer;

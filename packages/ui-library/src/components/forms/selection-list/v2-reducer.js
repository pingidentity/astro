var Actions = require("./v2-actions"),
    _ = require("underscore");

// this is the initial state for any given component
var initialState = {
    queryString: "",
    // an array of SelectionList~SelectionListItem objects
    items: [],
    // a subarray of items, containing only the items which match the current query string
    matches: []
};

var filterItems = function (items, queryString) {
    var queryString = queryString.trim();
    var regex = new RegExp(queryString.length > 3 ? queryString : "^" + queryString, "i");
    return _.filter(items, function (item) {
        return item.name.match(regex);
    });
};

module.exports = function (state, action) {
    // the state object is an object, where each key is the component ID,
    // and the value assigned to it has the same structure as the initial state
    // eg: { selectionListUserPermissions: { queryString: "abc", items: [], matches: [] },
    //      selectionListGroups: { queryString: "", items: [], matches: [] } }
    state = state || {};
    var nextState = _.clone(state);

    // if the current state is not found (the current component doesn't have a state yet), initialize it
    // otherwise clone the existing current state,
    // and set it on the next state
    var currentNextState = (action.componentId in nextState)
            ? _.clone(nextState[action.componentId])
            : _.clone(initialState);
    nextState[action.componentId] = currentNextState;

    switch (action.type) {
        case Actions.Types.QUERY_STRING_UPDATE:
            currentNextState.queryString = action.queryString || "";
            currentNextState.matches = filterItems(currentNextState.items, currentNextState.queryString);
            break;
        case Actions.Types.LIST_ITEMS_UPDATE:
            currentNextState.items = action.items || [];
            currentNextState.matches = filterItems(currentNextState.items, currentNextState.queryString);
            break;
        default:
            return state;
    }

    return nextState;
};

module.exports.filterItemsFunction = filterItems;

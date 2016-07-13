var Actions = require("./Actions.js"),
    deepClone = require("clone"),
    _ = require("underscore");

var initialState = {
    tree: []
};

/**
 * @function LeftNavBar#Reducer~findFirstChildIdUnlessSelected
 * @desc Returns the id of the openNode's first child unless state.selectedNode belongs to the openNode.
 * @param {object} state
 *          The state object
 * @returns {string}
 *          The id of the first child
 */
function findFirstChildIdUnlessSelected (state) {
    var section = _.findWhere(state.tree, { id: state.openNode });

    if (section && section.children) {
        if (_.findWhere(section.children, { id: state.selectedNode })) {
            return state.selectedNode;
        }
        return section.children[0].id;
    }
}

/**
 * @function LeftNavBar#Reducer~selectByOffset
 * @desc This function will calculate the new position of the selected node according to the
 * offset specified.
 * @param {object} state
 *          State object (will be mutated so must be a clone!)
 * @param {number} offset
 *          The number of positions to offset the selected Item by
 */
function selectByOffset (state, offset) {
    var sectionIndex = _.findIndex(state.tree, { id: state.openNode });
    var itemIndex = _.findIndex(state.tree[sectionIndex].children, { id: state.selectedNode });
    var moveSection = (offset > 0 && itemIndex === (state.tree[sectionIndex].children.length - 1)) ||
                      (offset < 0 && itemIndex === 0);

    //if the previous/next action is causing the nav bar to move to the next section
    if (moveSection) {
        //previous on the first item or next on the last wont work
        if ((sectionIndex === 0 && offset < 0) || ((sectionIndex === state.tree.length - 1) && offset > 0)) {
            return;
        }

        sectionIndex += offset;
        itemIndex = offset < 0 ? state.tree[sectionIndex].children.length : -1;
    }

    state.openNode = state.tree[sectionIndex].id;
    state.selectedNode = state.tree[sectionIndex].children[itemIndex + offset].id;
}

module.exports = function (state, action) {
    var nextState = _.clone(state);

    switch (action.type) {
        case Actions.Types.NAV_BAR_SELECT_NEXT:
            selectByOffset(nextState, 1);
            break;
        case Actions.Types.NAV_BAR_SELECT_PREV:
            selectByOffset(nextState, -1);
            break;
        case Actions.Types.NAV_BAR_SELECT_ITEM:
            nextState.selectedNode = action.id;
            break;
        case Actions.Types.NAV_BAR_TOGGLE_SECTION:
            nextState.openNode = null;

            if (state.openNode !== action.id) {
                nextState.openNode = action.id;
                nextState.selectedNode = findFirstChildIdUnlessSelected(nextState);
            }
            break;
        case Actions.Types.NAV_BAR_INIT:
            nextState.tree = deepClone(action.tree);
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

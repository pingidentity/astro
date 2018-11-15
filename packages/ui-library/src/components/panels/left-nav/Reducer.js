var Actions = require("./Actions.js"),
    deepClone = require("clone"),
    _ = require("underscore"),
    update = require("re-mutable");

var initialState = {
    tree: [],
    root: "",
    openSections: {},
    selectedContexts: {},
    collapsible: false,
    autocollapse: false,
    updated: false,
};

/**
 * @function LeftNavBar#Reducer~findFirstChildIdUnlessSelected
 * @desc Returns the id of the selectedSection's first child unless state.selectedNode belongs to the selectedSection.
 * @param {object} state
 *          The state object
 * @returns {string}
 *          The id of the first child
 */
function findFirstChildIdUnlessSelected (state) {
    var section = _.findWhere(state.tree, { id: state.selectedSection });

    if (section && section.children) {
        if (_.findWhere(section.children, { id: state.selectedNode })) {
            return state.selectedNode;
        }
        return section.children[0].id;
    }
}

function closeAllNotSelected (state, selectedId) {
    for (var sectionId in state.openSections) {
        if (sectionId!== selectedId) {
            state = update.set(state, ["openSections", sectionId], false);
        }
    }
    return state;
}

function openAllSections (state) {
    state.tree.forEach(function (section) {
        state = update.set(state, ["openSections", section.id], true);
    });
    return state;
}

/**
 * @function LeftNavBar#Reducer~selectByOffset
 * @desc This function will calculate the new position of the selected node according to the
 * offset specified.
 * @param {object} state
 *          State object (will be mutated so must be a clone!)
 * @param {number} offset
 *          The number of positions to offset the selected Item by
 * @returns {object}
 *          The updated state object.
 */
function selectByOffset (state, offset) {
    // Do nothing if all sections collapsed
    var allColllapsed = _.values(state.openSections).every(function (open) {
        return !open;
    });
    if (allColllapsed) {
        return state;
    }

    var sectionIndex = _.findIndex(state.tree, { id: state.selectedSection });
    var itemIndex = _.findIndex(state.tree[sectionIndex].children, { id: state.selectedNode });
    var moveSection = (offset > 0 && itemIndex === (state.tree[sectionIndex].children.length - 1)) ||
                      (offset < 0 && itemIndex === 0);

    //if the previous/next action is causing the nav bar to move to the next section
    if (moveSection) {
        //previous on the first item or next on the last wont work
        if ((sectionIndex === 0 && offset < 0) || ((sectionIndex === state.tree.length - 1) && offset > 0)) {
            return state;
        }

        sectionIndex += offset;
        itemIndex = offset < 0 ? state.tree[sectionIndex].children.length : -1;
    }

    state.selectedSection = state.tree[sectionIndex].id;
    state.selectedNode = state.tree[sectionIndex].children[itemIndex + offset].id;
    state = update.set(state, ["openSections", state.tree[sectionIndex].id], true);

    if (state.autocollapse) {
        state = closeAllNotSelected(state, state.selectedSection);
    }

    return state;
}

module.exports = function (state, action) {
    var nextState = _.clone(state);

    switch (action.type) {
        case Actions.Types.NAV_BAR_SET:
            nextState = update.set(nextState, action.path, action.value);

            if (action.path === "collapsible" && action.value === false) {
                nextState = openAllSections(nextState);
            }
            break;
        case Actions.Types.NAV_BAR_SELECT_NEXT:
            nextState = selectByOffset(nextState, 1);
            break;
        case Actions.Types.NAV_BAR_SELECT_PREV:
            nextState = selectByOffset(nextState, -1);
            break;
        case Actions.Types.NAV_BAR_SELECT_ITEM:
            var sectionData = _.find(state.tree, function (item) {
                return item.id === action.sectionId;
            });
            var sectionType = sectionData && sectionData.type ? sectionData.type : null;

            if (sectionType === "context") {
                nextState.selectedContexts[action.sectionId] = action.id;
            } else {
                nextState.selectedNode = action.id;
                nextState.selectedSection = action.sectionId;
            }
            break;
        case Actions.Types.NAV_BAR_TOGGLE_SECTION:
            if (!state.collapsible) {
                break;
            }
            nextState = update.set(nextState, ["openSections", action.id], !state.openSections[action.id]);

            if (state.autocollapse) {
                nextState = closeAllNotSelected(nextState, action.id);
            }

            // don't auto-select the first child node of a newly opened section if new nav
            if (state.updated) {
                break;
            }
            else {
                var sectionData = _.find(state.tree, function (item) {
                    return item.id === action.id;
                });
                if (sectionData.type !== "context") {
                    if (state.autocollapse || !state.autocollapse && !state.openSections[action.id]) {
                        if (state.selectedSection !== action.id) {
                            nextState.selectedSection = action.id;
                            nextState.selectedNode = findFirstChildIdUnlessSelected(nextState);
                        }
                    }
                }
            }
            break;
        case Actions.Types.NAV_BAR_INIT:
            nextState.tree = deepClone(action.tree);

            if (!state.collapsible) {
                nextState = openAllSections(nextState);
            }
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

var keyMirror = require("fbjs/lib/keyMirror");

exports.Types = keyMirror({
    NAV_BAR_SELECT_NEXT: null,
    NAV_BAR_SELECT_PREV: null,
    NAV_BAR_SELECT_ITEM: null,
    NAV_BAR_TOGGLE_SECTION: null,
    NAV_BAR_INIT: null
});

/**
 * @function LeftNav.Actions.init
 * @param {object[]} tree - An array of objects describing the shape of the NavBar
 * @desc initialize the structure of the left nav
 * @returns {object} - action object
 */
exports.init = function (tree) {
    return {
        type: exports.Types.NAV_BAR_INIT,
        tree: tree
    };
};

/**
 * @function LeftNav.Actions.toggleSection
 * @param {number|string} id - The id of the section to toggle
 * @desc this will toggle the specified id and leave all other sections expanded state as is.
 * @returns {object} - action object
 */
exports.toggleSection = function (id) {
    return {
        type: exports.Types.NAV_BAR_TOGGLE_SECTION,
        id: id
    };
};

/**
 * @function LeftNav.Actions.selectItemUnselectOthers
 * @param {number|string} id - The id of the item to select
 * @desc This will make the specified item selected
 * @returns {object} - action object
 */
exports.selectItem = function (id) {
    return {
        type: exports.Types.NAV_BAR_SELECT_ITEM,
        id: id
    };
};

/**
 * @function LeftNav.Actions.selectNextItem
 * @desc Select the next item in the nav bar
 * @returns {object} - action object
 */
exports.selectNextItem = function () {
    return {
        type: exports.Types.NAV_BAR_SELECT_NEXT
    };
};

/**
 * @function LeftNav.Actions.selectPrevItem
 * @desc Select the previous item in the nav bar
 * @returns {object} - action object
 */
exports.selectPrevItem = function () {
    return {
        type: exports.Types.NAV_BAR_SELECT_PREV
    };
};

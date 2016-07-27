var keyMirror = require("fbjs/lib/keyMirror");

/**
* @enum {string}
* @alias Actions.Types
* @memberof LeftNavBar
* @desc An enum of LeftNavBar action types.
*/
exports.Types = keyMirror({
    NAV_BAR_SELECT_NEXT: null,
    NAV_BAR_SELECT_PREV: null,
    NAV_BAR_SELECT_ITEM: null,
    NAV_BAR_TOGGLE_SECTION: null,
    NAV_BAR_INIT: null
});

/**
 * @function
 * @alias Actions.init
 * @memberof LeftNavBar
 * @desc initialize the structure of the left nav
 * @param {object[]} tree
 *          An array of objects describing the shape of the NavBar
 * @returns {object}
 *          Action object
 */
exports.init = function (tree) {
    return {
        type: exports.Types.NAV_BAR_INIT,
        tree: tree
    };
};

/**
 * @alias Actions.toggleSection
 * @memberof LeftNavBar
 * @desc this will toggle the specified id and leave all other sections expanded state as is.
 * @param {number|string} id
 *              The id of the section to toggle
 * @returns {object}
 *              Action object
 */
exports.toggleSection = function (id) {
    return {
        type: exports.Types.NAV_BAR_TOGGLE_SECTION,
        id: id
    };
};

/**
 * @alias Actions.selectItemUnselectOthers
 * @memberof LeftNavBar
 * @desc This will make the specified item selected
 * @param {number|string} id
 *          The id of the item to select
 * @returns {object}
 *          Action object
 */
exports.selectItem = function (id) {
    return {
        type: exports.Types.NAV_BAR_SELECT_ITEM,
        id: id
    };
};

/**
 * @alias Actions.selectNextItem
 * @memberof LeftNavBar
 * @desc Select the next item in the nav bar
 * @returns {object}
 *          Action object
 */
exports.selectNextItem = function () {
    return {
        type: exports.Types.NAV_BAR_SELECT_NEXT
    };
};

/**
 * @alias Actions.selectPrevItem
 * @memberof LeftNavBar
 * @desc Select the previous item in the nav bar
 * @returns {object}
 *          Action object
 */
exports.selectPrevItem = function () {
    return {
        type: exports.Types.NAV_BAR_SELECT_PREV
    };
};

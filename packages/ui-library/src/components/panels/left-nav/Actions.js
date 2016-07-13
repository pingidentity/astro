var keyMirror = require("fbjs/lib/keyMirror");

exports.Types = keyMirror({
    NAV_BAR_SELECT_NEXT: null,
    NAV_BAR_SELECT_PREV: null,
    NAV_BAR_SELECT_ITEM: null,
    NAV_BAR_TOGGLE_SECTION: null,
    NAV_BAR_INIT: null
});

/**
 * @function LeftNavBar#Actions~init
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
 * @function LeftNav#Actions~toggleSection
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
 * @function LeftNav#Actions~selectItemUnselectOthers
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
 * @function LeftNav#Actions~selectNextItem
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
 * @function LeftNav#Actions~selectPrevItem
 * @desc Select the previous item in the nav bar
 * @returns {object}
 *          Action object
 */
exports.selectPrevItem = function () {
    return {
        type: exports.Types.NAV_BAR_SELECT_PREV
    };
};

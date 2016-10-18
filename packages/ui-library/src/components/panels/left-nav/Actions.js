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
    NAV_BAR_INIT: null,
    NAV_BAR_SET: null
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
* @function
* @alias Actions.set
* @memberof LeftNavBar
* @desc Sets value at the specified path in the state object.
*
* @param {string} path
*    The path to set value at.
* @param {*} value
*    The value to set at path.
*
* @return {object}
*    The action.
*/
exports.set = function (path, value) {
    return {
        type: exports.Types.NAV_BAR_SET,
        path: path,
        value: value
    };
};

/**
* @function
* @alias Actions.setCollapsible
* @memberof LeftNavBar
* @desc Sets whether or not collapsible should be enabled for the LeftNavBar.
*
* @param {boolean} collapsible
*    Whether or not all sections should be open by default.
*
* @return {objet}
*    The action.
*/
exports.setCollapsible = exports.set.bind(null, "collapsible");

/**
* @function
* @alias Actions.setAutocollapse
* @memberof LeftNavBar
* @desc Sets whether or not autocollapse should be enabled for the LeftNavBar.
*
* @param {boolean} useAutocollapse
*    Whether or not autocollapse should be used.
*
* @return {object}
*    The action.
*/
exports.setAutocollapse = exports.set.bind(null, "autocollapse");

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
 * @param {number|string} sectionId
*           The id of the section the item to select belongs to.
 * @returns {object}
 *          Action object
 */
exports.selectItem = function (id, sectionId) {
    return {
        type: exports.Types.NAV_BAR_SELECT_ITEM,
        id: id,
        sectionId: sectionId
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

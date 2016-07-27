var keyMirror = require("fbjs/lib/keyMirror");

/**
* @enum {string}
* @alias Actions.Types
* @memberof HeaderBar
* @desc An enum of HeaderBar action types.
*/
exports.Types = keyMirror({
    HEADER_TOGGLE_ITEM: null,
    HEADER_INIT: null
});

/**
* @alias Actions.init
* @memberof HeaderBar
* @desc Initialize the HeaderBar store's state with the tree data structure of menus.
*
* @param {HeaderBar~navigationLink[]} tree
*    The data structure of menus to initialize the HeaderBar with.
*
* @return {object}
*    The action.
*/
exports.init = function (tree) {
    return {
        type: exports.Types.HEADER_INIT,
        tree: tree
    };
};

/**
* @alias Actions.toggleItem
* @memberof HeaderBar
* @desc Toggle the item with id.
*
* @param {string} id
*    The id of the item to toggle.
*
* @return {object}
*    The action.
*/
exports.toggleItem = function (id) {
    return {
        type: exports.Types.HEADER_TOGGLE_ITEM,
        id: id
    };
};

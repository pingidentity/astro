var keyMirror = require("fbjs/lib/keyMirror");

/**
* @enum {string}
* @alias Actions.Types
* @memberof HeaderBar
* @desc An enum of HeaderBar action types.
*/
exports.Types = keyMirror({
    HEADER_TOGGLE_ITEM: null,
    HEADER_INIT: null,
    HEADER_SET_ENVIRONMENT: null,
    HEADER_SET_NAV: null,
    HEADER_SET_MARKET: null,
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

/**
* @alias Actions.setEnvironment
* @memberof HeaderBar
* @desc Set the value for the current environment
*
* @param {string} environment
*    The environment value.
*
* @return {object}
*    The action.
*/
exports.setEnvironment = function (environment) {
    return {
        type: exports.Types.HEADER_SET_ENVIRONMENT,
        environment: environment
    };
};

/**
* @alias Actions.setNav
* @memberof HeaderBar
* @desc Set the value for the current nav
*
* @param {string} currentNav
*    The currentNav value.
*
* @return {object}
*    The action.
*/
exports.setNav = function (currentNav) {
    return {
        type: exports.Types.HEADER_SET_NAV,
        currentNav: currentNav
    };
};

/**
* @alias Actions.setMarket
* @memberof HeaderBar
* @desc Set the value for the current market
*
* @param {string} market
*    The market value.
*
* @return {object}
*    The action.
*/
exports.setMarket = function (market) {
    return {
        type: exports.Types.HEADER_SET_MARKET,
        market: market
    };
};

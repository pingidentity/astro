var keyMirror = require("fbjs/lib/keyMirror");

/**
* @enum {string}
* @alias Actions.Types
* @memberof IntroTutorial
* @desc An enum of IntroTutorial action types.
*/
exports.Types = keyMirror({
    HELP_DISMISS: null,
    HELP_NEXT: null,
    HELP_PREV: null,
    HELP_SHOW: null
});

/**
* @alias Actions.next
* @memberof IntroTutorial
* @desc Proceed to the next step of the tutorial.
*
* @return {object}
*    The action.
*/
exports.next = function () {
    return {
        type: exports.Types.HELP_NEXT
    };
};

/**
* @alias Actions.prev
* @memberof IntroTutorial
* @desc Go back to the previous step of the tutorial.
*
* @return {object}
*    The action.
*/
exports.prev = function () {
    return {
        type: exports.Types.HELP_PREV
    };
};

/**
* @alias Actions.dismiss
* @memberof IntroTutorial
* @desc Dismiss the tutorial.
*
* @return {object}
*    The action.
*/
exports.dismiss = function () {
    return {
        type: exports.Types.HELP_DISMISS
    };
};

/**
* @alias Actions.show
* @memberof IntroTutorial
* @desc Show the tutorial.
*
* @return {object}
*    The action.
*/
exports.show = function () {
    return {
        type: exports.Types.HELP_SHOW
    };
};

/*eslint-disable valid-jsdoc*/

/**
* @module util/KeyboardUtils
* @desc A set of keyboard util functions.
*/


/**
 * @enum {number}
 * @alias module:util/KeyboardUtils.KeyCodes
 * @desc An enum of keyboard key codes.
 */
exports.KeyCodes = {
    TAB: 9,
    ESC: 27,
    ENTER: 13,
    LEFT_SHIFT: 16,
    LEFT_CTRL: 17,
    LEFT_ALT: 18,
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    LEFT_CMD: 91,
    RIGHT_CMD: 92,
    RIGHT_ALT: 93,
    SPACE: 32,
};

/**
 * @alias module:util/KeyboardUtils.ModifierCodes
 * @desc An array of keyboard modifier key codes.
 */
exports.ModifierCodes = [
    exports.KeyCodes.LEFT_SHIFT,
    exports.KeyCodes.LEFT_CTRL,
    exports.KeyCodes.LEFT_ALT,
    exports.KeyCodes.LEFT_CMD,
    exports.KeyCodes.RIGHT_CMD,
    exports.KeyCodes.RIGHT_ALT
];

var compare = function (code, expected) {
    return code === expected;
};

//generate checker functions for each item in the KeyCodes map in the form of is<Key>(code)
for (var k in exports.KeyCodes) {
    var name = k.substr(0, 1) + k.substr(1).toLowerCase().replace(/_./g, function (match) {
        return match.substr(1).toUpperCase();
    });
    //see below for JSDocs for all these functions
    exports["is" + name] = compare.bind(null, exports.KeyCodes[k]);
}

/**
* @alias module:util/KeyboardUtils.isModifier
* @desc Checks whether code is a keyboard modifier key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard modifier key code.
*/
exports.isModifier = function (code) {
    return exports.ModifierCodes.indexOf(code) !== -1;
};

/**
* @alias module:util/KeyboardUtils.isArrowKey
* @desc Checks whether code is a keyboard arrow (up/down/left/right) key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard arrow (up/down/left/right) key code.
*/
exports.isArrowKey = function (code) {
    return exports.isArrowUp(code) || exports.isArrowDown(code) ||
        exports.isArrowLeft(code) || exports.isArrowRight(code);
};


/**
* @function module:util/KeyboardUtils.isTag
* @desc Checks whether code is a keyboard modifier tag key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard tag key code.
*/

/**
* @function module:util/KeyboardUtils.isEsc
* @desc Checks whether code is a keyboard modifier esc key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard esc key code.
*/

/**
* @function module:util/KeyboardUtils.isEnter
* @desc Checks whether code is a keyboard modifier enter key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard enter key code.
*/

/**
* @function module:util/KeyboardUtils.isLeftShift
* @desc Checks whether code is a keyboard modifier left shift key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard left shift key code.
*/

/**
* @function module:util/KeyboardUtils.isLeftCtrl
* @desc Checks whether code is a keyboard modifier left ctrl key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard left ctrl key code.
*/

/**
* @function module:util/KeyboardUtils.isLeftAlt
* @desc Checks whether code is a keyboard modifier left alt key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard left alt key code.
*/

/**
* @function module:util/KeyboardUtils.isArrowLeft
* @desc Checks whether code is a keyboard modifier left arrow key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard left arrow key code.
*/

/**
* @function module:util/KeyboardUtils.isArrowUp
* @desc Checks whether code is a keyboard modifier up arrow key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard up arrow key code.
*/

/**
* @function module:util/KeyboardUtils.isArrowRight
* @desc Checks whether code is a keyboard modifier right arrow key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard right arrow key code.
*/

/**
* @function module:util/KeyboardUtils.isArrowDown
* @desc Checks whether code is a keyboard modifier down arrow key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard down arrow key code.
*/

/**
* @function module:util/KeyboardUtils.isLeftCmd
* @desc Checks whether code is a keyboard modifier left cmd key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard left cmd key code.
*/

/**
* @function module:util/KeyboardUtils.isRightCmd
* @desc Checks whether code is a keyboard modifier right cmd key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard right cmd key code.
*/

/**
* @function module:util/KeyboardUtils.isRightAlt
* @desc Checks whether code is a keyboard modifier right alt key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard right alt key code.
*/

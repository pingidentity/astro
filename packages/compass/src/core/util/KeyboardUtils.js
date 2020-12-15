import React, { Component } from 'react';



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
export const KeyCodes = {
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
    BACK_SPACE: 8,
    COMMA: 188,
};

/**
 * @alias module:util/KeyboardUtils.ModifierCodes
 * @desc An array of keyboard modifier key codes.
 */
export const ModifierCodes = [
    KeyCodes.LEFT_SHIFT,
    KeyCodes.LEFT_CTRL,
    KeyCodes.LEFT_ALT,
    KeyCodes.LEFT_CMD,
    KeyCodes.RIGHT_CMD,
    KeyCodes.RIGHT_ALT
];



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
export const isModifier = function (code) {
    return ModifierCodes.indexOf(code) !== -1;
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
export const isArrowKey = function (code) {
    return isArrowUp(code) || isArrowDown(code) ||
        isArrowLeft(code) || isArrowRight(code);
};

var compare = function (code, expected) {
    return code === expected;
};

// //generate checker functions for each item in the KeyCodes map in the form of is<Key>(code)
// for (var k in exports.KeyCodes) {
//     var name = k.substr(0, 1) + k.substr(1).toLowerCase().replace(/_./g, function (match) {
//         return match.substr(1).toUpperCase();
//     });
//     //see below for JSDocs for all these functions
//     name =
//     export const eval("is" + name) = compare.bind(null, KeyCodes[k]);
// }

export const isKey = Object.keys(KeyCodes).reduce((obj, key) => {
        var name = key.substr(0, 1) + key.substr(1).toLowerCase().replace(/_./g, function (match) {
            return match.substr(1).toUpperCase();
        });
        return (
            {...obj, [`is${name}`]: compare.bind(null, KeyCodes[key])}
        );
        }, {});


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

// Trying to get global event listeners to actually fire in Jest is really, really complicated.
/* istanbul ignore next  */
export const addFocusClass = ({ keyCode }) => {
    if (keyCode === 9) {
        document.body.classList.add("ui-library-focus-visible");
    }
};

/* istanbul ignore next  */
export const removeFocusClass = () => document.body.classList.remove("ui-library-focus-visible");

/**
* @function module:util/KeyboardUtils.withFocusOutline
* @desc
*    A higher order component that sets up a component to show focus outlines when tab
*       is pressed and removes them when the mouse is used.
*
* @return {function}
*    The component, but now with lifecycle methods to add global listeners for adding and
*    removing focus class.
*/
export const withFocusOutline = WrappedComponent => class extends Component {
    componentDidMount() {
        const componentCount = parseInt(document.body.dataset.uiLibComponentCount || 0, 10);
        if (componentCount > 0) {
            document.body.dataset.uiLibComponentCount = componentCount + 1;
        } else {
            document.body.dataset.uiLibComponentCount = 1;
            document.addEventListener("keydown", addFocusClass);
            document.addEventListener("mousedown", removeFocusClass);
        }
    }

    componentWillUnmount() {
        const componentCount = parseInt(document.body.dataset.uiLibComponentCount || 0, 10);

        if (componentCount === 1) {
            document.body.dataset.uiLibComponentCount = 0;
            document.removeEventListener("keydown", addFocusClass);
            document.removeEventListener("mousedown", removeFocusClass);
            removeFocusClass();
        } else {
            document.body.dataset.uiLibComponentCount = componentCount - 1;
        }
    }

    render() {
        return <WrappedComponent {...this.props} />;
    }
};


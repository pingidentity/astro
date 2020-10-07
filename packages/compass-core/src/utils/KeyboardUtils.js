import { useEffect, useCallback } from 'react';

/**
* @module utils/KeyboardUtils
* @desc A set of keyboard util functions.
*/

/**
 * @enum {number}
 * @alias module:utils/KeyboardUtils.keyCodes
 * @desc An enum of keyboard key codes.
 */
export const keyCodes = {
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
 * @alias module:utils/KeyboardUtils.modifierCodes
 * @desc An array of keyboard modifier key codes.
 */
export const ModifierCodes = [
    keyCodes.LEFT_SHIFT,
    keyCodes.LEFT_CTRL,
    keyCodes.LEFT_ALT,
    keyCodes.LEFT_CMD,
    keyCodes.RIGHT_CMD,
    keyCodes.RIGHT_ALT,
];

/**
* @alias module:utils/KeyboardUtils.isModifier
* @desc Checks whether code is a keyboard modifier key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard modifier key code.
*/
export const isModifier = code => ModifierCodes.indexOf(code) !== -1;

const compare = (code, expected) => code === expected;

// //generate checker functions for each item in the KeyCodes map in the form of is<Key>(code)
// for (var k in exports.KeyCodes) {
//     var name = k.substr(0, 1) + k.substr(1).toLowerCase().replace(/_./g, function (match) {
//         return match.substr(1).toUpperCase();
//     });
//     //see below for JSDocs for all these functions
//     name =
//     export const eval("is" + name) = compare.bind(null, KeyCodes[k]);
// }

export const isKey = Object.keys(keyCodes).reduce((obj, key) => {
    const name = key.substr(0, 1) + key.substr(1).toLowerCase().replace(
        /_./g,
        match => match.substr(1).toUpperCase(),
    );
    return (
        { ...obj, [`is${name}`]: compare.bind(null, keyCodes[key]) }
    );
}, {});

/**
* @alias module:utils/KeyboardUtils.isArrowKey
* @desc Checks whether code is a keyboard arrow (up/down/left/right) key code.
*
* @param {number} code
*    The code to check.
*
* @return {boolean}
*    Whether or not the code is a keyboard arrow (up/down/left/right) key code.
*/
export const isArrowKey = code => (
    isKey.isArrowUp(code)
    || isKey.isArrowDown(code)
    || isKey.isArrowLeft(code)
    || isKey.isArrowRight(code)
);

/**
 * Triggers handler when body receives a keydown event from the escape key
 * or the escape key
 * @param {function} handler
 */
export const useEscapeKeyHandler = (handler) => {
    const onKeyDown = useCallback(({ keyCode }) => {
        if (keyCode === keyCodes.ESC) {
            handler();
        }
    }, [handler]);

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    });
};

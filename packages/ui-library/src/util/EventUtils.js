/*eslint-disable valid-jsdoc*/

//For some very odd reason linting picks up the "/**"  JSDoc definitions of the @alias with "/" as having a JSDoc syntax error. So we disable.

"use strict";

/**
 * @module util/EventUtils
 * @desc The module contains helper functions to deal with React/DOM events model.
 */

/**
 * @alias module:util/EventUtils.forwardTargetChecked
 * @desc Wapper which will extract the checked attribute of the target and pass that to the wrapped callback.  This
 *     helps in bridging the gap between what a callback expects and low level components which pass events.
 *
 * @param {function} callback
 *     The callback to execute
 * @returns {function}
 *     An annonymous function wrapping the callback
 */
exports.forwardTargetChecked = function (callback) {
    return function (e) {
        return callback(e.target.checked);
    };
};

/**
 * @alias module:util/EventUtils.forwardTargetValue
 * @desc Wrapper which will extract the value of the target and pass that to the wrapped callback.  This
 *     helps in bridging the gap between what a callback expects and low level components which pass events.
 *
 * @param {function} callback
 *     The callback to execute
 * @returns {function}
 *     An annonymous function wrapping the callback
 */
exports.forwardTargetValue = function (callback) {
    return function (e) {
        return callback(e.target.value);
    };
};

/**
 * @alias module:util/EventUtils.forwardTargetValueAsInt
 * @desc Wrapper which will extract the value of the target, coerce it to an int, and pass that to the wrapped callback.
 *     This helps in bridging the gap between what a callback expects and low level components which pass events.
 *
 * @param {function} callback
 *     The callback to execute
 * @returns {function}
 *     An annonymous function wrapping the callback
 */
exports.forwardTargetValueAsInt = function (callback) {
    return function (e) {
        return callback(parseInt(e.target.value, 10));
    };
};

/**
 * @alias module:util/EventUtils.callIfOutsideOfContainer
 * @desc Function which will execute the callback only if the passed event is outside of the specified container.
 *     This is useful when we want to hide a container when the user clicks outside of it (such a popover).
 *
 * @param {object} container
 *     The DOM container node
 * @param {function} callback
 *     The callback to execute
 * @param {event} e
 *     The event to examine
 * @returns {boolean}
 *     Whether or not the event was outside of the container.  True means the event was outside
 */
exports.callIfOutsideOfContainer = function (container, callback, e) {
    var node = e.target;

    while (node.parentNode) {
        if (node === container) {
            return false;
        }
        //if we've bubbled all the way up to the top of the dom and still havent matched the container then
        //click was outside
        if (node === document.body) {
            callback(e);
            return true;
        }
        node = node.parentNode;
    }

    //if the item that was clicked is detached from the dom, then it's unknown if it's was outside, so do nothing
    return false;
};

/**
 * @alias module:util/EventUtils.handleKeydowns
 * @desc Use this to function to create a keydown handler which handles keyCodes specified by the hashmap
 *
 * @param {object} map
 *     An object mapping keyCodes to callbacks
 * @param {boolean} killEvent
 *     If true, kill the event after executing the callback
 * @returns {function}
 *     The wrapper function
 */
exports.handleKeydowns = function (map, killEvent) {
    return function (e) {
        if (e.keyCode in map) {
            map[e.keyCode]();

            if (killEvent) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    };
};

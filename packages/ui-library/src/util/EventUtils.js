/**
 * @module util/EventUtils
 * @desc The module contains helper functions to deal with React/DOM events model.
 */


/** @function forwardTargetChecked
 * @desc Wapper which will extract the checked attribute of the target and pass that to the wrapped callback.  This
 * helps in bridging the gap between what a callback expects and low level components which pass events.
 * @param {function} callback - The callback to execute
 * @returns {function} an annonymous function wrapping the callback
 */
exports.forwardTargetChecked = function (callback) {
    return function (e) {
        return callback(e.target.checked);
    };
};

/** @function forwardTargetValue
 * @desc Wrapper which will extract the value of the target and pass that to the wrapped callback.  This
 * helps in bridging the gap between what a callback expects and low level components which pass events.
 * @param {function} callback - The callback to execute
 * @returns {function} an annonymous function wrapping the callback
 */
exports.forwardTargetValue = function (callback) {
    return function (e) {
        return callback(e.target.value);
    };
};

/** @function forwardTargetValueAsInt
 * @desc Wrapper which will extract the value of the target, coerce it to an int, and pass that to the wrapped callback.  This
 * helps in bridging the gap between what a callback expects and low level components which pass events.
 * @param {function} callback - The callback to execute
 * @returns {function} an annonymous function wrapping the callback
 */
exports.forwardTargetValueAsInt = function (callback) {
    return function (e) {
        return callback(parseInt(e.target.value, 10));
    };
};

/** @function eventOutsideOfContainer
 * @desc Function which will execute the callback only if the passed event is outside of the specified container.  This is
 * useful when we want to hide a container when the user clicks outside of it (such a popover).
 * @param {object} container - The DOM container node
 * @param {function} callback - The callback
 * @param {event} e - The event to examine
 * @returns {bool} Whether or not the event was outside of the container.  True means the event was outside
 */
exports.callIfOutsideOfContainer = function (container, callback, e) {
    var node = e.target;

    while (node.parentNode) {
        //if the item that was clicked is detached from the dom, then it's unknown if it's was outside, so do nothing
        if (node === container || node.parentNode === null) {
            return false;
        }
        if (node === window) {
            break;
        }
        node = node.parentNode;
    }

    callback(e);
    return true;
};

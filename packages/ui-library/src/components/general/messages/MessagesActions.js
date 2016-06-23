var keyMirror = require("fbjs/lib/keyMirror"),
    Constants = require("./MessagesConstants.js");

/*
 * This is a private incrementing variable used to give each message object a unique id.  It's only
 * exposed to allow unit tests to reset it.
 */
exports.lastId = 0;

exports.Types = keyMirror({
    ADD_MESSAGE: null,
    REMOVE_MESSAGE: null,
    REMOVE_AT: null,
    SHIFT_MESSAGE: null
});

/**
 * @function shiftMessage
 * @desc remove the first message from messages array
 * @param {string} [containerId=messages] - The grouping of the message
 * @returns {object} the action
 */
exports.shiftMessage = function (containerId) {
    return {
        type: exports.Types.SHIFT_MESSAGE,
        containerId: containerId || "messages"
    };
};

exports.pushMessage = function (containerId, text, status, timer, index) {
    return {
        type: exports.Types.ADD_MESSAGE,
        text: text,
        status: status || Constants.MessageTypes.SUCCESS,
        timer: timer,
        containerId: containerId,
        index: index
    };
};

/**
 * @function addMessage
 * @desc Originally the messages component was designed to be a singleton, so the reducer/actions assumed there
 * would only ever be one array of messages.  Since this is no longer the case, all actions now allow specifying
 * a containerId.  To remain backwards compatible however, the actions will determine if the first argument is a
 * containerId and behave one way, otherwise, they will set the containerId to "messages" which will preserve the
 * legacy behavior.
 * @param {string} [containerId=messages] - The grouping of the message
 * @param {string} message - The body of the message
 * @param {Messages.MessageTypes} status - The type of message
 * @param {number} removeAfterMs - The timeout before the message will be auto removed
 * @returns {function} thunk action
 */
exports.addMessage = function (containerId, message, status, removeAfterMs) {
    if ((arguments.length === 1) ||
        (arguments.length === 2 && Constants.MessageTypeValues.indexOf(message) > -1) ||
        (arguments.length === 3 && typeof(status) === "number"))
    {
        removeAfterMs = arguments[2];
        status = arguments[1];
        message = arguments[0];
        containerId = "messages";
    }

    removeAfterMs = typeof(removeAfterMs) === "undefined" ? 5000 : removeAfterMs;

    return function (dispatch) {
        var timer;
        var messageId = exports.lastId += 1;

        if (removeAfterMs > 0) {
            timer = window.setTimeout(function (cid, mid) {
                dispatch(exports.removeMessage(cid, mid));
            }.bind(null, containerId, messageId), removeAfterMs);
        }

        dispatch(exports.pushMessage(containerId, message, status, timer, messageId));
    };
};

/**
 * @function removeAt
 * @desc remove the message at the give index
 * @param {string} containerId - If the first parameter is a number, containerId will be set to "messages" for
 * backwards compatibility.
 * @param {number} index - The index of the message to remove
 * @returns {object} the action
 */
exports.removeAt = function (containerId, index) {
    //preserve backwards compatibility if the action creator is called without a containerId
    if (arguments.length === 1) {
        index = containerId;
        containerId = "messages";
    }

    return {
        type: exports.Types.REMOVE_AT,
        index: index,
        containerId: containerId
    };
};

/**
 * @function removeMessage
 * @desc remove the message with the given id.  This is called by the scheduled job to remove the
 * message.  Since the index of Message may change between the time it mounts and this is called, we
 * need some way to remove a specific id.
 * @param {string} [containerId=messages] - The grouping of the message
 * @param {number} messageId - The id of the message to remove
 * @returns {object} the action
 */
exports.removeMessage = function (containerId, messageId) {
    //preserve backwards compatibility if the action creator is called without a containerId
    if (arguments.length === 1) {
        messageId = containerId;
        containerId = "messages";
    }

    return {
        type: exports.Types.REMOVE_MESSAGE,
        containerId: containerId,
        messageId: messageId
    };
};

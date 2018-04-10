var keyMirror = require("fbjs/lib/keyMirror"),
    Constants = require("./MessagesConstants.js");

/*
 * This is a private incrementing variable used to give each message object a unique id.  It's only
 * exposed to allow unit tests to reset it.
 */
exports.lastId = 0;

/**
* @enum {string}
* @alias Actions.Types
* @memberof Messages
* @desc An enum of Messages action types.
*/
exports.Types = keyMirror({
    ADD_MESSAGE: null,
    REMOVE_MESSAGE: null,
    REMOVE_AT: null,
    SHIFT_MESSAGE: null
});

/**
 * @alias Actions.shiftMessage
 * @memberof Messages
 * @desc remove the first message from messages array
 * @param {string} [containerId="messages"]
 *     The grouping of the message
 * @returns {object}
 *     The action
 */
exports.shiftMessage = function (containerId) {
    return {
        type: exports.Types.SHIFT_MESSAGE,
        containerId: containerId || "messages"
    };
};

exports.pushMessage = function (containerId, text, status, timer, index, isHtml) {
    return {
        type: exports.Types.ADD_MESSAGE,
        text: text,
        status: status || Constants.MessageTypes.SUCCESS,
        timer: timer,
        containerId: containerId,
        index: index,
        isHtml
    };
};

/**
 * @alias Actions.addMessage
 * @memberof Messages
 * @desc Originally the messages component was designed to be a singleton, so the reducer/actions assumed there
 *     would only ever be one array of messages.  Since this is no longer the case, all actions now allow specifying
 *     a containerId.  To remain backwards compatible however, the actions will determine if the first argument is a
 *     containerId and behave one way, otherwise, they will set the containerId to "messages" which will preserve the
 *     legacy behavior.
 * @param {string} [containerId="messages"]
 *     The grouping of the message
 * @param {string} message
 *     The body of the message
 * @param {Messages.MessageTypes} [status]
 *     The type of message
 * @param {number} [removeAfterMs]
 *     The timeout before the message will be auto removed
 * @param {object} [options]
 *     If you pass an object as the only argument, you can set the other arguments
 *     as named properties. You can also use this to set the isHtml flag to true
 *     so you can use HTML in your message.
 * @returns {function}
 *     The action
 */
exports.addMessage = function (containerId, message, status, removeAfterMs) {
    let isHtml;

    if ((arguments.length === 1 && typeof(containerId) !== "object") ||
        (arguments.length === 2 && Constants.MessageTypeValues.indexOf(message) > -1) ||
        (arguments.length === 3 && typeof(status) === "number"))
    {
        removeAfterMs = arguments[2];
        status = arguments[1];
        message = arguments[0];
        containerId = "messages";
    } else if (arguments.length === 1) {
        containerId = arguments[0].containerId || "messages";
        message = arguments[0].message;
        status = arguments[0].status;
        removeAfterMs = arguments[0].removeAfterMs;
        isHtml = arguments[0].isHtml;
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

        dispatch(exports.pushMessage(containerId, message, status, timer, messageId, isHtml));
    };
};

/**
 * @alias Actions.removeAt
 * @memberof Messages
 * @desc remove the message at the give index
 * @param {string} [containerId="messages"]
 *     If the first parameter is a number, containerId will be set to "messages" for backwards compatibility.
 * @param {number} index
 *     The index of the message to remove
 * @returns {object}
 *     The action
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
 * @alias Actions.removeMessage
 * @memberof Messages
 * @desc remove the message with the given id.  This is called by the scheduled job to remove the
 *     message.  Since the index of Message may change between the time it mounts and this is called, we
 *     need some way to remove a specific id.
 * @param {string} [containerId="messages"]
 *     The grouping of the message
 * @param {number} messageId
 *     The id of the message to remove
 * @returns {object}
 *     The action
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

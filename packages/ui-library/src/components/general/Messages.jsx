"use strict";

var React = require("react"),
    keyMirror = require("react/lib/keyMirror"),
    _ = require("underscore");

/**
 * @class Messages
 *
 * @desc
 *
 * Messages component.
 *
 * Renders a list of supplied message strings and allows for messages
 * to be removed by invoking a callback.
 *
 * @param {object[]} messages List of messages to render.
 * @param {string} [id] If specified, then the id of the rendered
*   parent div will be set to this id.
 * @param {string} [data-id] If specified then the
 *  data-id of the rendered parent div will be set to this id.
 * @param {function} [removeMessage] Function to call to remove a
 *  message from the messages list.
 * @param {function} [i18n] Function to handle internationalization of
 *  message keys to message text.
 * @param {number} [defaultMessageTimeout] Default message timeout in ms.
 *  Messages will remove themselves after this time, unless the message
 *  specifically overrides the default timeout itself.
 *
 * @example
 * Usage:
 *   <Messages messages={messages} data-id="page-messages" removeMessage={this._removeMessage} />
 *
 */

var Message;

var Messages = React.createClass({

    propTypes: {
        messages: React.PropTypes.array,
        id: React.PropTypes.string,
        "data-id": React.PropTypes.string,
        removeMessage: React.PropTypes.func,
        i18n: React.PropTypes.func,
        defaultMessageTimeout: React.PropTypes.number
    },
    
    getDefaultProps: function () {
        return {
            removeMessage: null,
            messages: [],
            i18n: function (key) { return key; }
        };
    },

    render: function () {

        var renderedMessages = [];
        var messages = this.props.messages;
        var length = messages.length;

        for (var i = 0; i < length; i += 1) {
            renderedMessages.push(
                <Message
                    message={messages[i]}
                    key={i}
                    index={i}
                    removeMessage={this.props.removeMessage}
                    i18n={this.props.i18n}
                    defaultTimeout={this.props.defaultMessageTimeout} />
            );
        }

        return (
            <div id={this.props.id} data-id={this.props["data-id"]}>
                {renderedMessages}
            </div>
        );
    }
});

/*
 * Message sub-component to render an individual
 * message and handle its closing (and removal
 * from the store).
 *
 */
Message = React.createClass({

    /*
     * Close the message by calling the removeMessage
     * callback if it exists.
     *
     */
    _close: function () {
        if (this.props.removeMessage) {
            this.props.removeMessage(this.props.index);
        }
    },

    componentDidMount: function () {
        // Close after configured time interval
        // Interval of 0 (or undefined) will result in no automatic message clearing (which is intended).
        var interval = (this.props.message.duration) ? this.props.message.duration : this.props.defaultTimeout;
        
        if (interval) {
            this.interval = global.setInterval(this._close, interval);
        }
    },

    componentWillUnmount: function () {
        if (this.interval) {
            // clear the timer before unmounting the component
            global.clearInterval(this.interval);
        }
    },

    render: function () {
        var text = this.props.message.text || this.props.i18n(this.props.message.key, this.props.message.params);
        var classes = this.props.message.type +
                " " +
                this.props.message.type +
                "-" +
                this.props.index +
                " message show";

        // Allow html messages to be rendered, this is dangerous
        // as it could allow XSS, so messages have to be explicitly
        // flagged as being html.
        if (this.props.message.isHtml) {
            text = <span dangerouslySetInnerHTML={{ __html: text }} /> ;
        }
        
        return (
            <div className={classes}>
                <div className="text">
                    {text}<a className="close" onClick={this._close}></a>
                </div>
            </div>
        );
    }

});


/** Actions **/
Messages.Actions = {};
var initialState = { messages: [] };

/** Internal auto-incremented id.  This should only be used by message expiry mechanism (since index wont be reliable) */
Messages.id = 0;

/** @enum {string}
 * @desc Enum for the different types of Messages */
Messages.MessageTypes = {
    SUCCESS: "success",
    NOTICE: "notice",
    WARNING: "warning",
    FEATURE: "feature"
};

/** @enum {string}
 * @desc Action types
 * @private */
Messages.Actions.Types = keyMirror({
    ADD_MESSAGE: null,
    REMOVE_MESSAGE: null,
    REMOVE_AT: null,
    SHIFT_MESSAGE: null
});

/** @function Messages.Actions.shiftMessage
 * @desc Action creator to remove the first (oldest) item in the message list
 * @returns {object} action */
Messages.Actions.shiftMessage = function () {
    return {
        type: Messages.Actions.Types.SHIFT_MESSAGE
    };
};

/** @function Messages.Actions.addMessage
 * @param {string|object} message - Generally this will be a string but it is possible to pass a react component instance
 * @param {Messages.MessageTypes} [status="success"] - The type of Message to add
 * @param {number} [removeAfterMs=5000] - Auto-expire duration
 * @desc Add a message to the Messages store
 * @returns {object} action */
Messages.Actions.addMessage = function (message, status, removeAfterMs) {
    removeAfterMs = typeof(removeAfterMs) === "undefined" ? 5000 : removeAfterMs;
    Messages.id += 1;

    var payload = {
        type: Messages.Actions.Types.ADD_MESSAGE,
        message: message,
        status: status,
        id: Messages.id
    };

    return function (dispatch) {
        if (removeAfterMs > 0) {
            payload.timer = setTimeout(function (id) {
                dispatch(Messages.Actions.removeMessage(id));
            }.bind(null, Messages.id), removeAfterMs);
        }

        dispatch(payload);
    };
};

/** @function Messages.Actions.removeAt
 * @param {number} index - The index number of the message to remove
 * @returns {object} action */
Messages.Actions.removeAt = function (index) {
    return {
        type: Messages.Actions.Types.REMOVE_AT,
        index: index
    };
};

/** @function Messages.Actions.removeMessage
 * @param {number} id - The id of the message to remove (only used internally)
 * @returns {object} action */
Messages.Actions.removeMessage = function (id) {
    return {
        type: Messages.Actions.Types.REMOVE_MESSAGE,
        id: id
    };
};

/** @function Messages.Reducer
 * @param {object} state - start state
 * @param {object} action - action
 * @returns {object} nextState*/
Messages.Reducer = function (state, action) {
    var nextState = _.clone(state);

    switch (action.type) {
        case Messages.Actions.Types.ADD_MESSAGE:
            nextState.messages = _.clone(state.messages);
            nextState.messages.push({
                text: action.message,
                type: action.status || Messages.MessageTypes.SUCCESS,
                index: action.id,
                timer: action.timer
            });
            break;
        case Messages.Actions.Types.REMOVE_MESSAGE:
            var index = _.findIndex(nextState.messages, function (item) {
                return item.index === action.id;
            });
            if (index > -1) {
                clearTimeout(nextState.messages[index].timer);
                nextState.messages = _.clone(state.messages);
                nextState.messages.splice(index, 1);
            }
            break;
        case Messages.Actions.Types.REMOVE_AT:
            if (nextState.messages.length > action.index) {
                clearTimeout(nextState.messages[action.index].timer);
                nextState.messages = _.clone(state.messages);
                nextState.messages.splice(action.index, 1);
            }
            break;
        case Messages.Actions.Types.SHIFT_MESSAGE:
            if (nextState.messages.length > 0) {
                nextState.messages = _.clone(state.messages);
                clearTimeout(nextState.messages[0].timer);
                nextState.messages.shift();
            }
            break;
        default:
            return state || initialState;
    }

    return nextState;
};

module.exports = Messages;

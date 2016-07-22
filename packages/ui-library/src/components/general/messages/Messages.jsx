"use strict";

var React = require("react"),
    classnames = require("classnames"),
    Utils = require("../../../util/Utils");

/**
 * @callback Messages~onRemoveMessage
 * @param {string} [containerId]
 *     The container id
 * @param {number} messageIndex
 *     Message index to remove
 */

/**
 * @callback Messages~onI18n
 * @param {string} key
 *     I18n message key
 * @param {object} [params]
 *     Params for i18n message
 * @returns {string}
 *     Result of i18n given message key
 */

/**
 * @deprecated
 * @callback Messages~removeMessage
 * @param {string} [containerId]
 *     The container id
 * @param {number} messageIndex
 *     Message index to remove
 */

/**
 * @deprecated
 * @callback Messages~i18n
 * @param {string} key
 *     I18n message key
 * @param {object} [params]
 *     Params for i18n message
 * @returns {string}
 *     Result of i18n given message key
 */

/**
 * @typedef Messages~MessageItem
 * @property {string} text
 *     Message text
 * @property {Messages.MessageTypes} type
 *     Message type
 * @property {number} timer
 *     Number of milli seconds after which message should be removed
 * @property {number} index
 *     Message index.
 */

/**
 * @class Messages
 * @desc Messages component. Renders a list of supplied message strings and allows for messages
 * to be removed by invoking a callback.
 *
 * @param {string} [data-id="messages"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [id]
 *     DEPRECATED. Use "data-id" instead. To define the base "data-id" value for top-level HTML container.
 * @param {Messages.ContainerTypes} [containerType]
 *     Enum which specifies the container type. Do not set for messages that should only fill the content area to the
 *     right of a left-nav. FULL takes the width of the entire window. MODAL is used for Messages within modals.
 *
 * @param {Messages~MessageItem[]} [messages]
 *     List of messages to render.
 * @param {Messages~onRemoveMessage} [onRemoveMessage]
 *     Callback to be triggered when a message is removed.
 * @param {Messages~removeMessage} [removeMessage]
 *     DEPRECATED. Use onRemoveMessage instead. Callback to be triggered when a message is removed.
 * @param {Messages~onI18n} [onI18n]
 *     Callback to be triggered for internationalization of message keys to message text.
 * @param {Messages~i18n} [i18n]
 *     DEPRECATED. Use onI18n instead. Callback to be triggered for internationalization of message keys
 *     to message text.
 * @param {number} [defaultMessageTimeout]
 *     Default message timeout in ms. Messages will remove themselves after this time, unless the message specifically
 *     overrides the default timeout itself.
 *
 * @example
 * Usage:
 *     <Messages messages={messages}
 *      data-id="page-messages"
 *      onRemoveMessage={this._handleRemoveMessage} />
 *
 */

module.exports = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,
        containerType: React.PropTypes.oneOf(["full"]),
        messages: React.PropTypes.array,
        onRemoveMessage: React.PropTypes.func,
        removeMessage: React.PropTypes.func,
        onI18n: React.PropTypes.func,
        i18n: React.PropTypes.func,
        defaultMessageTimeout: React.PropTypes.number
    },

    getDefaultProps: function () {
        return {
            "data-id": "messages",
            onRemoveMessage: null,
            onI18n: function (key) { return key; }
        };
    },

    componentWillMount: function () {
        if (this.props.id) {
            console.warn(Utils.deprecateMessage("id", "data-id"));
        }
        if (this.props.removeMessage) {
            console.warn(Utils.deprecateMessage("removeMessage", "onRemoveMessage"));
        }
        if (this.props.i18n) {
            console.warn(Utils.deprecateMessage("i18n", "onI18n"));
        }
    },

    render: function () {
        var className = classnames("page-messages", this.props.containerType );
        var dataId = this.props.id || this.props["data-id"];
        var onRemoveMsg = this.props.removeMessage || this.props.onRemoveMessage;
        var onI18n = this.props.i18n || this.props.onI18n;

        return (
            <div data-id={dataId} className={className}>
            {
                this.props.messages && this.props.messages.map(function (item, i) {
                    return (
                        <Message key={i} index={i} message={item}
                            onI18n={onI18n}
                            onRemoveMessage={onRemoveMsg}
                            defaultTimeout={this.props.defaultMessageTimeout} />);
                }.bind(this))
            }
            </div>
        );
    }
});

/*
 * @class Message
 * @desc Message sub-component to render an individual message and handle its closing (and removal from the store).
 *
 */
var Message = React.createClass({

    /*
     * Remove the message by calling the removeMessage callback if it exists.
     */
    _handleRemove: function () {
        if (this.props.onRemoveMessage) {
            this.props.onRemoveMessage(this.props.index);
        }
    },

    componentDidMount: function () {
        // Close after configured time interval
        // Interval of 0 (or undefined) will result in no automatic message clearing (which is intended).
        var interval = (this.props.message.duration) ? this.props.message.duration : this.props.defaultTimeout;

        if (interval) {
            this.interval = global.setInterval(this._handleClose, interval);
        }
    },

    componentWillUnmount: function () {
        if (this.interval) {
            // clear the timer before unmounting the component
            global.clearInterval(this.interval);
        }
    },

    render: function () {
        var text = this.props.message.text || this.props.onI18n(this.props.message.key, this.props.message.params);
        var classes = classnames("message show", this.props.message.type);

        // Allow html messages to be rendered, this is dangerous
        // as it could allow XSS, so messages have to be explicitly
        // flagged as being html.
        if (this.props.message.isHtml) {
            text = <span dangerouslySetInnerHTML={{ __html: text }} /> ;
        }

        return (
            <div className={classes}>
                {text}<a className="close" onClick={this._handleRemove}></a>
            </div>
        );
    }

});

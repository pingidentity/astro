"use strict";

var React = require("react"),
    classnames = require("classnames");

/**
 * @callback Messages~removeCallback
 * @param {string} [containerId] - The containerId
 * @param {number} msgIndex - message index to remove
 */

/**
 * @callback Messages~i18nCallback
 * @param {string} key - i18n message key
 * @param {object} params - params for i18n message
 * @returns {string} result of i18n given message key
 */

/**
 * @typedef {{text: string, type: Messages.MessageTypes, timer: number, index: number}} MessageItem
 */

/**
 * @class Messages
 *
 * @desc Messages component. Renders a list of supplied message strings and allows for messages
 * to be removed by invoking a callback.
 *
 * @param {MessageItem[]} messages List of messages to render.
 * @param {string} [data-id] If specified then the
 *  data-id of the rendered parent div will be set to this id.
 * @param {Messages~removeCallback} [removeMessage] - Callback triggered to remove a message
 * @param {Messages~i18nCallback} [i18n] callback to be called for internationalization of
 *  message keys to message text.
 * @param {Messages.ContainerTypes} [containerType] Optional enum which specifies the container type.
 *      Do not set for messages that should only fill the content area to the right of a left-nav.
 *      FULL takes the width of the entire window. MODAL is used for Messages within modals.
 * @param {number} [defaultMessageTimeout] Default message timeout in ms.
 *  Messages will remove themselves after this time, unless the message
 *  specifically overrides the default timeout itself.
 *
 * @example
 * Usage:
 *   <Messages messages={messages}
 *      data-id="page-messages"
 *      removeMessage={this._removeMessage} />
 *
 */

module.exports = React.createClass({
    propTypes: {
        messages: React.PropTypes.array,
        id: React.PropTypes.string,
        "data-id": React.PropTypes.string,
        containerType: React.PropTypes.oneOf(["full", "in-modal"]),
        removeMessage: React.PropTypes.func,
        i18n: React.PropTypes.func,
        defaultMessageTimeout: React.PropTypes.number
    },

    getDefaultProps: function () {
        return {
            removeMessage: null,
            i18n: function (key) { return key; }
        };
    },

    componentWillMount: function () {
        if (this.props.id) {
            console.warn("Deprecated: Support for id will be removed in next version");
        }
    },

    render: function () {
        var className = classnames("page-messages", this.props.containerType );

        return (
            <div data-id={this.props["data-id"]} className={className}>
            {
                this.props.messages && this.props.messages.map(function (item, i) {
                    return (
                        <Message key={i} index={i} message={item}
                            i18n={this.props.i18n}
                            removeMessage={this.props.removeMessage}
                            defaultTimeout={this.props.defaultMessageTimeout} />);
                }.bind(this))
            }
            </div>
        );
    }
});

/**
 *
 * @class Message
 * @private
 * @desc
 * Message sub-component to render an individual
 * message and handle its closing (and removal
 * from the store).
 *
 */
var Message = React.createClass({

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
        var classes = classnames("message show", this.props.message.type);

        // Allow html messages to be rendered, this is dangerous
        // as it could allow XSS, so messages have to be explicitly
        // flagged as being html.
        if (this.props.message.isHtml) {
            text = <span dangerouslySetInnerHTML={{ __html: text }} /> ;
        }

        return (
            <div className={classes}>
                {text}<a className="close" onClick={this._close}></a>
            </div>
        );
    }

});

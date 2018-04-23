"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    classnames = require("classnames"),
    Utils = require("../../../util/Utils");

/**
 * @callback Messages~onRemoveMessage
 * @param {string} [containerId]
 *     The container id
 * @param {number|string} messageIndex
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
 * @typedef Messages~MessageItem
 * @property {string} text
 *     Message text
 * @property {Messages.MessageTypes} type
 *     Message type
 * @property {number} timer
 *     Number of milli seconds after which message should be removed
 * @property {number|string} index
 *     Message index.
 * @property {boolean} isHtml
 *     When true, renders HTML without escaping.
 * @property {Messages~ProgressSpec}
 *     Object containing data to show a progress bar in the message.
 * @property {boolean} minimized
 *     When true, the message is shown in a minimized form, which hides
 *     everything but the progress.
 */

/**
 * @typedef Messages~ProgressSpec
 * @property {string} text
 *      If set, provides the text for the message next to the progress bar.
 * @property {function} textTemplate
 *      If text isn't set and this is, this function accepts a single argument
 *      of the current progress percentage and returns the text that should be
 *      shown next to the progress bar.
 * @property {number} percent
 *      The current value 0-100 of the progress bar.

/**
 * @class Messages
 * @desc Messages component. Renders a list of supplied message strings and allows for messages
 * to be removed by invoking a callback.
 *
 * @param {string} [data-id="messages"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {Messages.ContainerTypes} [containerType]
 *     Enum which specifies the container type. Do not set for messages that should only fill the content area to the
 *     right of a left-nav. FULL takes the width of the entire window. MODAL is used for Messages within modals.
 *
 * @param {Messages~MessageItem[]} [messages]
 *     List of messages to render.
 * @param {Messages~onRemoveMessage} [onRemoveMessage]
 *     Callback to be triggered when a message is removed.
 * @param {Messages~onI18n} [onI18n]
 *     Callback to be triggered for internationalization of message keys to message text.
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

module.exports = class extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        containerType: PropTypes.oneOf(["full"]),
        messages: PropTypes.array,
        onRemoveMessage: PropTypes.func,
        removeMessage: PropTypes.func,
        onI18n: PropTypes.func,
        i18n: PropTypes.func,
        defaultMessageTimeout: PropTypes.number
    };

    static defaultProps = {
        "data-id": "messages",
        onRemoveMessage: null,
        onI18n: function (key) { return key; }
    };

    componentWillMount() {
        if (!Utils.isProduction()) {
            if (this.props.id) {
                throw new Error(Utils.deprecatePropError("id", "data-id"));
            }
            if (this.props.removeMessage) {
                throw new Error(Utils.deprecatePropError("removeMessage", "onRemoveMessage"));
            }
            if (this.props.i18n) {
                throw new Error(Utils.deprecatePropError("i18n", "onI18n"));
            }
        }
    }

    render() {
        var className = classnames("page-messages", this.props.containerType );

        return (
            <div data-id={this.props["data-id"]} className={className}>
            {
                this.props.messages && this.props.messages.map(function (item, i) {
                    return (
                        <Message key={i} index={i} message={item}
                            onI18n={this.props.onI18n}
                            onRemoveMessage={this.props.onRemoveMessage}
                            defaultTimeout={this.props.defaultMessageTimeout}
                            data-id={this.props["data-id"]+"-message-"+i}
                            />);
                }.bind(this))
            }
            </div>
        );
    }
};

/*
 * @class Message
 * @desc Message sub-component to render an individual message and handle its closing (and removal from the store).
 *
 */
class Message extends React.Component {
    /*
     * Remove the message by calling the removeMessage callback if it exists.
     */
    _handleRemove = () => {
        if (this.props.onRemoveMessage) {
            this.props.onRemoveMessage(this.props.index);
        }
    };

    componentDidMount() {
        // Close after configured time interval
        // Interval of 0 (or undefined) will result in no automatic message clearing (which is intended).
        var interval = (this.props.message.duration) ? this.props.message.duration : this.props.defaultTimeout;

        if (interval) {
            this.interval = global.setInterval(this._handleRemove, interval);
        }
    }

    componentWillUnmount() {
        if (this.interval) {
            // clear the timer before unmounting the component
            global.clearInterval(this.interval);
        }
    }

    _renderProgress = () => {
        let progress = this.props.message.progress;
        let percent = progress.percent || 50;

        let text = progress.text ||
            (progress.textTemplate && progress.textTemplate(percent)) ||
                `${progress.percent}%`;

        return (
            <div className="message__progress" data-id={this.props["data-id"]+"-progress"}>
                {percent >= 100 && <div className="message__progress-icon icon-check" />}
                <div className="message__progress-text" data-id={this.props["data-id"]+"-progress-text"}>{text}</div>
                {percent < 100 &&
                    <div className="message__progress-border">
                        <div
                            className="message__progress-bar"
                            style={{
                                width: `${percent}%`
                            }}
                        />
                    </div>
                }
            </div>
        );
    }

    render() {
        var text = this.props.message.text || this.props.onI18n(this.props.message.key, this.props.message.params);
        var classes = classnames("message show", this.props.message.type, {
            "message--minimized": this.props.message.minimized
        });

        // Allow html messages to be rendered, this is dangerous
        // as it could allow XSS, so messages have to be explicitly
        // flagged as being html.
        if (this.props.message.isHtml) {
            text = <span className="message__text" dangerouslySetInnerHTML={{ __html: text }} /> ;
        } else {
            text = <span className="message__text">{text}</span>;
        }

        return (
            <div className={classes} data-id={this.props["data-id"]}>
                {!this.props.message.minimized && text}
                {this.props.message.progress && this._renderProgress()}
                <a className="close" onClick={this._handleRemove}></a>
            </div>
        );
    }
}

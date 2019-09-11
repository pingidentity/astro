"use strict";

import PropTypes from "prop-types";

import React from "react";
import classnames from "classnames";
import Utils from "../../../util/Utils";
import { cannonballChangeWarning } from "../../../util/DeprecationUtils";
import _ from "underscore";

import { MessageTypes, Layouts } from "./MessagesConstants";
import { flagsPropType, hasFlag, getFlags } from "../../../util/FlagUtils";

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
 * @property {node} text
 *     Message text
 * @property {Messages.MessageTypes} type
 *     Message type
 * @property {number} timer
 *     Number of milli seconds after which message should be removed
 * @property {number|string} index
 *     Message index.
 * @property {string} iconName
 *     When provided, show this icon on the left of the message
 * @property {boolean} hideClose
 *     When true, we don't display the close button
 * @property {Messages.Layouts} [layout=BANNER]
 *     When set to CORNER, displays the message in the top right corner
 * @property {boolean} isHtml
 *     DEPRICATED: no longer needed. You can now simply use html in your messages as needed.
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
 */

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
 * @param {array} [flags]
 *     Set the flag for "fixed-messages-constants" to use WARNING and INFO correctly
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
        containerType: PropTypes.oneOf(["full", "page-messages--sidebar-fix"]),
        messages: PropTypes.array,
        onRemoveMessage: PropTypes.func,
        removeMessage: PropTypes.func,
        onI18n: PropTypes.func,
        i18n: PropTypes.func,
        defaultMessageTimeout: PropTypes.number,
        flags: flagsPropType,
    };

    static defaultProps = {
        "data-id": "messages",
        onRemoveMessage: null,
        onI18n: (key) => key,
    };

    static contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

    constructor(props) {
        super(props);
        if (!Utils.isProduction()) {
            if (props.id) {
                throw new Error(Utils.deprecatePropError("id", "data-id"));
            }
            if (props.removeMessage) {
                throw new Error(Utils.deprecatePropError("removeMessage", "onRemoveMessage"));
            }
            if (props.i18n) {
                throw new Error(Utils.deprecatePropError("i18n", "onI18n"));
            }
        }
    }

    render() {
        const {
            containerType,
            "data-id": dataId,
            defaultMessageTimeout,
            key,
            messages,
            onI18n,
            onRemoveMessage,
        } = this.props;
        const className = classnames("page-messages", containerType );

        return (
            <div data-id={dataId} className={className}>
                {
                    messages && messages.map((item, i) => {
                        return (
                            <Message
                                key={key || i}
                                index={i}
                                message={item}
                                onI18n={onI18n}
                                onRemoveMessage={onRemoveMessage}
                                defaultTimeout={defaultMessageTimeout}
                                data-id={`${dataId}-message-${i}`}
                                flags={getFlags(this)}
                            />
                        );
                    })
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
    static propTypes = {
        flags: flagsPropType,
        onRemoveMessage: PropTypes.func,
        iconName: PropTypes.string,
    }

    static defaultProps = {
        onRemoveMessage: _.noop,
    }

    static contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

    /*
     * Remove the message by calling the removeMessage callback if it exists.
     */
    _handleRemove = () => {
        this.props.onRemoveMessage(this.props.index);
    };

    componentDidMount() {
        // Close after configured time interval
        // Interval of 0 (or undefined) will result in no automatic message clearing (which is intended).
        const interval = (this.props.message.duration) ? this.props.message.duration : this.props.defaultTimeout;

        if (interval) {
            this.interval = global.setInterval(this._handleRemove, interval);
        }

        if (this.props.message.type === MessageTypes.WARNING && !this._fixedConstants()) {
            cannonballChangeWarning({
                message: (
                    `The WARNING message type will use the yellow style instead of the red. ` +
                    `Add the 'fixed-messages-constants' flag to Messages or use the ERROR or NOTICE constant.`
                ),
            });
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

    _translatedConstants = {
        [MessageTypes.SUCCESS]: MessageTypes.SUCCESS,
        [MessageTypes.ERROR]: MessageTypes.ERROR,
        [MessageTypes.WARNING]: MessageTypes.NOTICE,
        [MessageTypes.NOTICE]: MessageTypes.NOTICE,
        [MessageTypes.FEATURE]: MessageTypes.FEATURE,
        [MessageTypes.INFO]: MessageTypes.FEATURE,
    };

    _fixedConstants = () => hasFlag(this, "fixed-messages-constants");

    _transformType = type => (
        this._fixedConstants()
            ? this._translatedConstants[type]
            : type
    );

    render() {
        const {
            message: {
                iconName,
                key,
                hideClose,
                layout,
                minimized,
                params,
                progress,
                type,
                ...message
            }
        } = this.props;

        const text = message.text || this.props.onI18n(key, params);
        const classes = classnames("message show", this._transformType(type), {
            "message--minimized": minimized,
            "message--corner": layout === Layouts.CORNER,
            "message--center": layout === Layouts.CENTER,
        });

        return (
            <div className={classes} data-id={this.props["data-id"]}>
                {iconName && <div className={classnames("message__icon", `icon-${iconName}`)} />}
                {!minimized && text && (<span className="message__text">{text}</span>)}
                {progress && this._renderProgress()}
                {!hideClose && <a className="close" onClick={this._handleRemove} data-id="message-close"></a>}
            </div>
        );
    }
}


"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    classnames = require("classnames"),
    Button = require("../buttons/Button"),
    MessageTypes = require("../general/messages/MessagesConstants").MessageTypes;

/**
 * @callback InlineMessage~onClick
 * @param {object} e
 *          The ReactJS synthetic event object
 */

/**
 * @typedef {Object} InlineMessage~primaryButton
 * @property {string} [href]
 *     Pass in a string to give the button an href.
 * @property {string} [target]
 *     Pass a string to give the button a target.
 */

/**
 * @typedef {Object} InlineMessage~secondaryButtons
 * @property {string} [className]
 *     CSS classes to add on the top-level HTML container.
 * @property {string} [label]
 *     Pass in a string label for the button label if you want an action option. If you pass this you must
 *     also pass the callback function.
 * @property {InlineMessage~onClick} [onClick]
 *     Callback to be triggered when the button is clicked.
 */

/**
 * @class InlineMessage
 * @desc Sometimes we need a message block to show embedded in a form or somewhere on a page.
 *
 * @param {boolean} [alternate]
 *     Warning message with full background color and no icon.
 * @param {boolean} [bordered=true]
 *     Whether or not to surround the inline message with a border.
 * @param {string} [className]
 *     CSS classes to add on the top-level HTML container.
 * @param {string} [data-id="inline-message"]
 *     To define the base "data-id" value for the top-level HTML container.
 * @param {boolean} [fullwidth]
 *     when true creates a full page width inline message.
 * @param {string} [label]
 *     Pass in a string label for the button label if you want an action option. If you pass this you must
 *     also pass the callback function.
 * @param {boolean} [noMargin]
 *     When true it will remove the margin around the inline message.
 * @param {InlineMessage~onClick} [onClick]
 *     Callback to be triggered when the button is clicked.
 * @param {InlineMessage~primaryButton} [primaryButton]
 *      Primary button containing href and target.
 * @param {Array.<InlineMessage~secondaryButtons>} [secondaryButtons]
 *     List of secondary buttons
 * @param {Messages.MessageTypes} [type=MessageTypes.NOTICE]
 *     Type of icon to display (MessageTypes.NOTICE, MessageTypes.ERROR, MessageTypes.WARNING)
 *     an object for the primary button
 *
 *
 * @example
 *     No action button button:
 *     <InlineMessage data-id="notice-message-no-button" type={ InlineMessage.MessageTypes.NOTICE }>
 *         Your message here
 *     </InlineMessage>
 *     With a button:
 *     <InlineMessage data-id="notice-message-button" type={ InlineMessage.MessageTypes.NOTICE }
 *         label="Do Something" onClick={doSomething}>
 *         Your message here
 *     </InlineMessage>
 */
class InlineMessage extends React.Component {

    static propTypes = {
        alternate: PropTypes.bool,
        fullwidth: PropTypes.bool,
        bordered: PropTypes.bool,
        className: PropTypes.string,
        "data-id": PropTypes.string,
        noMargin: PropTypes.bool,
        onClick: PropTypes.func,
        label: PropTypes.string,
        type: PropTypes.oneOf([
            MessageTypes.NOTICE, MessageTypes.ERROR, MessageTypes.WARNING, MessageTypes.SUCCESS
        ]),
        primaryButtonProps: PropTypes.shape({
            href: PropTypes.string,
            target: PropTypes.string
        }),
        secondaryButtons: PropTypes.arrayOf(PropTypes.shape({
            className: PropTypes.string,
            onClick: PropTypes.func.isRequired,
            label: PropTypes.string.isRequired,
        })),
    };

    static defaultProps = {
        "data-id": "inline-message",
        fullWidth: false,
        noMargin: false,
        bordered: true,
        type: MessageTypes.NOTICE,
        primaryButton: {},
        secondaryButtons: []
    };

    _showAction = () => {
        return (this.props.label !== undefined && this.props.onClick !== undefined);
    };


    _onClick = onClick => (e) => {
        onClick(e);
    };

    render() {
        const className = classnames("inline-message", this.props.type, {
            "inline-message--borderless": !this.props.bordered,
            "inline-message--alternate": this.props.alternate,
            "inline-message--fullwidth": this.props.fullwidth,
            "inline-message--nomargin": this.props.noMargin
        });

        const messageClassName = classnames(
            "inline-message-text",
            {
                "inline-message-text--full-width": this.props.fullwidth
            }
        );



        return (
            <div data-id={this.props["data-id"]} className={classnames(className, this.props.className)}>
                <div data-id="inline-message-text" className={messageClassName}>
                    {this.props.children}
                </div>
                {
                    this._showAction() &&
                        [
                            {
                                label: this.props.label,
                                onClick: this.props.onClick,
                                ...this.props.primaryButtonProps,
                                className: "primary",
                            },
                            ...this.props.secondaryButtons].map(({
                            onClick,
                            label,
                            href,
                            target,
                            type,
                            className: buttonClass,
                        }, index) => {
                            return (
                                <div key={`${label}-${index}`}
                                    data-id="inline-message-btn"
                                    className="inline-message-btn"
                                >
                                    <Button
                                        key="main"
                                        inline
                                        type={type}
                                        label={label}
                                        onClick={this._onClick(onClick)}
                                        className={buttonClass}
                                        href={href}
                                        target={target}
                                    />
                                </div>
                            );
                        })
                }
            </div>
        );
    }
}

InlineMessage.MessageTypes = MessageTypes;

module.exports = InlineMessage;

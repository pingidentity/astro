"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    classnames = require("classnames"),
    Utils = require("../../util/Utils"),
    Button = require("../buttons/Button"),
    MessageTypes = require("../general/messages/MessagesConstants").MessageTypes;

/**
 * @callback InlineMessage~onClick
 * @param {object} e
 *          The ReactJS synthetic event object
 **/

/**
 * @typedef {Object} InlineMessage~secondaryButtons
 * @param {string} label
 *     Pass in a string label for the button label if you want an action option. If you pass this you must
 *     also pass the callback function.
 * @param {InlineMessage~onClick} onClick
 *     Callback to be triggered when the button is clicked.
 * @param {string} [className]
 *     CSS classes to add on the top-level HTML container.
 *
 * @class InlineMessage
 * @desc Sometimes we need a message block to show embedded in a form or somewhere on a page.
 *
 * @param {string} [data-id="inline-message"]
 *     To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *     CSS classes to add on the top-level HTML container.
 * @param {InlineMessage.MessageTypes} [type=MessageTypes.NOTICE]
 *     Type of icon to display (MessageTypes.NOTICE, MessageTypes.ERROR, MessageTypes.WARNING)
 * @param {string} [label]
 *     Pass in a string label for the button label if you want an action option. If you pass this you must
 *     also pass the callback function.
 * @param {boolean} [bordered=true]
 *     Whether or not to surround the inline message with a border.
 * @param {boolean} [alternate=true]
 *     Warning message with full background color and no icon.
 * @param {InlineMessage~onClick} [onClick]
 *     Callback to be triggered when the button is clicked.
 *  @param {Array.InlineMessage~secondaryButtons} [secondaryButtons]
 *     List of secondary buttons
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
 **/
class InlineMessage extends React.Component {
    static propTypes = {
        alternate: PropTypes.bool,
        bordered: PropTypes.bool,
        className: PropTypes.string,
        "data-id": PropTypes.string,
        onClick: PropTypes.func,
        label: PropTypes.string,
        type: PropTypes.oneOf([
            MessageTypes.NOTICE, MessageTypes.ERROR, MessageTypes.WARNING, MessageTypes.SUCCESS
        ]),
        secondaryButtons: PropTypes.arrayOf(PropTypes.shape({
            className: PropTypes.string,
            onClick: PropTypes.func.isRequired,
            label: PropTypes.string.isRequired,
        })),
    };

    static defaultProps = {
        "data-id": "inline-message",
        bordered: true,
        type: MessageTypes.NOTICE,
        secondaryButtons: []
    };

    _showAction = () => {
        return (this.props.label !== undefined && this.props.onClick !== undefined);
    };


    _onClick = onClick => (e) => {
        onClick(e);
    };

    componentWillMount() {
        if (!Utils.isProduction() && this.props.callback) {
            throw new Error(Utils.deprecatePropError("callback", "onClick"));
        }
    }

    render() {
        var className = classnames("inline-message", this.props.type, {
            "inline-message--borderless": !this.props.bordered,
            "inline-message--alternate": this.props.alternate
        });

        return (
            <div data-id={this.props["data-id"]} className={classnames(className, this.props.className)}>
                <div data-id="inline-message-text" className="inline-message-text">
                    {this.props.children}
                </div>
                    {
                        this._showAction() &&
                        [{
                            type: this.props.type,
                            label: this.props.label,
                            onClick: this.props.onClick,
                            className: "primary"
                        }, ...this.props.secondaryButtons].map(({
                            onClick,
                            label,
                            type,
                            className: buttonClass,
                        }, index) => {
                            return (
                                    <div key={`${label}-${index}`}
                                        data-id="inline-message-btn"
                                        className="inline-message-btn"
                                    >
                                        <Button key="main" inline type={type} label={label}
                                            onClick={this._onClick(onClick)} className={buttonClass}
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

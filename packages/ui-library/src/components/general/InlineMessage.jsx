"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    classnames = require("classnames"),
    If = require("../general/If"),
    Utils = require("../../util/Utils"),
    Button = require("../buttons/Button"),
    MessageTypes = require("../general/messages/MessagesConstants").MessageTypes;

/**
 * @callback InlineMessage~onClick
 * @param {object} e
 *          The ReactJS synthetic event object
 **/

/**
 * @class InlineMessage
 * @desc Sometimes we need a message block to show embedded in a form or somewhere on a page.
 *
 * @param {string} [data-id="inline-message"]
 *                  To define the base "data-id" value for the top-level HTML container.
 * @param {InlineMessage.MessageTypes} [type=MessageTypes.NOTICE]
 *                  Type of icon to display (MessageTypes.NOTICE, MessageTypes.ERROR, MessageTypes.WARNING)
 * @param {string} [label]
 *                  Pass in a string label for the button label if you want an action option. If you pass this you must
 *                  also pass the callback function.
 * @param {boolean} [bordered=true]
 *                  Whether or not to surround the inline message with a border.
 * @param {boolean} [alternate=true]
 *                  Warning message with full background color and no icon.
 * @param {InlineMessage~onClick} [onClick]
 *                  Callback to be triggered when the button is clicked.
 *
 * @example
 *          No action button button:
 *          <InlineMessage data-id="notice-message-no-button" type={ InlineMessage.MessageTypes.NOTICE }>
 *              Your message here
 *          </InlineMessage>
 *          With a button:
 *          <InlineMessage data-id="notice-message-button" type={ InlineMessage.MessageTypes.NOTICE }
 *                         label="Do Something" onClick={doSomething}>
 *              Your message here
 *          </InlineMessage>
 **/
class InlineMessage extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        type: PropTypes.oneOf([
            MessageTypes.NOTICE, MessageTypes.ERROR, MessageTypes.WARNING, MessageTypes.SUCCESS
        ]),
        label: PropTypes.string,
        bordered: PropTypes.bool,
        onClick: PropTypes.func,
        alternate: PropTypes.bool,
    };

    static defaultProps = {
        "data-id": "inline-message",
        bordered: true,
        type: MessageTypes.NOTICE
    };

    _showAction = () => {
        return (this.props.label !== undefined && this.props.onClick !== undefined);
    };

    _onClick = (e) => {
        this.props.onClick(e);
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
            <div data-id={this.props["data-id"]} className={ className }>
                <div data-id="inline-message-text" className="inline-message-text">
                    {this.props.children}
                </div>
                <If test={ this._showAction() } >
                    <div data-id="inline-message-btn" className="inline-message-btn">
                        <Button inline onClick={this._onClick }>{this.props.label}</Button>
                    </div>
                </If>
            </div>
        );
    }
}

InlineMessage.MessageTypes = MessageTypes;

module.exports = InlineMessage;

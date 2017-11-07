"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    classnames = require("classnames"),
    If = require("../general/If.jsx"),
    Utils = require("../../util/Utils"),
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
 * @param {InlineMessage~onClick} [onClick]
 *                  Callback to be triggered when the button is clicked.
 * @param {InlineMessage~callback} [callback]
 *                  DEPRECATED use onClick instead
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
        onClick: PropTypes.func,
        callback: PropTypes.func
    };

    static defaultProps = {
        "data-id": "inline-message",
        type: MessageTypes.NOTICE
    };

    _showAction = () => {
        return (this.props.label !== undefined &&
                    (this.props.onClick !== undefined || this.props.callback !== undefined));
    };

    _onClick = (e) => {
        var clickHandler = this.props.callback || this.props.onClick;
        clickHandler(e);
    };

    componentWillMount() {
        if (this.props.callback && !Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("callback", "onClick"));
        }
    }

    render() {
        var className = classnames("inline-message", this.props.type);

        return (
            <div data-id={this.props["data-id"]} className={ className }>
                <div data-id="inline-message-text" className="inline-message-text">
                    {this.props.children}
                </div>
                <If test={ this._showAction() } >
                    <div data-id="inline-message-btn" className="inline-message-btn">
                        <button type="button" className="inline"
                                onClick={ this._onClick }>{this.props.label}</button>
                    </div>
                </If>
            </div>
        );
    }
}

InlineMessage.MessageTypes = MessageTypes;

module.exports = InlineMessage;

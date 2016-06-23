"use strict";
var React = require("react"),
    classnames = require("classnames"),
    If = require("../general/If.jsx"),
    MessageTypes = require("../general/messages/MessagesConstants").MessageTypes;

/**
 * @callback InlineMessage~callback
 * @param {object} element - on click of the message button if an action should occur
 **/

/**
 * @class InlineMessage
 * @desc Sometimes we need a message block to show embedded in a form or somewhere on a page.
 *
 * @param {string} [data-id="inline-message"] - data-id to set on the top HTML element
 *   (defaults to "inline-message").
 * @param {MessageTypes} [type=MessageTypes.NOTICE, MessageTypes.ERROR, MessageTypes.WARNING] - type of icon to display
 * @param {string} [label: string]
 *                  Pass in a string label for the button label if you want an action option. If you pass this you must
 *                  also pass the callback function.
 * @param {func} [callback: function]
 *                  Pass in a callback function that you want to trigger with the action button.
 *
 * @example
 *          No action button button:
 *          <InlineMessage data-id="notice-message-no-button" type={"notice"}>
 *              Your message here
 *          </InlineMessage>
 *          With a button:
 *          <InlineMessage data-id="notice-message-button" type={"notice"} label: "Do Something" callback: this._doSomething>
 *              Your message here
 *          </InlineMessage>
 **/
var InlineMessage = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        type: React.PropTypes.oneOf([
            MessageTypes.NOTICE, MessageTypes.ERROR, MessageTypes.WARNING, MessageTypes.SUCCESS
        ]),
        label: React.PropTypes.string,
        callback: React.PropTypes.func
    },
    
    getDefaultProps: function () {
        return {
            dataId: "inline-message",
            type: MessageTypes.NOTICE,
            label: "NO_ACTION",
            callback: undefined
        };
    },

    _showAction: function () {
        return (this.props.label !== undefined && this.props.label !== "NO_ACTION" &&
                this.props.callback !== undefined);
    },

    _onClick: function (e) {
        this.props.callback(e);
    },

    render: function () {
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
});

InlineMessage.MessageTypes = MessageTypes;

module.exports = InlineMessage;

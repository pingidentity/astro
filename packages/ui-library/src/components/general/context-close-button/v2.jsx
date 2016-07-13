var React = require("react");
var css = require("classnames");

/**
 * @callback ContextCloseButton~onClick
 */

/**
 * @class ContextCloseButton
 * @desc Button that will invoke onClick() callback and context close() when clicked if those methods exist.
 * onClick() callback will be triggered first followed by context close function.
 *
 * @param {string} [data-id="context-close-button"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 *
 * @param {string} [value]
 *     Button value, i.e. the text shown on the button
 * @param {boolean} [disabled=false]
 *     If true, the button is disabled; otherwise, it is enabled
 * @param {boolean} [show=true]
 *     If true, the button is displayed; otherwise, it is hidden
 *
 * @param {ContextCloseButton~onClick} [onClick]
 *     Callback to be triggered when the button is clicked.
 *
 * @example
 *     <ContextCloseButton
 *          value="ContextCloseButton" onClick={this._onClick} />
 */

var ContextCloseButton = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        value: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        show: React.PropTypes.bool,
        onClick: React.PropTypes.func
    },

    contextTypes: {
        // Not renamed to avoid impact on context usage triggered from top level containers.
        close: React.PropTypes.func
    },

    /*
     * Call the onClick callback followed by context close function if they exist.
     */
    _handleClick: function () {

        if (this.props.onClick && (typeof(this.props.onClick) === "function")) {
            this.props.onClick();
        }
        if (this.context && (typeof(this.context.close) === "function")) {
            // context attribute not renamed to avoid impact on context usage triggered from top level containers.
            this.context.close();
        }

    },

    getDefaultProps: function () {
        return {
            "data-id": "context-close-button",
            show: true,
            disabled: false
        };
    },

    render: function () {
        var styles = { disabled: this.props.disabled };
        styles[this.props.className] = true;

        return (
            this.props.show ? (
                <input data-id={this.props["data-id"]}
                    type="button"
                    value={this.props.value}
                    className={css(styles)}
                    onClick={this._handleClick}
                    disabled={this.props.disabled} />
            ) : null
        );
    }
});

module.exports = ContextCloseButton;

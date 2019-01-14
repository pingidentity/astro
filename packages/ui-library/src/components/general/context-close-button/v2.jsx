var PropTypes = require("prop-types");
var React = require("react");
var css = require("classnames");
var Button = require("../../buttons/Button");

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

class ContextCloseButton extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        value: PropTypes.string,
        disabled: PropTypes.bool,
        show: PropTypes.bool,
        onClick: PropTypes.func
    };

    static contextTypes = {
        // Not renamed to avoid impact on context usage triggered from top level containers.
        close: PropTypes.func
    };

    static defaultProps = {
        "data-id": "context-close-button",
        show: true,
        disabled: false
    };

    /*
     * Call the onClick callback followed by context close function if they exist.
     */
    _handleClick = () => {

        if (this.props.onClick && (typeof(this.props.onClick) === "function")) {
            this.props.onClick();
        }
        if (this.context && (typeof(this.context.close) === "function")) {
            // context attribute not renamed to avoid impact on context usage triggered from top level containers.
            this.context.close();
        }

    };

    render() {
        var styles = { disabled: this.props.disabled };
        styles[this.props.className] = true;

        return (
            this.props.show ? (
                <Button data-id={this.props["data-id"]}
                    className={css(styles)}
                    onClick={this._handleClick}
                    disabled={this.props.disabled} >
                    {this.props.value}
                </Button>
            ) : null
        );
    }
}

module.exports = ContextCloseButton;

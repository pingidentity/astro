var PropTypes = require("prop-types");
var React = require("react"),
    css = require("classnames"),
    Utils = require("../../util/Utils"),
    EllipsisLoader = require("../general/EllipsisLoader");

import Button from "../buttons/Button";


/**
 * @callback EllipsisLoaderButton~onClick
 * @param {object} e
 *          The ReactJS synthetic event object
 */

/**
 * @class EllipsisLoaderButton
 * @desc Loading indicator (animated ...) for fields which have server-side validation, etc.
 *
 * @param {string} [data-id="ellipsis-loader-button"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} text
 *          Text to display in the button when not loading
 * @param {boolean} [disabled=false]
 *          Button will not function when true
 * @param {string} [disabledText]
 *          Text for the help hint will be rendered when the same button has a the prop disabled set to true.
 * @param {boolean} loading
 *          While true, loading animation will be shown
 * @param {string} [className]
 *          CSS class to add to the button
 * @param {EllipsisLoaderButton~onClick} onClick
 *          Callback to be triggered when the button is clicked.
 *
 * @example
 *     <EllipsisLoaderButton
 *         id="my-loader"
 *         loading={this.state.isLoading}
 *         className="css-class"
 *         onClick={this._onClick} />
 */
class EllipsisLoaderButton extends React.Component {

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        text: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        disabledText: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired
    };

    static defaultProps = {
        disabled: false,
        "data-id": "ellipsis-loader-button",
        loading: false
    };

    constructor(props) {
        super(props);
        if (!Utils.isProduction()) {
            if (props.id) {
                throw new Error(Utils.deprecatePropError("id", "data-id"));
            }
            // TODO: figure out why Jest test is not working, reenable test
            /* istanbul ignore if  */
            if (props.onButtonClick) {
                /* istanbul ignore next  */
                throw new Error(Utils.deprecatePropError("onButtonClick", "onClick"));
            }
        }
    }

    render() {
        var buttonCss = {
            loading: this.props.loading,
            disabled: this.props.disabled
        };

        return (
            <Button
                className={css("ellipsis-loader-button", buttonCss, this.props.className)}
                data-id={this.props["data-id"]}
                onClick={this.props.onClick}
                disabled={this.props.disabled}
                disabledText={this.props.disabledText}
            >
                {this.props.text}
                <EllipsisLoader loading={this.props.loading}/>
            </Button>
        );
    }
}

module.exports = EllipsisLoaderButton;

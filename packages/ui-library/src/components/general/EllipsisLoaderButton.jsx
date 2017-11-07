var PropTypes = require("prop-types");
var React = require("react"),
    css = require("classnames"),
    Utils = require("../../util/Utils"),
    EllipsisLoader = require("../general/EllipsisLoader.jsx");

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
 * @param {string} [id]
 *          DEPRECATED. Use "data-id" instead.
 * @param {string} text
 *          Text to display in the button when not loading
 * @param {boolean} [disabled=false]
 *          Button will not function when true
 * @param {boolean} loading
 *          While true, loading animation will be shown
 * @param {string} [className]
 *          CSS class to add to the button
 * @param {EllipsisLoaderButton~onClick} onClick
 *          Callback to be triggered when the button is clicked.
 * @param {EllipsisLoaderButton~onButtonClick} onButtonClick
 *          DEPRECATED, use onClick instead.
 *
 * @example
 *     <EllipsisLoaderButton
 *         id="my-loader"
 *         loading={this.state.isLoading}
 *         className="css-class"
 *         onButtonClick={this._onButtonClick} />
 */
class EllipsisLoaderButton extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        id: PropTypes.string,
        className: PropTypes.string,
        text: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        loading: PropTypes.bool.isRequired,
        onClick: PropTypes.func, /// Should be isRequired once DEPRECATED onButtonClick is removed.
        onButtonClick: PropTypes.func
    };

    static defaultProps = {
        disabled: false,
        "data-id": "ellipsis-loader-button"
    };

    componentWillMount() {
        if (!Utils.isProduction()) {
            if (this.props.id) {
                console.warn(Utils.deprecateMessage("id", "data-id"));
            }
            if (this.props.onButtonClick) {
                console.warn(Utils.deprecateMessage("onButtonClick", "onClick"));
            }
        }
    }

    render() {
        var id = this.props.id || this.props["data-id"];

        var buttonCss = {};
        buttonCss.loading = this.props.loading;
        if (this.props.className) {
            buttonCss[this.props.className] = true;
        }

        if (this.props.disabled) {
            buttonCss.disabled = true;
        }

        var clickHandler = this.props.onButtonClick || this.props.onClick;

        return (
            <button
                className={css("ellipsis-loader-button", buttonCss)}
                data-id={id}
                onClick={clickHandler}
                disabled={this.props.disabled}>
                {this.props.text}
                <EllipsisLoader loading={this.props.loading}/>
            </button>
        );
    }
}

module.exports = EllipsisLoaderButton;

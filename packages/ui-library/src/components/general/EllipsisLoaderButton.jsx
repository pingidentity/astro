var React = require("react");
var css = require("classnames");
var EllipsisLoader = require("../general/EllipsisLoader.jsx");

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
var EllipsisLoaderButton = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        text: React.PropTypes.string.isRequired,
        disabled: React.PropTypes.bool,
        loading: React.PropTypes.bool.isRequired,
        onClick: React.PropTypes.func, /// Should be isRequired once DEPRECATED onButtonClick is removed.
        onButtonClick: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            disabled: false,
            "data-id": "ellipsis-loader-button"
        };
    },

    componentWillMount: function () {
        if (this.props.id) {
            console.warn(
                "Deprecated: use data-id instead of id.  Support for id will be removed in the next version"
            );
        }
        if (this.props.onButtonClick) {
            console.warn(
                "Deprecated: use onClick instead of onButtonClick. " +
                "Support for onButtonClick will be removed in next version"
            );
        }
    },

    render: function () {
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
});

module.exports = EllipsisLoaderButton;

var React = require("react");
var css = require("classnames");
var EllipsisLoader = require("../general/EllipsisLoader.jsx");

/**
 * @module EllipsisLoaderButton
 * @desc Loading indicator (animated ...) for fields which have server-side validation, etc.
 * @param {string} [id] data-id to set on the button (optional, default 'ellipsis-loader-button')
 * @param {string} text text to display in the button when not loading
 * @param {boolean} [disabled] button will not function when true
 * @param {boolean} loading while true, loading animation will be shown
 * @param {string} [className] CSS class to add to the button
 * @param {function} onButtonClick function to call when the button is clicked
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
        className: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        id: React.PropTypes.string,
        loading: React.PropTypes.bool.isRequired,
        onButtonClick: React.PropTypes.func.isRequired,
        text: React.PropTypes.string.isRequired
    },

    getDefaultProps: function () {
        return {
            disabled: false,
            id: "ellipsis-loader-button"
        };
    },

    render: function () {
        var buttonCss = {};

        buttonCss.loading = this.props.loading;

        if (this.props.disabled) {
            buttonCss.disabled = true;
        }
        if (this.props.className) {
            buttonCss[this.props.className] = true;
        }

        return (
            <button
                className={css("ellipsis-loader-button", buttonCss)}
                data-id={this.props.id}
                onClick={this.props.onButtonClick}
                disabled={this.props.disabled}>

                {this.props.text}
                <EllipsisLoader loading={this.props.loading}/>
            </button>
        );
    }
});

module.exports = EllipsisLoaderButton;

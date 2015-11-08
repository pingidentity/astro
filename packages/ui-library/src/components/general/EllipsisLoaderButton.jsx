var React = require("react");
var css = require("classnames");
var EllipsisLoader = require("../general/EllipsisLoader.jsx");

/**
 * @module EllipsisLoaderButton
 * @desc Loading indicator (animated ...) for fields which have server-side validation, etc.
 * @param {string} [id] data-id to set on the button (optional, default 'ellipsis-loader-button')
 * @param {string} text text to display in the button when not loading
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
        id: React.PropTypes.string,
        text: React.PropTypes.string.isRequired,
        loading: React.PropTypes.bool.isRequired,
        className: React.PropTypes.string,
        onButtonClick: React.PropTypes.func.isRequired
    },

    getDefaultProps: function () {
        return {
            id: "ellipsis-loader-button"
        };
    },

    render: function () {
        var buttonCss = {};

        buttonCss.loading = this.props.loading;
        if (this.props.className) {
            buttonCss[this.props.className] = true;
        }

        return (
            <button
                className={css("ellipsis-loader-button", buttonCss)}
                data-id={this.props.id}
                onClick={this.props.onButtonClick}>

                {this.props.text}
                <EllipsisLoader loading={this.props.loading}/>
            </button>
        );
    }
});

module.exports = EllipsisLoaderButton;

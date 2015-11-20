var React = require("react");
var css = require("classnames");

/**
 * @module src/components/general/EllipsisLoader
 * @desc Loading indicator (animated ...) for fields which have server-side validation, etc.
 * @param {string} [id] data-id to set on the top HTML element (optional, default 'ellipsis-loader')
 * @param {boolean} loading while true, loading animation will be shown
 * @param {string} [className] CSS class to set on the top HTML element (optional)
 *
 * @example <EllipsisLoader id="my-loader" loading={this.state.isLoading} className="css-class" />
 */
var EllipsisLoader = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        loading: React.PropTypes.bool.isRequired,
        className: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            id: "ellipsis-loader"
        };
    },

    render: function () {
        if (this.props.loading) {
            var spanClass = css("icon-ellipsis", this.props.className);
            return ( <span className={spanClass} data-id={this.props.id}><span></span></span> );
        } else {
            return null;
        }
    }
});

module.exports = EllipsisLoader;

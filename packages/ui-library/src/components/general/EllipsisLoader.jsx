var PropTypes = require("prop-types");
var React = require("react"),
    css = require("classnames"),
    Utils = require("../../util/Utils");

/**
 * @class EllipsisLoader
 * @desc Loading indicator (animated ...) for fields which have server-side validation, etc.
 *
 * @param {string} [data-id="ellipsis-loader"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [id]
 *          DEPRECATED. Use "data-id" instead.
 * @param {string} [className]
 *          CSS class to set on the top HTML element (optional)
 * @param {boolean} loading
 *          While true, loading animation will be shown
 *
 * @example <EllipsisLoader id="my-loader" loading={this.state.isLoading} className="css-class" />
 */
class EllipsisLoader extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        "data-id": PropTypes.string,
        className: PropTypes.string,
        loading: PropTypes.bool.isRequired
    };

    static defaultProps = {
        "data-id": "ellipsis-loader"
    };

    componentWillMount() {
        if (this.props.id && !Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("id", "data-id"));
        }
    }

    render() {
        if (this.props.loading) {
            var id = this.props.id || this.props["data-id"];
            var spanClass = css("icon-ellipsis", this.props.className, { ie9: Utils.isIE9() } );
            return ( <span className={spanClass} data-id={id}><span></span></span> );
        } else {
            return null;
        }
    }
}

module.exports = EllipsisLoader;

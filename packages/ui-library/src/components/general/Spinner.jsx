var PropTypes = require("prop-types");
var React = require("react"),
    classnames = require("classnames"),
    Utils = require("../../util/Utils");

/**
 * @class Spinner
 * @desc Simple loading spinner implementation. Depends on prop will show loading spinner animation or children content.
 * Children content should be exception safe if no data available, because it will be evaluated regardless of loading
 * state (react limitation), also content should be wrapped in top-level element (div or span) (also react limitation).
 *
 * @param {string} [data-id="spinner"]
 *     To define the base "data-id" value for top-level HTML container.
 *
 * @param {string} [defaultText]
 *     Text that shows if CSS rotations are not supported
 *
 * @param {boolean} show
 *     Boolean value, while true loading animation will be shown instead of context
 *
 * @example
 *     <Spinner show={this.state.show} defaultText="Loading...">
 *         {data}
 *     </Spinner>
 **/

class Spinner extends React.Component {

    static propTypes = {
        "data-id": PropTypes.string,
        defaultText: PropTypes.string,
        className: PropTypes.string,
        show: PropTypes.bool.isRequired
    };

    static defaultProps = {
        "data-id": "spinner",
        defaultText: ""
    };

    constructor(props) {
        super(props);
        if (!Utils.isProduction() && props.id) {
            throw new Error(Utils.deprecatePropError("id", "data-id"));
        }
    }

    render() {
        if (this.props.show) {
            return (
                <span data-id={this.props["data-id"]} className={classnames("loader", this.props.className)}>
                    <span className="loader__rotator">{this.props.defaultText}</span>
                </span>
            );
        } else {
            return this.props.children;
        }
    }
}

module.exports = Spinner;

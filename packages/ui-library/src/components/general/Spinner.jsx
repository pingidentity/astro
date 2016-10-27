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
 * @param {string} [id]
 *     DEPRECATED. Use "data-id" instead. To define the base "data-id" value for top-level HTML container.
 *
 * @param {string} [defaultText]
 *     Text that shows if CSS rotations are not supported
 *
 * @param {boolean} show
 *     Boolean value, while true loading animation will be shown instead of context
 *
 * @example
 *     <Spinner show={this.state.show} defaultText="Loading...">
 *         <div className="result-set">
 *             {data}
 *         </div>
 *     </Spinner>
 **/

var Spinner = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,
        defaultText: React.PropTypes.string,
        show: React.PropTypes.bool.isRequired
    },

    getDefaultProps: function () {
        return {
            "data-id": "spinner",
            defaultText: ""
        };
    },

    componentWillMount: function () {
        if (this.props.id && !Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("id", "data-id"));
        }
    },

    render: function () {
        var className = classnames("spinner", { ie9: Utils.isIE9() } );
        if (this.props.show) {
            var dataId = this.props.id || this.props["data-id"];
            return <span data-id={dataId} className={className}>{this.props.defaultText}</span>;
        } else {
            return this.props.children;
        }
    }
});

module.exports = Spinner;

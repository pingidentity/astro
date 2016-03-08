var React = require("react");

/**
 * @class Spinner
 * @desc Simple loading spinner implementation. Depends on prop will show loading spinner animation or children content.
 * Children content should be exception safe if no data available, because it will be evaluated regardless of loading
 * state (react limitation), also content should be wrapped in top-level element (div or span) (also react limitation).
 *
 * @param {string} [id="spinner"] data-id value for HTML top element
 * @param {string} [defaultTest] text that shows if CSS rotations are not supported
 * @param {boolean} show boolean value, while true loading animation will be shown instead of context
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
        id: React.PropTypes.string,
        defaultText: React.PropTypes.string,
        show: React.PropTypes.bool.isRequired
    },

    getDefaultProps: function () {
        return {
            id: "spinner",
            defaultText: ""
        };
    },

    render: function () {
        if (this.props.show) {
            return <span data-id={this.props.id} className="spinner">{this.props.defaultText}</span>;
        } else {
            return this.props.children;
        }
    }
});

module.exports = Spinner;

var React = require('react');

/*
 * Simple loading spinner implementation. Depends on prop will show loading spinner animation or children content.
 *
 * Children content should be exception safe if no data available, because it will be evaluated regardless of loading
 * state (react limitation), also content should be wrapped in top-level element (div or span) (also react limitation).
 *
 * Sample usage:
 *     <Spinner show={this.state.show} defaultText="Loading...">
 *         <div className="result-set">
 *             {data}
 *         </div>
 *     </Spinner>
 *
 * Params:
 *     - defaultText (optional): text that shows if CSS rotations are not supported
 *     - show: boolean value, while true loading animation will be shown instead of context
*/

var Spinner = React.createClass({

    propTypes: {
        defaultText: React.PropTypes.string,
        show: React.PropTypes.bool.isRequired
    },

    getDefaultProps: function () {
        return {
            defaultText: ''
        };
    },

    render: function () {
        if (this.props.show) {
            /* jshint ignore:start */
            return <span data-id="spinner" className="spinner">{this.props.defaultText}</span>;
            /* jshint ignore:end */
        } else {
            return this.props.children;
        }
    }
});

module.exports = Spinner;

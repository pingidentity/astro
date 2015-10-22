var React = require('react');

/**
 * @module components/general/If
 *
 * @desc
 * Simple conditional render for convenience.  Will display children
 * only if supplied condition is true.
 *
 * NOTE 1: that the children are still parsed by react so this is not
 * exactly equivalent to an if statement, and not suitable for null
 * protection checking.
 *
 * NOTE 2: this does not wrap the children, so you must pass in only
 * a single root child element (such as a parent div).
 *
 * Props:
 * @param {any} test if truthy, then the children will be rendered, otherwise nothing is rendered.
 *
 * @Example
 *         <If test={this.state.param}>
 *             <div>
 *                 <span>My paramater:</span>
 *                 <span>{this.state.param}</param>
 *             </div>
 *         </If>
 *
 */
var If = React.createClass({

    propTypes: {
        test: React.PropTypes.any.isRequired
    },

    render: function () {
        if (!this.props.test) {
            return null;
        }
        
        return this.props.children;
    }
});

module.exports = If;

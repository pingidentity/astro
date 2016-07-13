var React = require("react");

// This is just to avoid unmocking the If component (which is widely used)
// while testing components which use it.
var If = React.createClass({

    propTypes: {
        test: React.PropTypes.any
    },

    render: function () {
        if (!this.props.test) {
            return null;
        }

        return this.props.children;
    }
});

module.exports = If;

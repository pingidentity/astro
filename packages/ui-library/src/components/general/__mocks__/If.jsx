var PropTypes = require("prop-types");
var React = require("react");

// This is just to avoid unmocking the If component (which is widely used)
// while testing components which use it.
class If extends React.Component {
    static propTypes = {
        test: PropTypes.any
    };

    render() {
        if (!this.props.test) {
            return null;
        }

        return this.props.children;
    }
}

module.exports = If;

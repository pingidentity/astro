var PropTypes = require("prop-types");
var React = require("react");

module.exports = class extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        value: PropTypes.string
    };

    static defaultProps = {
        "data-id": "cell"
    };

    render() {
        var label = this.props.value;
        var className = this.props.className + " cell";

        return (
            <div data-id={this.props["data-id"]} className={className}>{label}</div>
        );
    }
};

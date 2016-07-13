var React = require("react");

module.exports = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        value: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            "data-id": "cell"
        };
    },

    render: function () {
        var label = this.props.value;
        var className = this.props.className + " cell";

        return (
            <div data-id={this.props["data-id"]} className={className}>{label}</div>
        );
    }

});

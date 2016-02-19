var React = require("react");

module.exports = React.createClass({

    propTypes: {
        value: React.PropTypes.string,
        classes: React.PropTypes.string
    },

    render: function () {
        var label = this.props.value;
        var classes = this.props.classes + " cell";

        return (
            <div className={classes}>{label}</div>
        );
    }

});

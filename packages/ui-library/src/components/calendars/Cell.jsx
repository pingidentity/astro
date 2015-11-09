var React = require("react");

module.exports = React.createClass({

    propTypes: {
        value: React.PropTypes.string,
        classes: React.PropTypes.string
    },

    render: function () {
        var prop = this.props;
        prop.classes += " cell";

        return (
            <div className={prop.classes}>{prop.value}</div>
        );
    }

});

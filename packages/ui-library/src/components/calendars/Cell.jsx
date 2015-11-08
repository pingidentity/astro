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
            /* jshint ignore:start */
            <div className={prop.classes}>{prop.value}</div>
            /* jshint ignore:end */
        );
    }

});

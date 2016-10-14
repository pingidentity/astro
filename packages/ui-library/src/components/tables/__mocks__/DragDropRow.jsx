var React = require("react");

module.exports = React.createClass({
    render: function () {
        return (<div className="drag-drop-row" {...this.props}>{this.props.children}</div>);
    }
});

var React = require("react");

module.exports = class extends React.Component {
    render() {
        return (<div className="drag-drop-row" {...this.props}>{this.props.children}</div>);
    }
};

var React = require("react");

/** @class FormLabelMock
 * @desc A mock of the FormLabel component
 */
class FormLabelMock extends React.Component {
    render() {
        return (<div className="form-label-mock">{this.props.children}</div>);
    }
}

module.exports = FormLabelMock;

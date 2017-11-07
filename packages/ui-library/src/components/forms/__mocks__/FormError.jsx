var React = require("react");

/** @class FormErrorMock
 * @desc A mock of the FormError component
 */
class FormLabelMock extends React.Component {
    render() {
        return <div data-id={this.props["data-id"]}>{this.props.value}</div>;
    }
}

module.exports = FormLabelMock;

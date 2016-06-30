var React = require("react");

/** @class FormErrorMock
 * @desc A mock of the FormError component
 */
var FormLabelMock = React.createClass({
    render: function () {
        return <div data-id={this.props["data-id"]}>{this.props.value}</div>;
    }
});

module.exports = FormLabelMock;

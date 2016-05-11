var React = require("react");

/** @class FormLabelMock
 * @desc A mock of the FormLabel component
 */
var FormLabelMock = React.createClass({

    render: function () {
        return (<div className="form-label-mock">{this.props.children}</div>);
    }
});

module.exports = FormLabelMock;

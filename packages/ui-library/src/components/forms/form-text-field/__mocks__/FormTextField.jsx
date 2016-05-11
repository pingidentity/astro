var React = require("react");
var _ = require("underscore");

/** @class FormTextFieldMock
 * @desc A mock of the FormTextField component
 */
var FormTextFieldMock = React.createClass({

    getDefaultProps: function () {
        return {
            onChange: _.noop,
            onValueChange: _.noop
        };
    },

    _handleFieldChange: function (e) {
        this.props.onValueChange(e.target.value);
        this.props.onChange(e);
    },

    render: function () {
        return (<input {...this.props} data-id="input"
            onChange={this._handleFieldChange}
            className="form-text-field-mock"/>
        );
    }
});

module.exports = FormTextFieldMock;

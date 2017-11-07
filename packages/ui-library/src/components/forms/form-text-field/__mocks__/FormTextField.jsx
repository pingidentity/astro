var React = require("react");
var _ = require("underscore");

/** @class FormTextFieldMock
 * @desc A mock of the FormTextField component
 */
class FormTextFieldMock extends React.Component {
    static defaultProps = {
        onChange: _.noop,
        onValueChange: _.noop
    };

    _handleFieldChange = (e) => {
        this.props.onValueChange(e.target.value);
        this.props.onChange(e);
    };

    render() {
        return (<input {...this.props} data-id="input"
            onChange={this._handleFieldChange}
            className="form-text-field-mock"/>
        );
    }
}

module.exports = FormTextFieldMock;

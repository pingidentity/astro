var React = require("react"),
    FormTextField = require("./form-text-field"),
    _ = require("underscore");

/**
 * @enum {string}
 * @alias FormTimeField.Types
 */
var Types = {
    TIME: "time",
    DATE: "date",
    DATETIME: "datetime-local",
    WEEK: "week",
    MONTH: "month"
};

/**
* @callback FormTimeField~onChange
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormTimeField~onValueChange
*
* @param {string} value
*     The current text field value.
*/

/**
* @callback FormTimeField~onBlur
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormTimeField~onFocus
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormTimeField~onKeyDown
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormTimeField~onKeyPress
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormTimeField~onMouseDown
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @class FormTimeField
* @desc A time field component.
*
* @param {string} [data-id="form-time-field"]
*    To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*    CSS classes to set on the top-level HTML container.
*
* @param {string} [value]
*    Current time field value.
* @param {string} [defaultValue]
*    The default (initial) value to be shown in the time field.
* @param {string} [errorMessage]
*    The message to display if defined when external validation failed.
* @param {FormTimeField.Types} [type=FormTimeField.Types.TIME]
*    The type of time component.
*
* @param {FormTimeField~onChange} [onChange]
*     Callback to be triggered when the field value changes. It will receive the triggering event.
* @param {FormTimeField~onValueChange} [onValueChange]
*     Callback to be triggered when the field value changes. It will receive the component's value.
* @param {FormTimeField~onBlur} [onBlur]
*     Callback to be triggered when the field blurs (loses focus).
* @param {FormTimeField~onFocus} [onFocus]
*     Callback to be triggered when the field gains focus.
* @param {FormTimeField~onKeyDown} [onKeyDown]
*     Callback to be triggered when a key is pressed down in the field.
* @param {FormTimeField~onKeyPress} [onKeyPress]
*     Callback to be triggered when a key is pressed in the field.
* @param {FormTimeField~onMouseDown} [onMouseDown]
*     Callback to be triggered when the field registers a mouse down.
*
* @param {string} [labelHelpText]
*     The text to display for the help tooltip.
* @param {string} [labelText]
*     The text to show as the field's label.
*/
var FormTimeField = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string,
        type: React.PropTypes.oneOf(_.values(Types)),
        value: React.PropTypes.string,
        errorMessage: React.PropTypes.string,
        //callbacks
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        onKeyDown: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onValueChange: React.PropTypes.func,
    },

    getDefaultProps: function () {
        return {
            "data-id": "form-time-field"
        };
    },

    render: function () {
        return (
            <FormTextField {...this.props}
                    className={this.props.className}
                    _type={this.props.type || Types.TIME}
                    controlled={true}
                    maskValue={false}
                    showSave={false}
                    showUndo={false}
                    showReveal={false}
                    data-id={this.props["data-id"]} />);
    }
});

FormTimeField.Types = Types;

module.exports = FormTimeField;

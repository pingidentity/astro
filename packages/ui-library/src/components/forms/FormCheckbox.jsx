var React=require("react"),
    classnames = require("classnames"),
    FormLabel = require("./FormLabel.jsx");

/**
 * @callback FormCheckbox~onChangeCallback
 * @param {object} event - reactjs synthetic event object
 */

/**
 * @class FormCheckbox
 * @desc A checkbox field component.
 *
 * @param {bool} [checked] - setting a box as checked or not
 * @param {string} [className] - optional class to pass
 * @param {bool} [disabled] - disable current checkbox and style opacity
 * @param {string} [id] - optional id to pass
 * @param {string} [label] - label text to be displayed
 * @param {string} [labelHelpText] - label help text to be displayed
 * @param {string} [name] - optional name to pass
 * @param {FormCheckbox~onChangeCallback} onChange - callback to be triggered when checkbox ticked,
 * will be passed the original event
 * @param {function} onValueChange - callback to be triggered when checkbox is toggled, will be
 * passed the checked state
 * @param {string} [value] - optional value to pass
 * @param {string} [helpClassName] - optional class for HelpHint
 *
 * @example
 *
 *       <FormCheckbox label="Regular Checkbox"
 *                 id="form-checkbox"
 *                 onChange={this._changeCallback} />
 *
 */
var FormCheckbox=React.createClass({
    propTypes: {
        checked: React.PropTypes.bool,
        className: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        id: React.PropTypes.string,
        label: React.PropTypes.string,
        labelHelpText: React.PropTypes.string,
        name: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onValueChange: React.PropTypes.func,
        value: React.PropTypes.string,
        helpClassName: React.PropTypes.string
    },

    getDefaultProps: function () {
        return{
            disabled: false,
            id: "form-checkbox"
        };
    },

    _handleChange: function (e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
        if (this.props.onValueChange) {
            this.props.onValueChange(!!e.target.checked);
        }
    },

    render: function () {
        var id = this.props["data-id"] || this.props.id,
            labelClassName = classnames("input-checkbox", this.props.className, {
                disabled: this.props.disabled
            });

        return (
            <FormLabel className={labelClassName}
                    helpClassName={this.props.helpClassName}
                    disabled={this.props.disabled}
                    value={this.props.label}
                    hint={this.props.labelHelpText}>
                <input
                    data-id={id}
                    type="checkbox"
                    name={this.props.name ? this.props.name : id}
                    value={this.props.value ? this.props.value: id}
                    onChange={this._handleChange}
                    checked={this.props.checked}
                    disabled={this.props.disabled}
                />
                <div className="icon"/>
            </FormLabel>
        );
    }
});

module.exports=FormCheckbox;

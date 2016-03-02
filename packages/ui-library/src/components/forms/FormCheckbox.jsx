var React=require("react"),
    css = require("classnames"),
    HelpHint=require("../tooltips/HelpHint.jsx");

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
 * @param {FormCheckbox~onChangeCallback} onChange - callback to be triggered when checkbox ticked
 * @param {string} [value] - optional value to pass
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
        onChange: React.PropTypes.func.isRequired,
        value: React.PropTypes.string
    },

    getDefaultProps: function () {
        return{
            disabled: false,
            id: "form-checkbox"
        };
    },

    render: function () {
        var labelHelp,
            labelCss = {};

        if (this.props.labelHelpText) {
            labelHelp = (
                <HelpHint hintText={this.props.labelHelpText} />
            );
        }

        if (this.props.className) {
            labelCss[this.props.className] = true;
        }

        return (
            <label className={css("input-checkbox", labelCss)} disabled={this.props.disabled}>
                <span className="label-text">
                    {this.props.label}
                    {labelHelp}
                </span>
                <input
                    data-id={this.props.id}
                    type="checkbox"
                    name={this.props.name ? this.props.name : this.props.id}
                    value={this.props.value ? this.props.value: this.props.id}
                    onChange={this.props.onChange}
                    checked={this.props.checked}
                    disabled={this.props.disabled}
                />
                <div className="icon"/>
            </label>
        );
    }
});

module.exports=FormCheckbox;

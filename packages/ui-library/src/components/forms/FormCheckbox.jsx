import React from "react";
import PropTypes from "prop-types";

import FormError from "./FormError";
import FormLabel from "./FormLabel";
import { defaultRender } from "../../util/PropUtils";
import { InputWidthProptypes, getInputWidthClass } from "./InputWidths";

import classnames from "classnames";


/**
 * @callback FormCheckbox~onChange
 *
 * @param {object} e
 *    The ReactJS synthetic event object.
 */

/**
* @callback FormCheckbox~onValueChange
*
* @param {boolean} checked
*    The current checked state.
*/

/**
 * @class FormCheckbox
 * @desc A checkbox field component.
 *
 * @param {string} [className]
 *    CSS classes to set on the top-level HTML container.
 * @param {string} [data-id="form-checkbox-container"]
 *    To define the base "data-id" value for the top-level HTML container.
 *    Note that "-container" will be appended to the "data-id" set on the top-level HTML container,
 *    and the "data-id" string will be set on the checkbox "input" elelment under the top-level HTML container.
 * @param {string} [errorMessage]
 *    The message to display if defined when external validation failed.
 * @param {string} [label]
 *    Label text to be displayed.
 * @param {string} [labelHelpText]
 *    Label help text to be displayed.
 * @param {string} [helpClassName]
 *    CSS classes to set on the HelpHint component.
 * @param {string} [name]
 *    The name value for the input.
 * @param {function} [renderLabel]
 *    Render prop to display FormLabel
 * @param {string} [value]
 *    The value for the input.
* @param {("XS" | "SM" | "MD" | "LG" | "XL" | "XX" | "MAX")} [width]
*    Specifies the width of the input.
 *
 * @param {boolean} [checked=false]
 *    Whether or not the checkbox is checked.
 * @param {boolean} [disabled=false]
 *    If true, disables current checkbox and styles opacity.
 * @param {boolean} [inline=false]
 *    If true, adds "inline" className for inline boxes
 * @param {boolean} [stacked=false]
 *    If true, adds "stacked" className for label on right side
 *
 * @param {object} [helpTarget]
 *     An optional icon or image to replace standard help hint icon
 *
 * @param {FormCheckbox~onChange} [onChange]
 *    Callback to be triggered when checkbox is toggled. It will receive the triggering event.
 * @param {FormCheckbox~onValueChange} ]onValueChange]
 *    Callback to be triggered when checkbox is toggled. It will receive the component's value.
 *
 * @example
 *
 *     <FormCheckbox label="Regular Checkbox"
 *         data-id="form-checkbox"
 *         onChange={this._changeCallback}
 *     />
 */
class FormCheckbox extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        checked: PropTypes.bool,
        conditionalContent: PropTypes.node,
        "data-id": PropTypes.string,
        disabled: PropTypes.bool,
        errorMessage: PropTypes.string,
        helpClassName: PropTypes.string,
        helpTarget: PropTypes.node,
        inline: PropTypes.bool,
        label: PropTypes.string,
        labelHelpText: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func,
        onValueChange: PropTypes.func,
        stacked: PropTypes.bool,
        renderLabel: PropTypes.func,
        value: PropTypes.string,
        width: PropTypes.oneOf(InputWidthProptypes),
    };

    static defaultProps = {
        checked: false,
        "data-id": "form-checkbox",
        disabled: false,
        inline: false,
        stacked: false,
        renderLabel: defaultRender,
    };

    _handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
        if (this.props.onValueChange) {
            this.props.onValueChange(!!e.target.checked, e);
        }
    };


    render() {
        const labelClassName = classnames(
            "input-checkbox",
            this.props.className,
            getInputWidthClass({
                className: this.props.className,
                defaultClass: null,
                width: this.props.width,
            }),
            {
                disabled: this.props.disabled,
                "form-error": this.props.errorMessage,
                stacked: this.props.stacked,
                inline: this.props.inline,
            }
        );

        const checkBox = this.props.renderLabel(
            {
                "data-id": `${this.props["data-id"]}-container`,
                className: labelClassName,
                helpClassName: this.props.helpClassName,
                helpTarget: this.props.helpTarget,
                disabled: this.props.disabled,
                value: this.props.label,
                hint: this.props.labelHelpText,
                children: [
                    <input data-id={this.props["data-id"]}
                        type="checkbox"
                        name={this.props.name ? this.props.name : this.props["data-id"]}
                        value={this.props.value ? this.props.value: this.props["data-id"]}
                        onChange={this._handleChange}
                        checked={this.props.checked}
                        disabled={this.props.disabled}
                        key="input"
                    />,
                    <div className="icon" key="icon"/>,
                    this.props.errorMessage && (
                        <FormError.Icon data-id={this.props["data-id"] + "-error-message-icon"} key="errorIcon" />
                    ),
                    this.props.errorMessage && (
                        <FormError.Message
                            value={this.props.errorMessage}
                            data-id={this.props["data-id"] + "-error-message"}
                            key="errorMessage"
                        />
                    ),
                ]
            },
            FormLabel
        );


        const conditionalContent = this.props.conditionalContent && this.props.checked
            ?(
                <div
                    className={classnames(
                        "input-checkbox__conditional-content",
                        {
                            "input-checkbox__conditional-content--stacked": this.props.stacked
                        }
                    )}>
                    {this.props.conditionalContent}
                </div>
            )
            : null;

        return (
            this.props.stacked || conditionalContent
                ? <div className={classnames({ "input-checkbox__container--stacked": this.props.stacked })}>
                    {checkBox}
                    {conditionalContent}
                </div>
                : checkBox
        );
    }
}

module.exports=FormCheckbox;

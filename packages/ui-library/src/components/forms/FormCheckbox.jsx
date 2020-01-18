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
 * @param {node} [label]
 *    Label text to be displayed.
 * @param {string} [hint]
 *    Label help text to be displayed.
 * @param {string} [helpHintText]
 *    Alias for hint
 * @param {string} [helpClassName]
 *    CSS classes to set on the HelpHint component.
 * @param {string} [name]
 *    The name value for the input.
 * @param {function} [renderLabel]
 *    Render prop to display FormLabel
 * @param {string} [value]
 *    The value for the input.
* @param {InputWidths} [width]
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
 * @param {boolean} [noSpacing=false]
 *    Removes margins
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
        content: PropTypes.node,
        "data-id": PropTypes.string,
        disabled: PropTypes.bool,
        errorMessage: PropTypes.string,
        helpClassName: PropTypes.string,
        helpTarget: PropTypes.node,
        inline: PropTypes.bool,
        label: PropTypes.node,
        labelHelpText: PropTypes.string, // use hint instead
        hint: PropTypes.string,
        name: PropTypes.string,
        noSpacing: PropTypes.bool,
        onChange: PropTypes.func,
        onValueChange: PropTypes.func,
        stacked: PropTypes.bool,
        renderLabel: PropTypes.func,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        width: PropTypes.oneOf(InputWidthProptypes),
    };

    static defaultProps = {
        checked: false,
        "data-id": "form-checkbox",
        disabled: false,
        inline: false,
        noSpacing: false,
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

        const {
            checked,
            conditionalContent,
            "data-id": dataId,
            helpClassName,
            helpTarget,
            disabled,
            errorMessage,
            label,
            labelHelpText,
            hint = labelHelpText,
            name = dataId,
            noSpacing,
            value = dataId,
            stacked,
        } = this.props;

        const checkBox = this.props.renderLabel(
            {
                "data-id": `${dataId}-container`,
                className: labelClassName,
                helpClassName,
                helpTarget,
                disabled,
                value: label,
                hint,
                children: [
                    <input
                        data-id={dataId}
                        type="checkbox"
                        name={name}
                        value={value}
                        onChange={this._handleChange}
                        checked={checked}
                        disabled={disabled}
                        key="input"
                    />,
                    <div className="icon" key="icon"/>,
                    errorMessage && (
                        <FormError.Icon data-id={`${dataId}-error-message-icon`} key="errorIcon" />
                    ),
                    errorMessage && (
                        <FormError.Message
                            value={errorMessage}
                            data-id={`${dataId}-error-message`}
                            key="errorMessage"
                        />
                    ),
                ],
                noSpacing,
            },
            FormLabel
        );


        const showConditionalContent = conditionalContent && checked
            ? (
                <div
                    className={classnames(
                        "input-checkbox__conditional-content",
                        {
                            "input-checkbox__conditional-content--stacked": stacked
                        }
                    )}>
                    {conditionalContent}
                </div>
            )
            : null;

        return (
            stacked || showConditionalContent
                ? <div className={classnames({ "input-checkbox__container--stacked": stacked })}>
                    {checkBox}
                    {showConditionalContent}
                </div>
                : checkBox
        );
    }
}

module.exports=FormCheckbox;

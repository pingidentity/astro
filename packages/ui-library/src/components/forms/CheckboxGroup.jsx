import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import FormCheckbox from "./FormCheckbox";
import InputRow from "../layout/InputRow";
import { valueProp } from "../../util/PropUtils";

/**
 * @class CheckboxGroup
 * @desc A single-selection component with big icons and titles.
 *
 * @param {string} [className]
 *     Class name(s) to add to the top-level container/div.
 * @param {string} [data-id="checkbox-group"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {array} [values]
 *     List of identifiers for currently-selected options.
 * @param {array<CheckboxGroup~option>} [options]
 *     List of options with value, label, disabled and conditionalContent.
 * @param {function} [onValueChange]
 *     When the list of values changes.
 * @param {function} [onAdd]
 *     When you add to the list of values.
 * @param {function} [onRemove]
 *     When remove from the list of values.
 * @param {Object} [strings]
 *     An object containing the various blurbs of text rendered in the component.
 *
 */

/**
* @typedef CheckboxGroup~option
* @desc An option
*
* @property {node} [conditionalContent]
*     Content that appears below when the option is selected.
* @property {boolean} [disabled = false]
*     Disable the checkbox.
* @property {string} [label]
*     The label.
* @property {node} hint
*     Provides a help hint with provided text
* @property {node} helpTarget
*     Customize the target
* @property {string|number} [value]
*     The value identifier.
*/

const CheckboxGroup = ({
    className,
    "data-id": dataId,
    setCheckboxDataId, // for backward compatibility
    values,
    options,
    onValueChange,
    onAdd,
    onRemove,
}) => {
    const isChecked = option => _.find(values, value => value === option.value) ? true : false;

    const addToValues = value => (
        _.pluck(
            _.filter(options, option => (option.value === value || isChecked(option))),
            "value"
        )
    );

    const removeFromValues = value => (
        _.pluck(
            _.filter(options, option => (option.value !== value && isChecked(option))),
            "value"
        )
    );

    return (
        <div className="stack-sm" data-id={dataId}>
            {_.map(options, (option, index) => {
                if (typeof option !== "object") {
                    option = {
                        value: option,
                        label: option,
                        conditionalContent: ""
                    };
                }

                const handleValueChange = (value, e) => {
                    if (isChecked(option)) {
                        onValueChange(removeFromValues(option.value), e);
                        onRemove(option.value);
                    } else {
                        onValueChange(addToValues(option.value), e);
                        onAdd(option.value);
                    }
                };

                const checked = isChecked(option, values);

                return (
                    <InputRow data-id="" className={className} key={option.value}>
                        <FormCheckbox
                            checked={checked}
                            data-id={setCheckboxDataId
                                ? setCheckboxDataId(option, index)
                                : dataId + "-" + option.value
                            }
                            disabled={option.disabled}
                            helpTarget={option.helpTarget}
                            hint={option.hint || option.labelHelpText}
                            label={option.label}
                            noSpacing
                            onValueChange={handleValueChange}
                            stacked
                            value={option.value}
                        />
                        {((checked && option.conditionalContent) || option.content) &&
                            <div className="checkbox-description">
                                {option.conditionalContent}
                                {option.content}
                            </div>
                        }
                    </InputRow>
                );
            })}
        </div>
    );
};

CheckboxGroup.propTypes = {
    values: PropTypes.arrayOf(valueProp),
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.shape({
            disabled: PropTypes.bool,
            value: valueProp.required,
            label: PropTypes.string,
            labelHelpText: PropTypes.string, // just an alias for hint
            hint: PropTypes.string,
            helpTarget: PropTypes.node,
            conditionalContent: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.node
            ])
        }),
        PropTypes.string
    ])),
    onValueChange: PropTypes.func,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
};

CheckboxGroup.defaultProps = {
    "data-id": "checkbox-group",
    values: [],
    options: [],
    onValueChange: _.noop,
    onAdd: _.noop,
    onRemove: _.noop,
};

export default CheckboxGroup;

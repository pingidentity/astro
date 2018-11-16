import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import classnames from "classnames";
import FormCheckbox from "./FormCheckbox";

/**
 * @class CheckboxGroup
 * @desc A single-selection component with big icons and titles.
 *
 * @param {string} [className]
 *     Class name(s) to add to the top-level container/div
 * @param {string} [data-id="checkbox-group"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {array} [values]
 *     List of identifiers for currently-selected options
 * @param {array<CheckboxGroup~option>} [options]
 *     List of options with value, label, and conditionalContent
 * @param {function} [onValueChange]
 *     When the list of values changes
 * @param {function} [onAdd]
 *     When you add to the list of values
 * @param {function} [onRemove]
 *     When remove from the list of values
 * @param {Object} [strings]
 *     An object containing the various blurbs of text rendered in the component.
 *
 */

 /**
* @typedef CheckboxGroup~option
* @desc An option
*
* @property {string|number} value
*     The value identifier.
* @property {string} label
*     The label.
* @property {node} conditionalContent
*     Content that appears below when the option is selected.
*/

const CheckboxGroup = ({
    className,
    "data-id": dataId,
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
                    if (value) {
                        onValueChange(addToValues(option.value), e);
                        onAdd(option.value);
                    } else {
                        onValueChange(removeFromValues(option.value), e);
                        onRemove(option.value);
                    }
                };

                const checked = isChecked(option, values);

                return (
                    <div className={classnames("input-row", className)} key={option.value}>
                        <FormCheckbox
                            stacked
                            data-id={dataId + "-" + index}
                            label={option.label}
                            value={option.value}
                            checked={checked}
                            onValueChange={handleValueChange}
                            labelHelpText={option.labelHelpText}
                        />
                        {checked && option.conditionalContent &&
                            <div className="checkbox-description">{option.conditionalContent}</div>
                        }
                    </div>
                );
            })}
        </div>
    );
};

CheckboxGroup.propTypes = {
    values: PropTypes.arrayOf(PropTypes.string),
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).required,
            label: PropTypes.string,
            labelHelpText: PropTypes.string,
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

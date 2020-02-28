import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import FormCheckbox from "./FormCheckbox";
import { valueProp } from "../../util/PropUtils";
import Stack from "../layout/Stack";
import CollapsibleLink from "../general/CollapsibleLink";
import classnames from "classnames";

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

const defaultRenderOption = ({
    checked,
    className,
    "data-id": dataId,
    onValueChange,
    option,
}) => (
    <div className={className} key={option.value}>
        <FormCheckbox
            checked={checked}
            data-id={dataId}
            disabled={option.disabled}
            helpTarget={option.helpTarget}
            hint={option.hint || option.labelHelpText}
            label={option.label}
            noSpacing
            onValueChange={_.partial(onValueChange, option)}
            stacked
            value={option.value}
        />
        {((checked && option.conditionalContent) || option.content) &&
            <div className="checkbox-description">
                {option.conditionalContent}
                {option.content}
            </div>
        }
    </div>
);

// this supports the add-on below
class CollapsibleContent extends React.Component {
    state = this.props.initialState;

    _handleToggle = () => this.setState(({ expanded }) => ({ expanded: !expanded }));

    render() {
        const { children, showText, hideText = showText, "data-id": dataId } = this.props;
        const { expanded } = this.state;

        return (
            <>
                <CollapsibleLink
                    data-id={dataId}
                    title={expanded ? (hideText || "Hide") : (showText || "Show")}
                    expanded={expanded}
                    noSpacing
                    onToggle={this._handleToggle}
                />
                {expanded &&
                    children
                }
            </>
        );
    }
}

// this is an add-on for the basic checkbox group
/** @function renderNestedCheckboxes
 * @desc function that can be passed to CheckboxGroup's renderOption prop to enable nested checkboxes
 * @memberof CheckboxGroup
 *
 * @param {object} props
 *
 * @param {boolean} props.checked
 * @desc Whether this option is checked
 * @param {string} className
 * @param {string} data-id
 * @param {function} onValueChange
 * @param {CheckboxGroup~option} option
 * @param {array} option.children
 * @desc Additional property to nest options within options
 * @param {string[]} values
*/
const renderNestedCheckboxes = ({
    showText = option => `Show ${option.children.length}`,
    hideText = "Hide",
} = {}) => ({
    checked: mainChecked,
    className,
    "data-id": dataId,
    onValueChange,
    option: mainOption,
    values,
}) => {
    const renderCheckBox = (option, checked, checkboxDataId, disable = false, indeterminate = false) => (
        <FormCheckbox
            className={classnames({ "input-checkbox--indeterminate": indeterminate })}
            key={option.value}
            checked={checked}
            data-id={checkboxDataId}
            disabled={option.disabled || disable}
            helpTarget={option.helpTarget}
            hint={option.hint || option.labelHelpText}
            label={option.label}
            noSpacing
            onValueChange={_.partial(onValueChange, option)}
            stacked
            value={option.value}
        />
    );

    // if the parent is not checked, but some children are, show as indeterminate
    const indeterminate = (
        mainOption.children &&
        !mainChecked &&
        mainOption.children.reduce((result, option) => (result || values.includes(option.value)), false)
    );
    return (
        <div className={className} key={mainOption.value}>
            {renderCheckBox(mainOption, mainChecked, dataId, false, indeterminate)}
            {mainOption.children &&
                <div className="checkbox-description">
                    <Stack wrappers>
                        <CollapsibleContent
                            data-id={`${dataId}-collapsible`}
                            showText={typeof showText === "function" ? showText(mainOption) : showText}
                            hideText={typeof hideText === "function" ? hideText(mainOption) : hideText}
                            initialState={{ expanded: mainOption.expanded }}
                            key={mainOption.expanded ? "collapsible-expanded" : "collapsible-collapsed"}
                        >
                            <Stack gap="SM">
                                {mainOption.children.map(option => renderCheckBox(
                                    option,
                                    values.includes(mainOption.value) || values.includes(option.value),
                                    `${dataId}-${option.value}`,
                                    values.includes(mainOption.value),
                                ))}
                            </Stack>
                        </CollapsibleContent>
                    </Stack>
                </div>
            }
        </div>
    );
};

const CheckboxGroup = ({
    className,
    "data-id": dataId,
    setCheckboxDataId, // for backward compatibility
    values,
    options,
    onValueChange,
    onAdd,
    onRemove,
    renderOption,
}) => {
    const isChecked = option => _.find(values, value => value === option.value) ? true : false;

    const removeFromValues = value => (
        _.filter(values, eachValue => (eachValue !== value))
    );

    const addToValues = value => (
        [
            ...removeFromValues(value),
            value,
        ]
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

                const handleValueChange = (thisOption, value, e) => {
                    if (isChecked(thisOption)) {
                        onValueChange(removeFromValues(thisOption.value), e);
                        onRemove(thisOption.value);
                    } else {
                        onValueChange(addToValues(thisOption.value), e);
                        onAdd(thisOption.value);
                    }
                };

                const checked = isChecked(option, values);

                return renderOption({
                    checked,
                    className,
                    "data-id": (
                        setCheckboxDataId
                            ? setCheckboxDataId(option, index)
                            : dataId + "-" + option.value
                    ),
                    onValueChange: handleValueChange,
                    option,
                    values,
                });
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
    renderOption: defaultRenderOption,
};

CheckboxGroup.renderNestedCheckboxes = renderNestedCheckboxes;

export default CheckboxGroup;

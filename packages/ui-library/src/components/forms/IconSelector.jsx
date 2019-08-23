import React from "react";
import FormRadioGroup from "./FormRadioGroup";
import Icon from "../general/Icon";
import classnames from "classnames";

/**
 * @class IconSelector
 * @desc This is just a reskinned FormRadioGroup. It takes all the props FormRadioGroup does.
 *      The only difference is its item prop also accept the 'iconName' value.
 *
 * @param {IconSelector~RadioGroupItem[]} items
 *     Array of RadioGroupItem objects to render.
 *
 * @param {IconSelector~RadioGroup} labelText
 *     A string for to display a label above the icons.
 * @see FormRadioGroup
*/

/**
 * @typedef IconSelector~RadioGroupItem
 * @desc Just like a RadioGroupItem plus iconName
 *
 * @property {string} iconName
 *      The name of the displayed icon.
 *
 * @see FormRadioGroup~RadioGroupItem
 */

const IconItem = ({ label, onValueChange, value, checked }) => {
    const onClick = e => onValueChange(value, e);
    const className = classnames("icon-selector-button", {
        "icon-selector-button--selected": checked,
    });

    return (
        <button onClick={onClick} className={className} data-id={`icon-selector-button_${value}`}>
            {<Icon data-id={`icon-selector-icon_${value}`} iconName={label} type="inline" />}
        </button>
    );
};

const renderRadio = props => <IconItem {...props} />;

const IconSelector = ({ items, ...props }) => (
    <FormRadioGroup
        {...props}
        items={items.map(({ iconName, ...item }) => ({ ...item, name: iconName }))}
        renderRadio={renderRadio}
    />
);

IconSelector.propTypes = FormRadioGroup.propTypes;

IconSelector.defaultProps = {
    "data-id": "icon-selector",
};

export default IconSelector;
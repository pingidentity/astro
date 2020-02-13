import PropTypes from "prop-types";
import React from "react";
import _ from "underscore";
import Popover from "../tooltips/Popover";
import Button from "../buttons/Button";
import Icon from "../general/Icon";
import { deprecatedStatelessProp } from "../../util/DeprecationUtils";
import { defaultRender, getClickableA11yProps } from "../../util/PropUtils";

/**
 * @callback DropDownButton~onValueChange
 * @param {object} value
 *     Selected value from menu (ie. the value of the selected item in the options object).
 */

/**
 * @callback DropDownButton~onToggle
 * @param {boolean} isOpen
 *     Current open/closed status before click.
 */

/**
 * @class DropDownButton
 * @desc Button which triggers drop down menu using list of provided options.
 *
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {string} [data-id="drop-down-button"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [iconName="plus"]
 *     Icon for button and items.
 * @param {string} [label]
 *     Label text for button. Not necessary if renderButton is being passed in.
 * @param {DropDownButton~onValueChange} [onValueChange]
 *     Callback to be triggered when the selection changed.
 * @param {DropDownButton~onToggle} [onToggle]
 *     Callback to be triggered when open/closed state changed.
 * @param {boolean} [open=false]
 *     Boolean state of open/closed menu.
 *     When not provided, the component will manage this value.
 * @param {object} options
 *     An object where the keys are the item IDs, and the values are the corresponding labels.
 * @param {function} [renderButton]
 *     Function that gets passed the onClick function for the drop down button;
 *     used to render something other than the default button.
 * @param {string} [title]
 *     Menu title text
 *
 * @example
 *
 *      <DropDownButton title="Drop Down"
 *              data-id="drop-down-menu"
 *              onValueChange={this._changeARule}
 *              options={optionsMenu}
 *      />
 *
 *      <DropDownButton
 *          data-id="drop-down-menu"
 *          title="My menu"
 *          onValueChange={this._changeARule}
 *          open={this.state.menuOpen}
 *          onToggle={this._toggleMenu}
 *          options={{
 *              one: "One",
 *              two: "Two",
 *              three: "Three"
 *          }}
 *     />
 */

const renderOptionNodes = (options, onValueChange, iconName, onToggle) => _.map(options, (value = "", key) => {
    const handleClick = () => {
        onValueChange(key);
        onToggle(false);
    };

    return (
        <a
            data-id={`option-${_.isString(value) ? value.toLowerCase().replace(/[^0-9a-z]/gi, "") : key}`}
            onClick={handleClick}
            key={key}
            className="dropdown-button__option"
            {...getClickableA11yProps(handleClick)}
        >
            <Icon iconName={iconName} className="dropdown-button__option-icon" />
            {value}
        </a>
    );
});

const DropDownButton = ({
    className,
    "data-id": dataId,
    iconName,
    label,
    onToggle,
    onValueChange,
    open,
    options,
    renderButton,
    title
}) => (
    <Popover
        className={className}
        data-id={dataId}
        label={renderButton({
            "data-id": "action",
            iconName,
            inline: true,
            label
        }, Button)}
        onOpen={_.partial(onToggle, false)}
        onClose={_.partial(onToggle, true)}
        open={open}
    >
        {({ onToggle: onPopoverToggle }) => (
            <div className="dropdown-button__options" data-id="options">
                {title &&
                    <div className="dropdown-button__title" data-id="options-title">{title}</div>}
                {renderOptionNodes(
                    options, onValueChange, iconName, open === undefined ? onPopoverToggle : _.noop
                    // checking for undefined open to preserve previous functionality
                )}
            </div>
        )}
    </Popover>
);

DropDownButton.displayName = "DropDownButton";

DropDownButton.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    iconName: PropTypes.string,
    label: PropTypes.string,
    onToggle: PropTypes.func,
    onValueChange: PropTypes.func,
    open: PropTypes.bool,
    options: PropTypes.object,
    renderButton: PropTypes.func,
    stateless: deprecatedStatelessProp,
    title: PropTypes.string,
};

DropDownButton.defaultProps = {
    "data-id": "drop-down-button",
    iconName: "plus",
    onToggle: _.noop,
    onValueChange: _.noop,
    renderButton: defaultRender,
};

export default DropDownButton;
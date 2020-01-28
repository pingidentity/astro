import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import FormRadioInput from "./FormRadioInput";
import FormLabel from "./FormLabel";
import { defaultRender, translateItemsToOptions } from "../../util/PropUtils";
import { noop } from "underscore";

/**
 * @callback FormRadioGroup~onValueChange
 * @param {object} selectedId
 *     Newly selected id value from original items prop
 */

/**
 * @typedef FormRadioGroup~RadioGroupItem
 * @property {boolean} [disabled]
 *     Disables the input.
 * @property {string} [hint]
 *     Text to display in help hint next to the item's name.
 * @param {object} [helpTarget]
 *     An optional icon or image to replace standard help hint icon.
 * @property {boolean} [hidden]
 *     Hides the input.
 * @property {string} [value]
 *     The item's identifier.
 * @property {node} [hint]
 *     Help hint text to display alongside label.
 * @property {string} [label]
 *     The item's display text.
 */

/**
 * @class FormRadioGroup
 * @desc FormRadioGroup renders the any object (key/display) into a group of radio buttons
 *
 * @param {boolean} [autoFocus=false]
 *     Whether or not to auto-focus the element.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {string} [data-id="radio-btn"]
 *     To define the base "data-id" value for top-level HTML container.
 * @property {node} [description]
 *     Description to display below the label.
 * @param {boolean} [disabled=false]
 *     If radio buttons are disabled.
 * @param {string} groupName
 *     Name of the radio group.
 * @param {FormRadioGroup~RadioGroupItem[]} items
 *     Array of RadioGroupItem objects to render.
 * @property {node} [label]
 *     String or JSX element to display the label for the radio button.
 * @param {FormRadioGroup~onValueChange} [onValueChange]
 *     Callback to be triggered when the selection is changed.
 * @param {*} [selected]
 *     The selected "id" from the items object above. If none is passed-in, all radio buttons are left unchecked
 * @param {boolean} [stacked=true]
 *     When true, radios inputs are stacked vertically. When false radio inputs appear on same line
 *     and wrap when out of space.
 * @param {FormRadioGroup~radioRenderer} renderRadio
 *     Renders a single radio button.
 *
 *
 * @example
 *
 *     _changeRadioSelection: function (value) {
 *         this.setState({
 *             radioChoice: value
 *         });
 *     }
 *
 *     var apsConditionTypes = [
 *         {
 *             id: PolicyConditionsConstants.ConditionType.APS_APPLICATIONS,
 *             name: "Applications"
 *         },
 *         {
 *             id: PolicyConditionsConstants.ConditionType.APS_CUSTOMERS,
 *             name: "Customers",
 *             hidden: !this.props.apsCustomersEnabled,
 *             helpHintText: "Sample help hint text"
 *         },
 *         {
 *             id: PolicyConditionsConstants.ConditionType.APS_WHATEVER,
 *             name: "Customers",
 *             disabled: true
 *         }
 *     ];
 *
 *     <FormRadioGroup
 *         data-id="my-radio-group"
 *         groupName="aps_condition_type"
 *         selected={PolicyConditionsConstants.ConditionType.APS_APPLICATIONS}
 *         onValueChange={this._handleChange}
 *         disabled={this._radioGroupDisabled}
 *         items={apsConditionTypes} />
 */

/**
 *  @typedef {function} FormRadioGroup~RadioRenderer
 *  @desc Function for overriding default rendering
 *  @param {FormRadioInput} props
 *      Object of props that can be passed to the component
 *  @param {object} [DefaultComponent=FormRadioInput]
 *      The component that encompasses the default rendering. Accepts props from the props parameter
 */

class FormRadioGroup extends React.Component {

    static propTypes = {
        autoFocus: PropTypes.bool,
        className: PropTypes.string,
        "data-id": PropTypes.string,
        description: PropTypes.node,
        disabled: PropTypes.bool,
        groupName: PropTypes.string.isRequired,
        items: PropTypes.array,
        label: PropTypes.node,
        labelText: PropTypes.node,
        labelHelpText: PropTypes.node,
        onValueChange: PropTypes.func,
        options: PropTypes.array,
        renderRadio: PropTypes.func,
        selected: PropTypes.any,
        stacked: PropTypes.bool,
    };

    static defaultProps = {
        autoFocus: false,
        "data-id": "radio-btn",
        disabled: false,
        onValueChange: noop,
        renderRadio: defaultRender,
        stacked: true,
    };

    _handleChange = (value) => {
        this.props.onValueChange(value);
    };

    _getRadioButtons = () => {
        const {
            className,
            "data-id": dataId,
            disabled,
            groupName,
            items,
            options = translateItemsToOptions(items),
            renderRadio,
            selected,
            stacked,
            autoFocus
        } = this.props;

        return options.map(({
            helpHintText,
            hint = helpHintText,
            helpTarget,
            hidden,
            value,
            label,
            ...option
        }) => {
            const radioDisabled = disabled || option.disabled;

            const radioClassName = classnames("input-radio", "group", className, {
                stacked: stacked,
                disabled: radioDisabled,
                hidden,
            });

            return renderRadio({
                className: radioClassName,
                key: value,
                label,
                hint,
                "data-id": dataId,
                name: groupName,
                value,
                checked: String(value) === String(selected),
                onValueChange: this._handleChange,
                disabled: radioDisabled,
                helpTarget: helpTarget,
                autoFocus: autoFocus && String(value) === String(selected)
            }, FormRadioInput);
        });
    };

    render() {
        const {
            labelText,
            label = labelText,
        } = this.props;

        return (
            label ? (
                <FormLabel data-id={this.props["data-id"]}
                    description={this.props.description}
                    disabled={this.props.disabled}
                    value={label}
                    hint={this.props.labelHelpText}
                    className="list">{this._getRadioButtons()}</FormLabel>
            ): <div data-id={this.props["data-id"]}
                className="list">
                {this._getRadioButtons()}
            </div>
        );
    }
}

export default FormRadioGroup;


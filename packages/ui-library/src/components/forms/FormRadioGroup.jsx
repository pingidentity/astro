import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import Utils from "../../util/Utils";
import FormRadioInput from "./FormRadioInput";
import FormLabel from "./FormLabel";

/**
 * @callback FormRadioGroup~onValueChange
 * @param {object} selectedId
 *     Newly selected id value from original items prop
 */

/**
 * @typedef FormRadioGroup~RadioGroupItem
 * @property {string} id
 *     The item's identifier
 * @property {string} name
 *     The item's display text
 * @property {string} helpHintText
 *     Text to display in help hint next to the item's name
 * @param {object} [helpTarget]
 *     An optional icon or image to replace standard help hint icon
 * @property {boolean} disabled
 *     Disables the input
 * @property {boolean} hidden
 *     Hides the input
 */

/**
 * @class FormRadioGroup
 * @desc FormRadioGroup renders the any object (key/display) into a group of radio buttons
 *
 * @param {string} [data-id="radio-btn"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 *
 * @param {string} groupName
 *     Name of the radio group
 * @param {FormRadioGroup~RadioGroupItem[]} items
 *     Array of RadioGroupItem objects to render.
 * @param {*} [selected]
 *     The selected "id" from the items object above. If none is passed-in, all radio buttons are left unchecked
 * @param {FormRadioGroup~onValueChange} [onValueChange]
 *     Callback to be triggered when the selection is changed.
 *
 * @param {boolean} [stacked=true]
 *     When true, radios inputs are stacked vertically. When false radio inputs appear on same line
 *     and wrap when out of space.
 * @param {boolean} [disabled=false]
 *     If radio buttons are disabled
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
               helpHintText: "Sample help hint text"
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

class FormRadioGroup extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        groupName: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
        selected: PropTypes.any,
        onValueChange: PropTypes.func,
        disabled: PropTypes.bool,
        stacked: PropTypes.bool,
        label: PropTypes.string,
        labelText: PropTypes.string,
        labelHelpText: PropTypes.string,
    };

    static defaultProps = {
        "data-id": "radio-btn",
        stacked: true,
        disabled: false
    };

    _handleChange = (value) => {
        this.props.onValueChange(value);
    };

    _getRadioButtons = () => {
        return this.props.items.map((item) => {
            var radioDisabled = this.props.disabled || item.disabled;

            var className = classnames("input-radio", "group", this.props.className, {
                stacked: this.props.stacked,
                disabled: radioDisabled,
                hidden: item.hidden
            });

            return (
                <FormRadioInput
                    className={className}
                    key={item.id}
                    label={item.name}
                    hint={item.helpHintText}
                    data-id={this.props["data-id"]}
                    name={this.props.groupName}
                    value={item.id}
                    checked={String(item.id) === String(this.props.selected)}
                    onValueChange={this._handleChange}
                    disabled={radioDisabled}
                    helpTarget={item.helpTarget}
                />
            );
        });
    };

    componentWillMount() {
        if (!Utils.isProduction()) {
            if (this.props.id) {
                throw new Error(Utils.deprecatePropError("id", "data-id"));
            }
            if (this.props.onChange) {
                throw new Error(Utils.deprecatePropError("onChange", "onValueChange"));
            }
        }
    }

    render() {
        return (
            this.props.label ? (
                <FormLabel data-id={this.props["data-id"]}
                    disabled={this.props.disabled}
                    value={this.props.label || this.props.labelText}
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


var React = require("react"),
    classnames = require("classnames"),
    Utils = require("../../util/Utils"),
    FormLabel = require("./FormLabel.jsx");

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
 * @param {string} [id]
 *     DEPRECATED. Use "data-id" instead.
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
 * @param {FormRadioGroup~onValueChange} [onChange]
 *     DEPRECATED. Use "onValueChange" instead.
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

var FormRadioGroup = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        groupName: React.PropTypes.string.isRequired,
        items: React.PropTypes.array.isRequired,
        selected: React.PropTypes.any,
        onValueChange: React.PropTypes.func,
        onChange: React.PropTypes.func,
        disabled: React.PropTypes.bool,
        stacked: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            "data-id": "radio-btn",
            stacked: true,
            disabled: false
        };
    },

    _handleChange: function (e) {
        var onValueChange = this.props.onValueChange || this.props.onChange;
        onValueChange(e.target.value);
    },

    _getRadioButtons: function () {
        return this.props.items.map(function (item) {
            var radioDisabled = this.props.disabled || item.disabled;

            var className = classnames("input-radio", "group", this.props.className, {
                stacked: this.props.stacked,
                disabled: radioDisabled,
                hidden: item.hidden
            });

            var dataId = this.props.id || this.props["data-id"];

            return (
                <FormLabel
                    className={className}
                    key={item.id}
                    data-id={dataId + "_label_" + item.id}
                    value={item.name}
                    hint={item.helpHintText}
                    helpTarget={item.helpTarget}>
                    <input
                        data-id={dataId + "_" + item.id}
                        type="radio"
                        name={this.props.groupName}
                        value={item.id}
                        checked={String(item.id) === String(this.props.selected)}
                        onChange={this._handleChange}
                        disabled={radioDisabled} />
                    <div className="circle"></div>

                </FormLabel>
            );
        }.bind(this));
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            if (this.props.id) {
                console.warn(Utils.deprecateMessage("id", "data-id"));
            }
            if (this.props.onChange) {
                console.warn(Utils.deprecateMessage("onChange", "onValueChange"));
            }
        }
    },

    render: function () {
        var dataId = this.props.id || this.props["data-id"];
        return <div data-id={dataId} className="list">{this._getRadioButtons()}</div>;
    }

});

module.exports = FormRadioGroup;

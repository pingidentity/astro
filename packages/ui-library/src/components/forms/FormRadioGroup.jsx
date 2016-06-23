var React = require("react"),
    classnames = require("classnames");

/**
 * @callback FormRadioGroup~onChangeCallback
 * @param {object} selectedId - newly selected id value from original items prop
 */

/**
 * @typedef FormRadioGroup~RadioGroupItems
 * @property {String}  id       The item's identifier
 * @property {String}  name     The item's display text
 * @property {Boolean} disabled Disables the input
 * @property {Boolean} hidden   Hides the input
 */

/**
 * @class FormRadioGroup
 * @desc FormRadioGroup renders the any object (key/display) into a group of radio buttons
 *
 * @param {string} className - CSS class or classes to add to containing radio button labels
 * @param {string} groupName - the name of the radio group (required)
 * @param {string} id - add data-id to radio label and input.
 *          input is assigned data-id attribute as follows: "_{id}"
 *          label is assigned data-id attribute as follows: "_label_{id}"
 * @param {RadioGroupItems} items - array of objects to render (required)
 *          format: <code>[{id: "val", name: "val", disabled: true}, {id: "val", name: "val", hidden: true}...]</code>
 * @param {FormRadioGroup~onChangeCallback} onChange - the callback to be triggered when the selection changed
 * @param {FormRadioGroup~onChangeCallback} onValueChange - the callback to be triggered when the selection changed
 * @param {*} selected - the selected "id" from the items object above. If none is passed-in, all radio buttons
 *          are left unchecked
 * @param {boolean} [stacked=true]- When true, radios inputs are stacked vertically. When false radio
 *          inputs appear on same line and wrap when out of space.
 * @param {boolean} [disabled=false] - if radio buttons are disabled
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
 *             hidden: !this.props.apsCustomersEnabled
 *         },
 *         {
 *             id: PolicyConditionsConstants.ConditionType.APS_WHATEVER,
 *             name: "Customers",
 *             disabled: true
 *         }
 *     ];
 *
 *     <FormRadioGroup
 *         id="my-radio-group"
 *         groupName="aps_condition_type"
 *         selected={PolicyConditionsConstants.ConditionType.APS_APPLICATIONS}
 *         onChange={this._changeRadioSelection}
 *         disabled={this._radioGroupDisabled}
 *         items={apsConditionTypes} />
 */

var FormRadioGroup = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        groupName: React.PropTypes.string.isRequired,
        id: React.PropTypes.string,
        items: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func,
        onValueChange: React.PropTypes.func,
        selected: React.PropTypes.any,
        stacked: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            id: "radio-btn",
            stacked: true,
            disabled: false
        };
    },

    _handleChange: function (e) {
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
        if (this.props.onValueChange) {
            this.props.onValueChange(e.target.value);
        }
    },

    _getRadioButtons: function () {
        return this.props.items.map(function (item) {
            var radioDisabled = this.props.disabled || item.disabled;

            var className = classnames("input-radio", this.props.className, {
                stacked: this.props.stacked,
                disabled: radioDisabled,
                hidden: item.hidden
            });

            return (
                <label
                    className={className}
                    key={item.id}
                    data-id={this.props.id + "_label_" + item.id}>

                    <input
                        data-id={this.props.id + "_" + item.id}
                        type="radio"
                        name={this.props.groupName}
                        value={item.id}
                        checked={String(item.id) === String(this.props.selected)}
                        onChange={this._handleChange}
                        disabled={radioDisabled} />
                    <div className="circle"></div>
                    {item.name}
                </label>
            );
        }.bind(this));
    },

    render: function () {
        return <div className="list">{this._getRadioButtons()}</div>;
    }

});

module.exports = FormRadioGroup;

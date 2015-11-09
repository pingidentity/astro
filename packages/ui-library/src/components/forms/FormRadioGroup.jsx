var React = require("react/addons"),
    css = require("classnames"),
    _ = require("underscore");


/**
 * @module FormRadioGroup
 * @desc FormRadioGroup renders the any object (key/display) into a group of radio buttons
 *
 * @param {string} className - CSS class or classes to add to containing radio button labels
 * @param {string} groupName - the name of the radio group (required)
 * @param {string} id - add data-id to radio label and input.
 *          input is assigned data-id attribute as follows: "_{id}"
 *          label is assigned data-id attribute as follows: "_label_{id}"
 * @param {Object} items - array of objects to render (required)
 *          format: [{"id": "val", "name": "val"}, {"id": "val", "name": "val"}...]
 * @param {function} onChange - the callback function called when the selected radio button changes
 * @param {string} selected - the selected "id" from the items object above. If none is passed-in, all radio buttons
 *          are left unchecked
 * @param {boolean} stacked - {true} by default. When true, radios inputs are stacked vertically. When false radio
 *          inputs appear on same line and wrap when out of space.
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
 *             "id": PolicyConditionsConstants.ConditionType.APS_APPLICATIONS,
 *             "name": "Applications"
 *         },
 *         {
 *             "id": PolicyConditionsConstants.ConditionType.APS_CUSTOMERS,
 *             "name": "Customers"
 *         }
 *     ];
 *
 *     <FormRadioGroup
 *         id="my-radio-group"
 *         groupName="aps_condition_type"
 *         selected={PolicyConditionsConstants.ConditionType.APS_APPLICATIONS}
 *         onChange={this._changeRadioSelection}
 *         items={apsConditionTypes} />
 */

var FormRadioGroup = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        groupName: React.PropTypes.string.isRequired,
        id: React.PropTypes.string,
        items: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired,
        selected: React.PropTypes.string,
        stacked: React.PropTypes.bool
    },

    _onSelectionChange: function (value) {
        this.props.onChange(value);
    },

    getDefaultProps: function () {
        return {
            id: "radio-btn",
            stacked: true
        };
    },

    render: function () {
        var self = this,
            radioCss = {
                stacked: this.props.stacked
            };

        if (this.props.className) {
            radioCss[this.props.className] = true;
        }

        var radioButtonNodes =
            _.map(this.props.items, function (item) {
                var onChange = _.partial(self._onSelectionChange, item.id);

                return (
                    <label
                        className={css("input-radio", radioCss)}
                        key={item.id}
                        data-id={self.props.id + "_label_" + item.id}>

                        <input
                            data-id={self.props.id + "_" + item.id}
                            type="radio"
                            name={self.props.groupName}
                            value={item.id}
                            checked={String(item.id) === String(self.props.selected)}
                            onChange={onChange}/>
                        <div className="circle"></div>
                        {item.name}
                    </label>
                );
            });

        return (
            <div className="input-row list">
                {radioButtonNodes}
            </div>
        );
    }

});

module.exports = FormRadioGroup;

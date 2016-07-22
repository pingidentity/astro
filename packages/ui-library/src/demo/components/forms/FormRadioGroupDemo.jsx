var React = require("react"),
    FormRadioGroup = require("../../../components/forms/FormRadioGroup.jsx");

/**
* @name FormRadioGroupDemo
* @memberof FormRadioGroup
* @desc A demo for FormRadioGroup
*/
var FormRadioGroupDemo = React.createClass({

    getInitialState: function () {
        return {
            showSpinner: true,
            selectedId1: 1,
            selectedId2: 2,
            selectedId3: 3,
            selectedId4: 4
        };
    },

    _handleChange: function (i, value) {
        var newState = {};
        newState["selectedId" + i] = value;
        this.setState(newState);
    },

    render: function () {
        var radioItems = [
            { id: "1", name: "Radio 1" },
            { id: "2", name: "Radio 2" },
            { id: "3", name: "Radio 3", disabled: true }
        ];

        var radioItemsWithHidden = [
            { id: "1", name: "Radio A" },
            { id: "2", name: "Radio B" },
            { id: "3", name: "Radio C" },
            { id: "4", name: "Radio D" }
        ];
        radioItemsWithHidden[Math.round(Math.random() * 3)].hidden = true;

        return (
            <div>
                <div className="input-row">
                    <label className="detached">Horizonal Alignment</label>
                    <FormRadioGroup
                        groupName="horizontal-group"
                        selected={this.state.selectedId1}
                        onValueChange={this._handleChange.bind(this, 1)}
                        items={radioItems}
                        stacked={false}
                    />
                </div>

                <div className="input-row">
                    selected id = {this.state.selectedId1}
                </div>

                <div className="input-row">
                    <label className="detached">Stacked/Vertical Alignment</label>
                    <FormRadioGroup
                        groupName="stacked-group"
                        selected={this.state.selectedId2}
                        onValueChange={this._handleChange.bind(this, 2)}
                        items={radioItems}
                    />
                </div>

                <div className="input-row">
                    selected id = {this.state.selectedId2}
                </div>

                <div className="input-row">
                    <label className="detached">Disabled Radio Group</label>
                    <FormRadioGroup
                        groupName="disabled-stacked-group"
                        selected={this.state.selectedId3}
                        onValueChange={this._handleChange.bind(this, 3)}
                        items={radioItems}
                        disabled={true}
                    />
                </div>

                <div className="input-row">
                    <label className="detached">Radio Group With Random Hidden</label>
                    <FormRadioGroup
                        groupName="hidden-stacked-group"
                        selected={this.state.selectedId4}
                        onValueChange={this._handleChange.bind(this, 4)}
                        items={radioItemsWithHidden}
                    />
                </div>

            </div>
        );
    }
});


module.exports = FormRadioGroupDemo;

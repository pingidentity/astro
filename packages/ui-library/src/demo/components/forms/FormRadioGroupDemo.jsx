var React = require("react"),
    FormRadioGroup = require("../../../components/forms/FormRadioGroup.jsx");

var FormRadioGroupDemo = React.createClass({

    getInitialState: function () {
        return {
            showSpinner: true,
            selectedId1: 1,
            selectedId2: 2,
            selectedId3: 3
        };
    },

    _onChange: function (i, value) {
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

        return (
                <div>
                    <label className="standalone">Horizonal Alignment</label>
                    <FormRadioGroup
                        groupName="horizontal-group"
                        selected={this.state.selectedId1}
                        onChange={this._onChange.bind(this, 1)}
                        items={radioItems}
                        stacked={false}
                    />
                    <div>
                        selected id = {this.state.selectedId1}
                    </div>
                    <br /><br />
                    <label className="standalone">Stacked/Vertical Alignment</label>
                    <FormRadioGroup
                        groupName="stacked-group"
                        selected={this.state.selectedId2}
                        onChange={this._onChange.bind(this, 2)}
                        items={radioItems}
                    />
                    <div>
                        selected id = {this.state.selectedId2}
                    </div>
                    <br /><br />
                    <label className="standalone">Disabled Radio Group</label>
                    <FormRadioGroup
                        groupName="disabled-stacked-group"
                        selected={this.state.selectedId3}
                        onChange={this._onChange.bind(this, 2)}
                        items={radioItems}
                        disabled={true}
                    />
                </div>

        );
    }

});


module.exports = FormRadioGroupDemo;

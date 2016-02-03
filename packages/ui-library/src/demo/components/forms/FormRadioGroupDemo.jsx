var React = require("react/addons"),
    FormRadioGroup = require("../../../components/forms/FormRadioGroup.jsx");

var FormRadioGroupDemo = React.createClass({

    getInitialState: function () {
        return {
            showSpinner: true,
            selectedId1: 1,
            selectedId2: 1
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
            { id: "3", name: "Radio 3" }
        ];

        return (
                <div>

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
                    <FormRadioGroup
                        groupName="stacked-group"
                        selected={this.state.selectedId2}
                        onChange={this._onChange.bind(this, 2)}
                        items={radioItems}
                    />
                    <div>
                        selected id = {this.state.selectedId2}
                    </div>
                </div>

        );
    }

});


module.exports = FormRadioGroupDemo;

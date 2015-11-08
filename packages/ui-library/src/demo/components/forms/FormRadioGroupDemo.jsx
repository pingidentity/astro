var React = require("react/addons"),
    FormRadioGroup = require("../../../components/forms/FormRadioGroup.jsx");

var FormRadioGroupDemo = React.createClass({

    getInitialState: function () {
        return {
            showSpinner: true,
            selectedId: 2
        };
    },

    _onChange: function (selectedId) {
        this.setState({
            selectedId: selectedId
        });
    },

    render: function () {
        var radioItems = [
            { id: "1", name: "Radio 1" },
            { id: "2", name: "Radio 2" },
            { id: "3", name: "Radio 3" }
        ];

        return (
            /* jshint ignore:start */
                <div>
                    <FormRadioGroup
                        groupName="aps_condition_type"
                        selected={this.state.selectedId}
                        onChange={this._onChange}
                        items={radioItems}
                    />
                    <div>
                        Selected radio id = {this.state.selectedId}
                    </div>
                </div>

            /* jshint ignore:end */
        );
    }

});


module.exports = FormRadioGroupDemo;

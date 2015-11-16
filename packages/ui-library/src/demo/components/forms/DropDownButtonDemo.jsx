var React = require("react/addons"),
    DropDownButton = require("../../../components/forms/DropDownButton.jsx");

var DropDownButtonDemo = React.createClass({

    getInitialState: function () {
        return {
            selectedLabel: "None."
        };
    },

    _changeARule: function (selectedLabel) {
        this.setState({
            selectedLabel: selectedLabel
        });
    },

    _dropDownOptions: function () {

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two",
            optionThree: "Option Three",
            optionFour: "Option Four",
            optionFive: "Option Five",
            optionSix: "Option Six",
            optionSeven: "Option Seven"
        };

        return menu;
    },

    render: function () {

        var optionsMenu = this._dropDownOptions();

        return (
            <div>
                <DropDownButton
                    title="Options Title"
                    onSelect={this._changeARule}
                    options={optionsMenu}
                />
                <br/><br/>
                <div>
                    Selected menu item = {this.state.selectedLabel}
                </div>
            </div>
        );
    }

});

module.exports = DropDownButtonDemo;

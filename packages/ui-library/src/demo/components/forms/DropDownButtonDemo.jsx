var React = require("react/addons"),
    DropDownButton = require("../../../components/forms/DropDownButton.jsx");

var DropDownButtonDemo = React.createClass({

    getInitialState: function () {
        return {
            selectedLabel: "None.",
            open: false
        };
    },

    _onToggle: function () {
        this.setState({
            open: !this.state.open
        });
    },

    _onSelect: function (selectedLabel) {
        this.setState({
            selectedLabel: this._dropDownOptions()[selectedLabel],
            open: false
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
                    label="New Option"
                    onSelect={this._onSelect}
                    onToggle={this._onToggle}
                    open={this.state.open}
                    controlled={true}
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

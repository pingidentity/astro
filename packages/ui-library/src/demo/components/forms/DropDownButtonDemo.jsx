var React = require("react"),
    DropDownButton = require("../../../components/forms/DropDownButton");

/**
* @name DropDownButtonDemo
* @memberof DropDownButton
* @desc A demo for DropDownButton
*/
class DropDownButtonDemo extends React.Component {
    state = {
        selectedLabel: "None.",
        open: false
    };

    _onToggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    _onValueChange = (selectedLabel) => {
        this.setState({
            selectedLabel: this._dropDownOptions()[selectedLabel],
            open: false
        });
    };

    _dropDownOptions = () => {

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
    };

    render() {

        var optionsMenu = this._dropDownOptions();

        return (
            <div>
                <DropDownButton
                    title="Options Title"
                    label="New Option"
                    onValueChange={this._onValueChange}
                    onToggle={this._onToggle}
                    open={this.state.open}
                    stateless={true}
                    options={optionsMenu}
                />
                <br/><br/>
                <div>
                    Selected menu item = {this.state.selectedLabel}
                </div>
            </div>
        );
    }
}

module.exports = DropDownButtonDemo;

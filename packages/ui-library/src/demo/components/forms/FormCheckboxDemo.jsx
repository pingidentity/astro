var React = require("react");
var FormCheckbox = require("./../../../components/forms/FormCheckbox");

/**
* @name FormCheckboxDemo
* @memberof FormCheckbox
* @desc A demo for FormCheckbox
*/
class FormCheckboxDemo extends React.Component {
    constructor(props, context) {
        super(props, context);
        var initialState = {};

        for (var i=1; i<=this._numDemos; i+=1) {
            initialState["checkboxChecked" + i] = Math.random() < 0.5;
            this["_onChange" + i] = this._onChange.bind(this, i);
        }

        this.state = initialState;
    }

    _numDemos = 12;

    _onChange = (i, event) => {
        var newState = {};
        newState["checkboxChecked" + i] = event.target.checked;
        this.setState(newState);
    };

    render() {
        return (
            <div>
                <div className="input-row">
                    <FormCheckbox
                        label = {"Regular Checkbox; checked: " + this.state.checkboxChecked1}
                        value = ""
                        onChange = {this._onChange1}
                        checked = {this.state.checkboxChecked1}
                    />
                </div>
                <div className="input-row">
                    <FormCheckbox
                        label = {"Default Checked; checked: " + this.state.checkboxChecked2}
                        value = ""
                        onChange = {this._onChange2}
                        checked = {this.state.checkboxChecked2}
                    />
                </div>
                <div className="input-row">
                    <FormCheckbox
                        label = {"Disabled; checked: " + this.state.checkboxChecked3}
                        value = ""
                        onChange = {this._onChange3}
                        checked = {this.state.checkboxChecked3}
                        disabled = {true}
                        labelHelpText = "Disabled with help"
                    />
                </div>
                <div className="input-row">
                    <FormCheckbox
                        label = {"With added Help Text; checked: " + this.state.checkboxChecked4}
                        value = ""
                        onChange = {this._onChange4}
                        checked = {this.state.checkboxChecked4}
                        labelHelpText = "Check this box!"
                    />
                </div>
                <div className="input-row">
                    <label className="detached">
                        Example of Stacked Options
                    </label>
                    <FormCheckbox
                        label="Stacked Checkbox"
                        onChange={this._onChange5}
                        checked={this.state.checkboxChecked5}
                        className="stacked"
                    />
                    <FormCheckbox
                        label="Stacked Checkbox"
                        onChange={this._onChange6}
                        checked={this.state.checkboxChecked6}
                        className="stacked"
                    />
                    <FormCheckbox
                        label="Stacked Checkbox"
                        onChange={this._onChange7}
                        checked={this.state.checkboxChecked7}
                        className="stacked"
                    />
                </div>
                <div className="input-row">
                    <label className="detached">
                        Example of Inline Options together and alone
                    </label>
                    <FormCheckbox
                        label="Inline Checkbox"
                        onChange={this._onChange8}
                        checked={this.state.checkboxChecked8}
                        className="inline"
                    />
                    <FormCheckbox
                        label="Inline Checkbox"
                        onChange={this._onChange9}
                        checked={this.state.checkboxChecked9}
                        className="inline"
                    />
                    <FormCheckbox
                        label="Inline Checkbox"
                        onChange={this._onChange10}
                        checked={this.state.checkboxChecked10}
                        className="inline"
                    />
                </div>
                <div className="input-row">
                    <FormCheckbox
                        label="Single Inline Checkbox"
                        onChange={this._onChange11}
                        checked={this.state.checkboxChecked11}
                        className="inline"
                    />
                </div>
                <div className="input-row">
                    <FormCheckbox
                        label={"With Error Message; checked: " + this.state.checkboxChecked12}
                        value=""
                        onChange={this._onChange12}
                        checked={this.state.checkboxChecked12}
                        errorMessage="An error has occurred"
                    />
                </div>
            </div>
        );
    }
}

module.exports = FormCheckboxDemo;

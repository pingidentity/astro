var React = require("react");
var FormSelectField = require("./../../../components/forms/form-select-field");

/**
* @name FormSelectFieldDemo
* @memberof FormSelectField
* @desc A demo for FormSelectField
*/
class FormSelectFieldDemo extends React.Component {
    constructor(props, context) {
        super(props, context);
        var initialState = {};

        for (var i=1; i<=this._numDemos; i+=1) {
            initialState["fieldValue" + i] = i;
            this["_changeCallback" + i] = this._changeCallback.bind(this, i);
        }

        this.state = initialState;
    }

    _numDemos = 5;

    _changeCallback = (index, event) => {
        var stateObj = {};
        stateObj["fieldValue" + index] = event.target.value;
        this.setState(stateObj);
    };

    render() {
        // data may be either an array of objects or an object. Only the array will insure display order of options
        var optionsArr = [
            { value: 1, label: "one" },
            { value: 2, label: "two" },
            { value: 3, label: "three" },
            { value: 4, label: "four " },
            { value: 5, label: "five " }
        ];

        return (
            <div>
                <div className="input-row">
                    <FormSelectField controlled={true}
                        label="Basic"
                        options={optionsArr}
                        onChange={this._changeCallback1}
                        value={this.state.fieldValue1}
                    />
                    <div>
                        selected option value: {this.state.fieldValue1}
                    </div>
                </div>
                <div className="input-row">
                    <FormSelectField controlled={true}
                        label="Required Select With None Option"
                        options={optionsArr}
                        noneOption={{ label: "Select an option", value: "0" }}
                        onChange={this._changeCallback2}
                        required={true}
                        value={this.state.fieldValue2}
                    />
                    <div>
                        selected option value: {this.state.fieldValue2}
                    </div>
                </div>
                <div className="input-row">
                    <FormSelectField controlled={true}
                        label="With error"
                        options={optionsArr}
                        onChange={this._changeCallback3}
                        errorMessage="The error message appears when hovering over the input or the error icon."
                        required={true}
                        value={this.state.fieldValue3}
                    />
                    <div>
                        selected option value: {this.state.fieldValue3}
                    </div>
                </div>
                <div className="input-row">
                    <FormSelectField controlled={true}
                        label="With help text"
                        labelHelpText="Help text goes here!"
                        options={optionsArr}
                        onChange={this._changeCallback4}
                        value={this.state.fieldValue4}
                    />
                    <div>
                        selected option value: {this.state.fieldValue4}
                    </div>
                </div>
                <div className="input-row">
                    <FormSelectField controlled={true}
                        label="Disabled With help text"
                        labelHelpText="Help text goes here!"
                        options={optionsArr}
                        onChange={this._changeCallback5}
                        value={this.state.fieldValue5}
                        disabled={true}
                    />
                    <div>
                        selected option value: {this.state.fieldValue5}
                    </div>
                </div>
            </div>
        );
    }
}


module.exports = FormSelectFieldDemo;

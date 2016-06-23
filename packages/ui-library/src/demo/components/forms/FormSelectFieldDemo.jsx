var React = require("react");
var FormSelectField = require("./../../../components/forms/FormSelectField");

/**
 * A demo for FormSelectField.
 */
var FormSelectFieldDemo = React.createClass({

    getInitialState: function () {
        return {
            fieldValue1: "1",
            fieldValue2: "1",
            fieldValue3: "1",
            fieldValue4: "1",
            fieldValue5: "1"
        };
    },

    _changeCallback: function (index, event) {
        var stateObj = {};
        stateObj["fieldValue" + index] = event.target.value;
        this.setState(stateObj);
    },

    render: function () {
        // data may be either an array of objects or an object. Only the array will insure display order of options
        var optionsArr = [
                { value: 1, label: "one" },
                { value: 2, label: "two" },
                { value: 3, label: "three" },
                { value: 4, label: "four " },
                { value: 5, label: "five " }
            ],
            optionsObj = {
                1: "one",
                2: "two",
                3: "three",
                4: "four",
                5: "five"
            };

        return (
            <div>
                <div className="input-row">
                    <FormSelectField
                        label="Basic"
                        options={optionsObj}
                        onChange={this._changeCallback.bind(this, 1)}
                        value={this.state.fieldValue1}
                    />
                    <div>
                        selected option value: {this.state.fieldValue1}
                    </div>
                </div>
                <div className="input-row">
                    <FormSelectField
                        label="Required Select With None Option"
                        options={optionsArr}
                        noneOption={true}
                        noneOptionText="Select an option"
                        noneOptionValue="0"
                        onChange={this._changeCallback.bind(this, 2)}
                        isRequired={true}
                        value={this.state.fieldValue2}
                    />
                    <div>
                        selected option value: {this.state.fieldValue2}
                    </div>
                </div>
                <div className="input-row">
                    <FormSelectField
                        label="With error message"
                        options={optionsObj}
                        onChange={this._changeCallback.bind(this, 3)}
                        errorMessage="error!"
                        value={this.state.fieldValue3}
                    />
                    <div>
                        selected option value: {this.state.fieldValue3}
                    </div>
                </div>
                <div className="input-row">
                    <FormSelectField
                        label="With help text"
                        labelHelpText="Help text goes here!"
                        options={optionsObj}
                        onChange={this._changeCallback.bind(this, 4)}
                        value={this.state.fieldValue4}
                    />
                    <div>
                        selected option value: {this.state.fieldValue4}
                    </div>
                </div>
                <div className="input-row">
                    <FormSelectField
                        label="Disabled With help text"
                        labelHelpText="Help text goes here!"
                        options={optionsObj}
                        onChange={this._changeCallback.bind(this, 5)}
                        value={this.state.fieldValue5}
                        isDisabled={true}
                    />
                    <div>
                        selected option value: {this.state.fieldValue5}
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = FormSelectFieldDemo;

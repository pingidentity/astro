var React = require("react");
var FormIntegerField = require("./../../../components/forms/FormIntegerField.jsx");

/**
 * A demo for FormTextField.
 */
var FormIntegerFieldDemo = React.createClass({

    getInitialState: function () {
        return {
            integerField1: "",
            integerField2: 8800,
            integerField3: "",
            integerField4: "",
            integerField4Error: "",
            integerField5: "",
            integerField5Error: "",
            integerField6: "",
            integerField7Mode: "read_only",
            integerField7Disabled: false
        };
    },

    _changeCallback: function (value) {
        this.setState({
            integerField1: value
        });
    },

    _changeCallback2: function (value) {
        this.setState({
            integerField2: value
        });
    },

    _changeCallback3: function (value) {
        this.setState({
            integerField3: value
        });
    },

    _changeCallback4: function (value) {
        this.setState({
            integerField4: value
        });
        if (value >= 0 && value <= 100) {
            this.setState({
                integerField4Error: ""
            });
        }
    },
    _blurCallback4: function (value) {

        this.setState({
            integerField4: value
        });
        if (value < 0 | value > 100) {
            this.setState({
                integerField4Error: "Please enter a number between 0 and 100"
            });
        }

        else {
            this.setState({
                integerField4Error: ""
            });
        }

    },
    _changeCallback5: function (value) {

        if (value !== "" && (value % 5 !== 0 || value < 50 || value > 300 )) {
            this.setState({
                integerField5Error: "Number must be an increment of 5 between 50 and 300"
            });
        }
        else {
            this.setState({
                integerField5Error: ""
            });
        }
        this.setState({
            integerField5: value
        });
    },
    _changeCallback6: function (value) {
        this.setState({
            integerField6: value
        });
    },
    _changeMode: function (value,event) {
        var name = event.target.name;
        if (name === "read-only") {
            this.setState({
                integerField7Mode: "read_only",
                integerField7Disabled: false
            });
        }
        else {
            this.setState({
                integerField7Mode: "edit",
                integerField7Disabled: true
            });
        }

    },

    render: function () {
        var originalValueForUndo = 8800;

        return (
            <div>
                <div className="input-row">
                    <FormIntegerField
                        labelText={"Basic - Value : " + this.state.integerField1}
                        value = {this.state.integerField1}
                        onChange = {this._changeCallback}
                    />
                </div>
                <div className="input-row">
                    <FormIntegerField
                        originalValue = {originalValueForUndo}
                        labelText={"With default value and undo - Value : " + this.state.integerField2}
                        value = {this.state.integerField2}
                        onChange = {this._changeCallback2}
                    />
                </div>
                <div className="input-row">
                    <FormIntegerField
                        onChange = {this._changeCallback3}
                        data-id = "integerField3"
                        labelText={"Required - Value : " + this.state.integerField3}
                        value = {this.state.integerField3}
                        isRequired = {true}
                        placeholder = "This field is required"
                    />
                </div>
                <div className="input-row">
                    <FormIntegerField
                        onChange = {this._changeCallback6}
                        data-id = "integerField6"
                        labelText={["Range 0 - 100 - Value : " + this.state.integerField6]}
                        value = {this.state.integerField6}
                        placeholder = "Enter an integer between 0 and 100"
                        max = {100}
                        min = {0}
                        labelHelpText = "Prop enforceRange is true by default.
                        This doesn't allow keyboard input above the maximum range."
                    />
                </div>
                <div className="input-row">
                    <FormIntegerField
                        onChange = {this._changeCallback4}
                        data-id = "integerField4"
                        labelText={"Range 0 - 100 w/ Error text on Blur - Value : " + this.state.integerField4}
                        enforceRange={false}
                        onBlur = {this._blurCallback4}
                        value = {this.state.integerField4}
                        errorMessage = {this.state.integerField4Error}
                        max = {100}
                        min = {0}
                        labelHelpText = "Prop enforceRange set to false to allow keyboard input of out of range numbers"
                    />
                </div>
                <div className="input-row">
                    <FormIntegerField
                        onChange = {this._changeCallback5}
                        data-id = "integerField5"
                        labelText={"Range 50 - 300, Increment 5 - Value : " + this.state.integerField5}
                        value = {this.state.integerField5}
                        errorMessage = {this.state.integerField5Error}
                        increment = {5}
                        min = {50}
                        max = {300}
                    />
                </div>

                <div className="input-row">
                    <FormIntegerField
                        labelText = {this.state.integerField7Disabled ? "Disabled" : "Read Only"}
                        mode = {this.state.integerField7Mode}
                        disabled = {this.state.integerField7Disabled}
                        onChange = {this._changeCallback}
                        value = {30}>
                        <br />
                        <a name = "read-only" onClick = {this._changeMode}>Read Only</a>
                        {" | "}
                        <a name = "disabled" onClick = {this._changeMode}>Disabled</a>
                    </FormIntegerField>

                </div>

            </div>
        );
    }
});


module.exports = FormIntegerFieldDemo;

var React = require("react");
var FormIntegerField = require("./../../../components/forms/form-integer-field/index.js").v2;

/**
 * A demo for FormTextField.
 */
var FormIntegerFieldDemo = React.createClass({

    getInitialState: function () {
        return {
            integerField4Error: "",
            integerField5Error: "",
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
        if (value >= 0 && value <= 25) {
            this.setState({
                integerField4Error: ""
            });
        }
    },
    
    _blurCallback4: function () {
        var value = this.state.integerField4;

        if (value < 0 | value > 25) {
            this.setState({
                integerField4Error: "Please enter a number between 0 and 25"
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
        return (
            <div>
                <div className="input-row">
                    <FormIntegerField
                            labelText={"Basic - Value : " + this.state.integerField1}
                            onValueChange = {this._changeCallback}
                            controlled={false}
                    />
                </div>
                <div className="input-row">
                    <FormIntegerField
                            showUndo = {true}
                            labelText={"With default value and undo - Value : " + this.state.integerField2}
                            initialValue = {8800}
                            onValueChange = {this._changeCallback2}
                            controlled={false}
                    />
                </div>
                <div className="input-row">
                    <FormIntegerField
                            onValueChange = {this._changeCallback3}
                            data-id = "integerField3"
                            labelText={"Required - Value : " + this.state.integerField3}
                            initialValue = ""
                            required = {true}
                            placeholder = "This field is required"
                            controlled={false}
                    />
                </div>
                <div className="input-row">
                    <FormIntegerField
                            onValueChange = {this._changeCallback6}
                            data-id = "integerField6"
                            labelText={"Range 0 - 15 - Value : " + this.state.integerField6}
                            initialValue = {this.state.integerField6}
                            placeholder = "Enter an integer between 0 and 15"
                            max = {15}
                            min = {0}
                            labelHelpText = "Prop enforceRange is true by default.
                                    This doesn't allow keyboard input above the maximum range."
                            controlled={false}
                    />
                </div>
                <div className="input-row">
                    <FormIntegerField
                            onValueChange = {this._changeCallback4}
                            data-id = "integerField4"
                            labelText={
                                "Range 0 - 25 w/ Error text on Blur - Value : " +
                                this.state.integerField4
                            }
                            enforceRange={false}
                            onBlur = {this._blurCallback4}
                            errorMessage = {this.state.integerField4Error}
                            max = {25}
                            min = {0}
                            labelHelpText ={
                                "Prop enforceRange set to false to allow keyboard input" +
                                " of out of range numbers"
                            }
                            controlled={false}
                    />
                </div>
                <div className="input-row">
                    <FormIntegerField
                            onValueChange = {this._changeCallback5}
                            data-id = "integerField5"
                            labelText={"Range 50 - 300, Increment 5 - Value : " + this.state.integerField5}
                            errorMessage = {this.state.integerField5Error}
                            increment = {5}
                            min = {50}
                            max = {300}
                            controlled={false}
                    />
                </div>

                <div className="input-row">
                    <FormIntegerField
                            readOnly={true}
                            labelText = {"Read Only"}
                            mode = {this.state.integerField7Mode}
                            disabled = {this.state.integerField7Disabled}
                            onValueChange = {this._changeCallback}
                            initialValue = {30}
                            controlled={false}
                    />
                </div>
                
                <div className="input-row">
                    <FormIntegerField
                            labelText = {"Disabled with help text"}
                            mode = {this.state.integerField8Mode}
                            disabled = {true}
                            onValueChange = {this._changeCallback}
                            labelHelpText = "Disabled with help text"
                            initialValue = {40}
                            controlled={false}
                    />
                </div>

            </div>
        );
    }
});


module.exports = FormIntegerFieldDemo;

var React = require("react");
var FormIntegerField = require("./../../../components/forms/form-integer-field/");
const InputWidths = require("./../../../components/forms/InputWidths");

/**
* @name FormIntegerFieldDemo
* @memberof FormIntegerField
* @desc A demo for FormIntegerField
*/
class FormIntegerFieldDemo extends React.Component {
    state = {
        integerField1: undefined,
        integerField4Error: "",
        integerField5Error: "",
        integerField7Mode: "read_only",
        integerField7Disabled: false
    };

    _handleValueChange = (index, value) => {
        var newState = {};
        newState["integerField" + index] = value;
        this.setState(newState);
    };

    _handleBlur = (index, min, max) => {
        var value = this.state["integerField" + index];
        var newState = {};

        if (value < min | value > max) {
            newState["integerField" + index + "Error"] = "Please enter a number between " + min + " and " + max;
            this.setState(newState);
        } else {
            newState["integerField" + index + "Error"] = "";
            this.setState(newState);
        }
    };

    componentDidMount() {
        // Bind "onValueChange" callbacks
        this._handleValueChange0 = this._handleValueChange.bind(null, 0);
        this._handleValueChange2 = this._handleValueChange.bind(null, 2);
        this._handleValueChange3 = this._handleValueChange.bind(null, 3);
        this._handleValueChange6 = this._handleValueChange.bind(null, 6);

        // Bind "onBlur" callbacks
        this._handleBlur4 = this._handleBlur.bind(null, 4, 0, 25);
        this._handleBlur5 = this._handleBlur.bind(null, 5, 50, 300);
    }

    _changeCallback = (value) => {
        if (FormIntegerField.isValid(value)) {
            this.setState({
                integerField1: value
            });
        }

    };

    _changeCallback4 = (value) => {
        this.setState({
            integerField4: value
        });
        if (value >= 0 && value <= 25) {
            this.setState({
                integerField4Error: ""
            });
        }
    };

    _changeCallback5 = (value) => {

        if (value !== "" && (value % 5 !== 0 || value > 300 )) {
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
    };

    _changeMode = (value, event) => {
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

    };

    render() {
        return (
            <div>
                <div className="input-row">
                    <FormIntegerField
                            labelText={"Basic - Value : " + this.state.integerField0}
                            onValueChange = {this._handleValueChange0}
                            initialValue = ""
                            stateless={false}
                            width={InputWidths.MD}
                            name="demo"
                    />
                </div>
                <div className="input-row">
                    <FormIntegerField
                            labelText={"Basic stateless with validation helper and with hidden controls - Value : " +
                                this.state.integerField1}
                            onValueChange = {this._changeCallback}
                            value={this.state.integerField1}
                            width={InputWidths.MD}
                            stateless={true}
                            hideControls={true}
                    />
                </div>
                <div className="input-row">
                    <FormIntegerField
                            showUndo = {true}
                            labelText={"With default value and undo - Value : " + this.state.integerField2}
                            initialValue = {8800}
                            onValueChange = {this._handleValueChange2}
                            width={InputWidths.MD}
                            stateless={false}
                    />
                </div>
                <div className="input-row">
                    <FormIntegerField
                            onValueChange = {this._handleValueChange3}
                            data-id = "integerField3"
                            labelText={"Required - Value : " + this.state.integerField3}
                            initialValue = ""
                            required = {true}
                            placeholder = "This field is required"
                            width={InputWidths.MD}
                            stateless={false}
                    />
                </div>
                <div className="input-row">
                    <FormIntegerField
                            onValueChange = {this._handleValueChange6}
                            data-id = "integerField6"
                            labelText={"Range 1 - 15 - Value : " + this.state.integerField6}
                            initialValue = {this.state.integerField6}
                            placeholder = "Enter an integer between 1 and 15"
                            max = {15}
                            min = {1}
                            outOfRangeErrorMessage="Please enter a number between 1 and 15"
                            labelHelpText = "Prop enforceRange is true by default. This doesn't allow keyboard input\
                                above the maximum range."
                            width={InputWidths.MD}
                            stateless={false}
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
                            onBlur = {this._handleBlur4}
                            errorMessage = {this.state.integerField4Error}
                            max = {25}
                            min = {0}
                            labelHelpText ={
                                "Prop enforceRange set to false to allow keyboard input" +
                                " of out of range numbers"
                            }
                            width={InputWidths.MD}
                            stateless={false}
                    />
                </div>
                <div className="input-row">
                    <FormIntegerField
                            onValueChange = {this._changeCallback5}
                            onBlur={this._handleBlur5}
                            data-id = "integerField5"
                            labelText={"Range 50 - 300, Increment 5 - Value : " + this.state.integerField5}
                            errorMessage = {this.state.integerField5Error}
                            increment = {5}
                            min = {50}
                            max = {300}
                            width={InputWidths.MD}
                            stateless={false}
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
                            width={InputWidths.MD}
                            stateless={false}
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
                            width={InputWidths.MD}
                            stateless={false}
                    />
                </div>

            </div>
        );
    }
}


module.exports = FormIntegerFieldDemo;

var React = require("react");
var SelectText = require("./../../../components/general/SelectText.jsx");
var FormTextField = require("./../../../components/forms/form-text-field");
var FormFieldConstants = require("./../../../constants/FormFieldConstants");

/**
* @name SelectTextDemo
* @memberof SelectText
* @desc A demo for SelectText
*/
class SelectTextDemo extends React.Component {
    render() {
        return (
            <div>
                <div className="input-row">
                    <SelectText>
                        This text will be selected when clicked
                    </SelectText>
                </div>
                <div className="input-row">
                    <SelectText>
                        <FormTextField
                            mode={FormFieldConstants.FormFieldMode.READ_ONLY}
                            value="The text in this input will be selected when clicked"
                        />
                    </SelectText>
                </div>
            </div>
        );
    }
}

module.exports = SelectTextDemo;

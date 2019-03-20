import React from "react";
import SelectText from "./../../../components/general/SelectText";
import FormTextField from "./../../../components/forms/form-text-field";
import FormFieldConstants from "./../../../constants/FormFieldConstants";
import InputRow from "../../../components/layout/InputRow";

/**
* @name SelectTextDemo
* @memberof SelectText
* @desc A demo for SelectText
*/
class SelectTextDemo extends React.Component {
    render() {
        return (
            <div>
                <InputRow>
                    <SelectText>
                        This text will be selected when clicked
                    </SelectText>
                </InputRow>
                <InputRow>
                    <SelectText>
                        <FormTextField
                            mode={FormFieldConstants.FormFieldMode.READ_ONLY}
                            value="The text in this input will be selected when clicked"
                        />
                    </SelectText>
                </InputRow>
            </div>
        );
    }
}

module.exports = SelectTextDemo;

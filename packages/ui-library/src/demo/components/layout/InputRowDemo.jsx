import React from "react";
import InputRow from "../../../components/layout/InputRow";
import FormTextField from "../../../components/forms/form-text-field";
import InputWidths from "../../../components/forms/InputWidths";


/**
* @name InputRowDemo
* @memberof InputRow
* @desc A demo for InputRow component
 */

const InputRowDemo = () => {
    return (
        <div>
            <InputRow>
                <FormTextField
                    labelText="First Name"
                    width={InputWidths.SM}
                    data-id="firstName"
                    flags={["p-stateful"]}
                    required={true}
                />
                <FormTextField
                    labelText="Last Name"
                    width={InputWidths.SM}
                    data-id="firstName"
                    flags={["p-stateful"]}
                    required={true}
                />
            </InputRow>
            <InputRow>
                <FormTextField
                    labelText="Misc"
                    width={InputWidths.SM}
                    data-id="firstName"
                    flags={["p-stateful"]}
                    required={true}
                />
            </InputRow>
            <InputRow>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Molestiae cum odit ex quae nam vero amet fugiat odio officia,
                quaerat illum? Nisi tenetur atque deleniti impedit veritatis ab temporibus culpa.
            </InputRow>
        </div>
    );
};
export default InputRowDemo;
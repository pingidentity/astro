import React from "react";
import InputRow from "../../../components/layout/InputRow";
import FormTextField from "../../../components/forms/form-text-field";


const InputRowDemo = () => {
    return (
        <div>
            <InputRow>
                <FormTextField
                    labelText="First Name"
                    className="input-width-small"
                    data-id="firstName"
                    required={true}
                />
                <FormTextField
                    labelText="Last Name"
                    className="input-width-small"
                    data-id="firstName"
                    required={true}
                />
            </InputRow>
            <InputRow>
                <FormTextField
                    labelText="Misc"
                    className="input-width-small"
                    data-id="firstName"
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
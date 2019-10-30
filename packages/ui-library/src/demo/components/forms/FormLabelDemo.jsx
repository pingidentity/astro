import React from "react";
import FormLabel from "../../../components/forms/FormLabel";
import InputRow from "../../../components/layout/InputRow";
import Button from "../../../components/buttons/Button";
import Text from "../../../components/general/Text";

/**
* @name FormLabelDemo
* @memberof FormLabel
* @desc A demo for FormLabel
*/

const FormLabelDemo = () => (
    <div>
        <InputRow>
            <FormLabel>Hello, here's a bare label</FormLabel>
        </InputRow>
        <InputRow>
            <FormLabel value="I have help" hint="Use the hint prop for this text" helpPlacement="bottom">
                Okay?
            </FormLabel>
        </InputRow>
        <InputRow>
            <FormLabel value="I contain a button">
                <Button inline label="Don't Do It" />
            </FormLabel>
        </InputRow>
        <InputRow>
            <FormLabel value="Detached Label" hint="No spacing" detached />
            <Button inline label="Separate Button" />
        </InputRow>
        <InputRow>
            <FormLabel value="First a Label" description="Then a description.">
                <Text type="primary">Finally, the content.</Text>
            </FormLabel>
        </InputRow>
    </div>
);

export default FormLabelDemo;
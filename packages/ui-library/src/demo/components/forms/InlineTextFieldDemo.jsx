import React from "react";
import InlineTextField from "../../../components/forms/InlineTextField";
import InputRow from "../../../components/layout/InputRow";
import Text, { textTypes } from "../../../components/general/Text";


/**
* @name InlineTextFieldDemo
* @memberof InlineTextField
* @desc A demo for nlineTextField
*/


const InlineTextFieldDemo = () => {
    return (
        <div>
            <Text type={textTypes.LABEL}>Inline Text Field Example</Text>
            <InputRow>
                The password must have a minimum of <InlineTextField /> characters.
            </InputRow>
            <Text type={textTypes.LABEL}>With Error Message</Text>
            <InputRow>
                This inline will have <InlineTextField errorMessage="Example Error Message" size={5}/>&nbsp;
                number of errors.
            </InputRow>
            <Text type={textTypes.LABEL}>With Size Limit</Text>
            <InputRow>
                This inline will only allow <InlineTextField size={3}/> 3 characters.
            </InputRow>
        </div>
    );
};

export default InlineTextFieldDemo;

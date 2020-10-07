import React from 'react';

import {
    RadioButtonGroup,
    RadioButton,
} from '../../.';

export default {
    title: 'RadioButtonGroup',
    component: RadioButtonGroup,

};

export const Default = () => (
    <RadioButtonGroup
        name="something"
        defaultChecked="choice2"
    >
        <RadioButton
            label="The first choice"
            value="choice1"
            checkedContent="This is the first choice content."
        />
        <RadioButton
            label="The second choice"
            value="choice2"
            checkedContent="This is the second choice content."
        />
        <RadioButton
            label="The third choice"
            value="choice3"
            checkedContent="This is the third choice content."
        />
    </RadioButtonGroup>
);

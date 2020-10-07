import React from 'react';

import { RadioButton } from '../../.';

export default {
    title: 'RadioButton',
    component: RadioButton,

};

export const Default = () => (
    <RadioButton
        label="The first choice"
        checkedContent="Some text..."
        name="something"
        value="choice1"
    />
);

export const Checked = () => (
    <RadioButton
        label="The first choice"
        isDefaultChecked
        checkedContent="Some text..."
        name="something"
        value="choice3"
    />
);

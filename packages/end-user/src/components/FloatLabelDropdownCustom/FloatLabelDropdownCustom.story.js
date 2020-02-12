import React from 'react';
import FloatLabelDropdownCustom from './FloatLabelDropdownCustom';

export default {
    title: 'Components/Inputs/Dropdowns/Custom Float Label',
    component: FloatLabelDropdownCustom,
};

export const Default = () => (
    <FloatLabelDropdownCustom
        label="Select one"
        options={['First Value', 'Second Value', 'Third Value', 'Fourth Value']}
    />
);

import React from 'react';
import FloatLabelDropdown from './FloatLabelDropdown';

export default {
    title: 'Components/Inputs/Dropdowns/Float Label',
    component: FloatLabelDropdown,
};

export const Default = () => (
    <FloatLabelDropdown
        label="Select one"
        options={['First Value', 'Second Value', 'Third Value', 'Fourth Value']}
    />
);

import React from 'react';
import Dropdown from './Dropdown';

export default {
    title: 'Components/Inputs/Dropdowns/Basic',
    component: Dropdown,
};

export const Default = () => (
    <Dropdown
        options={['First Value', 'Second Value', 'Third Value', 'Fourth Value']}
        placeholder="Select one"
    />
);

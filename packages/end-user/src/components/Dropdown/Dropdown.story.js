import React from 'react';
import Dropdown, { StatelessDropdown } from './Dropdown';

export default {
    title: 'Components/Inputs/Dropdowns/Basic',
    component: StatelessDropdown,
};

export const Default = () => (
    <Dropdown
        options={['First Value', 'Second Value', 'Third Value', 'Fourth Value']}
        placeholder="Select one"
    />
);

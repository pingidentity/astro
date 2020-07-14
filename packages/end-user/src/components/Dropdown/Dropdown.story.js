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

export const DisabledOptions = () => {
    const options = [
        'First Value',
        {
            label: 'Second Value',
            value: 'Second Value',
            disabled: true
        },
        'Third Value',
        'Fourth Value',
    ];
    return (
        <Dropdown
            options={options}
            placeholder="Select one"
        />
    );
};

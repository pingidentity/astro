import React from 'react';
import DropdownCustomSearchable from './DropdownCustomSearchable';

export default {
    title: 'Components/Inputs/Dropdowns/Custom Searchable',
    component: DropdownCustomSearchable,
};

export const Default = () => (
    <DropdownCustomSearchable
        options={['First Value', 'Second Value', 'Third Value', 'Fourth Value']}
        placeholder="Select one"
    />
);

import React from 'react';
import DropdownCustom from './DropdownCustom';

export default {
    title: 'Components/Inputs/Dropdowns/Custom',
    component: DropdownCustom,
};

export const Default = () => (
    <DropdownCustom
        options={['First Value', 'Second Value', 'Third Value', 'Fourth Value']}
        placeholder="Select one"
    />
);

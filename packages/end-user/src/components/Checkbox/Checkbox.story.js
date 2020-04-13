import React from 'react';
import Checkbox, { StatelessCheckbox } from './Checkbox';

export default {
    title: 'Components/Inputs/Checkbox',
    component: StatelessCheckbox,
};

export const Default = () => (
    <Checkbox label="I'm a checkbox!" />
);

import React from 'react';
import Multivalues from './Multivalues';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';

export default {
    title: 'Components/Multivalues',
    component: Multivalues,
    decorators: [withKnobs],
};

const entries = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
];

const options = [{ value: 'vanilla', label: 'Vanilla' }];

export const Default = () => (
    <Multivalues
        data-id="asdf"
        entries={entries}
        options={options}
        optionsStrict={boolean('Strict options', false)}
        onValueChange={action('Value added or removed.')}
    />
);

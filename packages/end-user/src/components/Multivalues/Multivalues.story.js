import React from 'react';
import Multivalues, { multivalueInputTypes } from './Multivalues';
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

export const Default = () => (<React.Fragment>
    <Multivalues
        data-id="default"
        entries={entries}
        options={options}
        optionsStrict={boolean('Strict options', false)}
        onValueChange={action('Value added or removed.')}
    />
    <br/>
    <Multivalues
        data-id="error"
        entries={entries}
        options={options}
        optionsStrict={boolean('Strict options', false)}
        onValueChange={action('Value added or removed.')}
        type={multivalueInputTypes.ERROR}
        fieldMessage='Error Example Message'
    />
    <br/>
    <Multivalues
        data-id="success"
        entries={entries}
        options={options}
        optionsStrict={boolean('Strict options', false)}
        onValueChange={action('Value added or removed.')}
        type={multivalueInputTypes.SUCCESS}
        fieldMessage='Success Example Message'
    />
    <br/>
    <Multivalues
        data-id="primary"
        entries={entries}
        options={options}
        optionsStrict={boolean('Strict options', false)}
        onValueChange={action('Value added or removed.')}
        type={multivalueInputTypes.PRIMARY}
        fieldMessage='Primary Example Message'
    />
</React.Fragment>);

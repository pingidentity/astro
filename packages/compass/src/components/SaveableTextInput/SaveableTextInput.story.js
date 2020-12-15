import React, { useState } from 'react';

import { SaveableTextInput } from '../../.';

export default {
    title: 'Special Inputs/SaveableTextInput',
    component: SaveableTextInput,

};

export const Default = () => {
    const [value, onValueChange] = useState('https://my.pingfed.company.com/admin');
    const [original, setOriginal] = useState('https://my.pingfed.company.com/');

    return (
        <SaveableTextInput
            label="Admin URL"
            maxWidth="column"
            onCancel={() => onValueChange(original)}
            onSave={() => setOriginal(value)}
            onValueChange={onValueChange}
            hasCancel={value !== original}
            hasSave={value !== original}
            value={value}
        />
    );
};

export const Loading = () => (
    <SaveableTextInput
        label="Admin URL"
        maxWidth="column"
        onCancel={() => {}}
        onSave={() => {}}
        hasCancel
        hasSave
        saveButtonProps={{ status: 'loading' }}
        cancelButtonProps={{ isDisabled: true }}
        disabled
        value="https://my.pingfed.company.com/admin"
    />
);

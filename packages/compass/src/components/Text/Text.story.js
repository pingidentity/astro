import React from 'react';

import { Text, textComponents } from '../../.';

export default {
    title: 'Text',
    component: Text,

};

export const Default = () => (
    <Text>default text</Text>
);

export const TextTypes = () => {
    return Object.keys(textComponents).map(variant => (
        <Text variant={variant} key={variant}>{variant}</Text>
    ));
};


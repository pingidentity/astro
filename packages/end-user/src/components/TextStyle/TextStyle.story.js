import React from 'react';
import TextStyle from './TextStyle';

export default {
    title: 'Components/Display/TextStyle',
    component: TextStyle,
};

export const Muted = () => (
    <TextStyle muted>This text is muted!</TextStyle>
);

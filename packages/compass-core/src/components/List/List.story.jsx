import React from 'react';

import { List, KeyboardList, ListBox } from './List';

export default {
    title: 'List',
    component: List,
    subcomponents: { KeyboardList, ListBox },

};

export const Default = () => (
    <List
        items={[1, 2, 3, 4, 5, 6, 7, 8]}
    />
);

export const WithKeyboardList = () => (
    <KeyboardList
        items={[1, 2, 3, 4, 5, 6, 7, 8]}
    />
);

export const WithListBox = () => (
    <ListBox
        items={[1, 2, 3, 4, 5, 6, 7, 8]}
    />
);

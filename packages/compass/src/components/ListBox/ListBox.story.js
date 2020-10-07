import React from 'react';
import { ListBox as CoreListBox, List } from '@pingux/compass-core/src/components/List';
import { ListBox } from '../../.';

export default {
    title: 'ListBox',
    component: CoreListBox,
    subcomponents: { List },
};

export const Default = () => (
    <ListBox
        items={[1, 2, 3, 4, 5]}
    />
);

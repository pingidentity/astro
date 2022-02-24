import React from 'react';
import PopoverMenu from './PopoverMenu';

export default {
    title: 'Components/Display/PopoverMenu',
    component: PopoverMenu,
};

export const Default = () => {
    const buttons = [
        {
            label: 'First item',
            onClick: () => console.log('First item clicked!'),
            id: 'item1',
            'data-id': 'first-item-id'
        },
        {
            label: 'Second item',
            onClick: () => console.log('Second item clicked!'),
            id: 'item2',
            'data-id': 'second-item-id'
        }
    ];

    return (
        <PopoverMenu buttons={buttons} />
    );
};
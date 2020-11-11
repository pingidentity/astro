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
            id: 'item1'
        },
        {
            label: 'Second item',
            onClick: () => console.log('Second item clicked!'),
            id: 'item2'
        }
    ];

    return (
        <PopoverMenu buttons={buttons} />
    );
};
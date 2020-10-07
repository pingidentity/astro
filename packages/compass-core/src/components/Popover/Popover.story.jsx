import React from 'react';

import Popover from './Popover';

export default {
    title: 'Popover',
    component: Popover,
    
};

export const Default = () => (
    <Popover label="Click this" data-id="thing">
        <div style={{ border: '1px solid #000', maxWidth: 400 }}>
            Content of the popover.
            Content of the popover.
            Content of the popover.
            Content of the popover.
            Content of the popover.
            Content of the popover.
            Content of the popover.
            Content of the popover.
            Content of the popover.
            Content of the popover.
        </div>
    </Popover>
);

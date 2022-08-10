import React, { useState } from 'react';

import Modal from '../shared/Modal';
import Button from '../Button/Button'


export default {
    title: 'Components/Display/Modal',
    component: Modal,
};

const themes = [
    'https://assets.pingone.com/ux/branding-themes/0.16.0/default/default.css',
    'https://assets.pingone.com/ux/branding-themes/0.16.0/split/split.css',
    'https://assets.pingone.com/ux/branding-themes/0.16.0/slate/slate.css',
    'https://assets.pingone.com/ux/branding-themes/0.16.0/mural/mural.css',
    'https://assets.pingone.com/ux/branding-themes/0.16.0/focus/focus.css',
];

export const Default = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <Button onClick={() => setExpanded(true)}>Open</Button>
            <Modal expanded={expanded} onClose={()=> setExpanded(false)} />
        </div>
    );
};

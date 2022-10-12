import React from 'react';
import IconFeedback from './IconFeedback';

export default {
    title: 'Components/Display/IconFeedback',
    component: IconFeedback,
};

export const Success = () => (
    <IconFeedback
        type="success"
        small={false}
        bold={false}
    >
        This is a success feedback icon
    </IconFeedback>
);

export const Error = () => (
    <IconFeedback
        type="error"
        small={false}
        bold={false}
    >
        This is an error feedback icon
    </IconFeedback>
);

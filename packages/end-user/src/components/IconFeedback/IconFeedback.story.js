import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import IconFeedback from './IconFeedback';

export default {
    title: 'Components/Display/IconFeedback',
    decorators: [withKnobs],
    component: IconFeedback,
};

export const Success = () => (
    <IconFeedback
        type="success"
        small={boolean('Small', false)}
        bold={boolean('Bold', false)}
    >
        This is a success feedback icon
    </IconFeedback>
);

export const Error = () => (
    <IconFeedback
        type="error"
        small={boolean('Small', false)}
        bold={boolean('Bold', false)}
    >
        This is an error feedback icon
    </IconFeedback>
);

import React from 'react';

const withPadding = (Story, context) => (
    <div style={{ padding: "50px" }}>
        <Story {...context} />
    </div>
);

export const decorators = [withPadding];

export const parameters = {
    a11y: {
        element: '#root',
        config: {},
        options: {},
        manual: true,
    },
};
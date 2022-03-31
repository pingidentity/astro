import React from 'react';

import '../src/css/styles.scss';

const withPadding = (Story, context) => (
    <div style={{ padding: "50px" }}>
        <Story {...context} />
    </div>
);

export const decorators = [withPadding];
import React from 'react';
import { addDecorator } from '@storybook/react';

import '../src/css/styles.scss';

addDecorator(storyFn => (
    <div style={{ padding: "50px" }}>
        {storyFn()}
    </div>
));
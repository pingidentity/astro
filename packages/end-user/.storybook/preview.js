import React from 'react';
import { addDecorator } from '@storybook/react';
import { withHTML } from '@whitespace/storybook-addon-html/react';

import '../src/css/styles.scss';

addDecorator(storyFn => (
    <div style={{ padding: "50px" }}>
        {storyFn()}
    </div>
));

addDecorator(withHTML);
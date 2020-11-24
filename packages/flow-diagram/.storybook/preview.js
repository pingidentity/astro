import React from 'react';
import { addDecorator } from '@storybook/react';
import { css, Global } from '@emotion/core';

const globalStyles = css`
    html, body, #root, #root > * {
        height: 100%;
    }
`;

addDecorator(storyFn => (
    <>
        <Global styles={globalStyles} />
        <div style={{ padding: "5px" }}>
            {storyFn()}
        </div>
    </>
));

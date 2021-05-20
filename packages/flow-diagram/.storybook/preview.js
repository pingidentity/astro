import React from 'react';
import { addDecorator } from '@storybook/react';
import { AstroWrapper } from '@pingux/astro';
import { Box } from '@pingux/astro';

const withTheme = storyFn => (
    <AstroWrapper>
        <style>
            {`
            html, body, #root, #root > * {
                height: 100%;
            }
            `}
        </style>
        <Box sx={{ padding: "5px", height: "100%" }}>
            {storyFn()}
        </Box>
    </AstroWrapper>
);

addDecorator(withTheme);

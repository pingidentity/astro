import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../src/styles/theme';
import { GlobalStyles } from '../src/components/CompassWrapper';

const withCompassTheme = (Story, context) => (
    <>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
                <div style={{ padding: "50px" }}>
                    <Story {...context} />
                </div>
        </ThemeProvider>
    </>
);

export const decorators = [withCompassTheme];

export const parameters = {
    a11y: {
        element: '#root',
        config: {},
        options: {},
        manual: true,
    },
};

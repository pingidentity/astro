import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';
import { Flex } from 'reflexbox';
import emotionNormalize from 'emotion-normalize';
import theme from '../../styles/theme';

export const GlobalStyles = () =>
    (<Global styles={
        css`
            ${emotionNormalize}
            * {
                box-sizing: border-box;
            }
            html,
            body {
                padding: 0;
                margin: 0;
                background: white;
                min-height: 100%;
                font-family: "Helvetica Neue", Helvetica, sans-serif;
            }
            @import url("https://use.typekit.net/icz8cni.css");
            /* *:focus {
                outline: 0;
            } */

        `}
    />);

/** The main wrapper for the Compass application.
 *  It provides the standard background, some global styles, and the Compass theme.
 */
const CompassWrapper = ({ children, ...props }) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Flex sx={{ bg: 'background' }} height="100%" css={css`overflow: hidden;`} {...props}>
                {children}
            </Flex>
        </ThemeProvider>
    );
};

export default CompassWrapper;

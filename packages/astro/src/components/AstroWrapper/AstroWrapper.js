import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';
import Box from '../Box';
import theme from '../../styles/theme';

export const GlobalStyles = () => (
  <Global
    styles={
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
        .is-disabled {
          opacity: 0.5;
          pointer-events: none;
        }
      `
    }
  />
);

/** The main wrapper for the Astro application.
 *  It provides the standard background, some global styles, and the Astro theme.
 */
const AstroWrapper = ({ children, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Box bg="background" height="100%" css={css`overflow: hidden;`} {...props}>
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default AstroWrapper;

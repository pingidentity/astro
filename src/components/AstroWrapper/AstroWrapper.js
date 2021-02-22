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
        [data-tippy-root] {
          max-width:calc(100vw - 10px)
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

/** Wrapper for the Astro application w/o global styles.
 *  It provides the standard background and the Astro theme.
 */
export const PageWrapper = ({ children, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={
          css`
            @import url("https://use.typekit.net/icz8cni.css");

            [data-tippy-root] {
              max-width: calc(100vw - 10px);
            }
          `
        }
      />
      <Box
        css={
          css`
            ${emotionNormalize}
            background: white;

            * {
              box-sizing: border-box;
              font-family: "Helvetica Neue", Helvetica, sans-serif;

              .is-disabled {
                opacity: 0.5;
                pointer-events: none;
              }
            }
          `
        }
        {...props}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default AstroWrapper;

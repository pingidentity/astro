import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, merge } from 'theme-ui';
import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import Box from '../Box';
import astroTheme from '../../styles/theme';

export const GlobalStyles = () => (
  <Global
    styles={
      css`
        @import url("https://use.typekit.net/icz8cni.css");
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
        .is-disabled {
          opacity: 0.5;
          pointer-events: none;
        }
      `
    }
  />
);

/**
 * The main wrapper for the Astro application.
 * The AstroWrapper provides a standard background,
 * some global styles, and the Astro theme by default.
 *
 * _Note: For UI Library and Astro CSS conflicts, we supply a theme override located at_
 * `@pingux/astro/lib/styles/themes/overrideUILib`
 */
const AstroWrapper = forwardRef((props, ref) => {
  const {
    defaultTheme,
    themeOverrides,
    children,
    ...others
  } = props;

  // Unfortunately because this is adding styles, we cannot write a proper test for this.
  /* istanbul ignore next */
  const theme = useMemo(() => merge(defaultTheme, ...themeOverrides),
    [defaultTheme, themeOverrides]);

  return (
    <ThemeProvider ref={ref} theme={theme} {...others}>
      <GlobalStyles />
      <Box bg="background" height="100%" {...props}>
        {children}
      </Box>
    </ThemeProvider>
  );
});

AstroWrapper.propTypes = {
  /** Array of theme objects which will be merged with the default theme.
     * In the case of clashes, these will take priority.
     * Useful for customizing the default variants, adding new ones,
     *  or overriding other theme values. */
  themeOverrides: PropTypes.arrayOf(PropTypes.shape({})),
  /** The default theme applied to the Astro components.
   * Overriding this is an advanced use case so
   * please understand potential reprecussions before editing */
  defaultTheme: PropTypes.shape({}),
};

AstroWrapper.defaultProps = {
  defaultTheme: astroTheme,
  themeOverrides: [{}],
};

/**
 * Wrapper for the Astro application w/o global styles.
 * It provides the standard background and the Astro theme.
 */
export const PageWrapper = forwardRef((props, ref) => {
  const {
    defaultTheme,
    themeOverrides,
    children,
    ...others
  } = props;

  const theme = useMemo(() => merge(defaultTheme, ...themeOverrides),
    [defaultTheme, themeOverrides]);
  return (
    <ThemeProvider ref={ref} theme={theme} {...others}>
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
});

PageWrapper.propTypes = {
  /** Array of theme objects which will be merged with the default theme.
     * In the case of clashes, these will take priority.
     * Useful for customizing the default variants, adding new ones,
     *  or overriding other theme values. */
  themeOverrides: PropTypes.arrayOf(PropTypes.shape({})),
  /** The default theme applied to the Astro components.
   * Overriding this is an advanced use case so
   * please understand potential reprecussions before editing */
  defaultTheme: PropTypes.shape({}),
};

PageWrapper.defaultProps = {
  defaultTheme: astroTheme,
  themeOverrides: [{}],
};

export { ThemeProvider };
export default AstroWrapper;

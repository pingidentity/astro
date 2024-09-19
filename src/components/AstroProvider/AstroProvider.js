import React, { forwardRef, useMemo } from 'react';
import { css, Global, ThemeProvider } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import PropTypes from 'prop-types';
import { merge } from 'theme-ui';

import astroTheme from '../../styles/theme';
import Box from '../Box';

const pingitoFont = `
  @font-face {
    font-weight: 200;
    font-family: "pingito";
    src: url("fonts/pingito/Pingito-Light.ttf");
    size-adjust: 100%;
  }

  @font-face {
    font-weight: 400;
    font-family: "pingito";
    src: url("fonts/pingito/Pingito-Regular.ttf");
    size-adjust: 100%;
  }

  @font-face {
    font-weight: 600;
    font-family: "pingito";
    src: url("fonts/pingito/Pingito-SemiBold.ttf");
    size-adjust: 100%;
  }

  @font-face {
    font-weight: 700;
    font-family: "pingito";
    src: url("fonts/pingito/Pingito-Bold.ttf");
    size-adjust: 100%;
  }

  @font-face {
    font-weight: 900;
    font-family: "pingito";
    src: url("fonts/pingito/Pingito-ExtraBold.ttf");
    size-adjust: 100%;
  }

  @font-face {
    font-weight: 200;
    font-style: italic;
    font-family: "pingito";
    src: url("fonts/pingito/Pingito-ItalicLight.ttf");
    size-adjust: 100%;
  }

  @font-face {
    font-weight: 400;
    font-style: italic;
    font-family: "pingito";
    src: url("fonts/pingito/Pingito-Italic.ttf");
    size-adjust: 100%;
  }

  @font-face {
    font-weight: 600;
    font-style: italic;
    font-family: "pingito";
    src: url("fonts/pingito/Pingito-ItalicSemiBold.ttf");
    size-adjust: 100%;
  }

  @font-face {
    font-weight: 700;
    font-style: italic;
    font-family: "pingito";
    src: url("fonts/pingito/Pingito-ItalicBold.ttf");
    size-adjust: 100%;
  }
`;

export const GlobalStyles = ({ isEndUserTheme = false }) => {
  return (
    <Global
      styles={css`
        @import url("https://use.typekit.net/icz8cni.css");
        ${emotionNormalize}
        ${isEndUserTheme && pingitoFont}
        * {
          box-sizing: border-box;
        }
        html,
        body {
          padding: 0;
          margin: 0;
          background: white;
          min-height: 100%;
          font-family: ${isEndUserTheme && 'pingito, '}"Helvetica Neue", Helvetica, sans-serif;
        }
        .is-disabled {
          opacity: 0.5;
          pointer-events: none;
        }
        [data-live-announcer] {
          display: none;
        }
        button:focus-visible,
        [type="button"]:focus-visible,
        [type="reset"]:focus-visible,
        [type="submit"]:focus-visible {
          outline: 0;
        }
      `}
    />
  );
};

GlobalStyles.propTypes = {
  isEndUserTheme: PropTypes.bool,
};

/**
 * _Note: For UI Library and Astro CSS conflicts, we supply a theme override located at_
 * `@pingux/astro/lib/styles/themeOverrides/uiLibraryOverride.js`
 */
const AstroProvider = forwardRef((props, ref) => {
  const { defaultTheme = astroTheme, themeOverrides = [{}], children, ...others } = props;

  // Unfortunately because this is adding styles, we cannot write a proper test for this.
  /* istanbul ignore next */
  const theme = useMemo(
    () => merge(defaultTheme, ...themeOverrides),
    [defaultTheme, themeOverrides],
  );
  const isEndUserTheme = theme && theme.name === 'End User';

  return (
    <ThemeProvider theme={theme} {...others}>
      <GlobalStyles isEndUserTheme={isEndUserTheme} />
      <Box ref={ref} bg="background" height="100%" {...props}>
        {children}
      </Box>
    </ThemeProvider>
  );
});

AstroProvider.propTypes = {
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

/**
 * Wrapper for the Astro application w/o global styles.
 * It provides the standard background and the Astro theme.
 */
export const PageWrapper = forwardRef((props, ref) => {
  const { defaultTheme = astroTheme, themeOverrides = [{}], children, ...others } = props;

  const theme = useMemo(
    () => merge(defaultTheme, ...themeOverrides),
    [defaultTheme, themeOverrides],
  );

  return (
    <ThemeProvider ref={ref} theme={theme} {...others}>
      <Global
        styles={css`
          @import url("https://use.typekit.net/icz8cni.css");

          [data-tippy-root] {
            max-width: calc(100vw - 10px);
          }
        `}
      />
      <Box
        css={css`
          ${emotionNormalize}

          * {
            box-sizing: border-box;
            font-family: "Helvetica Neue", Helvetica, sans-serif;

            .is-disabled {
              opacity: 0.5;
              pointer-events: none;
            }
          }
        `}
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

export { ThemeProvider };
export default AstroProvider;

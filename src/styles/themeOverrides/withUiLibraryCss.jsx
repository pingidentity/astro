import React, { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import { merge } from 'theme-ui';

import astroTheme from '../theme';

import uiLibraryOverride from './uiLibraryOverride';

const UI_LIBRARY_CSS_LINK = 'https://assets.pingone.com/ux/ui-library/5.0.2/css/ui-library.css';

const WithUiLibraryCss = Story => {
  useEffect(() => {
    const uiLibraryCss = document.createElement('link');
    uiLibraryCss.rel = 'stylesheet';
    uiLibraryCss.className = 'uiLibraryCssLink';
    uiLibraryCss.href = UI_LIBRARY_CSS_LINK;
    document.getElementsByTagName('head')[0].appendChild(uiLibraryCss);

    return () => document.querySelectorAll('.uiLibraryCssLink').forEach(link => {
      link.remove();
    });
  }, []);

  const theme = merge(astroTheme, uiLibraryOverride);

  return (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  );
};

export default WithUiLibraryCss;

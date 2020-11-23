import React from 'react';
import { render } from '@testing-library/react';
import { Global, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../styles/theme';

const GlobalTestStyles = () => (
  <Global
    styles={
      css`
        .is-disabled {
          opacity: 0.5;
          pointer-events: none;
        }
      `
    }
  />
);

/**
 * Use this wrapper when testing the theme output for a component using .toHaveStyleRule
 *
 * See Button.test.js as an example for how to apply conditional classes and then testing that
 * those classes have the appropriate styles tied to them in the theme.
 */
const Wrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalTestStyles />
      {children}
    </ThemeProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

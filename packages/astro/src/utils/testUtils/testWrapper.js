import React from 'react';
import { render } from '@testing-library/react';
import { Global, css } from '@emotion/react';
import { ThemeProvider } from 'theme-ui';
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
 * TODO: Change Jest config so this doesn't have to be imported relatively...
 * https://testing-library.com/docs/react-testing-library/setup/#configuring-jest-with-test-utils
 *
 * Use this wrapper when testing the theme output for
 * a component using .toHaveStyle or .toHaveStyleRule
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

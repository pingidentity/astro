import React, { ReactNode } from 'react';
import { css, Global, Theme } from '@emotion/react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';

import theme from '../../styles/theme';

const GlobalTestStyles: React.FC = () => (
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

interface WrapperProps {
  children: ReactNode;
  providerTheme: Theme;
}

const Wrapper: React.FC<WrapperProps> = ({ children, providerTheme }) => (
  <ThemeProvider theme={providerTheme}>
    <GlobalTestStyles />
    {children}
  </ThemeProvider>
);

const customRender = (ui: React.ReactElement, options?: {providerTheme: Theme}) => render(ui,
  { wrapper: props => (
    <Wrapper
      providerTheme={theme}
      {...props}
      {...options}
    />
  ),
  ...options },
);

// re-export everything -
export * from '@testing-library/react';

// override render method
export { customRender as render };

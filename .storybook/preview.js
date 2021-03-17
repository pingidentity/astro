import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../src/styles/theme';
import { GlobalStyles } from '../src/components/AstroWrapper';
import yourTheme from './AstroTheme';

const withThemeProvider = (Story, context) => (
  <>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <div style={{ padding: "50px" }}>
        <Story {...context} />
      </div>
    </ThemeProvider>
  </>
);

export const decorators = [withThemeProvider];

export const parameters = {
  a11y: {
    element: '#root',
    config: {},
    options: {},
    manual: true,
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    theme: yourTheme,
  },
  options: {
    storySort: {
      order: [
        'Form',
        [
          'CheckboxField',
          'ComboBoxField',
          'RadioGroupField',
          'SearchField',
          'SelectField',
          'SwitchField',
          'TextAreaField',
          'TextField',
          'Base Components',
          'DropdownField',
        ],
      ],
    },
  },
};

import React from 'react';
import theme from '../src/styles/theme';
import yourTheme from './AstroTheme';
import { withConsole } from '@storybook/addon-console';
import { AstroProvider } from '../src/index';
import "@storybook/react";

const withThemeProvider = (Story, context) => (
  <AstroProvider theme={theme} bg="transparent">
    <div style={{ padding: "50px" }}>
      <Story {...context} />
    </div>
  </AstroProvider>
);

const withConsoleAddon = (storyFn, context) => withConsole()(storyFn)(context);

export const decorators = [withThemeProvider, withConsoleAddon];

export const parameters = {
  a11y: {
    element: '#storybook-root',
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
        'Docs',
        [
          'Welcome',
          'Props',
          'Theme',
          [
            'Astro Theme',
            'Custom Themes',
            'Styling Guideline',
            'Astro Nano Theme'
          ],
          'Utils',
          'Hooks',
          'Design',
          'Design Patterns',
        ],
        'Components',
        'Form',
        [
          'ArrayField',
          'CheckboxField',
          'ColorField',
          'ComboBoxField',
          'DatePicker',
          'FileInputField',
          'ImageUploadField',
          'LinkSelectField',
          'MultivaluesField',
          'NumberField',
          'PasswordField',
          'RadioGroupField',
          'SearchField',
          'SelectField',
          'SwitchField',
          'TextAreaField',
          'TextField',
          'TimeZonePicker',
          'Base Components',
        ],
        'Experimental',
        [
          'Overview',
          '*',
        ]
      ],
    },
  },
};

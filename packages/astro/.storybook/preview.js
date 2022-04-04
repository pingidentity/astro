import React from 'react';
import theme from '../src/styles/theme';
import yourTheme from './AstroTheme';
import { withConsole } from '@storybook/addon-console';
import { AstroWrapper } from '../src/index';

const withThemeProvider = (Story, context) => (
    <AstroWrapper theme={theme} bg="transparent">
      <div style={{ padding: "50px" }}>
        <Story {...context} />
      </div>
    </AstroWrapper>
);

const withConsoleAddon = (storyFn, context) => withConsole()(storyFn)(context);

export const decorators = [withThemeProvider, withConsoleAddon];

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
          'ArrayField',
          'CheckboxField',
          'ColorField',
          'ComboBoxField',
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
      ],
    },
  },
};

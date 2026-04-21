import React from 'react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { spyOn } from 'storybook/test';

import {
  AstroProvider,
  Box,
  NextGenDarkTheme,
  NextGenTheme,
  Text,
} from '../src/index';
import { handlers } from '../src/mocks/handlers';
import theme from '../src/styles/theme';
import { themes } from '../src/utils/devUtils/constants/themes';
import { shouldReturnComingSoon } from '../src/utils/devUtils/shouldReturnComingSoon';

import yourTheme from './AstroTheme';

// Initialize MSW
initialize();

/** @type { import('@storybook/react').Preview } */
const preview = {
  tags: ['autodocs'],

  loaders: [mswLoader],

  decorators: [
    (Story, context) => {
      const selectedTheme = context.parameters.theme || context.globals.theme;
      let storyTheme = theme;
      let style = { padding: '50px' };

      if (selectedTheme === themes.NEXT_GEN) {
        storyTheme = NextGenTheme;
      } else if (selectedTheme === themes.NEXT_GEN_DARK) {
        storyTheme = NextGenDarkTheme;
        style = { padding: '50px', minHeight: '100vh' };
      }

      const showComingSoonMessage = shouldReturnComingSoon(context, selectedTheme);

      return (
        <AstroProvider theme={storyTheme} bg="backgroundBase">
          <div style={style}>
            {showComingSoonMessage ? (
              <Box sx={{ height: '200px', backgroundColor: 'backgroundBase', border: '1px solid', borderColor: 'border.base', justifyContent: 'center', alignItems: 'center' }}>
                <Text as="h2" fontFamily="standard" marginBottom="10px">No Component Found</Text>
                <Text fontFamily="standard">A Themed version of this component has not yet been completed</Text>
              </Box>
            ) : (
              <Story />
            )}
          </div>
        </AstroProvider>
      );
    },
  ],

  parameters: {
    a11y: { context: '#storybook-root', manual: true },
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: { theme: yourTheme, codePanel: true },
    msw: { handlers },
    options: {
      storySort: {
        order: ['Docs', ['Welcome', 'Props', 'Theme', ['Astro Theme', 'Custom Themes', 'Styling Guideline', 'Astro Nano Theme'], 'Utils', 'Hooks', 'Design', 'Design Patterns'], 'Components', 'Form', ['ArrayField', 'CheckboxField', 'ColorField', 'ComboBoxField', 'DatePicker', 'FileInputField', 'ImageUploadField', 'LinkSelectField', 'MultivaluesField', 'NumberField', 'PasswordField', 'RadioGroupField', 'SearchField', 'SelectField', 'SwitchField', 'TextAreaField', 'TextField', 'TimeZonePicker', 'Base Components'], 'Experimental', ['Overview', '*']],
      },
    },
  },

  globalTypes: {
    theme: {
      name: 'Themes',
      description: 'Global theme for components',
      defaultValue: themes.ASTRO,
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: themes.ASTRO, icon: 'circlehollow', title: 'Astro' },
          { value: themes.NEXT_GEN, icon: 'circle', title: 'Onyx Theme' },
          { value: themes.NEXT_GEN_DARK, icon: 'stop', title: 'Onyx Dark Theme' },
        ],
        showName: true,
      },
    },
  },
  layout: 'fullscreen',
  backgrounds: {
    disable: true,
  },
};

export const beforeEach = () => {
  spyOn(console, 'log').mockName('console.log');
  spyOn(console, 'warn').mockName('console.warn');
  spyOn(console, 'error').mockName('console.error');
};

export default preview;

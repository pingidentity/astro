import React from 'react';
import theme from '../src/styles/theme';
import { AstroProvider, Box, NextGenDarkTheme, NextGenTheme, Text } from '../src/index';
import yourTheme from './AstroTheme';
import { withConsole } from '@storybook/addon-console';
import "@storybook/react";
import { themes } from '../src/utils/devUtils/constants/themes';
import { shouldReturnComingSoon } from '../src/utils/devUtils/shouldReturnComingSoon'

const withThemeProvider = (Story, context) => {
  const selectedTheme = context.parameters.theme || context.globals.theme

  // we will be creating a hook in a follow up ticket to this.
  let storyTheme = theme
  let style = { padding: '50px' }
  if (selectedTheme === themes.NEXT_GEN) {
    storyTheme = NextGenTheme
  }
  else if (selectedTheme === themes.NEXT_GEN_DARK) {
    storyTheme = NextGenDarkTheme
    style = {
      padding: '50px',
      minHeight: 'calc(100vh - 32px)',
    }
  }

  const showComingSoonMessage = shouldReturnComingSoon(
    context,
    selectedTheme,
  )

  return (
    <AstroProvider theme={storyTheme} bg="background.base">
      <div style={style} >
        {
          showComingSoonMessage ?
            <Box
              sx={{
                height: '200px',
                backgroundColor: 'gray-100',
                border: '1px solid',
                borderColor: 'border.base',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text as="h2" fontFamily="standard" marginBottom="10px">No Component Found</Text>
              <Text fontFamily="standard">A Themed version of this component has not yet been completed</Text>
            </Box>
            :
            <Story {...context} />
        }
      </div>
    </AstroProvider>
  )
}

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

export const globalTypes = {
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
}

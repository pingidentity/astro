import React from 'react';
import theme from '../src/styles/theme';
import { Box, Text } from '../src/index';
import yourTheme from './AstroTheme';
import { NextGenTheme } from '../src/index';
import { withConsole } from '@storybook/addon-console';
import { AstroProvider } from '../src/index';
import nextGenConvertedComponents from '../src/styles/themes/next-gen/convertedComponentList'
import "@storybook/react";

const withThemeProvider = (Story, context) => {
  const storyTitle = context.title.split('/')[1]
  const isStoryInNextGen = nextGenConvertedComponents.includes(storyTitle) || context.title.split('/')[0] === "Next Gen Recipes"
  const selectedTheme = context.parameters.theme || context.globals.theme
  const showComingSoonMessage = isStoryInNextGen === false && selectedTheme === 'nextGen'

  const storyTheme = selectedTheme === 'nextGen' ? NextGenTheme : theme;
  
  return (
    <AstroProvider theme={storyTheme} bg="transparent">
      <div style={{ padding: "50px" }}>
        {
          showComingSoonMessage ?
          <Box
            sx={{
              height: '200px',
              backgroundColor: 'gray-100',
              border: '1px solid',
              borderColor: 'gray-300',
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
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'circlehollow', title: 'Astro' },
        { value: 'nextGen', icon: 'circle', title: 'NextGenTheme' },
      ],
      showName: true,
    },
  },
}

import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { AstroProvider,
  Button,
  Text } from '../../index';

import AstroProviderReadme from './AstroProvider.mdx';

export default {
  title: 'Components/AstroProvider',
  component: AstroProvider,
  parameters: {
    docs: {
      page: () => (
        <>
          <AstroProviderReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  decorators: [
    Story => (
      <div>
        <Story />
      </div>
    ),
  ],
};

export const Default = () => {
  return (
    <AstroProvider bg="transparent" alignItems="flex-start">
      <Text variant="title" mb="sm">Title Text</Text>
      <Text variant="body" mb="sm">Body text</Text>
      <Button variant="primary">
        Primary Button
      </Button>
    </AstroProvider>
  );
};

export const WithCustomThemeOverride = () => {
  const myNewColors = {
    primary: '#183446',
    secondary: '#046E8F',
  };

  const myCustomBranding = {
    buttons: {
      primary: {
        bg: myNewColors.primary,
        border: 'none',
        display: 'inline',
        '&:hover': {
          bg: '#0090C1',
          border: 'none',
        },
        '&.is-pressed': {
          border: 'none',
        },
      },
    },
    text: {
      title: {
        color: myNewColors.secondary,
      },
    },
  };

  return (
    <AstroProvider themeOverrides={[myCustomBranding]} bg="transparent" alignItems="flex-start">
      <Text variant="title" mb="sm">This is the heading variant with a custom theme applied. </Text>
      <Text variant="body" mb="sm">The body variant is not mentioned in the custom theme, so it inherits styles from the default Astro theme.</Text>
      <Button variant="primary">
        This is a primary button with custom theme.
      </Button>
    </AstroProvider>
  );
};

WithCustomThemeOverride.story = {
  parameters: {
    docs: {
      storyDescription: 'Pass an array containing your theme override objects to the `themeOverrides` prop.',
    },
  },
};

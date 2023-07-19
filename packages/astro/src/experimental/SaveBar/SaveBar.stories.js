import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Button, SaveBar } from '../..';

import SaveBarReadme from './SaveBar.mdx';

export default {
  title: 'Experimental/SaveBar',
  component: SaveBar,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
      page: () => (
        <>
          <SaveBarReadme />
          <DocsLayout />
        </>
      ),
    },
  },
};

export const Default = args => (
  <SaveBar
    saveButtonProps={{ key: 'save button', text: 'Save', onPress: () => alert('Save button pressed') }}
    cancelButtonProps={{ key: 'cancel button', text: 'Cancel', onPress: () => alert('Cancel button pressed') }}
    {...args}
  />
);

export const WithRefreshButton = args => (
  <SaveBar
    saveButtonProps={{ key: 'save button', text: 'Save', onPress: () => alert('Save button pressed') }}
    cancelButtonProps={{ key: 'cancel button', text: 'Cancel', onPress: () => alert('Cancel button pressed') }}
    refreshButtonProps={{ key: 'refresh button', text: 'Refresh', onPress: () => alert('Refresh button pressed') }}
    {...args}
  />
);

export const JustifiedRight = () => (
  <SaveBar
    saveButtonProps={{ key: 'next button', text: 'Next', onPress: () => alert('Save button pressed') }}
    cancelButtonProps={{ key: 'cancel button', text: 'Cancel', onPress: () => alert('Cancel button pressed') }}
    isJustifiedRight
  />
);

export const WithChildren = args => (
  <SaveBar {...args}>
    <Button>Custom Button!</Button>
    <Button variant="link">Custom Link!</Button>
  </SaveBar>
);

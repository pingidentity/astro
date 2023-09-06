import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Button, ButtonBar } from '../..';

import ButtonBarReadme from './ButtonBar.mdx';

export default {
  title: 'Experimental/ButtonBar',
  component: ButtonBar,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
      page: () => (
        <>
          <ButtonBarReadme />
          <DocsLayout />
        </>
      ),
    },
  },
};

export const Default = args => (
  <ButtonBar
    saveButtonProps={{ key: 'save button', text: 'Save', onPress: () => alert('Save button pressed') }}
    cancelButtonProps={{ key: 'cancel button', text: 'Cancel', onPress: () => alert('Cancel button pressed') }}
    {...args}
  />
);

export const WithRefreshButton = args => (
  <ButtonBar
    saveButtonProps={{ key: 'save button', text: 'Save', onPress: () => alert('Save button pressed') }}
    cancelButtonProps={{ key: 'cancel button', text: 'Cancel', onPress: () => alert('Cancel button pressed') }}
    refreshButtonProps={{ key: 'refresh button', text: 'Refresh', onPress: () => alert('Refresh button pressed') }}
    {...args}
  />
);

export const JustifiedRight = () => (
  <ButtonBar
    saveButtonProps={{ key: 'next button', text: 'Next', onPress: () => alert('Save button pressed') }}
    cancelButtonProps={{ key: 'cancel button', text: 'Cancel', onPress: () => alert('Cancel button pressed') }}
    isJustifiedRight
  />
);

export const WithChildren = args => (
  <ButtonBar {...args}>
    <Button>Custom Button!</Button>
    <Button variant="link">Custom Link!</Button>
  </ButtonBar>
);

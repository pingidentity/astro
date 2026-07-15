import React from 'react';
import AlertCircleOutlineIcon from '@pingux/mdi-react/AlertCircleOutlineIcon';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, Button, ServerErrorBoundary, Text } from '../../index';
import { ServerErrorBoundaryProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import ServerErrorBoundaryReadme from './ServerErrorBoundary.mdx';
import { serverErrorBoundaryArgTypes } from './serverErrorBoundaryAttributes';

export default {
  title: 'Components/ServerErrorBoundary',
  component: ServerErrorBoundary,
  parameters: {
    docs: {
      page: () => (
        <>
          <ServerErrorBoundaryReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: serverErrorBoundaryArgTypes as unknown as Meta<typeof ServerErrorBoundary>['argTypes'],
  args: {
    hasServerError: true,
  },
} satisfies Meta<typeof ServerErrorBoundary>;

export const Default: StoryFn<ServerErrorBoundaryProps> = ({ ...args }) => (
  <ServerErrorBoundary {...args}>
    <Box width="400px">
      <Text>Lorem ipsum dolor sit amet</Text>
    </Box>
  </ServerErrorBoundary>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.ServerErrorBoundary.default,
  },
};

export const CustomMessageAndIcon: StoryFn<ServerErrorBoundaryProps> = ({ ...args }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <ServerErrorBoundary
      {...args}
      iconProps={{
        icon: AlertCircleOutlineIcon,
        title: { name: 'Alert Outline Circle Icon' },
      }}
      text="Loading Problem."
      buttonProps={{
        onPress: handleReload,
        children: 'Reload',
      }}
    >
      <Box width="400px">
        <Text>Lorem ipsum dolor sit amet</Text>
      </Box>
    </ServerErrorBoundary>
  );
};

export const CustomErrorElement: StoryFn<ServerErrorBoundaryProps> = ({ ...args }) => {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <ServerErrorBoundary
      {...args}
      renderElement={(
        <Text display="flex" alignItems="center">
          Lorem ipsum dolor sit amet.&nbsp;
          <Button variant="link" onPress={handleReload} p="0">Reload</Button>
        </Text>
      )}
    >
      <Box width="400px">
        <Text>Lorem ipsum dolor sit amet</Text>
      </Box>
    </ServerErrorBoundary>
  );
};

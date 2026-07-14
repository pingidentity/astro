import React from 'react';
import DeleteIcon from '@pingux/mdi-react/DeleteIcon';
import { Meta } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, IconWrapper } from '../../index';

import IconWrapperReadme from './IconWrapper.mdx';
import { iconWrapperArgTypes } from './iconWrapperAttributes';

export default {
  title: 'Components/IconWrapper',
  component: IconWrapper,
  parameters: {
    docs: {
      page: () => (
        <>
          <IconWrapperReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    ...iconWrapperArgTypes,
  },
  args: {
    icon: DeleteIcon,
    color: 'cyan',
    size: 'sm',
    title: { name: 'delete Icon' },
  },
} satisfies Meta<typeof IconWrapper>;

export const Default = args => {
  return <IconWrapper {...args} />;
};

export const Sizes = () => {
  return (
    <Box gap="md" isRow alignItems="center">
      <IconWrapper
        icon={DeleteIcon}
        color="cyan"
        size="xs"
        title={{ name: 'extra small' }}
      />
      <IconWrapper
        icon={DeleteIcon}
        color="cyan"
        size="sm"
        title={{ name: 'small' }}
      />
      <IconWrapper
        icon={DeleteIcon}
        color="cyan"
        size="md"
        title={{ name: 'medium' }}
      />
      <IconWrapper
        icon={DeleteIcon}
        color="cyan"
        size="lg"
        title={{ name: 'large' }}
      />
      <IconWrapper
        icon={DeleteIcon}
        color="cyan"
        size="xl"
        title={{ name: 'extra large' }}
      />
    </Box>
  );
};

export const IsCircle = () => {
  return (
    <Box gap="md" isRow alignItems="center">
      <IconWrapper
        icon={DeleteIcon}
        color="cyan"
        size="xs"
        isCircle
        title={{ name: 'extra small circle' }}
      />
      <IconWrapper
        icon={DeleteIcon}
        color="cyan"
        size="sm"
        isCircle
        title={{ name: 'small circle' }}
      />
      <IconWrapper
        icon={DeleteIcon}
        color="cyan"
        size="md"
        isCircle
        title={{ name: 'medium circle' }}
      />
      <IconWrapper
        icon={DeleteIcon}
        color="cyan"
        size="lg"
        isCircle
        title={{ name: 'large circle' }}
      />
    </Box>
  );
};

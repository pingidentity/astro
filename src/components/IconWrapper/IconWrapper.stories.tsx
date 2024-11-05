import React from 'react';
import DeleteIcon from '@pingux/mdi-react/DeleteIcon';
import { Meta } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { IconWrapper } from '../../index';

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
      source: {
        type: 'code',
      },
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
} as Meta;

export const Default = args => {
  return (
    <IconWrapper {...args} />
  );
};

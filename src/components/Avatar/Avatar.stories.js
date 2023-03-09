import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Avatar } from '../../index';
import { pingImg } from '../../utils/devUtils/constants/images';

import AvatarReadme from './Avatar.mdx';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      page: () => (
        <>
          <AvatarReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    src: {
      control: {
        type: 'none',
      },
      defaultValue: pingImg,
    },
  },
};

export const Default = ({ ...args }) => (
  <Avatar {...args} />
);

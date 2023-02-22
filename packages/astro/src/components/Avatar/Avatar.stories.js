import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { pingImg } from '../../utils/devUtils/constants/images';

import AvatarReadme from './Avatar.mdx';
import Avatar from '.';

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

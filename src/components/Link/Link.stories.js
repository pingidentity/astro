import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Link } from '../../index';
import { htmlElements } from '../../utils/devUtils/constants/htmlElements';

import LinkReadme from './Link.mdx';
import variants from './Link.styles';

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {
    docs: {
      page: () => (
        <>
          <LinkReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    href: {
      control: {
        type: 'text',
      },
      defaultValue: 'https://uilibrary.ping-eng.com/',
    },
    isDisabled: {},
    as: {
      control: {
        type: 'none',
        options: htmlElements,
      },
      defaultValue: 'a',
    },
    target: {
      control: {
        type: 'none',
      },
      defaultValue: '_blank',
    },
    variant: {
      control: {
        type: 'select',
        options: Object.keys(variants),
      },
    },
  },
};

export const Default = ({ ...args }) => (
  <div>
    <Link {...args}>A link</Link>
    {' '}
    to your favorite website.
  </div>
);

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Link, Text } from '../../index';
import { LinkProps } from '../../types/link';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import { htmlElements } from '../../utils/devUtils/constants/htmlElements';

import LinkReadme from './Link.mdx';
import variants from './Link.styles';

export default {
  title: 'Components/Link',
  component: Link,
  decorators: [withDesign],
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
    },
    isDisabled: {},
    isSafariCompatible: {
      table: {
        disable: true,
      },
    },
    as: {
      control: {
        type: 'none',
        options: htmlElements,
      },
    },
    target: {
      control: {
        type: 'none',
      },
    },
    variant: {
      control: {
        type: 'select',
        options: Object.keys(variants),
      },
    },
  },
  args: {
    href: 'https://uilibrary.ping-eng.com/',
    as: 'a',
    target: '_blank',
  },
} as Meta;

export const Default: StoryFn<LinkProps> = ({ ...args }) => (
  <div style={{ width: 'max-content' }}>
    <Text>
      <Link {...args}>Lorem ipsum</Link>
      {' '}
      dolor sit amet, consectetur adipiscing elit
    </Text>
  </div>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.link.default,
  },
};

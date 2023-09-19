import React from 'react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Link } from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.js';
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
};

export const Default = ({ ...args }) => (
  <div>
    <Link {...args}>A link</Link>
    {' '}
    to your favorite website.
  </div>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.link.default,
  },
};

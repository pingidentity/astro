import React from 'react';
import { Item } from 'react-stately';
import ChevronRightIcon from '@pingux/mdi-react/ChevronRightIcon';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, Breadcrumbs } from '../../index';
import { breadCrumbsProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import BreadcrumbsReadme from './Breadcrumbs.mdx';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  decorators: [withDesign],
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
      page: () => (
        <>
          <BreadcrumbsReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    icon: {
      control: {
        type: 'none',
      },
      description:
        'The icon to render. List of icons at https://materialdesignicons.com/',
    },
    iconProps: {
      control: {
        type: 'none',
      },
    },
  },

} as Meta;

export const Default: StoryFn<breadCrumbsProps> = args => {
  const onAction = key => action(`onPress ${key}`);

  return (
    <Breadcrumbs {...args} onAction={onAction} icon={ChevronRightIcon}>
      <Item
        aria-label="home"
        data-id="home"
        href="https://www.pingidentity.com"
        key="home"
      >
        Home
      </Item>
      <Item
        aria-label="trendy"
        data-id="trendy"
        href="https://www.pingidentity.com"
        key="trendy"
      >
        Trendy
      </Item>
      <Item
        aria-label="march-2020-assets"
        data-id="march"
        key="march 2020 assets"
      >
        March 2020 Assets
      </Item>
    </Breadcrumbs>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.breadcrumbs.default,
  },
};

export const Overflowing: StoryFn = () => {
  const reallyLongText = 'If This Text Were Really Very Much So Extremely Long';

  return (
    <Box gap="md" maxWidth="385px">
      <Breadcrumbs icon={ChevronRightIcon}>
        <Item
          aria-label="breadcrumb_1"
          data-id="breadcrumb_1"
          href="https://www.pingidentity.com"
          key="breadcrumb_1"
        >
          {reallyLongText}
        </Item>
        <Item
          aria-label="breadcrumb_2"
          data-id="breadcrumb_2"
          href="https://www.pingidentity.com"
          key="breadcrumb_2"
        >
          Edit
        </Item>
      </Breadcrumbs>
      <Breadcrumbs icon={ChevronRightIcon}>
        <Item
          aria-label="breadcrumb_1"
          data-id="breadcrumb_1"
          href="https://www.pingidentity.com"
          key="breadcrumb_1"
        >
          {reallyLongText}
        </Item>
        <Item
          aria-label="breadcrumb_1"
          data-id="breadcrumb_2"
          href="https://www.pingidentity.com"
          key="breadcrumb_2"
        >
          {reallyLongText}
        </Item>
      </Breadcrumbs>
    </Box>
  );
};

Overflowing.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.breadcrumbs.overflowing,
  },
  a11y: {
    config: {
      rules: [{ id: 'landmark-unique', enabled: false }],
    },
  },
};

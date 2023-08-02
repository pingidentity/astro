import React from 'react';
import { Item } from 'react-stately';
import ChevronRightIcon from '@pingux/mdi-react/ChevronRightIcon';
import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Breadcrumbs } from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.js';

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
  args: {
    icon: ChevronRightIcon,
  },
};

export const Default = args => {
  const onAction = key => action(`onPress ${key}`);

  return (
    <Breadcrumbs onAction={onAction} {...args}>
      <Item
        aria-label="home"
        data-id="home"
        href="https://www.pingidentity.com"
        key="home"
        variant="buttons.link"
      >
        Home
      </Item>
      <Item
        aria-label="trendy"
        data-id="trendy"
        href="https://www.pingidentity.com"
        key="trendy"
        variant="buttons.link"
      >
        Trendy
      </Item>
      <Item
        aria-label="march-2020-assets"
        data-id="march"
        key="march 2020 assets"
        variant="buttons.link"
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

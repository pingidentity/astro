import React from 'react';
import { Item } from 'react-stately';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Menu, Text } from '../../index';
import { MenuProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import MenuReadme from './Menu.mdx';
import { menuArgTypes } from './menuAttributes';

export default {
  title: 'Components/Menu',
  component: Menu,
  decorators: [withDesign],
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
    docs: {
      page: () => (
        <>
          <MenuReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
    design: {
      type: 'figma',
    },
  },
  argTypes: menuArgTypes,
} as Meta;

export const Default: StoryFn<MenuProps> = (args: MenuProps) => {
  return (
    <Menu aria-label="Example Menu" {...args}>
      <Item key="edit" textValue="Edit" data-id="edit">
        <Text>Edit</Text>
      </Item>
      <Item key="duplicate" textValue="Duplicate" data-id="duplicate">
        <Text>Duplicate</Text>
      </Item>
      <Item key="delete" textValue="Delete" data-id="delete">
        <Text color="critical.bright">Delete</Text>
      </Item>
    </Menu>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.menu.default,
  },
};

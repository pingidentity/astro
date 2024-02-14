import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Button,
  Item,
  Menu,
  OverlayProvider,
  PopoverMenu,
  Text,
} from '../../index';
import { PopoverMenuProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import PopoverMenuReadme from './PopoverMenu.mdx';

export default {
  title: 'Components/PopoverMenu',
  component: PopoverMenu,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <>
          <PopoverMenuReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    align: {},
    direction: {},
    isDefaultOpen: {},
    isNotClosedOnSelect: {},
    isNotFlippable: {},
    isOpen: {
      onClick: { action: 'clicked' },
      control: {
        type: 'none',
      },
    },
  },
} as Meta;

export const Default: StoryFn<PopoverMenuProps> = (args: PopoverMenuProps) => (
  // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
  // readers when an overlay opens.
  <OverlayProvider>
    <PopoverMenu {...args}>
      <Button>Click me</Button>
      <Menu onAction={action('onAction')}>
        <Item key="edit">Edit</Item>
        <Item key="duplicate">Duplicate</Item>
        <Item key="delete" textValue="delete">
          <Text color="critical.bright">
            Delete
          </Text>
        </Item>
      </Menu>
    </PopoverMenu>
  </OverlayProvider>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.popoverMenu.default,
  },
};

export const DefaultOpen: StoryFn = () => (
  // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
  // readers when an overlay opens.
  <OverlayProvider>
    <PopoverMenu isDefaultOpen>
      <Button>Click me</Button>
      <Menu onAction={action('onAction')}>
        <Item key="edit">Edit</Item>
        <Item key="duplicate">Duplicate</Item>
        <Item key="delete" textValue="delete">
          <Text color="critical.bright">
            Delete
          </Text>
        </Item>
      </Menu>
    </PopoverMenu>
  </OverlayProvider>
);

export const Controlled: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <PopoverMenu isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button>Click me</Button>
        <Menu onAction={action('onAction')}>
          <Item key="edit">Edit</Item>
          <Item key="duplicate">Duplicate</Item>
          <Item key="delete" textValue="delete">
            <Text color="critical.bright">
              Delete
            </Text>
          </Item>
        </Menu>
      </PopoverMenu>
    </OverlayProvider>
  );
};

export const Placement: StoryFn = () => (
  // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
  // readers when an overlay opens.
  <OverlayProvider>
    <PopoverMenu direction="left">
      <Button>Click me</Button>
      <Menu onAction={action('onAction')}>
        <Item key="edit">Edit</Item>
        <Item key="duplicate">Duplicate</Item>
        <Item key="delete" textValue="delete">
          <Text color="critical.bright">
            Delete
          </Text>
        </Item>
      </Menu>
    </PopoverMenu>
  </OverlayProvider>
);

export const NotFlippable: StoryFn = () => (
  // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
  // readers when an overlay opens.
  <OverlayProvider>
    {/* There is no room on the left so it will flip by default. `isNotFlippable` prevents this. */}
    <PopoverMenu direction="left" isNotFlippable>
      <Button>Click me</Button>
      <Menu onAction={action('onAction')}>
        <Item key="edit">Edit</Item>
        <Item key="duplicate">Duplicate</Item>
        <Item key="delete" textValue="delete">
          <Text color="critical.bright">
            Delete
          </Text>
        </Item>
      </Menu>
    </PopoverMenu>
  </OverlayProvider>
);

export const NotClosedOnSelect: StoryFn = () => (
  // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
  // readers when an overlay opens.
  <OverlayProvider>
    <PopoverMenu isNotClosedOnSelect>
      <Button>Click me</Button>
      <Menu onAction={action('onAction')}>
        <Item key="edit">Edit</Item>
        <Item key="duplicate">Duplicate</Item>
        <Item key="delete" textValue="delete">
          <Text color="critical.bright">
            Delete
          </Text>
        </Item>
      </Menu>
    </PopoverMenu>
  </OverlayProvider>
);

export const DisabledItem: StoryFn = () => (
  // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
  // readers when an overlay opens.
  <OverlayProvider>
    <PopoverMenu>
      <Button>Click me</Button>
      <Menu onAction={action('onAction')} disabledKeys={['duplicate']}>
        <Item key="edit">Edit</Item>
        <Item key="duplicate">Duplicate</Item>
        <Item key="delete" textValue="delete">
          <Text color="critical.bright">
            Delete
          </Text>
        </Item>
      </Menu>
    </PopoverMenu>
  </OverlayProvider>
);

export const isPressed: StoryFn = () => (
  // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
  // readers when an overlay opens.
  <OverlayProvider>
    <PopoverMenu>
      <Button>Click me</Button>
      <Menu onAction={action('onAction')} disabledKeys={['duplicate']}>
        <Item key="edit" isPressed>Edit</Item>
        <Item key="duplicate">Duplicate</Item>
        <Item key="delete" textValue="delete">
          <Text color="critical.bright">
            Delete
          </Text>
        </Item>
      </Menu>
    </PopoverMenu>
  </OverlayProvider>
);

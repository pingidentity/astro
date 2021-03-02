import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import {
  OverlayProvider,
  PopoverMenu,
  Button,
  Menu,
  Item,
  Separator,
  Text,
} from '../../index';

export default {
  title: 'PopoverMenu',
  component: PopoverMenu,
};

export const Default = () => (
  // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
  // readers when an overlay opens.
  <OverlayProvider>
    <PopoverMenu>
      <Button>Click me</Button>
      <Menu onAction={action('onAction')} disabledKeys={['-']}>
        <Item key="edit">Edit</Item>
        <Item key="duplicate">Duplicate</Item>
        <Item key="-" textValue="-" isSeparator>
          <Separator />
        </Item>
        <Item key="delete" textValue="delete">
          <Text color="critical.bright">
            Delete
          </Text>
        </Item>
      </Menu>
    </PopoverMenu>
  </OverlayProvider>
);

export const DefaultOpen = () => (
  // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
  // readers when an overlay opens.
  <OverlayProvider>
    <PopoverMenu isDefaultOpen>
      <Button>Click me</Button>
      <Menu onAction={action('onAction')} disabledKeys={['-']}>
        <Item key="edit">Edit</Item>
        <Item key="duplicate">Duplicate</Item>
        <Item key="-" textValue="-" isSeparator>
          <Separator />
        </Item>
        <Item key="delete" textValue="delete">
          <Text color="critical.bright">
            Delete
          </Text>
        </Item>
      </Menu>
    </PopoverMenu>
  </OverlayProvider>
);

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <PopoverMenu isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button>Click me</Button>
        <Menu onAction={action('onAction')} disabledKeys={['-']}>
          <Item key="edit">Edit</Item>
          <Item key="duplicate">Duplicate</Item>
          <Item key="-" textValue="-" isSeparator>
            <Separator />
          </Item>
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

export const Placement = () => (
  // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
  // readers when an overlay opens.
  <OverlayProvider>
    <PopoverMenu direction="left">
      <Button>Click me</Button>
      <Menu onAction={action('onAction')} disabledKeys={['-']}>
        <Item key="edit">Edit</Item>
        <Item key="duplicate">Duplicate</Item>
        <Item key="-" textValue="-" isSeparator>
          <Separator />
        </Item>
        <Item key="delete" textValue="delete">
          <Text color="critical.bright">
            Delete
          </Text>
        </Item>
      </Menu>
    </PopoverMenu>
  </OverlayProvider>
);

export const NotFlippable = () => (
  // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
  // readers when an overlay opens.
  <OverlayProvider>
    {/* There is no room on the left so it will flip by default. `isNotFlippable` prevents this. */}
    <PopoverMenu direction="left" isNotFlippable>
      <Button>Click me</Button>
      <Menu onAction={action('onAction')} disabledKeys={['-']}>
        <Item key="edit">Edit</Item>
        <Item key="duplicate">Duplicate</Item>
        <Item key="-" textValue="-" isSeparator>
          <Separator />
        </Item>
        <Item key="delete" textValue="delete">
          <Text color="critical.bright">
            Delete
          </Text>
        </Item>
      </Menu>
    </PopoverMenu>
  </OverlayProvider>
);

export const NotClosedOnSelect = () => (
  // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
  // readers when an overlay opens.
  <OverlayProvider>
    <PopoverMenu isNotClosedOnSelect>
      <Button>Click me</Button>
      <Menu onAction={action('onAction')} disabledKeys={['-']}>
        <Item key="edit">Edit</Item>
        <Item key="duplicate">Duplicate</Item>
        <Item key="-" textValue="-" isSeparator>
          <Separator />
        </Item>
        <Item key="delete" textValue="delete">
          <Text color="critical.bright">
            Delete
          </Text>
        </Item>
      </Menu>
    </PopoverMenu>
  </OverlayProvider>
);

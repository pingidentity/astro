import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '../../utils/testUtils/testWrapper';
import {
  Button,
  PopoverMenu,
  Menu,
  Item,
} from '../../index';

const getComponent = (props = {}) => render((
  <>
    <PopoverMenu {...props}>
      <Button>Mock Button</Button>
      <Menu>
        <Item key="a">A</Item>
        <Item key="b">B</Item>
      </Menu>
    </PopoverMenu>
  </>
));

test('renders a popover menu when trigger is clicked', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();

  userEvent.click(button);
  expect(screen.queryByRole('presentation')).toBeInTheDocument();
  expect(screen.queryByRole('presentation')).toBeVisible();
  // Should have two accessible dismiss buttons applied (in addition to the trigger button)
  expect(screen.queryAllByRole('button')).toHaveLength(3);
  expect(screen.queryByRole('menu')).toBeInTheDocument();

  userEvent.click(button);
  expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});

test('should respond to keyboard events', () => {
  getComponent();
  const button = screen.getByRole('button');

  fireEvent.keyDown(button, { key: 'Enter', code: 13 });
  fireEvent.keyUp(button, { key: 'Enter', code: 13 });
  expect(screen.queryByRole('presentation')).toBeInTheDocument();

  fireEvent.keyDown(button, { key: 'Enter', code: 13 });
  fireEvent.keyUp(button, { key: 'Enter', code: 13 });
  expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
});

test('renders the correct popover menu placement', () => {
  getComponent({ direction: 'right' });
  const button = screen.getByRole('button');

  userEvent.click(button);
  expect(screen.getByRole('presentation')).toHaveAttribute('data-popover-placement', 'right');
});

test('should close when a menu item is selected', () => {
  getComponent();
  const button = screen.getByRole('button');

  userEvent.click(button);
  expect(screen.queryByRole('presentation')).toBeInTheDocument();
  const menuItem = screen.getAllByRole('menuitem')[0];

  // Click the item and ensure the popover closes
  userEvent.click(menuItem);
  expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
});

test('should not close when a menu item is selected when isNotClosedOnSelect is true', () => {
  getComponent({ isNotClosedOnSelect: true });
  const button = screen.getByRole('button');

  userEvent.click(button);
  expect(screen.queryByRole('presentation')).toBeInTheDocument();
  const menuItem = screen.getAllByRole('menuitem')[0];

  // Click the item and ensure the popover does not close
  userEvent.click(menuItem);
  expect(screen.queryByRole('presentation')).toBeInTheDocument();
});

test('should be open when isDefaultOpen is true', () => {
  getComponent({ isDefaultOpen: true });
  const button = screen.getAllByRole('button')[0];

  expect(screen.queryByRole('presentation')).toBeInTheDocument();
  userEvent.click(button);
  expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
});

test('should be open when isOpen is true and not react to attempts to close it', () => {
  getComponent({ isOpen: true });
  const button = screen.getAllByRole('button')[0];

  expect(screen.queryByRole('presentation')).toBeInTheDocument();
  userEvent.click(button);
  expect(screen.queryByRole('presentation')).toBeInTheDocument();
});

test('should respond to onOpenChange', () => {
  const onOpenChange = jest.fn();
  getComponent({ onOpenChange });
  const button = screen.getByRole('button');

  expect(onOpenChange).not.toHaveBeenCalled();
  userEvent.click(button);
  expect(onOpenChange).toHaveBeenNthCalledWith(1, true);
  userEvent.click(button);
  expect(onOpenChange).toHaveBeenNthCalledWith(2, false);
});

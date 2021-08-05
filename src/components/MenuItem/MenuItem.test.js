import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '../../utils/testUtils/testWrapper';
import { Menu, Item } from '../../index';

const testId = 'testId';
const defaultMenuItems = [
  { key: 'MenuItem 1', children: 'MenuItem 1' },
  { key: 'MenuItem 2', children: 'MenuItem 2' },
  { key: 'MenuItem 3', children: 'MenuItem 3' },
];

const defaultProps = {
  'data-testid': testId,
  defaultSelectedKey: defaultMenuItems[0].key,
  'aria-label': 'testLabel',
};
const getComponent = (props = {}, {
  items = defaultMenuItems,
  renderFn = render,
} = {}) => renderFn((
  <Menu {...defaultProps} {...props}>
    {items.map(li => <Item key={li.key} {...li} />)}
  </Menu>
));

test('renders menu with menu items', () => {
  getComponent();
  const menu = screen.getByRole('menu');
  const menuItems = screen.getAllByRole('menuitem');
  expect(menu).toBeInTheDocument();
  expect(menuItems).toHaveLength(menuItems.length);
  menuItems.forEach(item => expect(item).toBeInTheDocument());
});

test('applies focus when tabbed to', () => {
  getComponent();
  const { children: itemText } = defaultMenuItems[0];
  const menuItem = screen.getByText(itemText);
  expect(menuItem).not.toHaveFocus();
  expect(menuItem).not.toHaveClass('is-focused');

  userEvent.tab();
  expect(menuItem).toHaveFocus();
  expect(menuItem).toHaveClass('is-focused');
});

test('can arrow through menuItems', () => {
  getComponent();

  const { children: itemText1 } = defaultMenuItems[0];
  const { children: itemText2 } = defaultMenuItems[1];
  const menuItem1 = screen.getByText(itemText1);
  const menuItem2 = screen.getByText(itemText2);
  expect(menuItem1).not.toHaveFocus();
  expect(menuItem1).not.toHaveClass('is-focused');

  userEvent.tab();
  expect(menuItem1).toHaveFocus();
  expect(menuItem1).toHaveClass('is-focused');

  fireEvent.keyDown(menuItem1, { key: 'ArrowDown', code: 'ArrowDown' });
  expect(menuItem2).toHaveFocus();
  expect(menuItem2).toHaveClass('is-focused');
});

test('hovering menuItems applies focus class', () => {
  getComponent();

  const { children: itemText1 } = defaultMenuItems[0];
  const { children: itemText2 } = defaultMenuItems[1];
  const menuItem1 = screen.getByText(itemText1);
  const menuItem2 = screen.getByText(itemText2);
  expect(menuItem1).not.toHaveClass('is-focused');
  expect(menuItem2).not.toHaveClass('is-focused');

  userEvent.hover(menuItem1);
  expect(menuItem1).toHaveClass('is-focused');

  userEvent.hover(menuItem2);
  expect(menuItem2).toHaveClass('is-focused');
});

test('disables item with isDisabled applied, does not disable without prop', () => {
  getComponent({ disabledKeys: [defaultMenuItems[0].key] });
  const { children: disbaledItemText } = defaultMenuItems[0];
  const disabledMenuItem = screen.getByText(disbaledItemText);
  expect(disabledMenuItem).toHaveClass('is-disabled');

  const { children: menuItemText } = defaultMenuItems[1];
  const menuItem = screen.getByText(menuItemText);
  expect(menuItem).not.toHaveClass('is-disabled');
});

test('should change styles according to isPressed prop', () => {
  const customItems = Array.from(defaultMenuItems);
  customItems[0].isPressed = true;
  getComponent({}, { items: customItems });
  const pressedItem = screen.getAllByRole('menuitem')[0];
  const regularItem = screen.getAllByRole('menuitem')[1];
  expect(pressedItem).toHaveClass('is-pressed');
  expect(regularItem).not.toHaveClass('is-pressed');
});

test('applies selected styling with isSelected prop, does not add class without prop', () => {
  getComponent({
    selectionMode: 'single',
    defaultSelectedKeys: [defaultMenuItems[0].key],
  });
  const { children: selectedItemText } = defaultMenuItems[0];
  const selectedMenuItem = screen.getByText(selectedItemText);
  expect(selectedMenuItem).toHaveClass('is-selected');

  const { children: menuItemText } = defaultMenuItems[1];
  const menuItem = screen.getByText(menuItemText);
  expect(menuItem).not.toHaveClass('is-selected');
});

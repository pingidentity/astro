import React from 'react';
import userEvent from '@testing-library/user-event';

import { Item, Menu } from '../../index';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const testId = 'testId';
const defaultMenuItems = [
  { key: 'MenuItem 1', children: 'MenuItem 1', 'data-id': 'menuItem1', isPressed: false },
  { key: 'MenuItem 2', children: 'MenuItem 2', 'data-id': 'menuItem2', isPressed: false },
  { key: 'MenuItem 3', children: 'MenuItem 3', 'data-id': 'menuItem3', isPressed: false },
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
    {items.map(li => <Item {...li} sx={{ backgroundColor: 'orange' }} />)}
  </Menu>
));

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <Menu {...defaultProps} {...props}>
      {defaultMenuItems.map(li => <Item {...li} sx={{ backgroundColor: 'orange' }} />)}
    </Menu>
  ),
});

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

test('hovering menuItems applies focus class and removes focus style on unhover with "isNotFocusedOnHover"', () => {
  getComponent({ isNotFocusedOnHover: true });

  const { children: itemText1 } = defaultMenuItems[0];
  const menuItem1 = screen.getByText(itemText1);
  expect(menuItem1).not.toHaveClass('is-focused');

  userEvent.hover(menuItem1);
  expect(menuItem1).toHaveClass('is-focused');

  userEvent.unhover(menuItem1);
  expect(menuItem1).not.toHaveClass('is-focused');
});

test('hovering menuItems applies focus class and leaves focus style on unhover', () => {
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

  userEvent.unhover(menuItem2);
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

test('Item accepts a data-id and the data-id can be found in the DOM', () => {
  getComponent();
  const menuItems = screen.queryAllByRole('menuitem');
  expect(menuItems).toHaveLength(defaultMenuItems.length);
  expect(menuItems[0]).toHaveAttribute('data-id', defaultMenuItems[0]['data-id']);
});

test('custom props are passed into menuItem', () => {
  getComponent();
  const { children: itemText1 } = defaultMenuItems[0];
  const menuItem1 = screen.getByText(itemText1);
  expect(menuItem1).toHaveStyleRule('background-color', 'orange');
});

test('Selection mode given as single', () => {
  getComponent({
    selectionMode: 'single',
    defaultSelectedKeys: [defaultMenuItems[0].key],
  });
  const menuItems = screen.queryAllByRole('menuitemradio');
  expect(menuItems).toHaveLength(defaultMenuItems.length);
});

test('Selection mode given as multiple', () => {
  getComponent({
    selectionMode: 'multiple',
    defaultSelectedKeys: [defaultMenuItems[0].key],
  });
  const menuItems = screen.queryAllByRole('menuitemcheckbox');
  expect(menuItems).toHaveLength(defaultMenuItems.length);
});

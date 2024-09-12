import React from 'react';
import userEvent from '@testing-library/user-event';

import { Item, Menu, Section } from '../../index';
import { MenuProps } from '../../types';
import ORIENTATION from '../../utils/devUtils/constants/orientation';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const testTitle = 'Test Title';
const defaultProps: MenuProps = {
  title: testTitle,
  'aria-label': 'testLabel',
};

const defaultItems = [
  { id: 'a', children: 'A' },
  { id: 'b', children: 'B' },
  { id: 'c', children: 'C' },
];

const getComponent = (props = {}) => render((
  <Menu {...defaultProps} {...props}>
    {defaultItems.map(item => <Item key={item.id} {...item} />)}
  </Menu>
));

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <Menu {...defaultProps} {...props}>
      {defaultItems.map(item => <Item key={item.id} {...item} />)}
    </Menu>
  ),
});

test('should render basic menu with children', () => {
  getComponent();
  const menu = screen.queryByRole('menu');
  expect(menu).toBeInTheDocument();

  const menuItems = screen.queryAllByRole('menuitem');
  expect(menuItems).toHaveLength(3);
  expect(menu).toHaveAttribute('aria-orientation', ORIENTATION.VERTICAL);
});

test('should render sections when sections are passed as Children', () => {
  const menuSections = [
    { key: 'menuSection 1', children: defaultItems },
    { key: 'menuSection 2', children: defaultItems },
  ];
  render((
    <Menu {...defaultProps}>
      {menuSections.map(section => (
        <Section {...section}>
          {section.children.map(item => <Item key={item.id} {...item} />)}
        </Section>
      ))}
    </Menu>
  ));
  const menu = screen.queryByRole('menu');
  expect(menu).toBeInTheDocument();

  const menuSection = screen.queryAllByRole('group');
  expect(menuSection).toHaveLength(2);

  const menuItems = screen.getAllByRole('menuitem');
  expect(menuItems).toHaveLength(6);
});

test('should render items when selectionMode is set to single', () => {
  getComponent({ selectionMode: 'single' });
  const menu = screen.queryByRole('menu');
  expect(menu).toBeInTheDocument();

  const menuItems = screen.queryAllByRole('menuitemradio');
  expect(menuItems).toHaveLength(3);
});

test('should render items when selectionMode is set to multiple', () => {
  getComponent({ selectionMode: 'multiple' });
  const menu = screen.queryByRole('menu');
  expect(menu).toBeInTheDocument();

  const menuItems = screen.queryAllByRole('menuitemcheckbox');
  expect(menuItems).toHaveLength(3);
});

test('applies disabled class with disabled prop', () => {
  getComponent({ isDisabled: true });
  const menuItems = screen.getAllByRole('menuitem');
  menuItems.forEach(item => expect(item).toHaveClass('is-disabled'));
});

test('should be able to navigate through the items with the keyboard', () => {
  getComponent();
  const menuItems = screen.getAllByRole('menuitem');
  expect(menuItems[0]).not.toHaveFocus();

  // Need to tab to them first
  userEvent.tab();
  expect(menuItems[0]).toHaveFocus();

  // Then we can use the arrow keys
  fireEvent.keyDown(menuItems[0], { key: 'ArrowDown' });
  fireEvent.keyUp(menuItems[0], { key: 'ArrowDown' });
  expect(menuItems[0]).not.toHaveFocus();
  expect(menuItems[1]).toHaveFocus();

  fireEvent.keyDown(menuItems[1], { key: 'ArrowDown' });
  fireEvent.keyUp(menuItems[1], { key: 'ArrowDown' });
  expect(menuItems[1]).not.toHaveFocus();
  expect(menuItems[2]).toHaveFocus();
});

test('should fire onAction', () => {
  const onAction = jest.fn();
  getComponent({ onAction });
  const menuItems = screen.getAllByRole('menuitem');
  expect(onAction).not.toHaveBeenCalled();

  // Keyboard events
  userEvent.tab();
  fireEvent.keyDown(menuItems[0], { key: 'Enter' });
  fireEvent.keyUp(menuItems[0], { key: 'Enter' });
  expect(onAction).toHaveBeenNthCalledWith(1, defaultItems[0].id);

  // Click events
  userEvent.click(menuItems[1]);
  expect(onAction).toHaveBeenNthCalledWith(2, defaultItems[1].id);
});

test('should not fire onSelectionChange when selectionMode is none', () => {
  const onSelectionChange = jest.fn();
  getComponent({ onSelectionChange });
  const menuItems = screen.getAllByRole('menuitem');
  expect(onSelectionChange).not.toHaveBeenCalled();

  // Keyboard events
  userEvent.tab();
  fireEvent.keyDown(menuItems[0], { key: 'Enter' });
  fireEvent.keyUp(menuItems[0], { key: 'Enter' });
  expect(onSelectionChange).not.toHaveBeenCalled();

  // Click events
  userEvent.click(menuItems[1]);
  expect(onSelectionChange).not.toHaveBeenCalled();
});

test('should fire onSelectionChange when selectionMode is not none', () => {
  const onSelectionChange = jest.fn();
  getComponent({ onSelectionChange, selectionMode: 'single' });
  const menuItems = screen.getAllByRole('menuitemradio');
  expect(onSelectionChange).not.toHaveBeenCalled();

  // Keyboard events
  userEvent.tab();
  fireEvent.keyDown(menuItems[0], { key: 'Enter' });
  fireEvent.keyUp(menuItems[0], { key: 'Enter' });
  expect(onSelectionChange).toHaveBeenNthCalledWith(
    1,
    expect.any(Set),
  );

  // Click events
  userEvent.click(menuItems[1]);
  expect(onSelectionChange).toHaveBeenNthCalledWith(
    2,
    expect.any(Set),
  );
});

test('props passed through others are passed to menu', () => {
  getComponent({ sx: { bg: 'red' } });
  const menu = screen.queryByRole('menu');
  expect(menu).toBeInTheDocument();
  expect(menu).toHaveStyle('background-color: red');
});

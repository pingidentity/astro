import React from 'react';

import { Item, Menu, Section } from '../../index';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const testId = 'testId';
const defaultMenuSections = [
  { key: 'menuSection 1',
    'data-id': 'menuSection1',
    title: 'Section 1',
    children: [
      { key: 'menuItem1', children: 'MenuItem 1', 'data-id': 'menuItem1', isPressed: false, backgroundColor: 'orange' },

    ] },
  { key: 'menuSection 2',
    'data-id': 'menuSection2',
    children: [
      { key: 'menuItem2', children: 'MenuItem 2', 'data-id': 'menuItem1', isPressed: false },
      { key: 'menuItem3', children: 'MenuItem 3', 'data-id': 'menuItem1', isPressed: false },
    ] },
];

const defaultProps = {
  'data-testid': testId,
  defaultSelectedKey: 'menuItem1',
  'aria-label': 'testLabel',
};
const getComponent = (props = {}, {
  items = defaultMenuSections,
  renderFn = render,
} = {}) => renderFn((
  <Menu {...defaultProps} {...props}>
    {items.map(section => (
      <Section {...section}>
        {section.children.map(li => <Item {...li} />)}
      </Section>
    ))}
  </Menu>
));

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <Menu {...defaultProps} {...props}>
      {defaultMenuSections.map(section => (
        <Section {...section}>
          {section.children.map(li => <Item {...li} sx={{ backgroundColor: 'orange' }} />)}
        </Section>
      ))}
    </Menu>
  ),
});

test('renders menu with menu sections and titles', () => {
  getComponent();
  const menu = screen.getByRole('menu');
  const menuSections = screen.getAllByRole('group');
  const menuTitle = screen.getByText('Section 1');
  expect(menu).toBeInTheDocument();
  expect(menuTitle).toBeInTheDocument();
  expect(menuSections).toHaveLength(defaultMenuSections.length);
});

test('renders sections with menu items', () => {
  getComponent();

  const menuItems = screen.getAllByRole('menuitem');
  expect(menuItems).toHaveLength(defaultMenuSections.reduce((acc, section) => {
    return acc + section.children.length;
  }, 0));
});

test('custom props are passed into menuItem', () => {
  getComponent();
  const { children: itemText1 } = defaultMenuSections[0].children[0];
  const menuItem1 = screen.getByText(itemText1);
  expect(menuItem1).toHaveStyleRule('background-color', 'orange');
});

test('renders separator before menu section if it is not the first section', () => {
  getComponent();
  const separators = screen.getByRole('separator');
  expect(separators).toBeInTheDocument();
});

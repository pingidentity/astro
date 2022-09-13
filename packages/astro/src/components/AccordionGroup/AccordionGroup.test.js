import React from 'react';
import { Item } from '@react-stately/collections';
import userEvent from '@testing-library/user-event';
import axeTest from '../../utils/testUtils/testAxe';
import { act, fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import Text from '../Text';
import AccordionGroup from '../AccordionGroup';
import { OverlayPanel, TextField } from '../../index';

const testId = 'test-accordion';
const defaultProps = {
  'data-testid': testId,
};

const getComponent = (props = {}) => render((
  <AccordionGroup {...defaultProps} {...props} >
    <Item key="first" textValue="Duplicate" data-id="first" label="Accordion item">
      <Text>Render me!</Text>
    </Item>
    <Item key="second" textValue="Duplicate" data-id="second" label="Accordion item">
      <Text>Render me!</Text>
    </Item>
    <Item key="third" textValue="Duplicate" data-id="third" label="Accordion item">
      <TextField
        role="form"
        label="Example Label"
        data-testid="testField"
      />
    </Item>
  </AccordionGroup>
));

const getComponentInOverlayPanel = (props = {}) => render((
  <OverlayPanel isOpen >
    <AccordionGroup {...defaultProps} {...props} >
      <Item key="first" textValue="Duplicate" data-id="first">
        <Text>Render me!</Text>
      </Item>
      <Item key="second" textValue="Duplicate" data-id="second">
        <Text>Render me!</Text>
      </Item>
      <Item key="third" textValue="Duplicate" data-id="third">
        <Text>Render me!</Text>
      </Item>
    </AccordionGroup>
  </OverlayPanel>
));

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent, {
  // landmark-unique rule conflicts with react-aria role definition
  rules: {
    'landmark-unique': { enabled: false },
  },
});

test('button press uses callback', () => {
  const onPress = jest.fn();
  getComponent({ onExpandedChange: onPress });
  const buttons = screen.getAllByRole('button');
  const selectedItem = buttons[0];
  expect(selectedItem).not.toHaveClass('is-pressed');
  expect(onPress).not.toHaveBeenCalled();

  // Hold down the button to see pressed styles
  fireEvent.mouseDown(selectedItem);
  fireEvent.mouseUp(selectedItem);
  expect(onPress).toHaveBeenCalled();
});

test('toggle accordion on mouse click', () => {
  getComponent();
  const buttons = screen.getAllByRole('button');
  const selectedItem = buttons[0];
  expect(selectedItem).toHaveAttribute('aria-expanded', 'false');
  userEvent.click(selectedItem);
  expect(selectedItem).toHaveAttribute('aria-expanded', 'true');
  userEvent.click(selectedItem);
  expect(selectedItem).toHaveAttribute('aria-expanded', 'false');
});

test('allows users to open and close accordion item with enter / space key', () => {
  getComponent();
  const buttons = screen.getAllByRole('button');
  const selectedItem = buttons[0];
  expect(selectedItem).toHaveAttribute('aria-expanded', 'false');
  act(() => { selectedItem.focus(); });
  expect(selectedItem).toHaveFocus();

  fireEvent.keyDown(selectedItem, { key: 'Enter' });
  fireEvent.keyUp(selectedItem, { key: 'Enter' });
  expect(selectedItem).toHaveAttribute('aria-expanded', 'true');

  fireEvent.keyDown(selectedItem, { key: 'Enter' });
  fireEvent.keyUp(selectedItem, { key: 'Enter' });
  expect(selectedItem).toHaveAttribute('aria-expanded', 'false');
});

test('allows users to naviagte accordion headers through arrow keys', () => {
  getComponent();
  const buttons = screen.getAllByRole('button');
  const [firstItem, secondItem, thirdItem] = buttons;
  act(() => { firstItem.focus(); });

  expect(firstItem).toHaveFocus();
  fireEvent.keyDown(firstItem, { key: 'ArrowUp' });
  expect(firstItem).toHaveFocus();
  fireEvent.keyDown(firstItem, { key: 'ArrowDown' });
  expect(secondItem).toHaveFocus();
  fireEvent.keyDown(secondItem, { key: 'ArrowDown' });
  expect(thirdItem).toHaveFocus();
  fireEvent.keyDown(thirdItem, { key: 'ArrowDown' });
  expect(thirdItem).toHaveFocus();
  fireEvent.keyDown(thirdItem, { key: 'ArrowUp' });
  expect(secondItem).toHaveFocus();
});

test('allows users to navigate accordion headers through the tab key', () => {
  getComponent();
  const buttons = screen.getAllByRole('button');
  const [firstItem, secondItem, thirdItem] = buttons;
  act(() => { firstItem.focus(); });
  expect(firstItem).toHaveFocus();
  userEvent.tab();
  expect(secondItem).toHaveFocus();
  userEvent.tab({ shift: true });
  expect(firstItem).toHaveFocus();
  userEvent.tab();
  expect(secondItem).toHaveFocus();
  userEvent.tab();
  expect(thirdItem).toHaveFocus();
  userEvent.tab();
  expect(firstItem).not.toHaveFocus();
  expect(secondItem).not.toHaveFocus();
  expect(thirdItem).not.toHaveFocus();
  userEvent.tab({ shift: true });
  expect(thirdItem).toHaveFocus();
});

test('disabled keys prop disables an accordion item', () => {
  getComponent({ disabledKeys: ['first'] });
  const buttons = screen.getAllByRole('button');
  const selectedItem = buttons[0];
  const { parentElement } = selectedItem;
  expect(parentElement).toHaveClass('is-disabled');
});

test('default expanded keys expands an accordion item', () => {
  getComponent({ defaultExpandedKeys: ['first'] });
  const buttons = screen.getAllByRole('button');
  const selectedItem = buttons[0];
  expect(selectedItem).toHaveAttribute('aria-expanded', 'true');
});

test('expanded keys expands an accordion item', () => {
  getComponent({ expandedKeys: ['first'] });
  const buttons = screen.getAllByRole('button');
  const selectedItem = buttons[0];
  expect(selectedItem).toHaveAttribute('aria-expanded', 'true');
});

test('able to click a textfield that is the rendered child of an accordion', () => {
  getComponent({ expandedKeys: ['third'] });
  const field = screen.getByTestId('testField');
  const input = screen.getByRole('form');
  userEvent.click(input);
  userEvent.type(input, 'banana');
  expect(field).toHaveClass('has-focus-within');
});

test('Item accepts a data-id and the data-id can be found in the DOM', () => {
  getComponent();
  const buttons = screen.getAllByRole('button');
  const selectedItem = buttons[0];
  const { parentElement } = selectedItem;
  expect(parentElement).toHaveAttribute('data-id', 'first');
});

test('items do not automatically expand if wrapped in an open OverlayPanel', () => {
  getComponentInOverlayPanel();
  const buttons = screen.getAllByRole('button');
  const selectedItem = buttons[0];
  expect(selectedItem).not.toHaveAttribute('aria-expanded', 'true');
});

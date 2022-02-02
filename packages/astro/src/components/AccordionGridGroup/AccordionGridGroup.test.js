import React from 'react';
import { Item } from '@react-stately/collections';
import userEvent from '@testing-library/user-event';
import axeTest from '../../utils/testUtils/testAxe';
import { act, fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import {
  Link,
  Box,
  OverlayPanel,
} from '../../index';
import AccordionGridGroup from '../AccordionGridGroup';


const testId = 'test-accordion';
const defaultProps = {
  'data-testid': testId,
};

const getComponent = (props = {}) => render((
  <AccordionGridGroup {...defaultProps} {...props} >
    <Item key="first" textValue="Duplicate">
      <Box>
        <Link>Header Button</Link>
        <Link>Second Header Button</Link>
      </Box>
      <Box>
        <Link>Body Button</Link>
        <Link>Second Body Button</Link>
      </Box>
    </Item>
    <Item key="second" textValue="Duplicate">
      <Box>
        <Link>Header Button</Link>
        <Link>Second Header Button</Link>
      </Box>
      <Box>
        <Link>Body Button</Link>
        <Link>Second Body Button</Link>
      </Box>
    </Item>
    <Item key="third" textValue="Duplicate">
      <Box>
        <Link>Header Button</Link>
        <Link>Second Header Button</Link>
      </Box>
      <Box>
        <Link>Body Button</Link>
        <Link>Second Body Button</Link>
      </Box>
    </Item>
  </AccordionGridGroup>
));

const getComponentInOverlayPanel = (props = {}) => render((
  <OverlayPanel isOpen >
    <AccordionGridGroup {...defaultProps} {...props} >
      <Item key="first" textValue="Duplicate">
        <Box>
          <Link>Header Button</Link>
          <Link>Second Header Button</Link>
        </Box>
        <Box>
          <Link>Body Button</Link>
          <Link>Second Body Button</Link>
        </Box>
      </Item>
      <Item key="second" textValue="Duplicate">
        <Box>
          <Link>Header Button</Link>
          <Link>Second Header Button</Link>
        </Box>
        <Box>
          <Link>Body Button</Link>
          <Link>Second Body Button</Link>
        </Box>
      </Item>
      <Item key="third" textValue="Duplicate">
        <Box>
          <Link>Header Button</Link>
          <Link>Second Header Button</Link>
        </Box>
        <Box>
          <Link>Body Button</Link>
          <Link>Second Body Button</Link>
        </Box>
      </Item>
    </AccordionGridGroup>
  </OverlayPanel>
));

axeTest(getComponent, {
  // landmark-unique rule conflicts with react-aria role definition
  rules: {
    'landmark-unique': { enabled: false },
  },
});

test('button press', () => {
  const onPress = jest.fn();
  getComponent({ onPress });
  const buttons = screen.getAllByRole('gridcell');
  const selectedItem = buttons[0];
  expect(selectedItem).toBeInTheDocument();
  expect(selectedItem).not.toHaveClass('is-pressed');
  expect(onPress).not.toHaveBeenCalled();

  // Hold down the button to see pressed styles
  fireEvent.mouseDown(selectedItem);
  expect(selectedItem).toHaveClass('is-pressed');
});

test('button press uses callback', () => {
  const onPress = jest.fn();
  getComponent({ onSelectionChange: onPress });
  const buttons = screen.getAllByRole('gridcell');
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
  const buttons = screen.getAllByRole('gridcell');
  const selectedItem = buttons[0];
  const row = screen.getAllByRole('row');
  const selectedRow = row[0];
  expect(selectedRow).toHaveAttribute('aria-selected', 'false');
  userEvent.click(selectedItem);
  expect(selectedRow).toHaveAttribute('aria-selected', 'true');
  userEvent.click(selectedItem);
  expect(selectedRow).toHaveAttribute('aria-selected', 'false');
});

test('allows users to open and close accordion item with enter / space key', () => {
  getComponent();
  const buttons = screen.getAllByRole('gridcell');
  const selectedItem = buttons[0];
  const row = screen.getAllByRole('row');
  const selectedRow = row[0];
  expect(selectedRow).toHaveAttribute('aria-selected', 'false');
  act(() => { selectedItem.focus(); });
  expect(selectedItem).toHaveFocus();

  fireEvent.keyDown(selectedItem, { key: 'Enter' });
  fireEvent.keyUp(selectedItem, { key: 'Enter' });
  expect(selectedRow).toHaveAttribute('aria-selected', 'true');

  fireEvent.keyDown(selectedItem, { key: 'Enter' });
  fireEvent.keyUp(selectedItem, { key: 'Enter' });
  expect(selectedRow).toHaveAttribute('aria-selected', 'false');
});

test('allows users to naviagte accordion headers through arrow keys', () => {
  getComponent();
  const buttons = screen.getAllByRole('gridcell');
  act(() => { buttons[0].focus(); });

  expect(buttons[0]).toHaveFocus();
  fireEvent.keyDown(buttons[0], { key: 'ArrowUp' });
  expect(buttons[0]).toHaveFocus();
  fireEvent.keyDown(buttons[0], { key: 'ArrowDown' });
  expect(buttons[2]).toHaveFocus();
  fireEvent.keyDown(buttons[2], { key: 'ArrowDown' });
  expect(buttons[4]).toHaveFocus();
  fireEvent.keyDown(buttons[4], { key: 'ArrowDown' });
  expect(buttons[4]).toHaveFocus();
  fireEvent.keyDown(buttons[4], { key: 'ArrowUp' });
  expect(buttons[2]).toHaveFocus();
});

test('allows users to naviagte within rows using arrow keys', () => {
  getComponent();
  const buttons = screen.getAllByRole('gridcell');
  userEvent.tab();
  expect(buttons[0]).toHaveFocus();

  fireEvent.keyDown(buttons[0], { key: 'Enter' });
  fireEvent.keyDown(buttons[0], { key: 'ArrowRight' });
  expect(buttons[1]).toHaveFocus();
  fireEvent.keyDown(buttons[0], { key: 'ArrowLeft' });
  expect(buttons[0]).toHaveFocus();
});

test('disabled keys prop disables an accordion item, and disables focus', () => {
  getComponent({ disabledKeys: ['first'] });
  const row = screen.getAllByRole('row');
  const selectedRow = row[0];
  const buttons = screen.getAllByRole('gridcell');
  const selectedItem = buttons[0];
  act(() => { selectedItem.focus(); });
  expect(selectedRow).toHaveClass('is-disabled');
  expect(selectedRow).not.toHaveClass('is-focused');
});

test('default expanded keys expands an accordion item', () => {
  getComponent({ selectedKeys: ['first'] });
  const row = screen.getAllByRole('row');
  const selectedRow = row[0];
  expect(selectedRow).toHaveAttribute('aria-selected', 'true');
});

test('items do not automatically expand if wrapped in an open OverlayPanel', () => {
  getComponentInOverlayPanel();
  const row = screen.getAllByRole('row');
  const selectedRow = row[0];
  expect(selectedRow).not.toHaveAttribute('aria-selected', 'true');
});

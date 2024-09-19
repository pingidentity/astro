import React from 'react';
import { Item } from 'react-stately';
import userEvent from '@testing-library/user-event';

import {
  Box,
  Link,
  OverlayPanel,
  Text,
  TextField,
} from '../../index';
import { act, fireEvent, render, screen, waitFor } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import AccordionGridGroup from '.';

const testId = 'test-accordion';
const defaultProps = {
  'data-testid': testId,
};

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <AccordionGridGroup {...props} /> });

const getComponent = (props = {}) => render((
  <AccordionGridGroup {...defaultProps} {...props}>
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
  <OverlayPanel isOpen>
    <AccordionGridGroup {...defaultProps} {...props}>
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

const getComponentWithTextFields = (props = {}) => render((
  <AccordionGridGroup {...defaultProps} {...props} navigationMode="native">
    <Item key="first" textValue="Duplicate">
      <Text>
        Header
      </Text>
      <Box>
        <TextField label="label 1" />
        <TextField label="label 2" />
      </Box>
    </Item>
  </AccordionGridGroup>
));

test('button press uses callback', () => {
  const onPress = jest.fn();
  getComponent({ onSelectionChange: onPress });
  const buttons = screen.getAllByRole('gridcell');
  const selectedItem = buttons[0];
  expect(selectedItem).not.toHaveClass('is-pressed');
  expect(onPress).not.toHaveBeenCalled();

  // Hold down the button to see pressed styles
  userEvent.click(selectedItem);
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

test('default expanded keys expands an accordion item', async () => {
  getComponent({ selectedKeys: ['first'] });
  await waitFor(() => {
    return expect(screen.getAllByRole('row')[0]).toHaveAttribute('aria-selected', 'true');
  });
});

test('items do not automatically expand if wrapped in an open OverlayPanel', () => {
  getComponentInOverlayPanel();
  const row = screen.getAllByRole('row');
  const selectedRow = row[0];
  expect(selectedRow).not.toHaveAttribute('aria-selected', 'true');
});

test('adds focus to inputs', () => {
  getComponentWithTextFields();
  const firstInput = screen.getAllByRole('gridcell')[0];
  const secondInput = screen.getAllByRole('gridcell')[1];

  expect(firstInput).not.toHaveFocus();
  expect(secondInput).not.toHaveFocus();

  userEvent.click(firstInput);

  expect(firstInput).toHaveFocus();
  expect(secondInput).not.toHaveFocus();

  userEvent.click(secondInput);

  expect(firstInput).not.toHaveFocus();
  expect(secondInput).toHaveFocus();
});

test('adds focus to input on a single click after onBlur', () => {
  getComponentWithTextFields();
  const firstInput = screen.getAllByRole('gridcell')[0];
  const secondInput = screen.getAllByRole('gridcell')[1];

  expect(secondInput).not.toHaveFocus();
  userEvent.click(firstInput);
  userEvent.click(secondInput);
  act(() => {
    secondInput.blur();
  });
  userEvent.click(secondInput);
  expect(secondInput).toHaveFocus();
});

test('native keyboard navigation mode toggle open/close item body', () => {
  getComponentWithTextFields();
  const firstItemHeader = screen.getAllByRole('gridcell')[0];

  expect(firstItemHeader).not.toHaveFocus();
  userEvent.tab();
  expect(firstItemHeader).toHaveFocus();

  expect(firstItemHeader).not.toHaveClass('is-selected');
  userEvent.type(firstItemHeader, '{Enter}');
  expect(firstItemHeader).toHaveClass('is-selected');

  const firstInput = screen.getByLabelText('label 1');

  expect(firstInput).not.toHaveFocus();
  userEvent.tab();
  expect(firstInput).toHaveFocus();

  userEvent.type(firstInput, '{arrowup}');
  expect(firstInput).toHaveFocus();
});

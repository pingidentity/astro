import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CardProps } from '../../types';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import Box from '../Box';
import Button from '../Button';
import TextField from '../TextField';

import Card from './Card';

const testId = 'test-separator';

const defaultProps = {
  'data-testid': testId,
  label: 'Test Label',
};

const getComponent = (props:CardProps = {}) => render(
  <Card {...defaultProps} {...props} />,
);
// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <Card {...props} /> });


test('renders Card component', () => {
  getComponent();
  const separator = screen.getByTestId(testId);
  expect(separator).toBeInTheDocument();
});

test('renders children within Card component', () => {
  const children = (
    <Button />
  );
  getComponent({ children });
  const mockedChildren = screen.getByRole('button');
  expect(mockedChildren).toBeInTheDocument();
});

test('card allows hover, focus, and press events', () => {
  const children = (
    <Button />
  );
  const onPress = jest.fn();

  getComponent({ children, onPress, tabIndex: 0 });

  const card = screen.getByTestId(testId);

  expect(card).not.toHaveClass('is-hovered');
  userEvent.hover(card);
  expect(card).toHaveClass('is-hovered');

  userEvent.click(card);
  expect(onPress).toHaveBeenCalled();

  expect(card).not.toHaveClass('is-focused');
  userEvent.tab();
  expect(card).toHaveClass('is-focused');
});

test('allows focus within card', () => {
  const children = (
    <Button />
  );

  getComponent({ children, tabIndex: 0 });
  const button = screen.getByRole('button');
  const card = screen.getByTestId(testId);

  expect(button).not.toHaveClass('is-focused');
  userEvent.tab();
  expect(button).not.toHaveClass('is-focused');
  expect(card).toHaveClass('is-focused');
  userEvent.tab();
  expect(button).toHaveClass('is-focused');
});

test('renders Card component with text selection', async () => {
  const children = (
    <Box>
      Select this text.
      <TextField label="Interactive TextField" />
    </Box>
  );
  getComponent({ isInteractiveWithin: true, children });
  const card = screen.getByTestId(testId);

  // Programmatically create a range and select it
  const range = document.createRange();
  range.selectNodeContents(card);
  const selection = window.getSelection();

  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);

    // Verify that the selection was successful
    const selectedText = selection.toString();
    expect(selectedText).toBe('Select this text.Interactive TextField');

    // Interact with the TextField
    const textField = screen.getByLabelText('Interactive TextField');
    userEvent.click(textField);
    userEvent.type(textField, selectedText);

    expect(textField).toHaveValue(selectedText);
  }
});


test('is-select class added when isSelected pass to it', () => {
  getComponent({ variant: 'cards.activeCard', isSelected: true });

  const card = screen.getByTestId(testId);

  userEvent.click(card);
  expect(card).toHaveClass('is-selected');
});

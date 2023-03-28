import React from 'react';
import userEvent from '@testing-library/user-event';
import CreateIcon from 'mdi-react/CreateIcon';

import axeTest from '../../utils/testUtils/testAxe';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';

import IconButton from '.';

const iconTestId = 'test-icon';

const Icon = props => (
  <CreateIcon data-testid={iconTestId} {...props} />
);

const testId = 'test-button';
const defaultProps = {
  'data-testid': testId,
  icon: Icon,
  'aria-label': 'Create',
};
const getComponent = (props = {}) => render(<IconButton {...defaultProps} {...props} />);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default icon button', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('data-testid', testId);
  expect(button).toBeInstanceOf(HTMLButtonElement);
  expect(button).toBeInTheDocument();
});

test('icon button hover', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(button).not.toHaveClass('is-hovered');
  userEvent.hover(button);
  expect(button).toHaveClass('is-hovered');
  userEvent.unhover(button);
  expect(button).not.toHaveClass('is-hovered');
});

test('icon button press', () => {
  const onPress = jest.fn();
  getComponent({ onPress });
  const button = screen.getByRole('button');
  expect(onPress).not.toHaveBeenCalled();

  // Hold down the button to see pressed styles
  fireEvent.mouseDown(button);
  expect(button).toHaveClass('is-pressed');

  // Finish the click to fire the event handler
  fireEvent.mouseUp(button);
  expect(button).not.toHaveClass('is-pressed');
  expect(onPress).toHaveBeenCalledTimes(1);
});

test('keyboard icon button press', () => {
  const onPress = jest.fn();
  getComponent({ onPress });
  const button = screen.getByRole('button');
  expect(onPress).not.toHaveBeenCalled();

  fireEvent.keyDown(button, { key: 'Enter', code: 13 });
  expect(button).toHaveClass('is-pressed');

  fireEvent.keyUp(button, { key: 'Enter', code: 13 });
  expect(button).not.toHaveClass('is-pressed');
  expect(onPress).toHaveBeenCalledTimes(1);
});

test('button focus', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(button).not.toHaveFocus();
  expect(button).not.toHaveClass('is-focused');

  userEvent.tab();
  expect(button).toHaveFocus();
  expect(button).toHaveClass('is-focused');
});

test('tooltip is shown on focus when the prop is passed and not show by default', () => {
  getComponent({
    title: 'Test Tooltip',
  });
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  userEvent.tab();
  expect(screen.queryByRole('tooltip')).toBeInTheDocument();
});

test('tooltip is shown on hover when the prop is passed and not show by default', () => {
  getComponent({
    title: 'Test Tooltip',
  });
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  const button = screen.getByRole('button');
  fireEvent.mouseMove(button);
  fireEvent.mouseEnter(button);
  expect(screen.queryByRole('tooltip')).toBeInTheDocument();
});

test('tooltip is not shown on hover or focus when prop is not passed', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  userEvent.tab();
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  fireEvent.mouseMove(button);
  fireEvent.mouseEnter(button);
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});

test('the button should be getting aria label attribute', () => {
  const testLabel = defaultProps['aria-label'];
  getComponent();
  expect(screen.getByLabelText(testLabel)).toBeInTheDocument();
});

test('show button isDisabled status', () => {
  const onPress = jest.fn();
  getComponent({ onPress, isDisabled: true });
  const button = screen.getByTestId(testId);
  expect(button).toHaveClass('is-disabled');
  expect(onPress).not.toHaveBeenCalled();
});

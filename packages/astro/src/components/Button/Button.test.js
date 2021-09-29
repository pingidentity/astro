import React from 'react';
import userEvent from '@testing-library/user-event';
import AddCircleIcon from 'mdi-react/AddCircleIcon';
import axeTest from '../../utils/testUtils/testAxe';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import Button from '.';
import Icon from '../Icon';

const testId = 'test-button';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render((
  <Button {...defaultProps} {...props} />
));

const getIconButton = (props = {}) => render((
  <Button {...defaultProps} {...props} variant="icon" >
    <Icon icon={AddCircleIcon} />
  </Button>
));

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default button', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('data-testid', testId);
  expect(button).toBeInstanceOf(HTMLButtonElement);
  expect(button).toBeInTheDocument();
});

test('button hover', () => {
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
  expect(button).not.toHaveClass('is-pressed');
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

test('button loading hides children and shows loader', () => {
  const textContent = "I'ma button";
  getComponent({ isLoading: true, children: textContent });
  const childWrapper = screen.getByText(textContent);

  expect(childWrapper).toBeInTheDocument();
  expect(childWrapper).not.toBeVisible();
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('button renders children when not loading', () => {
  const textContent = "I'ma button";
  getComponent({ children: textContent });
  const childWrapper = screen.getByText(textContent);

  expect(childWrapper).toBeInTheDocument();
  expect(childWrapper).toBeVisible();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('passing in an icon makes the button parent a div', () => {
  getIconButton({ mode: 'icon' });
  const button = screen.getByRole('button');

  expect(button).toBeInTheDocument();
  expect(button).toBeVisible();
  expect(button).toBeInstanceOf(HTMLDivElement);
});

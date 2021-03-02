import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import theme from '../../styles/theme';
import Button from '.';

const testId = 'test-button';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render((
  <Button {...defaultProps} {...props} />
));

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
  expect(button).toHaveStyle(`background-color: ${theme.colors.white}`);
  userEvent.hover(button);
  expect(button).toHaveStyle(`background-color: ${theme.colors.accent[99]}`);
  userEvent.unhover(button);
  expect(button).toHaveStyle(`background-color: ${theme.colors.white}`);
});

test('button press', () => {
  const onPress = jest.fn();
  getComponent({ onPress });
  const button = screen.getByRole('button');
  expect(button).toHaveStyle(`background-color: ${theme.colors.white}`);
  expect(onPress).not.toHaveBeenCalled();

  // Hold down the button to see pressed styles
  fireEvent.mouseDown(button);
  expect(button).toHaveStyle(`background-color: ${theme.colors.active}`);

  // Finish the click to fire the event handler
  fireEvent.mouseUp(button);
  expect(onPress).toHaveBeenCalledTimes(1);
});

test('keyboard button press', () => {
  const onPress = jest.fn();
  getComponent({ onPress });
  const button = screen.getByRole('button');
  expect(button).toHaveStyle(`background-color: ${theme.colors.white}`);
  expect(onPress).not.toHaveBeenCalled();

  fireEvent.keyDown(button, { key: 'Enter', code: 13 });
  fireEvent.keyUp(button, { key: 'Enter', code: 13 });
  expect(onPress).toHaveBeenCalledTimes(1);
});

test('button focus', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(button).not.toHaveFocus();
  expect(button).not.toHaveStyle(`box-shadow: ${theme.shadows.focus}`);

  userEvent.tab();
  expect(button).toHaveFocus();
  expect(button).toHaveStyle(`box-shadow: ${theme.shadows.focus}`);
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

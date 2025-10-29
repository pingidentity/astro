import React from 'react';
import userEvent from '@testing-library/user-event';

import { ButtonProps } from '../../types';
import axeTest from '../../utils/testUtils/testAxe';
import { act, fireEvent, render, screen } from '../../utils/testUtils/testWrapper';

import Button from '.';

const testId = 'test-button';
const defaultProps = {
  'data-testid': testId,
  'aria-label': 'Test button',
};
const getComponent = (props: ButtonProps = {}) => render(
  <Button {...defaultProps} {...props} />,
);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default button', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('data-testid', testId);
  expect(button).toBeInstanceOf(HTMLButtonElement);
  expect(button).toBeInTheDocument();
});

test('button hover', async () => {
  await act(async () => {
    getComponent();
  });
  const button = await screen.findByRole('button');
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
  expect(screen.getByRole('alert')).toBeInTheDocument();
});

test('button renders children when not loading', () => {
  const textContent = "I'ma button";
  getComponent({ children: textContent });
  const childWrapper = screen.getByText(textContent);

  expect(childWrapper).toBeInTheDocument();
  expect(childWrapper).toBeVisible();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('color block button renders in default state', () => {
  getComponent({ variant: 'colorBlock' });
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).not.toHaveClass('is-configured');

  userEvent.tab();
  expect(button).toHaveClass('is-focused');
  expect(button).toHaveFocus();
  userEvent.tab();
  expect(button).not.toHaveClass('is-focused');
  expect(button).not.toHaveFocus();
});

test('color block button renders in configured state', () => {
  getComponent({ variant: 'colorBlock', className: 'is-configured' });
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass('is-configured');
});

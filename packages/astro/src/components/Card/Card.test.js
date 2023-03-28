import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import axeTest from '../../utils/testUtils/testAxe';
import Button from '../Button';

import Card from './Card';

const testId = 'test-separator';

const defaultProps = {
  'data-testid': testId,
  label: 'Test Label',
};

const getComponent = (props = {}) => render(
  <Card {...defaultProps} {...props} />,
);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

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

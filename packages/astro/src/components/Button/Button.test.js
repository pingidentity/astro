import React from 'react';
import { useFocusRing } from '@react-aria/focus';
import { render, screen } from '@testing-library/react';
import Button from '.';

const testId = 'test-button';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(
  <Button {...defaultProps} {...props}>
    {props.children}
  </Button>,
);

afterEach(() => {
  jest.resetAllMocks();
});

test('default button', () => {
  useFocusRing.mockImplementation(() => ({ isFocusVisible: false, focusProps: {} }));
  getComponent();
  const button = screen.getByTestId(testId);
  expect(button).toBeInstanceOf(HTMLButtonElement);
  expect(button).toBeInTheDocument();
  expect(button).toHaveStyleRule('box-shadow', 'none', { target: ':focus' });
});

test('button with focus', () => {
  useFocusRing.mockImplementation(() => ({ isFocusVisible: true, focusProps: {} }));
  getComponent();
  const button = screen.getByTestId(testId);
  expect(button).toHaveStyleRule('box-shadow', 'focus', { target: ':focus' });
});

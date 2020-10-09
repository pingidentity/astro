import React from 'react';
import { useFocusRing } from '@react-aria/focus';
import { render, screen } from '@testing-library/react';
import Link from '.';

jest.mock('@react-aria/focus', () => ({
  ...jest.requireActual('@react-aria/focus'),
  useFocusRing: jest.fn(),
}));

const testId = 'test-link';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(
  <Link {...defaultProps} {...props}>
    {props.children}
  </Link>,
);

afterEach(() => {
  jest.resetAllMocks();
});

test('a link is rendered', () => {
  useFocusRing.mockImplementation(() => ({ isFocusVisible: false, focusProps: {} }));
  getComponent();
  const link = screen.getByTestId(testId);
  expect(link).toBeInstanceOf(HTMLAnchorElement);
  expect(link).toBeInTheDocument();
});

test('link shows focus', () => {
  useFocusRing.mockImplementation(() => ({ isFocusVisible: true, focusProps: {} }));
  getComponent();
  const link = screen.getByTestId(testId);
  expect(link).toHaveStyleRule('box-shadow', 'focus', { target: ':focus' });
});

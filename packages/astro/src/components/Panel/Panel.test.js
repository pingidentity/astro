import React from 'react';
import { render, screen } from '@testing-library/react';
import { useFocusRing } from '@react-aria/focus';
import Panel from '.';

const testId = 'test-panel';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(<Panel {...defaultProps} {...props} />);

afterEach(() => {
  jest.restoreAllMocks();
});

test('default panel', () => {
  getComponent({ children: <div>Test</div> });
  const panel = screen.getByTestId(testId);
  const child = screen.queryByText('Test');
  expect(panel).toBeInTheDocument();
  expect(child).not.toBeInTheDocument();
  expect(panel).toHaveStyleRule('margin-right', '-100%');
  expect(panel).toHaveStyleRule('visibility', 'hidden');
  expect(panel).toHaveStyleRule('box-shadow', 'none', { target: ':focus' });
  expect(panel).toHaveAttribute('tabIndex', '-1');
});

test('panel when visible', () => {
  useFocusRing.mockImplementation(() => ({ isFocusVisible: true, focusProps: {} }));
  getComponent({ isVisible: true, children: <div>Test</div> });
  const panel = screen.getByTestId(testId);
  const child = screen.queryByText('Test');
  expect(panel).toBeInTheDocument();
  expect(child).toBeInTheDocument();
  expect(panel).toHaveStyleRule('margin-right', '0');
  expect(panel).toHaveStyleRule('visibility', 'visible');
  expect(panel).toHaveStyleRule('box-shadow', 'focus', { target: ':focus' });
  expect(panel).toHaveAttribute('tabIndex', '0');
});

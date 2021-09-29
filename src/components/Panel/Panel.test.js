import React from 'react';
import userEvent from '@testing-library/user-event';

import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';
import Panel from '.';

const testId = 'test-panel';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(<Panel {...defaultProps} {...props} />);

afterEach(() => {
  jest.restoreAllMocks();
});

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default panel', () => {
  getComponent({ children: <div>Test</div> });
  const panel = screen.getByTestId(testId);
  const child = screen.queryByText('Test');
  expect(panel).toBeInTheDocument();
  expect(child).not.toBeInTheDocument();
  expect(panel).toHaveAttribute('tabIndex', '-1');
});

test('panel when visible', () => {
  getComponent({ isVisible: true, children: <div>Test</div> });
  const panel = screen.getByTestId(testId);
  const child = screen.queryByText('Test');
  expect(panel).toBeInTheDocument();
  expect(child).toBeInTheDocument();
  expect(panel).toHaveAttribute('tabIndex', '0');
});

test('panel with focus', () => {
  getComponent({ isVisible: true, children: <div>Test</div> });
  const panel = screen.getByTestId(testId);

  userEvent.tab();
  expect(panel).toHaveFocus();
});

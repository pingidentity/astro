import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen } from '../../utils/testUtils/testWrapper';
import theme from '../../styles/theme';
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
  expect(panel).toHaveStyle({
    marginRight: '-100%',
    visibility: 'hidden',
  });
  expect(panel).not.toHaveStyle({ boxShadow: theme.shadows.focus });
  expect(panel).toHaveAttribute('tabIndex', '-1');
});

test('panel when visible', () => {
  getComponent({ isVisible: true, children: <div>Test</div> });
  const panel = screen.getByTestId(testId);
  const child = screen.queryByText('Test');
  expect(panel).toBeInTheDocument();
  expect(child).toBeInTheDocument();
  expect(panel).toHaveStyle({
    marginRight: 0,
    visibility: 'visible',
  });
  expect(panel).toHaveAttribute('tabIndex', '0');
});

test('panel with focus', () => {
  getComponent({ isVisible: true, children: <div>Test</div> });
  const panel = screen.getByTestId(testId);

  userEvent.tab();
  expect(panel).toHaveFocus();
  expect(panel).toHaveStyle({ boxShadow: theme.shadows.focus });
});

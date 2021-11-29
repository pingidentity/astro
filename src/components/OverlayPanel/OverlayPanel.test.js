import React from 'react';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';

import OverlayPanel from './OverlayPanel';

const testId = 'test-overlayPanel';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(<OverlayPanel {...defaultProps} {...props} />);

afterEach(() => {
  jest.restoreAllMocks();
});

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default overlayPanel', () => {
  getComponent({ children: <div>Test</div> });
  const overlayPanel = screen.getByTestId(testId);
  const child = screen.queryByText('Test');
  expect(overlayPanel).toBeInTheDocument();
  expect(child).toBeInTheDocument();
});

test('custom overlayPanel gets custom width', () => {
  getComponent({ children: <div>Test</div>, sx: { width: '240px' } });
  const overlayPanel = screen.getByTestId(testId);
  expect(overlayPanel).toBeInTheDocument();
  expect(overlayPanel).toHaveStyleRule('width', '240px');
});

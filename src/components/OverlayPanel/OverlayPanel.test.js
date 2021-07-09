import React from 'react';
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

test('default overlayPanel', () => {
  getComponent({ children: <div>Test</div> });
  const overlayPanel = screen.getByTestId(testId);
  const child = screen.queryByText('Test');
  expect(overlayPanel).toBeInTheDocument();
  expect(child).toBeInTheDocument();
});

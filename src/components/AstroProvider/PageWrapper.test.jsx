import React from 'react';
import { render, screen } from '@testing-library/react';

import { Box, PageWrapper } from '../../index';
import axeTest from '../../utils/testUtils/testAxe';

const testId = 'test-box';
const defaultProps = {
  bg: 'active',
  'data-testid': testId,
};

const getComponent = () => render(<Box {...defaultProps} />, { wrapper: PageWrapper });

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

// NOTE: This will fail if in the AstroProvider test file...
// Probably something to do with Jest / RTL
test('should provide theme styling through PageWrapper', () => {
  getComponent();
  const activeRgb = 'rgb(68, 98, 237)';
  const box = screen.queryByTestId(testId);
  expect(box).toBeInstanceOf(HTMLDivElement);
  expect(box).toBeInTheDocument();
  expect(box).toHaveStyle(`background-color: ${activeRgb}`);
});

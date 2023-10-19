import React from 'react';
import { render, screen } from '@testing-library/react';

import { AstroProvider, Box } from '../../index';
import axeTest from '../../utils/testUtils/testAxe';

const testId = 'test-box';
const defaultProps = {
  bg: 'active',
  'data-testid': testId,
};

const getComponent = () => render(<Box {...defaultProps} />, { wrapper: AstroProvider });

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('should provide theme styling through AstroProvider', () => {
  getComponent();
  const activeRgb = 'rgb(68, 98, 237)';
  const box = screen.queryByTestId(testId);
  expect(box).toBeInstanceOf(HTMLDivElement);
  expect(box).toBeInTheDocument();
  expect(box).toHaveStyle(`background-color: ${activeRgb}`);
});

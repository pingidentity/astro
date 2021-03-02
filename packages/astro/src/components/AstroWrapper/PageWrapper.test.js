import React from 'react';
import { render, screen } from '@testing-library/react';
import theme from '../../styles/theme';
import { PageWrapper, Box } from '../../index';

const testId = 'test-box';
const defaultProps = {
  bg: 'active',
  'data-testid': testId,
};

// NOTE: This will fail if in the AstroWrapper test file...
// Probably something to do with Jest / RTL
test('should provide theme styling through PageWrapper', () => {
  render(<Box {...defaultProps} />, { wrapper: PageWrapper });
  const box = screen.queryByTestId(testId);
  expect(box).toBeInstanceOf(HTMLDivElement);
  expect(box).toBeInTheDocument();
  expect(box).toHaveStyle({ backgroundColor: theme.colors.active });
});

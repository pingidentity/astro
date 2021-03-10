import React from 'react';
import { render, screen } from '@testing-library/react';
import theme from '../../styles/theme';
import { AstroWrapper, Box } from '../../index';

const testId = 'test-box';
const defaultProps = {
  bg: 'active',
  'data-testid': testId,
};

test('should provide theme styling through AstroWrapper', () => {
  render(<Box {...defaultProps} />, { wrapper: AstroWrapper });
  const box = screen.queryByTestId(testId);
  expect(box).toBeInstanceOf(HTMLDivElement);
  expect(box).toBeInTheDocument();
  expect(box).toHaveStyle({ backgroundColor: theme.colors.active });
});

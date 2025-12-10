import React from 'react';
import { render, screen } from '@testing-library/react';

import { AstroProvider, Box } from '../../index';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const testId = 'test-box';
const defaultProps = {
  bg: 'active',
  'data-testid': testId,
};

const getComponent = () => render(<Box {...defaultProps} />, { wrapper: AstroProvider });

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <AstroProvider {...props} /> });

test('should provide theme styling through AstroProvider', () => {
  getComponent();
  const activeRgb = 'rgb(68, 98, 237)';
  const box = screen.queryByTestId(testId);
  expect(box).toBeInstanceOf(HTMLDivElement);
  expect(box).toBeInTheDocument();
  expect(box).toHaveStyle(`background-color: ${activeRgb}`);
});

import React from 'react';

import { SeparatorProps } from '../../types';
import ORIENTATION from '../../utils/devUtils/constants/orientation';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Separator from '.';

const testId = 'test-separator';

const defaultProps: SeparatorProps = {
  'data-testid': testId,
  'orientation': 'horizontal',
};

const getComponent = (props = {}) => render(
  <Separator {...defaultProps} {...props} />,
);

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <Separator {...defaultProps} {...props} /> });

describe('Separator component', () => {
  test('renders Separator component', () => {
    getComponent();
    const separator = screen.getByTestId(testId);
    screen.getByRole('separator');
    expect(separator).toBeInstanceOf(HTMLDivElement);
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass('is-horizontal');
  });

  test('Separator as a horizontal', () => {
    getComponent({ orientation: 'horizontal' });
    const separator = screen.getByTestId(testId);
    expect(separator).toHaveClass('is-horizontal');
  });

  test('Separator vertical orientation', () => {
    getComponent({ orientation: 'vertical' });
    const separator = screen.getByTestId(testId);
    expect(separator).toHaveAttribute('aria-orientation', ORIENTATION.VERTICAL);
  });

  test('applies custom className if provided', () => {
    getComponent({ className: 'custom-class' });
    const separator = screen.getByTestId(testId);
    expect(separator).toHaveClass('custom-class');
  });
});

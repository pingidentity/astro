import React from 'react';
import { render, screen } from '@testing-library/react';

import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Checkbox from './Checkbox';

const getComponent = (props = {}) => render((
  <Checkbox {...props} />
));

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <Checkbox {...props} />,
  // Checkbox label is provided by CheckboxField
  rules: {
    'label': { enabled: false },
  },
});

test('default checkbox', () => {
  getComponent();
  const input = screen.getByRole('checkbox');
  expect(input).toBeInstanceOf(HTMLInputElement);
  expect(input).toBeInTheDocument();
  // Should be visually hidden
  expect(input).not.toBeVisible();
});

test('indeterminate checkbox', () => {
  getComponent({ isIndeterminate: true });
  const input = screen.getByText('Indeterminate Checkbox Icon');
  expect(input).toBeInTheDocument();
});

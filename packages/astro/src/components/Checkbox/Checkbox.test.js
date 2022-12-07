import React from 'react';
import { render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';
import axeTest from '../../utils/testUtils/testAxe';

const getComponent = (props = {}) => render((
  <Checkbox {...props} />
));

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent, {
  // Checkbox with label provided by CheckboxField
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

import React from 'react';
import { render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';

const getComponent = (props = {}) => render((
  <Checkbox {...props} />
));

test('default checkbox', () => {
  getComponent();
  const input = screen.getByRole('checkbox');
  expect(input).toBeInstanceOf(HTMLInputElement);
  expect(input).toBeInTheDocument();
});

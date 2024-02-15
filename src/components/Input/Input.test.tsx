import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InputProps } from '../../types';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Input from '.';

const testId = 'test-input';
const defaultProps = {
  'data-testid': testId,
  'aria-label': 'My Input',
};
const getComponent = (props: InputProps = {}) => render(<Input {...defaultProps} {...props} />);

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <Input {...defaultProps} {...props} /> });


test('default input', () => {
  getComponent();
  const input = screen.getByTestId(testId);
  expect(input).toBeInstanceOf(HTMLInputElement);
  expect(input).toBeInTheDocument();
});

test('input type as password', () => {
  getComponent({ type: 'password' });
  const input = screen.getByTestId(testId);
  expect(input).toHaveAttribute('type', 'password');
});

test('maxlength field with a set maxlength', () => {
  getComponent({ maxLength: 3 });
  const input = screen.getByTestId(testId) as HTMLInputElement;
  userEvent.type(input, 'banana');
  expect(input.value.length).toBe(3);
});

test('maxlength field is not set as undefined', () => {
  getComponent({ maxLength: undefined });
  const input = screen.getByTestId(testId) as HTMLInputElement;
  userEvent.type(input, 'banana');
  expect(input.value.length).toBe(6);
});

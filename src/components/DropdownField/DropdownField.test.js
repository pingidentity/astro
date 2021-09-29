import React from 'react';
import { render, screen } from '@testing-library/react';
import DropdownField from './DropdownField';
import axeTest from '../../utils/testUtils/testAxe';

const testId = 'test-dropdown';
const defaultProps = {
  'data-testid': testId,
  controlProps: {
    'data-testid': `${testId}-input`,
  },
  label: 'testLabel',
};
const getComponent = (props = {}) => render((
  <DropdownField {...defaultProps} {...props}>
    <option value="a">A</option>
    <option value="b">B</option>
  </DropdownField>
));

afterEach(() => {
  jest.restoreAllMocks();
});

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default dropdownfield', () => {
  getComponent();
  const container = screen.getByTestId(testId);
  const input = screen.getByLabelText('testLabel');
  const label = screen.getByText('testLabel');
  expect(container).toBeInstanceOf(HTMLDivElement);
  expect(input).toBeInstanceOf(HTMLSelectElement);
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(container).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(label).toBeInTheDocument();
});

test('disabled prop disables dropdown input', () => {
  getComponent({ isDisabled: true });
  const dropdown = screen.getByRole('combobox');
  expect(dropdown).toBeDisabled();
});

test('input is not disabled without disabled prop', () => {
  getComponent();
  const dropdown = screen.getByRole('combobox');
  expect(dropdown).toBeEnabled();
});

test('displays helper text when helperText prop is passed', () => {
  getComponent({ helperText: 'helper text!' });
  const label = screen.getByText('helper text!');
  expect(label).toBeInTheDocument();
});

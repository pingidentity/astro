import React from 'react';
import { render, screen } from '@testing-library/react';
import DropdownField from './DropdownField';

const testId = 'test-dropdown';
const testValue = 'test';
const defaultProps = {
  'data-testid': testId,
  controlProps: {
    'data-testid': `${testId}-input`,
  },
  value: testValue,
};
const getComponent = (props = {}) => render((
  <DropdownField {...defaultProps} {...props} />
));

afterEach(() => {
  jest.restoreAllMocks();
});

test('default dropdownfield', () => {
  getComponent({ label: 'testLabel' });
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
  getComponent({ isDisabled: true, label: 'testLabel' });
  const dropdown = document.querySelector('select');
  expect(dropdown).toBeDisabled();
});

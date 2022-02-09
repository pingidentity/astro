import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { NumberField } from '../../index';
import axeTest from '../../utils/testUtils/testAxe';
import statuses from '../../utils/devUtils/constants/statuses';

const testId = 'test-NumberField';
const testLabel = 'test-NumberField-label';
const testValue = 5;
const testStep = 1;
const incrementAriaLabel = 'arrow-up';
const decrementAriaLabel = 'arrow-down';

const defaultProps = {
  defaultValue: testValue,
  step: testStep,
  'data-testid': testId,
  label: testLabel,
  helperText: 'test-helper-text',
  incrementAriaLabel,
  decrementAriaLabel,
};

const getComponent = (props = {}) =>
  render(<NumberField {...defaultProps} {...props} />);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent, {
  // ListItem represents list's child without parent
  rules: {
    'aria-required-parent': { enabled: false },
  },
});

test('renders NumberField component', () => {
  getComponent();
  expect(screen.getByLabelText(testLabel)).toBeInTheDocument();
});

test('arrow up is adding step to the number value', () => {
  const mockOnChange = jest.fn();
  getComponent({
    onChange: mockOnChange,
    value: testValue,
    step: testStep,
  });
  userEvent.click(screen.getByLabelText(incrementAriaLabel));
  expect(mockOnChange).toHaveBeenCalledWith(testValue + testStep);
});

test('arrow down is subtract step to the number value', () => {
  const mockOnChange = jest.fn();
  getComponent({
    onChange: mockOnChange,
    value: testValue,
    step: testStep,
  });
  userEvent.click(screen.getByLabelText(decrementAriaLabel));
  expect(mockOnChange).toHaveBeenCalledWith(testValue - testStep);
});

test('value can be set from outside (controlled state)', () => {
  const controlledValue = 11;
  getComponent({
    value: controlledValue,
  });
  expect(screen.getByLabelText(testLabel)).toHaveValue('11');
});

test('calling onChange with integer when input value changed (controlled state)', () => {
  const mockOnChange = jest.fn();
  const newTestValue = 123;
  getComponent({ onChange: mockOnChange });
  const numberInput = screen.getByLabelText(testLabel);
  userEvent.clear(numberInput);
  userEvent.type(numberInput, newTestValue.toString());
  numberInput.blur();
  expect(mockOnChange).toHaveBeenCalledWith(newTestValue);
});

test('should be marked as required if isRequired prop if passed', () => {
  getComponent({ isRequired: true });
  expect(screen.getByRole('textbox')).toBeRequired();
});

test('should show helper text if appropriate prop passed', () => {
  const helperText = 'test helper text';
  getComponent({ helperText, status: statuses.ERROR });
  const fieldHelperText = screen.getByText(helperText);
  expect(fieldHelperText).toBeInTheDocument();
  expect(fieldHelperText).toHaveClass(`is-${statuses.ERROR}`);
});

test('should be able to be focused via keyboard', () => {
  getComponent();
  userEvent.tab();
  expect(screen.getByLabelText(testLabel)).toHaveFocus();
});

test('should be able to interact with the keyboard', () => {
  getComponent();
  userEvent.tab();
  const numberInput = screen.getByLabelText(testLabel);
  userEvent.type(numberInput, '{arrowup}');
  expect(numberInput).toHaveValue((testValue + 1).toString());
  userEvent.type(numberInput, '{arrowdown}{arrowdown}');
  expect(numberInput).toHaveValue((testValue - 1).toString());
});

test('should show hintText text if prop is passed', () => {
  const hintText = 'some hint text';
  getComponent({ hintText });
  const helpHintButton = screen.getByTestId('help-hint__button');
  fireEvent.mouseMove(helpHintButton);
  fireEvent.mouseEnter(helpHintButton);
  expect(screen.getByText(hintText)).toBeInTheDocument();
});

test('increment and decrement buttons shouldn\'t be able to be focused via keyboard', () => {
  getComponent();
  userEvent.tab();
  expect(screen.getByLabelText(testLabel)).toHaveFocus();
  userEvent.tab();
  expect(screen.getByLabelText('arrow-up')).not.toHaveFocus();
  userEvent.tab();
  expect(screen.getByLabelText('arrow-down')).not.toHaveFocus();
});

test('number field input receiving name attribute', () => {
  const testName = 'testName';
  getComponent({ name: testName });
  expect(screen.getByLabelText(testLabel)).toHaveAttribute('name', testName);
});

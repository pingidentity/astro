import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NumberField } from '../../index';
import statuses from '../../utils/devUtils/constants/statuses';
import { act, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { universalFieldComponentTests } from '../../utils/testUtils/universalFormSubmitTest';

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

const getComponent = (props = {}) => render(
  <NumberField
    {...defaultProps}
    {...props}
  />,
);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <NumberField {...defaultProps} {...props} />
  ),
});

universalFieldComponentTests({
  renderComponent: props => (
    <NumberField {...defaultProps} {...props} />
  ),
  testValue: 5,
  testLabel,
  componentType: 'NumberField',
});

test('renders NumberField component', () => {
  getComponent();
  expect(screen.queryAllByLabelText(testLabel)[0]).toBeInTheDocument();
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
  expect(screen.queryAllByLabelText(testLabel)[1]).toHaveValue('11');
});

test('calling onChange with integer when input value changed (controlled state)', () => {
  const mockOnChange = jest.fn();
  const newTestValue = 123;
  getComponent({ onChange: mockOnChange });
  const numberInput = screen.queryAllByLabelText(testLabel)[1];
  userEvent.clear(numberInput);
  userEvent.type(numberInput, newTestValue.toString());
  act(() => {
    numberInput.blur();
  });
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
  expect(screen.queryAllByLabelText(testLabel)[1]).toHaveFocus();
});

test('should be able to interact with the keyboard', () => {
  getComponent();
  userEvent.tab();
  const numberInput = screen.queryAllByLabelText(testLabel)[1];
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

test('increment and decrement buttons should be able to be focused via keyboard', () => {
  getComponent();
  userEvent.tab();
  expect(screen.queryAllByLabelText(testLabel)[1]).toHaveFocus();
  userEvent.tab();
  expect(screen.getByLabelText('arrow-up')).toHaveFocus();
  userEvent.tab();
  expect(screen.getByLabelText('arrow-down')).toHaveFocus();
});

test('number field input receiving name attribute', () => {
  const testName = 'testName';
  getComponent({ name: testName });
  expect(screen.queryAllByLabelText(testLabel)[1]).toHaveAttribute('name', testName);
});

test('number field can be focused', () => {
  getComponent();
  userEvent.tab();
  expect(screen.queryAllByLabelText(testLabel)[1]).toHaveClass('is-focused');
});

test('passing helper text should display it and correct aria attributes on input', () => {
  const testHelperText = 'testHelperText';
  getComponent({ helperText: testHelperText, status: statuses.ERROR });
  const helper = screen.getByText(testHelperText);
  expect(helper).toBeInTheDocument();
  expect(helper).toHaveClass(`is-${statuses.ERROR}`);

  const helperTextID = helper.getAttribute('id');
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', helperTextID);
});

test('should extract numeric value from unit format and pass it to aria-valuenow', () => {
  const numericValue = 45;
  getComponent({
    defaultValue: numericValue,
    formatOptions: {
      style: 'unit',
      unit: 'kilogram',
      unitDisplay: 'long',
    },
  });

  expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-valuenow', String(numericValue));
});

test('should extract numeric value from currency format and pass it to aria-valuenow', () => {
  const numericValue = 45;
  getComponent({
    defaultValue: numericValue,
    formatOptions: {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
      currencySign: 'accounting',
    },
  });

  expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-valuenow', String(numericValue.toFixed(2)));
});

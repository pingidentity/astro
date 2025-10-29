import React from 'react';
import userEvent from '@testing-library/user-event';

import ORIENTATION from '../../utils/devUtils/constants/orientation';
import statuses from '../../utils/devUtils/constants/statuses';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { universalFieldComponentTests } from '../../utils/testUtils/universalFormSubmitTest';
import RadioField from '../RadioField';

import RadioGroupField from '.';

const testId = 'test-radio-group';
const testLabel = 'Test Label';
const testValues = ['dogs', 'cats', 'dragons'];
const defaultProps = {
  'data-testid': testId,
  label: testLabel,
};
const getComponent = (groupProps = {}, radioProps = []) => render((
  <RadioGroupField {...defaultProps} {...groupProps}>
    <RadioField value={testValues[0]} label={testValues[0]} />
    <RadioField value={testValues[1]} label={testValues[1]} />
    <RadioField value={testValues[2]} label={testValues[2]} />
  </RadioGroupField>
));

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <RadioGroupField {...defaultProps} {...props}>
      <RadioField value={testValues[0]} label={testValues[0]} />
    </RadioGroupField>
  ),
});

universalFieldComponentTests({
  renderComponent: props => (
    <RadioGroupField {...defaultProps} {...props}>
      <RadioField value={testValues[0]} label={testValues[0]} />
      <RadioField value={testValues[1]} label={testValues[1]} />
    </RadioGroupField>
  ),
  testValue: testValues[0],
  testLabel,
  componentType: 'RadioGroupField',
});

test('default radio group', () => {
  getComponent();
  const group = screen.getByLabelText(testLabel);
  const label = screen.getByText(testLabel);
  expect(group).toBeInstanceOf(HTMLDivElement);
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(group).toBeInTheDocument();
  expect(label).toBeInTheDocument();
  expect(group).toHaveAttribute('aria-orientation', ORIENTATION.VERTICAL);
});

test('radio group onChange', () => {
  const onChange = jest.fn();
  getComponent({ onChange });
  const radios = screen.getAllByRole('radio');
  expect(onChange).not.toHaveBeenCalled();

  userEvent.click(radios[0]);
  expect(onChange).toHaveBeenNthCalledWith(1, testValues[0]);
});

test('radio group only allows one checked option', async () => {
  getComponent();
  const radioA = screen.getByLabelText(testValues[0]);
  const radioB = screen.getByLabelText(testValues[1]);
  const labelA = screen.getByText(testValues[0]);
  const labelB = screen.getByText(testValues[1]);

  userEvent.click(radioA);
  expect(radioA).toBeChecked();
  expect(labelA).toHaveClass('is-checked');
  expect(radioB).not.toBeChecked();
  expect(labelB).not.toHaveClass('is-checked');

  userEvent.click(radioB);
  expect(radioA).not.toBeChecked();
  expect(labelA).not.toHaveClass('is-checked');
  expect(radioB).toBeChecked();
  expect(labelB).toHaveClass('is-checked');
  expect(screen.queryAllByRole('radio', { checked: true }).length).toBe(1);
});

test('value for controlled radio group', () => {
  getComponent({ value: testValues[0] });
  const radios = screen.getAllByRole('radio');
  expect(radios[0]).toBeChecked();

  // Ensure it is controlled.
  userEvent.click(radios[1]);
  expect(radios[0]).toBeChecked();
  expect(radios[1]).not.toBeChecked();
  expect(screen.queryAllByRole('radio', { checked: true }).length).toBe(1);
});

test('defaultValue for uncontrolled radio group', () => {
  getComponent({ defaultValue: testValues[0] });
  const radios = screen.getAllByRole('radio');
  expect(radios[0]).toBeChecked();

  // Ensure it is uncontrolled.
  userEvent.click(radios[1]);
  expect(radios[0]).not.toBeChecked();
  expect(radios[1]).toBeChecked();
  expect(screen.queryAllByRole('radio', { checked: true }).length).toBe(1);
});

test('disabled radio group disables all radios and the group label', () => {
  getComponent({ isDisabled: true });
  const radios = screen.getAllByRole('radio');
  radios.forEach(radio => expect(radio).toBeDisabled());
});

test('read only radio group', () => {
  getComponent({ isReadOnly: true });
  const group = screen.getByRole('radiogroup');
  expect(group).toHaveAttribute('aria-readonly', 'true');
});

test('required radio group', () => {
  getComponent({ isRequired: true });
  const group = screen.getByRole('radiogroup');
  expect(group).toBeRequired();
});

test('radio group with helper text', () => {
  const helperText = 'some text';
  getComponent({ helperText, status: statuses.ERROR });
  const fieldHelperText = screen.getByText(helperText);
  expect(fieldHelperText).toBeInTheDocument();
  expect(fieldHelperText).toHaveClass(`is-${statuses.ERROR}`);
});

test('radio group with horizontal orientation', () => {
  getComponent({ orientation: ORIENTATION.HORIZONTAL });
  const group = screen.getByRole('radiogroup');
  expect(group).toHaveAttribute('aria-orientation', ORIENTATION.HORIZONTAL);
});

test('passing helper text should display it and correct aria attributes on input', () => {
  const testHelperText = 'testHelperText';
  getComponent({ helperText: testHelperText, status: statuses.ERROR });
  const helper = screen.getByText(testHelperText);
  expect(helper).toBeInTheDocument();
  expect(helper).toHaveClass(`is-${statuses.ERROR}`);

  const helperTextID = helper.getAttribute('id');
  expect(screen.getByTestId('radioGroupWrapper')).toHaveAttribute('aria-labelledby', helperTextID);
});

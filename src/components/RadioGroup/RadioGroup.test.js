import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioGroup from '.';
import RadioField from '../RadioField';

const testId = 'test-radio-group';
const testLabel = 'Test Label';
const testValues = ['dogs', 'cats', 'dragons'];
const defaultProps = {
  'data-testid': testId,
  label: testLabel,
};
const getComponent = (groupProps = {}, radioProps = []) => render((
  <RadioGroup {...defaultProps} {...groupProps}>
    <RadioField value={testValues[0]} {...radioProps[0]}>{testValues[0]}</RadioField>
    <RadioField value={testValues[1]} {...radioProps[1]}>{testValues[1]}</RadioField>
    <RadioField value={testValues[2]} {...radioProps[2]}>{testValues[2]}</RadioField>
  </RadioGroup>
));

test('default radio group', () => {
  getComponent();
  const group = screen.getByLabelText(testLabel);
  const label = screen.getByText(testLabel);
  expect(group).toBeInstanceOf(HTMLDivElement);
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(group).toBeInTheDocument();
  expect(label).toBeInTheDocument();
});

test('radio group onChange', () => {
  const onChange = jest.fn();
  getComponent({ onChange });
  const radios = screen.getAllByRole('radio');
  expect(onChange).not.toHaveBeenCalled();

  act(() => userEvent.click(radios[0]));
  expect(onChange).toHaveBeenNthCalledWith(1, testValues[0]);
});

test('radio group only allows one checked option', async () => {
  getComponent();
  const radioA = screen.getByLabelText(testValues[0]);
  const radioB = screen.getByLabelText(testValues[1]);

  act(() => userEvent.click(radioA));
  expect(radioA).toBeChecked();
  expect(radioB).not.toBeChecked();

  act(() => userEvent.click(radioB));
  expect(radioA).not.toBeChecked();
  expect(radioB).toBeChecked();
  expect(document.querySelectorAll('input:checked')).toHaveLength(1);
});

test('value for controlled radio group', () => {
  getComponent({ value: testValues[0] });
  const radios = screen.getAllByRole('radio');
  expect(radios[0]).toBeChecked();

  // Ensure it is controlled.
  act(() => userEvent.click(radios[1]));
  expect(radios[0]).toBeChecked();
  expect(radios[1]).not.toBeChecked();
  expect(document.querySelectorAll('input:checked')).toHaveLength(1);
});

test('defaultValue for uncontrolled radio group', () => {
  getComponent({ defaultValue: testValues[0] });
  const radios = screen.getAllByRole('radio');
  expect(radios[0]).toBeChecked();

  // Ensure it is uncontrolled.
  act(() => userEvent.click(radios[1]));
  expect(radios[0]).not.toBeChecked();
  expect(radios[1]).toBeChecked();
  expect(document.querySelectorAll('input:checked')).toHaveLength(1);
});

test('disabled radio group disables all radios and the group label', () => {
  getComponent({ isDisabled: true });
  const groupLabel = screen.getByText(testLabel);
  const radios = screen.getAllByRole('radio');
  expect(groupLabel).toHaveStyleRule('opacity', '0.5');
  expect(groupLabel).toHaveStyleRule('pointer-events', 'none');
  radios.forEach(radio => expect(radio).toBeDisabled());
});

test('read only radio group', () => {
  getComponent({ isReadOnly: true });
  const group = screen.getByRole('radiogroup');
  expect(group).toHaveAttribute('aria-readonly', 'true');
});

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../utils/testUtils/testWrapper';
import SearchField from '.';

const testId = 'test-radio-group';
const testLabel = 'Test Label';
const defaultProps = {
  'data-testid': testId,
  label: testLabel,
};
const getComponent = (props = {}) => render((
  <SearchField {...defaultProps} {...props} />
));

test('default search field', () => {
  getComponent();
  const search = screen.getByLabelText(testLabel);
  const label = screen.getByText(testLabel);
  expect(search).toBeInstanceOf(HTMLInputElement);
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(search).toBeInTheDocument();
  expect(label).toBeInTheDocument();
});

test('default search clear', () => {
  getComponent();
  const search = screen.getByLabelText(testLabel);

  expect(search).toHaveValue('');
  userEvent.type(search, testLabel);
  expect(search).toHaveValue(testLabel);
  userEvent.type(search, '{esc}');
  expect(search).toHaveValue('');
});

test('search onClear', () => {
  const onClear = jest.fn();
  getComponent({ onClear });
  const search = screen.getByLabelText(testLabel);

  expect(onClear).not.toHaveBeenCalled();
  userEvent.type(search, `${testLabel}{esc}`);
  expect(onClear).toHaveBeenCalledWith();
});

test('search onSubmit', () => {
  const onSubmit = jest.fn();
  getComponent({ onSubmit });
  const search = screen.getByLabelText(testLabel);

  expect(onSubmit).not.toHaveBeenCalled();
  userEvent.type(search, `${testLabel}{enter}`);
  expect(onSubmit).toHaveBeenCalledWith(testLabel);
});

test('search isDisabled', () => {
  getComponent({ isDisabled: true });
  const search = screen.getByLabelText(testLabel);

  expect(search).toBeDisabled();
});

test('search isReadOnly', () => {
  getComponent({ isReadOnly: true });
  const search = screen.getByLabelText(testLabel);
  expect(search).toHaveAttribute('readonly');
});

test('search isRequired', () => {
  getComponent({ isRequired: true });
  // { exact: false } is used because of the required indicator asterisk
  const search = screen.getByLabelText(testLabel, { exact: false });
  expect(search).toBeRequired();
});

test('search autoFocus', () => {
  getComponent({ autoFocus: true });
  const search = screen.getByLabelText(testLabel);
  expect(search).toHaveFocus();
});

test('search focus events', () => {
  const onBlur = jest.fn();
  const onFocus = jest.fn();
  getComponent({ onBlur, onFocus });
  const search = screen.getByLabelText(testLabel);
  expect(search).not.toHaveFocus();
  expect(onBlur).not.toHaveBeenCalled();
  expect(onFocus).not.toHaveBeenCalled();

  userEvent.tab();
  expect(search).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();

  userEvent.tab();
  expect(search).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

test('search keyboard events', () => {
  const onKeyDown = jest.fn();
  const onKeyUp = jest.fn();
  getComponent({ onKeyDown, onKeyUp });
  const search = screen.getByLabelText(testLabel);
  expect(search).not.toHaveFocus();
  expect(onKeyDown).not.toHaveBeenCalled();
  expect(onKeyUp).not.toHaveBeenCalled();

  userEvent.type(screen.getByLabelText(testLabel), testLabel);
  expect(onKeyUp).toHaveBeenCalled();
});

test('search placeholder', () => {
  getComponent({ placeholder: testLabel });
  const search = screen.getByLabelText(testLabel);
  expect(search).toHaveAttribute('placeholder', testLabel);
});

test('controlled search field', () => {
  getComponent({ value: testLabel });
  const search = screen.getByLabelText(testLabel);
  expect(search).toHaveValue(testLabel);

  userEvent.type(search, '--2');
  expect(search).not.toHaveValue(`${testLabel}--2`);
});

test('uncontrolled search field', () => {
  getComponent({ defaultValue: testLabel });
  const search = screen.getByLabelText(testLabel);
  expect(search).toHaveValue(testLabel);

  userEvent.type(search, '--2');
  expect(search).toHaveValue(`${testLabel}--2`);
});

test('search onChange', () => {
  const onChange = jest.fn();
  getComponent({ onChange });
  const search = screen.getByLabelText(testLabel);
  expect(onChange).not.toHaveBeenCalled();

  userEvent.type(search, '-');
  expect(onChange).toHaveBeenNthCalledWith(1, '-');
});

test('search excludeFromTabOrder', () => {
  getComponent({ excludeFromTabOrder: true });
  const search = screen.getByLabelText(testLabel);
  expect(search).toHaveAttribute('tabindex', '-1');
});

test('search id', () => {
  getComponent({ id: 'test' });
  const search = screen.getByLabelText(testLabel);
  expect(search).toHaveAttribute('id', 'test');
});

test('check that only 1 data-testid is present', () => {
  getComponent();
  expect(screen.getAllByTestId(testId).length).toBe(1);
});

test('clear button should be present by default ', () => {
  getComponent({ value: 'test-value' });
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('clear button should not be present is hasNoClearButton=true ', () => {
  getComponent({ value: 'test-value', hasNoClearButton: true });
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

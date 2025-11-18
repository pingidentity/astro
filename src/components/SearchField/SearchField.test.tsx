import React from 'react';
import { Item } from '@react-stately/collections';
import userEvent from '@testing-library/user-event';

import { SearchFieldProps, SearchItem } from '../../types';
import { act, fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { universalFieldComponentTests } from '../../utils/testUtils/universalFormSubmitTest';

import SearchField from '.';

const testId = 'test-radio-group';
const testValue = 'Option';
const testLabel = 'Test Label';
const defaultProps = {
  'data-testid': testId,
  label: testLabel,
};
const getComponent = (props: SearchFieldProps<SearchItem> = {}) => render((
  <SearchField {...defaultProps} {...props} />
));

const getAutocompleteComponent = (props: SearchFieldProps<SearchItem> = {}) => render((
  <SearchField {...defaultProps} {...props}>
    <Item key="1">Option 1</Item>
    <Item key="2">Option 2</Item>
    <Item key="3">Option 3</Item>
  </SearchField>
));

universalFieldComponentTests({
  renderComponent: props => (
    <SearchField {...defaultProps} {...props} />
  ),
  testValue: 'testvalue',
  testLabel,
  componentType: 'SearchField',
});

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <SearchField {...defaultProps} {...props} /> });

test('default search field', () => {
  getComponent();
  const search = screen.getByLabelText(testLabel);
  const label = screen.getByText(testLabel);
  expect(search).toBeInstanceOf(HTMLInputElement);
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(search).toBeInTheDocument();
  expect(label).toBeInTheDocument();
});

test('default search clear', async () => {
  getComponent();
  const search = screen.getByLabelText(testLabel);

  expect(search).toHaveValue('');
  await userEvent.type(search, testLabel);
  expect(search).toHaveValue(testLabel);
  await userEvent.type(search, '{esc}');
  expect(search).toHaveValue('');
});

test('search onClear', async () => {
  const onClear = jest.fn();
  getComponent({ onClear });
  const search = screen.getByLabelText(testLabel);

  expect(onClear).not.toHaveBeenCalled();
  await userEvent.type(search, `${testLabel}{esc}`);
  expect(onClear).toHaveBeenCalledWith();
});

test('search onSubmit', async () => {
  const onSubmit = jest.fn();
  getComponent({ onSubmit });
  const search = screen.getByLabelText(testLabel);

  expect(onSubmit).not.toHaveBeenCalled();
  await userEvent.type(search, `${testLabel}{enter}`);
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
  getComponent({ hasAutoFocus: true });
  const search = screen.getByLabelText(testLabel);
  expect(search).toHaveFocus();
});

test('search focus events', async () => {
  const onBlur = jest.fn();
  const onFocus = jest.fn();
  getComponent({ onBlur, onFocus });
  const search = screen.getByLabelText(testLabel);
  expect(search).not.toHaveFocus();
  expect(onBlur).not.toHaveBeenCalled();
  expect(onFocus).not.toHaveBeenCalled();

  await userEvent.tab();
  expect(search).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();

  await userEvent.tab();
  expect(search).not.toHaveFocus();
  expect(onBlur).toHaveBeenCalled();
});

test('search keyboard events', async () => {
  const onKeyDown = jest.fn();
  const onKeyUp = jest.fn();
  getComponent({ onKeyDown, onKeyUp });
  const search = screen.getByLabelText(testLabel);
  expect(search).not.toHaveFocus();
  expect(onKeyDown).not.toHaveBeenCalled();
  expect(onKeyUp).not.toHaveBeenCalled();

  await userEvent.type(screen.getByLabelText(testLabel), testLabel);
  expect(onKeyUp).toHaveBeenCalled();
});

test('search placeholder', () => {
  getComponent({ placeholder: testLabel });
  const search = screen.getByLabelText(testLabel);
  expect(search).toHaveAttribute('placeholder', testLabel);
});

test('controlled search field', async () => {
  getComponent({ value: testLabel });
  const search = screen.getByLabelText(testLabel);
  expect(search).toHaveValue(testLabel);

  await userEvent.type(search, '--2');
  expect(search).not.toHaveValue(`${testLabel}--2`);
});

test('uncontrolled search field', async () => {
  getComponent({ defaultValue: testLabel });
  const search = screen.getByLabelText(testLabel);
  expect(search).toHaveValue(testLabel);

  await userEvent.type(search, '--2');
  expect(search).toHaveValue(`${testLabel}--2`);
});

test('search onChange', async () => {
  const onChange = jest.fn();
  getComponent({ onChange });
  const search = screen.getByLabelText(testLabel);
  expect(onChange).not.toHaveBeenCalled();

  await userEvent.type(search, '-');
  expect(onChange).toHaveBeenNthCalledWith(1, '-');
});

test('search excludeFromTabOrder', () => {
  getComponent({ isExcludedFromTabOrder: true });
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

test('clear button should be keyboard accessible', async () => {
  getComponent();
  const search = screen.getByLabelText(testLabel);
  await userEvent.type(search, 'clear');
  expect(search).toHaveValue('clear');

  const clearButton = screen.getByRole('button');
  expect(clearButton).toHaveAttribute('tabindex', '0');

  act(() => { clearButton.focus(); });
  expect(clearButton).toHaveFocus();

  fireEvent.keyDown(clearButton, { key: 'Enter' });
  fireEvent.keyUp(clearButton, { key: 'Enter' });
  expect(search).toHaveValue('');
});

test('clear button should not be present is hasNoClearButton=true ', () => {
  getComponent({ value: 'test-value', hasNoClearButton: true });
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

describe('Autocomplete mode', () => {
  beforeAll(() => {
    jest.spyOn(window.HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(() => 1000);
    jest.spyOn(window.HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 1000);
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    jest.spyOn(window.screen, 'width', 'get').mockImplementation(() => 1024);
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('default autocomplete search field', () => {
    getAutocompleteComponent({ mode: 'autocomplete' });
    const search = screen.getByLabelText(testLabel);
    const label = screen.getByText(testLabel);
    expect(search).toBeInstanceOf(HTMLInputElement);
    expect(label).toBeInstanceOf(HTMLLabelElement);
    expect(search).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  test('autocomplete options appear on user input', async () => {
    getAutocompleteComponent({ mode: 'autocomplete' });
    const control = screen.getByLabelText(testLabel);
    await userEvent.type(control, testValue);
    expect(control).toHaveValue(testValue);
    expect(screen.queryByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).toBeInTheDocument();
    expect(screen.queryByText('Option 3')).toBeInTheDocument();

    fireEvent.change(control, { target: { value: '3' } });
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).toBeInTheDocument();
  });

  test('Allow custom values', async () => {
    const onSubmit = jest.fn();
    getAutocompleteComponent({ mode: 'autocomplete', onSubmit });
    const control = screen.getByLabelText(testLabel);
    await userEvent.type(control, 'Custom Value{enter}');
    expect(onSubmit).toHaveBeenCalledWith('Custom Value');
  });

  test('clear button works in autocomplete mode', async () => {
    getAutocompleteComponent({ mode: 'autocomplete' });
    const search = screen.getByLabelText(testLabel);
    await userEvent.type(search, 'clear');
    expect(search).toHaveValue('clear');

    const clearButton = screen.getByRole('button');
    expect(clearButton).toHaveAttribute('tabindex', '0');

    act(() => { clearButton.focus(); });
    expect(clearButton).toHaveFocus();

    fireEvent.keyDown(clearButton, { key: 'Enter' });
    fireEvent.keyUp(clearButton, { key: 'Enter' });
    expect(search).toHaveValue('');
  });

  test('Down arrow key open listbox popup', () => {
    getAutocompleteComponent({ mode: 'autocomplete' });
    const search = screen.getByLabelText(testLabel);
    act(() => { search.focus(); });
    expect(search).toHaveFocus();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    fireEvent.keyDown(search, { key: 'ArrowDown' });
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  test("No popup when there aren't any options", async () => {
    getAutocompleteComponent({ mode: 'autocomplete' });
    const search = screen.getByLabelText(testLabel);
    act(() => { search.focus(); });
    expect(search).toHaveFocus();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await userEvent.type(search, 'xyz');
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(search).toHaveValue('xyz');
  });
});

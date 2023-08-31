import React from 'react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Item, MultivaluesField, OverlayProvider } from '../../index';
import statuses from '../../utils/devUtils/constants/statuses';
import { fireEvent, getDefaultNormalizer, render, screen, within } from '../../utils/testUtils/testWrapper';

const items = [
  { id: 1, name: 'Aardvark', key: 'Aardvark' },
  { id: 2, name: 'Kangaroo', key: 'Kangaroo' },
  { id: 3, name: 'Snake', key: 'Snake' },
];
const defaultProps = {
  items,
  label: 'Field Label',
};

const getComponent = (props = {}, { renderFn = render } = {}) => renderFn((
  <OverlayProvider>
    <MultivaluesField {...defaultProps} {...props}>
      {item => <Item key={item.key} data-id={item.name}>{item.name}</Item>}
    </MultivaluesField>
  </OverlayProvider>
));

const getComponentInForm = (onFormSubmit, props = {}, { renderFn = render } = {}) => renderFn((
  <OverlayProvider>
    <form onSubmit={onFormSubmit}>
      <MultivaluesField {...defaultProps} {...props}>
        {item => <Item key={item.key} data-id={item.name}>{item.name}</Item>}
      </MultivaluesField>
    </form>
  </OverlayProvider>
));

beforeAll(() => {
  jest.spyOn(window.HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(() => 1000);
  jest.spyOn(window.HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 1000);
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  jest.spyOn(window.screen, 'width', 'get').mockImplementation(() => 1024);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

test('renders MultivaluesField component', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  const label = screen.getByText(defaultProps.label);
  expect(input).toBeInTheDocument();
  expect(label).toBeInTheDocument();
});

test('opens listbox on focus and fires "onFocus', () => {
  const onFocus = jest.fn();
  getComponent({ onFocus });
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();

  expect(screen.getByRole('listbox')).toBeInTheDocument();
  const options = screen.getAllByRole('option');
  expect(options.length).toBe(items.length);
  expect(options[0]).toHaveTextContent(items[0].name);
  expect(onFocus).toBeCalled();
});

test('closes listbox on blur and fires "onBlur"', () => {
  const onBlur = jest.fn();
  getComponent({ onBlur });
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  input.blur();
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(onBlur).toBeCalled();
});

test('opening and closing listbox fires "onOpenChange"', () => {
  const onOpenChange = jest.fn();
  getComponent({ onOpenChange });
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(onOpenChange).toHaveBeenCalledWith(true);
  input.blur();
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(onOpenChange).toHaveBeenCalledWith(false);
});

test('multiple selection is enabled, option disappears after selection', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();

  const listbox = screen.getByRole('listbox');
  expect(listbox).toHaveAttribute('aria-multiselectable', 'true');

  const options = within(listbox).getAllByRole('option');
  const firstOption = options[0];
  firstOption.click();
  expect(firstOption).not.toBeInTheDocument();

  const secondOption = options[1];
  secondOption.click();
  expect(secondOption).not.toBeInTheDocument();
});

test('updates aria attributes on option focus', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  const options = screen.getAllByRole('option');
  const listbox = screen.getByRole('listbox');

  expect(input).toHaveAttribute('aria-activedescendant', options[0].id);
  expect(input).toHaveAttribute('aria-expanded', 'true');
  expect(input).toHaveAttribute('aria-controls', listbox.id);
});

test('clicking an option renders badge with option name', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();

  const options = screen.getAllByRole('option');
  const firstOption = options[0];
  firstOption.click();
  expect(firstOption).not.toBeInTheDocument();

  const badge = screen.getByText(items[0].name);
  expect(badge).toBeInTheDocument();
  const { parentElement: badgeContainer } = badge;
  expect(badgeContainer).toHaveAttribute('role', 'presentation');
});

test('after clicking an option, and then clicking the text input, the listbox remains open', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();

  const options = screen.getAllByRole('option');
  const firstOption = options[0];
  firstOption.click();
  expect(firstOption).not.toBeInTheDocument();

  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  userEvent.click(input);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
});

test('no badges are rendered, if nothing is selected', () => {
  getComponent({ isReadOnly: false });
  expect(screen.queryByRole('presentation')).not.toBeInTheDocument(0);
});

test('after clicking an option, and then typing a custom input, the listbox remains open and filters the options', async () => {
  getComponent({ mode: 'non-restrictive' });
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();

  const options = screen.getAllByRole('option');
  const firstOption = options[0];
  firstOption.click();
  expect(firstOption).not.toBeInTheDocument();
  await userEvent.clear(input);

  const value = 'ka';
  await userEvent.type(input, value);

  const listbox = screen.queryByRole('listbox');
  expect(listbox).toBeInTheDocument();

  const filteredOptions = within(listbox).getAllByRole('option');
  expect(filteredOptions.length).toBe(1);
});

test('clicking on delete button deletes selection, and re-adds option to list', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();

  const options = screen.getAllByRole('option');
  const firstOption = options[0];
  firstOption.click();
  expect(firstOption).not.toBeInTheDocument();

  const badge = screen.getByText(items[0].name);
  expect(badge).toBeInTheDocument();
  const { nextSibling: deleteButton } = badge;
  deleteButton.click();
  expect(badge).not.toBeInTheDocument();

  input.blur();
  input.focus();
  const updatedOptions = screen.getAllByRole('option');
  expect(updatedOptions[0]).toBeInTheDocument();
  expect(updatedOptions[0]).toHaveTextContent(items[0].name);
});

test('clicking an option fires "onSelectionChange"', () => {
  const onSelectionChange = jest.fn();
  getComponent({ onSelectionChange });
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();

  const listbox = screen.getByRole('listbox');

  const options = within(listbox).getAllByRole('option');
  const firstOption = options[0];
  firstOption.click();
  expect(firstOption).not.toBeInTheDocument();

  const secondOption = options[1];
  secondOption.click();
  expect(secondOption).not.toBeInTheDocument();

  expect(onSelectionChange).toBeCalledTimes(2);
  expect(onSelectionChange.mock.calls[0][0].has(items[0].name)).toBeTruthy();
  expect(onSelectionChange.mock.calls[1][0].has(items[1].name)).toBeTruthy();
});

test('changing the input value opens listbox, filters options, and fires "onInputChange"', () => {
  const onInputChange = jest.fn();
  getComponent({ onInputChange, mode: 'non-restrictive' });
  const input = screen.getByRole('combobox');
  const value = 'aa';
  userEvent.type(input, value);

  const listbox = screen.getByRole('listbox');
  expect(listbox).toBeInTheDocument();

  const options = within(listbox).getAllByRole('option');
  expect(options.length).toBe(1);

  expect(onInputChange).toBeCalledTimes(value.length);
  expect(onInputChange).toHaveBeenCalledWith(value);
});

test('in non-restrictive mode, a badge gets added if there is input, onBlur', () => {
  getComponent({ mode: 'non-restrictive' });
  const input = screen.getByRole('combobox');
  const value = 'custom';
  userEvent.type(input, value);

  userEvent.tab();

  const badge = screen.queryByText(value);
  expect(badge).toBeInTheDocument();
  const { parentElement: badgeContainer } = badge;
  expect(badgeContainer).toHaveAttribute('role', 'presentation');
  expect(input.value).toBe('');
});

test('in non-restrictive mode, a badge gets added if there is only one matching filtered option, onBlur', () => {
  getComponent({ mode: 'non-restrictive' });
  const input = screen.getByRole('combobox');
  userEvent.tab();
  const listbox = screen.getByRole('listbox');
  const options = within(listbox).getAllByRole('option');
  const firstOption = options[0];
  const value = 'Aardvark';
  userEvent.type(input, value);

  userEvent.tab();

  const badge = screen.queryByText(value);
  expect(badge).toBeInTheDocument();
  const { parentElement: badgeContainer } = badge;
  expect(badgeContainer).toHaveAttribute('role', 'presentation');
  expect(firstOption).not.toBeInTheDocument();
});

test('dropdown with options reappears after entering a custom input', async () => {
  getComponent({ mode: 'non-restrictive' });
  const input = screen.getByRole('combobox');

  const value1 = 'longstring';
  userEvent.type(input, value1);

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  const value2 = '';
  await userEvent.clear(input);
  await userEvent.type(input, value2);

  const listbox = screen.getByRole('listbox');

  const options2 = within(listbox).getAllByRole('option');
  expect(options2.length).toBe(items.length);
});

test('changing the input value and hitting enter by default do nothing', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  expect(input).toHaveValue('');

  const value = 'custom';
  userEvent.type(input, value);
  userEvent.type(input, '{enter}');

  expect(input).toHaveValue('');
});

test('changing the input value and hitting enter creates new value in non-restrictive mode', () => {
  getComponent({ mode: 'non-restrictive' });
  const input = screen.getByRole('combobox');
  expect(input).toHaveValue('');

  const value = 'custom';
  userEvent.type(input, value);
  expect(input).toHaveValue(value);

  userEvent.type(input, '{enter}');
  expect(input).toHaveValue('');

  const badge = screen.queryByText(value);
  expect(badge).toBeInTheDocument();
  const { parentElement: badgeContainer } = badge;
  expect(badgeContainer).toHaveAttribute('role', 'presentation');
});

test('pressing enter, when the input values is an empty string does not add an option, in non-restrictive mode', () => {
  const onSelectionChange = jest.fn();
  getComponent({ mode: 'non-restrictive', onSelectionChange });
  const input = screen.getByRole('combobox');
  expect(input).toHaveValue('');

  userEvent.type(input, '{enter}');
  expect(input).toHaveValue('');

  expect(onSelectionChange).toBeCalledTimes(0);
});

test('in non-restrictive mode "onSelectionChange" returns entered keys', () => {
  const onSelectionChange = jest.fn();
  getComponent({ mode: 'non-restrictive', onSelectionChange });
  const input = screen.getByRole('combobox');
  const value = 'custom';
  userEvent.type(input, value);
  userEvent.type(input, '{enter}');

  const badge = screen.queryByText(value);
  expect(badge).toBeInTheDocument();

  expect(onSelectionChange).toBeCalledTimes(1);
  expect(onSelectionChange.mock.calls[0][0].has(value)).toBeTruthy();
});

test('in non-restrictive mode the same value cannot be applied twice', () => {
  const onSelectionChange = jest.fn();
  getComponent({ mode: 'non-restrictive', onSelectionChange });
  const input = screen.getByRole('combobox');
  const value = 'custom';
  userEvent.type(input, value);
  userEvent.type(input, '{enter}');

  const badge = screen.queryByText(value);
  expect(badge).toBeInTheDocument();

  expect(input).toHaveValue('');
  userEvent.type(input, value);
  userEvent.type(input, '{enter}');
  expect(input).toHaveValue(value);
  expect(onSelectionChange).toBeCalledTimes(1);
});

test('in non-restrictive mode the value that was already selected using the list cannot be applied', () => {
  const onSelectionChange = jest.fn();
  getComponent({ mode: 'non-restrictive', onSelectionChange });

  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();

  const listbox = screen.getByRole('listbox');
  const options = within(listbox).getAllByRole('option');
  const firstOption = options[0];
  firstOption.click();

  expect(onSelectionChange.mock.calls[0][0].has(items[0].name)).toBeTruthy();
  onSelectionChange.mockClear();

  userEvent.type(input, items[0].name);
  userEvent.type(input, '{enter}');

  expect(input).toHaveValue(items[0].name);
  expect(onSelectionChange).not.toBeCalled();
});

test('options can be focused via keyboard', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();

  const listbox = screen.getByRole('listbox');
  expect(listbox).toBeInTheDocument();
  const options = within(listbox).getAllByRole('option');

  userEvent.type(listbox, '{arrowdown}', { skipClick: true });
  expect(options[0]).toHaveClass('is-focused');

  userEvent.type(listbox, '{arrowdown}', { skipClick: true });
  expect(options[1]).toHaveClass('is-focused');
});

test('options can be selected via keyboard', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();

  const listbox = screen.getByRole('listbox');
  expect(listbox).toBeInTheDocument();
  const options = within(listbox).getAllByRole('option');

  userEvent.type(listbox, '{arrowdown}', { skipClick: true });
  expect(options[0]).toHaveClass('is-focused');
  userEvent.type(options[0], '{enter}');
  expect(options[0]).not.toBeInTheDocument();
  const badge = screen.getByText(items[0].name);
  expect(badge).toBeInTheDocument();
  const { parentElement: badgeContainer } = badge;
  expect(badgeContainer).toHaveAttribute('role', 'presentation');
});

test('default selected keys', () => {
  getComponent({ defaultSelectedKeys: [items[1].key, items[2].key] });

  const listbox = screen.queryByRole('listbox');
  expect(listbox).not.toBeInTheDocument();

  const firstBadge = screen.getByText(items[1].name);
  expect(firstBadge).toBeInTheDocument();
  const secondBadge = screen.getByText(items[2].name);
  expect(secondBadge).toBeInTheDocument();
});

test('selected keys', () => {
  getComponent({ selectedKeys: [items[1].key, items[2].key] });

  const listbox = screen.queryByRole('listbox');
  expect(listbox).not.toBeInTheDocument();

  const firstBadge = screen.getByText(items[1].name);
  expect(firstBadge).toBeInTheDocument();
  const secondBadge = screen.getByText(items[2].name);
  expect(secondBadge).toBeInTheDocument();
});

test('should have no accessibility violations', async () => {
  jest.useRealTimers();
  const { container } = getComponent();
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

test('read only keys', () => {
  getComponent({ readOnlyKeys: [items[1].key, items[2].key] });

  const listbox = screen.queryByRole('listbox');
  expect(listbox).not.toBeInTheDocument();

  const firstBadge = screen.getByText(items[1].name);
  const { nextSibling: deleteButton1 } = firstBadge;
  expect(firstBadge).toBeInTheDocument();
  expect(deleteButton1).toBeNull();

  const secondBadge = screen.getByText(items[2].name);
  expect(secondBadge).toBeInTheDocument();
  const { nextSibling: deleteButton2 } = firstBadge;
  expect(deleteButton2).toBeNull();
});

test('passing helper text should display it and correct aria attributes on input', () => {
  const testHelperText = 'testHelperText';
  getComponent({ helperText: testHelperText, status: statuses.ERROR });
  const helper = screen.getByText(testHelperText);
  expect(helper).toBeInTheDocument();
  expect(helper).toHaveClass(`is-${statuses.ERROR}`);

  const input = screen.getByRole('combobox');
  expect(input).toHaveAttribute('aria-invalid', 'true');

  const helperTextID = helper.getAttribute('id');
  expect(input).toHaveAttribute('aria-describedby', `${helperTextID} emptyKeysState`);
});

test('read only field', () => {
  const isReadOnly = true;
  getComponent({ isReadOnly });

  const badge = screen.queryAllByRole('presentation');
  expect(badge[0]).toHaveAttribute('label', items[0].name);
  expect(badge[1]).toHaveAttribute('label', items[1].name);
  expect(badge[2]).toHaveAttribute('label', items[2].name);

  const textArea = screen.getByLabelText(defaultProps.label);
  expect(textArea).toHaveClass('is-read-only');
  expect(screen.queryByRole('option')).not.toBeInTheDocument();
});

test('read only keys with read only field', () => {
  const isReadOnly = true;
  getComponent({ isReadOnly, readOnlyKeys: [items[1].key, items[2].key] });

  const badge = screen.queryAllByRole('presentation');
  expect(badge[0]).toHaveAttribute('label', items[1].name);
  expect(badge[1]).toHaveAttribute('label', items[2].name);

  const textArea = screen.getByLabelText(defaultProps.label);
  expect(textArea).toHaveClass('is-read-only');
  expect(screen.queryByRole('option')).not.toBeInTheDocument();
});

test('popover closes on input blur', () => {
  getComponent();

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('option')).not.toBeInTheDocument();

  const input = screen.getByRole('combobox');

  userEvent.click(input);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(3);
  expect(screen.queryByRole('option', { name: 'Aardvark' })).toBeInTheDocument();

  userEvent.click(document.body);
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('option')).not.toBeInTheDocument();
});

test('form does not submit when adding custom value', () => {
  const onFormSubmit = jest.fn();
  getComponentInForm(onFormSubmit, {});

  const input = screen.getByRole('combobox');
  expect(input).toHaveValue('');

  const value = 'custom';
  userEvent.type(input, value);
  expect(input).toHaveValue('');

  userEvent.type(input, '{enter}');
  expect(onFormSubmit).not.toHaveBeenCalled();
});

test('in non-restrictive mode the value should be trimmed', () => {
  getComponent({ mode: 'non-restrictive' });

  const input = screen.getByRole('combobox');
  expect(input).toHaveValue('');

  const value = 'test ';
  const trimmedValue = 'test';
  userEvent.type(input, value);
  userEvent.type(input, '{enter}');

  const badge = screen.queryByText(value, {
    normalizer: getDefaultNormalizer({ trim: false }),
  });

  const trimmedBadge = screen.queryByText(trimmedValue, {
    normalizer: getDefaultNormalizer({ trim: false }),
  });

  expect(badge).not.toBeInTheDocument();
  expect(trimmedBadge).toBeInTheDocument();
  expect(input).toHaveValue('');
});

test('deleting a single badge via keyboard moves focus to the input', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  userEvent.tab();
  const options = screen.getAllByRole('option');
  const firstOption = options[0];
  firstOption.click();

  const badge = screen.getByText(items[0].name);
  expect(badge).toBeInTheDocument();

  userEvent.tab({ shift: true });
  const { nextSibling: deleteButton } = badge;
  expect(deleteButton).toHaveClass('is-focused');

  fireEvent.keyDown(deleteButton, { key: 'Enter' });
  fireEvent.keyUp(deleteButton, { key: 'Enter' });
  expect(badge).not.toBeInTheDocument();
  expect(input).toHaveClass('is-focused');
});

test('deleting the last badge via keyboard moves focus to the previous badge', () => {
  getComponent();
  userEvent.tab();
  const options = screen.getAllByRole('option');
  const firstOption = options[0];
  const secondOption = options[1];
  firstOption.click();
  secondOption.click();

  const badge1 = screen.getByText(items[0].name);
  const badge2 = screen.getByText(items[1].name);
  expect(badge1).toBeInTheDocument();
  expect(badge2).toBeInTheDocument();

  userEvent.tab({ shift: true });
  const { nextSibling: deleteButton1 } = badge1;
  const { nextSibling: deleteButton2 } = badge2;
  expect(deleteButton2).toHaveClass('is-focused');

  fireEvent.keyDown(deleteButton2, { key: 'Enter' });
  fireEvent.keyUp(deleteButton2, { key: 'Enter' });
  expect(badge2).not.toBeInTheDocument();
  expect(deleteButton1).toHaveClass('is-focused');
});

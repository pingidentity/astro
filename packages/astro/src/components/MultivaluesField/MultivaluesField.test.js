import React from 'react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Item, MultivaluesField, OverlayProvider } from '../../index';
import { render, screen, within } from '../../utils/testUtils/testWrapper';
import statuses from '../../utils/devUtils/constants/statuses';

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
  input.focus();

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
  input.focus();
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  input.blur();
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(onBlur).toBeCalled();
});

test('opening and closing listbox fires "onOpenChange"', () => {
  const onOpenChange = jest.fn();
  getComponent({ onOpenChange });
  const input = screen.getByRole('combobox');
  input.focus();
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(onOpenChange).toHaveBeenCalledWith(true);
  input.blur();
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(onOpenChange).toHaveBeenCalledWith(false);
});

test('multiple selection is enabled, option disappears after selection', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  input.focus();

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

test('clicking an option renders chip with option name', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  input.focus();

  const options = screen.getAllByRole('option');
  const firstOption = options[0];
  firstOption.click();
  expect(firstOption).not.toBeInTheDocument();

  const chip = screen.getByText(items[0].name);
  expect(chip).toBeInTheDocument();
  const { parentElement: chipContainer } = chip;
  expect(chipContainer).toHaveAttribute('role', 'presentation');
});

test('clicking on delete button deletes selection, and re-adds option to list', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  input.focus();

  const options = screen.getAllByRole('option');
  const firstOption = options[0];
  firstOption.click();
  expect(firstOption).not.toBeInTheDocument();

  const chip = screen.getByText(items[0].name);
  expect(chip).toBeInTheDocument();
  const { nextSibling: deleteButton } = chip;
  deleteButton.click();
  expect(chip).not.toBeInTheDocument();

  input.focus();
  const updatedOptions = screen.getAllByRole('option');
  expect(updatedOptions[0]).toBeInTheDocument();
  expect(updatedOptions[0]).toHaveTextContent(items[0].name);
});

test('clicking an option fires "onSelectionChange"', () => {
  const onSelectionChange = jest.fn();
  getComponent({ onSelectionChange });
  const input = screen.getByRole('combobox');
  input.focus();

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
  getComponent({ onInputChange });
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

test('changing the input value and hitting enter by default do nothing', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  expect(input).toHaveValue('');

  const value = 'custom';
  userEvent.type(input, value);
  userEvent.type(input, '{enter}');

  expect(input).toHaveValue(value);
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
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

  const chip = screen.queryByText(value);
  expect(chip).toBeInTheDocument();
  const { parentElement: chipContainer } = chip;
  expect(chipContainer).toHaveAttribute('role', 'presentation');
});

test('in non-restrictive mode "onSelectionChange" returns entered keys', () => {
  const onSelectionChange = jest.fn();
  getComponent({ mode: 'non-restrictive', onSelectionChange });
  const input = screen.getByRole('combobox');
  const value = 'custom';
  userEvent.type(input, value);
  userEvent.type(input, '{enter}');

  const chip = screen.queryByText(value);
  expect(chip).toBeInTheDocument();

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

  const chip = screen.queryByText(value);
  expect(chip).toBeInTheDocument();

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
  input.focus();

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
  input.focus();

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
  input.focus();

  const listbox = screen.getByRole('listbox');
  expect(listbox).toBeInTheDocument();
  const options = within(listbox).getAllByRole('option');

  userEvent.type(listbox, '{arrowdown}', { skipClick: true });
  expect(options[0]).toHaveClass('is-focused');
  userEvent.type(options[0], '{enter}');
  expect(options[0]).not.toBeInTheDocument();
  const chip = screen.getByText(items[0].name);
  expect(chip).toBeInTheDocument();
  const { parentElement: chipContainer } = chip;
  expect(chipContainer).toHaveAttribute('role', 'presentation');
});

test('default selected keys', () => {
  getComponent({ defaultSelectedKeys: [items[1].key, items[2].key] });

  const listbox = screen.queryByRole('listbox');
  expect(listbox).not.toBeInTheDocument();

  const firstChip = screen.getByText(items[1].name);
  expect(firstChip).toBeInTheDocument();
  const secondChip = screen.getByText(items[2].name);
  expect(secondChip).toBeInTheDocument();
});

test('selected keys', () => {
  getComponent({ selectedKeys: [items[1].key, items[2].key] });

  const listbox = screen.queryByRole('listbox');
  expect(listbox).not.toBeInTheDocument();

  const firstChip = screen.getByText(items[1].name);
  expect(firstChip).toBeInTheDocument();
  const secondChip = screen.getByText(items[2].name);
  expect(secondChip).toBeInTheDocument();
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

  const firstChip = screen.getByText(items[1].name);
  const { nextSibling: deleteButton1 } = firstChip;
  expect(firstChip).toBeInTheDocument();
  expect(deleteButton1).toBeNull();

  const secondChip = screen.getByText(items[2].name);
  expect(secondChip).toBeInTheDocument();
  const { nextSibling: deleteButton2 } = firstChip;
  expect(deleteButton2).toBeNull();
});

test(' multivalue field with helper text', () => {
  const helperText = 'helper text';
  getComponent({ helperText, status: statuses.ERROR });
  const helper = screen.getByText(helperText);
  expect(helper).toBeInTheDocument();
  expect(helper).toHaveClass(`is-${statuses.ERROR}`);
});

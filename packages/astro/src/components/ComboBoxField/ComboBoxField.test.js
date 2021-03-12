import React, { useState, useMemo } from 'react';
import { useFilter } from '@react-aria/i18n';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { ComboBoxField, Item } from '../../index';

const items = [
  { name: 'Aardvark', id: '1' },
  { name: 'Kangaroo', id: '2' },
  { name: 'Snake', id: '3' },
];
const defaultProps = {
  defaultItems: items,
  label: 'Test Label',
};

const getComponent = (props = {}) => render((
  <ComboBoxField {...defaultProps} {...props}>
    {item => <Item key={item.id}>{item.name}</Item>}
  </ComboBoxField>
));

test('renders ComboBoxField component', () => {
  getComponent();
  const input = screen.queryByRole('combobox');
  const label = screen.getByText(defaultProps.label);
  const button = screen.queryByRole('button');
  expect(input).toBeInTheDocument();
  expect(screen.queryAllByLabelText(defaultProps.label)).toEqual([input, button]);
  expect(label).toBeInTheDocument();
  expect(label).toHaveTextContent(defaultProps.label);
  expect(button).toBeInTheDocument();
});

test('should not allow custom value by default', () => {
  getComponent();
  const input = screen.queryByRole('combobox');
  expect(input).toHaveValue('');

  // type something
  userEvent.type(input, 'custom');
  // blur input
  userEvent.tab();
  expect(input).not.toHaveValue('custom');
  expect(input).toHaveValue('');
});

test('should allow custom value when prop is set', () => {
  getComponent({ hasCustomValue: true });
  const input = screen.queryByRole('combobox');
  expect(input).toHaveValue('');

  // type something
  userEvent.type(input, 'custom');
  // blur input
  userEvent.tab();
  expect(input).toHaveValue('custom');
});

test('should disable options based on disabledKeys prop', () => {
  getComponent({ disabledKeys: [items[0].id] });
  const input = screen.queryByRole('combobox');
  const button = screen.queryByRole('button');

  // Open the list by clicking on the button and ensure first option is not active
  userEvent.click(button);
  const options = screen.queryAllByRole('option');
  expect(options).toHaveLength(items.length);
  expect(options[0]).toHaveAttribute('aria-disabled', 'true');
  expect(options[0]).toHaveClass('is-disabled');

  // Expect pointer events to not work
  userEvent.click(options[0]);
  expect(input).not.toHaveValue(items[0].name);
});

test('should be able to open and navigate through the listbox by click', () => {
  getComponent();
  const button = screen.queryByRole('button');
  const input = screen.queryByRole('combobox');
  expect(screen.queryByRole('combobox')).toHaveValue('');
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  // Open the list by clicking on the button and ensure first option is not active
  userEvent.click(button);
  const options = screen.queryAllByRole('option');
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(options).toHaveLength(items.length);
  expect(input).not.toHaveAttribute('aria-activedescendant', options[0].id);
  options.forEach(opt => expect(opt).not.toHaveClass('is-focused'));

  // Ensure active styles are applied
  userEvent.hover(options[0]);
  expect(input).toHaveAttribute('aria-activedescendant', options[0].id);
  expect(options[0]).toHaveClass('is-focused');

  // Ensure option selection works
  userEvent.click(options[0]);
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(input).toHaveValue(items[0].name);
});

test('should be able to open the listbox by keyboard', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  expect(input).toHaveValue('');
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  // Open the list by hitting the down arrow key and ensure first option is active
  userEvent.tab();
  userEvent.type(input, '{arrowdown}', { skipClick: true });
  const options = screen.queryAllByRole('option');
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(options).toHaveLength(items.length);
  expect(input).toHaveAttribute('aria-activedescendant', options[0].id);
  expect(options[0]).toHaveClass('is-focused');

  // Ensure option selection works
  userEvent.type(input, '{enter}', { skipClick: true });
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('combobox')).toHaveValue(items[0].name);
});

test('should open list on focus when menuTrigger is set to use focus', () => {
  getComponent({ menuTrigger: 'focus' });
  const input = screen.getByRole('combobox');
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  // Open the list by focusing with tab
  userEvent.tab();
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(items.length);

  // blur
  userEvent.tab();
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(0);

  // focus with click
  userEvent.click(input);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(items.length);
});

test('should invoke onInputChange', () => {
  const inputValue = 'blah';
  const onInputChange = jest.fn();
  getComponent({ inputValue, onInputChange });
  const input = screen.getByRole('combobox');
  expect(input).toHaveValue(inputValue);
  expect(onInputChange).not.toHaveBeenCalled();

  userEvent.type(input, 'a');
  const newValue = `${inputValue}a`;
  expect(onInputChange).toHaveBeenNthCalledWith(1, newValue);
  // Should not have the new value since we did not update the prop and re-render
  expect(input).not.toHaveValue(newValue);
});

test('should invoke onOpenChange when isOpen is true', () => {
  const onOpenChange = jest.fn();
  getComponent({ isOpen: true, onOpenChange });
  const input = screen.queryByRole('combobox');
  const buttons = screen.queryAllByRole('button');
  const listbox = screen.queryByRole('listbox');
  expect(buttons).toHaveLength(2); // Two dismiss buttons (the combobox button is aria hidden)
  expect(listbox).toBeInTheDocument();
  expect(onOpenChange).not.toHaveBeenCalled();

  // Should fire on dismiss button click
  userEvent.click(buttons[0]);
  expect(onOpenChange).toHaveBeenNthCalledWith(1, false);

  // Should fire on outside click
  userEvent.click(global.document.body);
  expect(onOpenChange).toHaveBeenNthCalledWith(2, false);

  // Should fire on click selection
  userEvent.click(screen.queryAllByRole('option')[0]);
  expect(onOpenChange).toHaveBeenNthCalledWith(3, false);

  // Should fire on keyboard selection
  userEvent.type(input, '{arrowdown}{enter}');
  expect(onOpenChange).toHaveBeenNthCalledWith(4, false);

  // Total number of calls
  expect(onOpenChange).toHaveBeenCalledTimes(4);
});

test('should invoke onOpenChange when isOpen is false', () => {
  const onOpenChange = jest.fn();
  getComponent({ isOpen: false, onOpenChange });
  const input = screen.queryByRole('combobox');
  const button = screen.queryByRole('button');
  const listbox = screen.queryByRole('listbox');
  expect(listbox).not.toBeInTheDocument();
  expect(onOpenChange).not.toHaveBeenCalled();

  // Should fire on button click
  userEvent.click(button);
  expect(onOpenChange).toHaveBeenNthCalledWith(1, true);

  // Should fire on input change (default menuTrigger)
  userEvent.type(input, 'a');
  expect(onOpenChange).toHaveBeenNthCalledWith(2, true);

  // Should fire on keyboard interaction
  userEvent.type(input, '{arrowdown}');
  expect(onOpenChange).toHaveBeenNthCalledWith(3, true);

  // Total number of calls
  expect(onOpenChange).toHaveBeenCalledTimes(3);
});

test('should invoke onSelectionChange when selection is made', () => {
  const onSelectionChange = jest.fn();
  getComponent({ onSelectionChange });
  const input = screen.queryByRole('combobox');
  const button = screen.queryByRole('button');
  expect(onSelectionChange).not.toHaveBeenCalled();

  // Should fire on item selection click
  userEvent.click(button);
  userEvent.click(screen.queryAllByRole('option')[2]);
  expect(onSelectionChange).toHaveBeenNthCalledWith(1, items[2].id);

  // Should fire when input is cleared
  userEvent.type(input, '{selectall}{backspace}');
  expect(onSelectionChange).toHaveBeenNthCalledWith(2, null);

  // Should fire on keyboard interaction
  userEvent.type(input, '{arrowdown}{enter}');
  expect(onSelectionChange).toHaveBeenNthCalledWith(3, items[0].id);

  // Total number of calls
  expect(onSelectionChange).toHaveBeenCalledTimes(3);
});

test('should use default contains filtering', () => {
  getComponent();
  const input = screen.queryByRole('combobox');

  // Should list all without filterable input
  userEvent.type(input, '{arrowdown}');
  expect(screen.queryAllByRole('option')).toHaveLength(items.length);

  // Should list all options on default contains filter
  userEvent.type(input, 'k');
  expect(screen.queryAllByRole('option')).toHaveLength(items.length);

  // Should list no options when none match
  userEvent.type(input, 'z');
  expect(screen.queryAllByRole('option')).toHaveLength(0);
});

test('should be able to use controlled filtering', () => {
  const ComboBoxWithCustomFilter = () => {
    const { startsWith } = useFilter({ sensitivity: 'base' });
    const [filterValue, setFilterValue] = useState('');
    const filteredItems = useMemo(
      () => items.filter(item => startsWith(item.name, filterValue)),
      [items, filterValue],
    );

    return (
      <ComboBoxField
        {...defaultProps}
        items={filteredItems}
        value={filterValue}
        onInputChange={setFilterValue}
      >
        {item => <Item id={item.id}>{item.name}</Item>}
      </ComboBoxField>
    );
  };
  render(<ComboBoxWithCustomFilter />);
  const input = screen.queryByRole('combobox');

  // Should list all without filterable input
  userEvent.type(input, '{arrowdown}');
  expect(screen.queryAllByRole('option')).toHaveLength(items.length);

  // Should only list the second option
  userEvent.type(input, 'k');
  const option = screen.queryByRole('option');
  expect(option).toHaveTextContent(items[1].name);
});

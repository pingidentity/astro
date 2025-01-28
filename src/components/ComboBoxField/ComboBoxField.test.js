import React, { useState } from 'react';
import { useFilter } from '@react-aria/i18n';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ComboBoxField, Item, OverlayProvider, Section } from '../../index';
import loadingStates from '../../utils/devUtils/constants/loadingStates';
import statuses from '../../utils/devUtils/constants/statuses';
import { act, render, screen, within } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { universalFieldComponentTests } from '../../utils/testUtils/universalFormSubmitTest';

const items = [
  { name: 'Aardvark', id: '1' },
  { name: 'Kangaroo', id: '2' },
  { name: 'Snake', id: '3' },
];

const withSection = [
  {
    name: 'Animals',
    key: 'Animals',
    kids: [
      { name: 'Raccoon' },
      { name: 'Kangaroo' },
      { name: 'Opossum' },
    ],
  },
  {
    name: 'People',
    key: 'People',
    kids: [
      { name: 'Michael' },
      { name: 'Dwight' },
      { name: 'Creed' },
    ],
  },
  {
    name: null,
    key: 'fruit',
    kids: [
      { name: 'Apple' },
      { name: 'Orange' },
      { name: 'Banana' },
    ],
  },
];

const defaultProps = {
  defaultItems: items,
  label: 'Test Label',
};

const getComponent = (props = {}, { renderFn = render } = {}) => renderFn((
  <OverlayProvider>
    <ComboBoxField {...defaultProps} {...props}>
      {item => <Item {...item} key={item.id} data-id={item.name}>{item.name}</Item>}
    </ComboBoxField>
  </OverlayProvider>
));

const getComponentWithSections = (props = {}, { renderFn = render } = {}) => renderFn((
  <OverlayProvider>
    <ComboBoxField {...defaultProps} {...props} items={withSection}>
      {section => (
        <Section key={section.key} items={section.kids} title={section.name}>
          {item => <Item key={item.name}>{item.name}</Item>}
        </Section>
      )}
    </ComboBoxField>
  </OverlayProvider>
));

const ComboBoxWithCustomFilter = () => {
  const { startsWith } = useFilter({ sensitivity: 'base' });

  const [fieldState, setFieldState] = useState({
    inputValue: '',
    selectedKey: '',
    itemsList: items,
  });

  const onSelectionChange = key => {
    const selectedItem = items.filter(({ id }) => id === key);
    setFieldState({
      inputValue: selectedItem?.name,
      selectedKey: key,
      itemsList: items.filter(item => startsWith(item.name, selectedItem?.name ?? ''),
      ),
    });
  };

  const onInputChange = value => {
    setFieldState((oldValues => ({
      inputValue: value,
      selectedKey: value === '' ? null : oldValues.selectedKey,
      itemsList: items.filter(item => startsWith(item.name, value)),
    })));
  };

  const onOpenChange = (isOpen, menuTrigger) => {
    if (menuTrigger === 'manual' && isOpen) {
      setFieldState(oldValues => ({
        inputValue: oldValues.inputValue,
        selectedKey: oldValues.selectedKey,
        itemsList: items,
      }));
    }
  };

  return (
    <OverlayProvider>
      <ComboBoxField
        label="Example label"
        items={fieldState.itemsList}
        inputValue={fieldState.inputValue}
        selectedKey={fieldState.selectedKey}
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
        onOpenChange={onOpenChange}
        {...defaultProps}
      >
        {item => <Item key={item.name}>{item.name}</Item>}
      </ComboBoxField>
    </OverlayProvider>
  );
};

const ComboBoxWithAddOption = () => {
  const [options, setOptions] = useState(items);
  const [inputValue, setInputValue] = useState('');
  const [selectedKey, setSelectedKey] = useState('');

  const onSelectionChange = key => {
    if (key && !options.find(({ name }) => name === key)) {
      setOptions([...options, { key, name: key }]);
    }
    setInputValue(key);
    setSelectedKey(key);
  };

  return (
    <ComboBoxField
      label="Example label"
      defaultItems={options}
      inputValue={inputValue}
      selectedKey={selectedKey}
      onInputChange={setInputValue}
      onSelectionChange={onSelectionChange}
      hasAddOption
    >
      {item => <Item key={item.name}>{item.name}</Item>}
    </ComboBoxField>
  );
};

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
  // Both dismiss buttons should be available, but the dropdown button should be inaccessible
  expect(screen.queryAllByRole('button')).toHaveLength(2);
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

  // Option stays focused when the overlay is re-opened
  userEvent.click(button);
  expect(options[0]).toHaveClass('is-focused');
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
  expect(screen.queryByRole('option')).not.toBeInTheDocument();

  // focus with click
  userEvent.click(input);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(items.length);
});

test('should open list on click after selection when menuTrigger is set to use focus', () => {
  getComponent({ menuTrigger: 'focus' });
  const input = screen.getByRole('combobox');
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  userEvent.click(input);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();

  userEvent.click(screen.queryAllByRole('option')[0]);
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(input).toHaveFocus();

  // Need to click away first, then click back
  userEvent.click(document.body);
  userEvent.click(input);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
});

test('Item accepts a data-id and the data-id can be found in the DOM', () => {
  getComponent();
  const button = screen.queryByRole('button');
  userEvent.click(button);
  const options = screen.queryAllByRole('option');

  expect(options).toHaveLength(items.length);
  expect(options[0]).toHaveAttribute('data-id', items[0].name);
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

test('should invoke onOpenChange on button click', () => {
  const onOpenChange = jest.fn();
  getComponent({ onOpenChange, menuTrigger: 'manual' });
  const button = screen.queryByRole('button');
  const listbox = screen.queryByRole('listbox');
  expect(listbox).not.toBeInTheDocument();
  expect(onOpenChange).not.toHaveBeenCalled();

  // Should fire on button click
  userEvent.click(button);
  expect(onOpenChange).toHaveBeenNthCalledWith(1, true, 'manual');
});

test('should invoke onOpenChange on input change', () => {
  const onOpenChange = jest.fn();
  getComponent({ onOpenChange, menuTrigger: 'input' });
  const input = screen.queryByRole('combobox');
  const listbox = screen.queryByRole('listbox');
  expect(listbox).not.toBeInTheDocument();
  expect(onOpenChange).not.toHaveBeenCalled();

  // Should fire on input change (default menuTrigger)
  userEvent.type(input, 'a');
  expect(onOpenChange).toHaveBeenNthCalledWith(1, true, 'input');
});

test('should invoke onOpenChange on keyboard arrow down', () => {
  const onOpenChange = jest.fn();
  getComponent({ onOpenChange, menuTrigger: 'manual' });
  const input = screen.queryByRole('combobox');
  const listbox = screen.queryByRole('listbox');
  expect(listbox).not.toBeInTheDocument();
  expect(onOpenChange).not.toHaveBeenCalled();

  // Should fire on keyboard interaction
  userEvent.type(input, '{arrowdown}');
  expect(onOpenChange).toHaveBeenNthCalledWith(1, true, 'manual');
});

test('should invoke onOpenChange on keyboard arrow up', () => {
  const onOpenChange = jest.fn();
  getComponent({ onOpenChange, menuTrigger: 'manual' });
  const input = screen.queryByRole('combobox');
  const listbox = screen.queryByRole('listbox');
  expect(listbox).not.toBeInTheDocument();
  expect(onOpenChange).not.toHaveBeenCalled();

  // Should fire on keyboard interaction
  userEvent.type(input, '{arrowup}');
  expect(onOpenChange).toHaveBeenNthCalledWith(1, true, 'manual');
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
  userEvent.clear(input);
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
  expect(screen.queryByRole('option')).not.toBeInTheDocument();
});

test('should be able to use controlled filtering', async () => {
  let options;
  render(<ComboBoxWithCustomFilter />);
  const input = screen.queryByRole('combobox');

  // Should list all without filterable input
  userEvent.type(input, '{arrowdown}');
  options = await screen.findAllByRole('option');
  expect(options).toHaveLength(items.length);

  // Should only list the second option
  userEvent.type(input, 'k');
  options = await screen.findAllByRole('option');
  expect(options[0]).toHaveTextContent(items[1].name);
});

test('should be able to use custom default filtering', async () => {
  let options;
  const defaultFilter = (option, inputValue) => option.startsWith(inputValue);
  getComponent({ defaultFilter });
  const input = screen.queryByRole('combobox');

  // Should list all without filterable input
  userEvent.type(input, '{arrowdown}');
  options = await screen.findAllByRole('option');
  expect(options).toHaveLength(items.length);

  // Should only list the second option
  userEvent.type(input, 'K');
  options = await screen.findAllByRole('option');
  expect(options[0]).toHaveTextContent(items[1].name);
});

test('should show in input "textValue" if provided', async () => {
  const newItems = items.map(item => ({ ...item, textValue: item.id }));
  getComponent({
    items: newItems,
  });

  const input = screen.queryByRole('combobox');

  userEvent.click(input);
  const options = await screen.findAllByRole('option');

  userEvent.click(options[0]);
  expect(input).toHaveValue(newItems[0].textValue);

  // Check that on clicking again "textValue" still returning
  userEvent.click(options[0]);
  expect(input).toHaveValue(newItems[0].textValue);
});

test('option list should be opened on scroll input value', async () => {
  let options;
  const otherItems = [
    { name: 'Short item name one', id: '1' },
    { name: 'Short item name two', id: '2' },
    { name: 'Short item name three', id: '3' },
    { name: 'This is very very very long item name', id: '4' },
  ];
  getComponent({ defaultItems: otherItems });
  const input = screen.queryByRole('combobox');

  userEvent.type(input, '{arrowdown}');
  options = screen.queryAllByRole('option');
  expect(options).toHaveLength(otherItems.length);

  userEvent.type(input, 'This is very very very long item name');
  fireEvent.scroll(input, { target: { scrollX: 10 } });
  options = screen.queryAllByRole('option');
  expect(options.length).toBe(1);
  expect(options[0]).toHaveTextContent(otherItems[3].name);

  fireEvent.scroll(window, { target: { scrollX: 10 } });
  options = screen.queryAllByRole('option');
  expect(options.length).toBe(0);
});

describe('loadingState', () => {
  it('combobox should not render a loader if menu is not open', () => {
    const { rerender } = getComponent({ loadingState: loadingStates.LOADING });
    act(() => { jest.advanceTimersByTime(500); });
    // First time load will show progress bar so user can know that items are being fetched
    expect(screen.getByRole('alert')).toBeInTheDocument();

    getComponent({ loadingState: loadingStates.FILTERING }, { renderFn: rerender });

    expect(() => screen.getByRole('progressbar')).toThrow();
  });

  test('it renders a loader if menu is not open but menuTrigger is "manual"', () => {
    const { rerender } = getComponent({ loadingState: loadingStates.LOADING, menuTrigger: 'manual' });
    const input = screen.getByRole('combobox');
    expect(() => screen.getByRole('progressbar')).toThrow();

    act(() => { jest.advanceTimersByTime(500); });
    expect(() => within(input).getByRole('progressbar')).toBeTruthy();

    getComponent({ loadingState: loadingStates.FILTERING, menuTrigger: 'manual' }, { renderFn: rerender });
    expect(() => within(input).getByRole('progressbar')).toBeTruthy();

    getComponent({ loadingState: loadingStates.FILTERING }, { renderFn: rerender });
    expect(() => screen.getByRole('progressbar')).toThrow();
  });

  test('it should not render a loader until a delay of 500ms passes (loadingState: loading)', () => {
    getComponent({ loadingState: loadingStates.LOADING });
    const input = screen.getByRole('combobox');

    act(() => { jest.advanceTimersByTime(250); });
    expect(() => screen.getByRole('progressbar')).toThrow();

    act(() => { jest.advanceTimersByTime(250); });
    expect(() => within(input).getByRole('progressbar')).toBeTruthy();

    const button = screen.getByRole('button');

    userEvent.click(button);
    expect(() => within(input).getByRole('progressbar')).toBeTruthy();
  });

  test('it should not render a loader until a delay of 500ms passes and the menu is open (loadingState: filtering)', () => {
    getComponent({ loadingState: loadingStates.FILTERING });
    const input = screen.getByRole('combobox');

    act(() => { jest.advanceTimersByTime(500); });
    expect(() => screen.getByRole('progressbar')).toThrow();

    const button = screen.getByRole('button');

    userEvent.click(button);
    expect(() => within(input).getByRole('progressbar')).toBeTruthy();
  });

  test('hides the loader when loadingState changes to a non-loading state', () => {
    const { rerender } = getComponent({ loadingState: loadingStates.FILTERING });
    const input = screen.getByRole('combobox');
    const button = screen.getByRole('button');
    expect(() => screen.getByRole('progressbar')).toThrow();

    userEvent.click(button);
    act(() => { jest.advanceTimersByTime(500); });
    expect(() => within(input).getByRole('progressbar')).toBeTruthy();

    getComponent({ loadingState: loadingStates.IDLE }, { renderFn: rerender });
    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeVisible();
    expect(() => screen.getByRole('progressbar')).toThrow();
  });

  test('combobox should hide the loader when the menu closes', () => {
    getComponent({ loadingState: loadingStates.FILTERING });
    const input = screen.getByRole('combobox');
    const button = screen.getByRole('button');
    expect(() => screen.getByRole('progressbar')).toThrow();

    userEvent.click(button);
    act(() => { jest.advanceTimersByTime(500); });
    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeVisible();
    expect(() => within(input).getByRole('progressbar')).toBeTruthy();

    userEvent.click(button);
    expect(() => screen.getByRole('progressbar')).toThrow();
    expect(() => screen.getByRole('listbox')).toThrow();
  });

  test('cancels the 500ms loader delay timer if the loading finishes first', () => {
    const { rerender } = getComponent({ loadingState: loadingStates.LOADING, menuTrigger: 'manual' });
    expect(() => screen.getByRole('progressbar')).toThrow();
    act(() => { jest.advanceTimersByTime(250); });
    expect(() => screen.getByRole('progressbar')).toThrow();

    getComponent({ loadingState: loadingStates.IDLE }, { renderFn: rerender });
    act(() => { jest.advanceTimersByTime(250); });
    expect(() => screen.getByRole('progressbar')).toThrow();
  });

  test('should not reset the 500ms loader delay timer when loadingState changes from loading to filtering', () => {
    const { rerender } = getComponent({ loadingState: loadingStates.LOADING, menuTrigger: 'manual' });
    const input = screen.getByRole('combobox');

    act(() => { jest.advanceTimersByTime(250); });
    expect(() => screen.getByRole('progressbar')).toThrow();

    getComponent({ loadingState: loadingStates.FILTERING, menuTrigger: 'manual' }, { renderFn: rerender });
    expect(() => screen.getByRole('progressbar')).toThrow();
    act(() => { jest.advanceTimersByTime(250); });
    expect(() => within(input).getByRole('progressbar')).toBeTruthy();
  });

  test('combobox should reset the 500ms loader delay timer when input text changes', () => {
    getComponent({ loadingState: loadingStates.LOADING, menuTrigger: 'manual' });
    const input = screen.getByRole('combobox');

    act(() => { jest.advanceTimersByTime(250); });
    expect(() => screen.getByRole('progressbar')).toThrow();

    userEvent.type(input, 'O');
    act(() => { jest.advanceTimersByTime(250); });
    expect(() => screen.getByRole('progressbar')).toThrow();

    act(() => { jest.advanceTimersByTime(250); });
    expect(() => within(input).getByRole('progressbar')).toBeTruthy();
  });

  test('should render the loader in the listbox when loadingState="loadingMore"', () => {
    getComponent({ loadingState: loadingStates.LOADING_MORE });
    const button = screen.getByRole('button');

    expect(() => screen.getByRole('progressbar')).toThrow();

    userEvent.click(button);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeVisible();

    const loader = within(listbox).getByRole('alert');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('aria-label', 'Loading more...');
  });
});

test('two listbox can not be open at the same time', () => {
  getComponent();
  getComponent({ items: [{ name: 'Tango', id: '4' }, { name: 'Foxtrot', id: '5' }] });

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('option')).not.toBeInTheDocument();

  const [button1, button2] = screen.getAllByRole('button');

  userEvent.click(button1);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(3);
  expect(screen.queryByRole('option', { name: 'Aardvark' })).toBeInTheDocument();

  // first click closes first popover, second click opens the second popover
  userEvent.click(button2);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(2);
  expect(screen.queryByRole('option', { name: 'Tango' })).toBeInTheDocument();
});

test('should handle selecting custom option', () => {
  getComponent({ hasCustomValue: true });

  const input = screen.queryByRole('combobox');
  expect(input).toHaveValue('');

  // type something
  userEvent.type(input, 'custom');

  // set input value as selected
  userEvent.type(input, '{enter}', { skipClick: true });
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('combobox')).toHaveValue('custom');

  // blur input
  userEvent.tab();
  expect(input).toHaveValue('custom');
});

test('onSelectionChange works properly with custom value', () => {
  const onSelectionChange = jest.fn();
  getComponent({ hasCustomValue: true, onSelectionChange, onInputChange: onSelectionChange });

  const input = screen.queryByRole('combobox');
  expect(input).toHaveValue('');
  expect(onSelectionChange).not.toHaveBeenCalled();

  // Should fire when input value was typed, and enter was pressed
  userEvent.type(input, 'custom{enter}');
  expect(onSelectionChange).toHaveBeenCalledWith('custom');

  // Should fire when input is cleared
  userEvent.type(input, '{selectall}{backspace}{enter}');
  expect(onSelectionChange).toHaveBeenCalledWith('');
});

test('add option shows when "hasAddOption" is provided', () => {
  render(<ComboBoxWithAddOption />);

  const input = screen.queryByRole('combobox');
  expect(input).toHaveValue('');
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('option')).not.toBeInTheDocument();

  const inputValue = 'New value';
  userEvent.type(input, inputValue);
  expect(input).toHaveValue(inputValue);

  expect(screen.queryByRole('listbox')).toBeInTheDocument();

  const option = screen.queryByRole('option');
  expect(option).toBeInTheDocument();
  expect(option).toHaveClass('is-focused');
  expect(option).toHaveTextContent(`ADD: ${inputValue}`);
});

test('if "hasAddOption" is provided, then custom value is added to listbox on blur', () => {
  render(<ComboBoxWithAddOption />);

  const input = screen.queryByRole('combobox');
  const inputValue = 'New value';
  userEvent.type(input, inputValue);
  expect(input).toHaveValue(inputValue);

  // blur input
  userEvent.tab();
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('option')).not.toBeInTheDocument();

  userEvent.click(input);
  expect(input).toHaveValue(inputValue);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();

  const options = screen.queryAllByRole('option');
  expect(options[options.length - 1]).toHaveTextContent(inputValue);
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
  expect(input).toHaveAttribute('aria-describedby', helperTextID);
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


test('passing sections, renders separators', () => {
  getComponentWithSections();
  const button = screen.getByRole('button');
  userEvent.click(button);
  expect(screen.queryAllByRole('separator')).toHaveLength(4);
});

test('a blank title does not render', () => {
  getComponentWithSections();
  const button = screen.getByRole('button');
  userEvent.click(button);
  expect(screen.queryByText('Fruit')).not.toBeInTheDocument();
});

describe('when isReadOnly is true', () => {
  const testProp = { isReadOnly: true };

  const TEST_DEFAULT_INPUT_VALUE = 'test default input value';

  test('it does not have the show suggestions button', () => {
    getComponent(testProp);

    expect(screen.queryByRole('button', { name: `${defaultProps.label} Show suggestions` })).not.toBeInTheDocument();
  });

  test('it has attribute readonly', () => {
    getComponent(testProp);

    expect(screen.getByRole('combobox', { name: defaultProps.label })).toHaveAttribute('readonly');
  });

  test('the default selected value is selected', () => {
    testProp.defaultInputValue = TEST_DEFAULT_INPUT_VALUE;
    getComponent(testProp);

    expect(screen.getByRole('combobox', { name: defaultProps.label })).toHaveValue(TEST_DEFAULT_INPUT_VALUE);
  });

  test('the dropdown does not open when clicked', () => {
    getComponent(testProp);

    userEvent.click(screen.getByRole('combobox', { name: defaultProps.label }));

    expect(screen.queryByRole('listbox', { name: 'Test Label Suggestions' })).not.toBeInTheDocument();
  });
});

universalComponentTests({
  renderComponent: props => (
    <ComboBoxField {...defaultProps} {...props}>
      <Item key="item" data-id="item">item.name</Item>
    </ComboBoxField>
  ),
});

universalFieldComponentTests({
  renderComponent: props => (
    <ComboBoxField {...defaultProps} {...props}>
      <Item key="item" data-id="item">item.name</Item>
    </ComboBoxField>
  ),
  testValue: items[0].name,
  testLabel: defaultProps.label,
  componentType: 'ComboBoxField',
});

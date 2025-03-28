import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';

import { Item, MultivaluesField, OverlayProvider, Section } from '../../index';
import statuses from '../../utils/devUtils/constants/statuses';
import { act, fireEvent, getDefaultNormalizer, render, screen, within } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { universalFieldComponentTests } from '../../utils/testUtils/universalFormSubmitTest';

const items = [
  { id: 1, name: 'Aardvark', key: 'Aardvark' },
  { id: 2, name: 'Kangaroo', key: 'Kangaroo' },
  { id: 3, name: 'Snake', key: 'Snake' },
];

const withSection = [
  {
    name: 'Animals',
    key: 'Animals',
    children: [
      { name: 'Option A1', key: 'Option A1' },
      { name: 'Option A2', key: 'Option A2' },
    ],
  },
  {
    name: 'People',
    key: 'People',
    children: [
      { name: 'Option B1', key: 'Option B1' },
      { name: 'Option B2', key: 'Option B2' },
      { name: 'Option B3', key: 'Option B3' },
    ],
  },
];

const defaultProps = {
  items,
  label: 'Field Label',
};
const defaultSectionProps = {
  items: withSection,
  label: 'Field Label',
};

const onLoadMoreFunc = jest.fn();
const onLoadPrevFunc = jest.fn();

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

const getSectionsComponent = (props = {}, { renderFn = render } = {}) => renderFn((
  <OverlayProvider>
    <MultivaluesField {...defaultSectionProps} {...props} mode="condensed">
      {section => (
        <Section key={section.key} items={section.children} title={section.name}>
          {item => <Item key={item.name}>{item.name}</Item>}
        </Section>
      )}
    </MultivaluesField>
  </OverlayProvider>
));

const ComponentOnPrevLoad = () => {
  const initialItems = new Array(10).fill({ key: 'string', name: 'string' }).map((_item, index) => ({ name: `name: ${index}`, key: `name: ${index}`, id: index }));
  // eslint-disable-next-line no-unused-vars
  const [listItems, setListItems] = useState(initialItems);

  const onLoadMore = async () => {
    onLoadMoreFunc();
  };

  const onLoadPrev = async () => {
    onLoadPrevFunc();
  };
  return (
    <OverlayProvider>
      <MultivaluesField
        items={listItems}
        label="Field Label"
        onLoadMore={onLoadMore}
        onLoadPrev={onLoadPrev}
      >
        {item => (
          <Item key={item.key} data-id={item.name} aria-label={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </OverlayProvider>
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
  act(() => {
    userEvent.tab();
  });
  expect(input).toHaveFocus();
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  act(() => {
    input.blur();
  });
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
  act(() => {
    input.blur();
  });
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
  act(() => {
    firstOption.click();
  });
  expect(firstOption).not.toBeInTheDocument();

  const secondOption = options[1];
  act(() => {
    secondOption.click();
  });

  expect(secondOption).not.toBeInTheDocument();
});

test('updates aria attributes on option focus', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  const listbox = screen.getByRole('listbox');

  expect(input).toHaveAttribute('aria-expanded', 'true');
  expect(input).toHaveAttribute('aria-controls', listbox.id);
});

test('updates aria attributes on popover closing after options were focused', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  const listbox = screen.getByRole('listbox');

  expect(input).toHaveAttribute('aria-expanded', 'true');
  expect(input).toHaveAttribute('aria-controls', listbox.id);

  userEvent.click(document.body);
  expect(input).toHaveAttribute('aria-activedescendant', '');
  expect(input).toHaveAttribute('aria-expanded', 'false');
});

test('clicking an option renders badge with option name', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();

  const options = screen.getAllByRole('option');
  const firstOption = options[0];
  act(() => {
    firstOption.click();
  });
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
  act(() => {
    firstOption.click();
  });
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
  act(() => {
    firstOption.click();
  });
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
  act(() => {
    firstOption.click();
  });
  expect(firstOption).not.toBeInTheDocument();

  const badge = screen.getByText(items[0].name);
  expect(badge).toBeInTheDocument();
  const { nextSibling: deleteButton } = badge;
  act(() => {
    deleteButton.click();
  });
  expect(badge).not.toBeInTheDocument();

  act(() => {
    input.blur();
  });
  act(() => {
    input.focus();
  });

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
  act(() => {
    firstOption.click();
  });
  expect(firstOption).not.toBeInTheDocument();

  const secondOption = options[1];
  act(() => {
    secondOption.click();
  });
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
  act(() => {
    firstOption.click();
  });

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

  userEvent.type(input, '{enter}');
  expect(input).toHaveValue('');
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
  act(() => {
    firstOption.click();
  });

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
  act(() => {
    firstOption.click();
  });
  act(() => {
    secondOption.click();
  });

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

test('pressing Esc should clear the input', () => {
  getComponent();

  const input = screen.getByRole('combobox');
  expect(input).toHaveValue('');

  const value = 'custom';
  userEvent.type(input, value);
  userEvent.type(input, '{esc}');

  expect(screen.queryByText(value)).not.toBeInTheDocument();
  expect(input).toHaveValue('');
  expect(input).toHaveFocus();

  userEvent.type(input, 'Aardvark');
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
});

test('should clear the input text onBlur', () => {
  getComponent();

  const input = screen.getByRole('combobox');
  expect(input).toHaveValue('');

  const value = 'custom';
  userEvent.type(input, value);
  userEvent.tab();

  expect(screen.queryByText(value)).not.toBeInTheDocument();
  expect(input).toHaveValue('');
});

test('should clear the input text onBlur and enter when a single filter result is showing', () => {
  getComponent();

  const input = screen.getByRole('combobox');
  expect(input).toHaveValue('');

  const value = 'Snake';
  userEvent.type(input, value);

  const listbox = screen.getByRole('listbox');
  expect(listbox).toBeInTheDocument();
  const options = within(listbox).getAllByRole('option');
  expect(options.length).toBe(1);

  userEvent.tab();

  expect(screen.queryByText(value)).not.toBeInTheDocument();
  expect(input).toHaveValue('');

  userEvent.type(input, value);
  expect(options.length).toBe(1);
  userEvent.type(input, '{enter}', { skipClick: true });

  expect(input).toHaveValue('');
});

test('in non-restrictive mode the partial string values should be accepted', () => {
  const itemsWithDuplicatePartialString = [
    { id: 1, name: 'echo:read', key: 'echo:read' },
    { id: 2, name: 'echo:write', key: 'echo:write' },
    { id: 3, name: 'echo:delete', key: 'echo:delete' },
  ];
  getComponent({ mode: 'non-restrictive', items: itemsWithDuplicatePartialString });

  const input = screen.getByRole('combobox');
  expect(input).toHaveValue('');

  const value = 'echo:r';
  userEvent.type(input, value);
  userEvent.type(input, '{enter}');
  expect(input).toHaveValue('');
  expect(screen.queryByText(value)).toBeInTheDocument();

  userEvent.type(input, value);
  userEvent.type(input, '{enter}');
  expect(input).not.toHaveValue('');
  expect(input).toHaveValue(value);
});

test('in condensed mode, hasNoSelectAll hides the select all button', () => {
  getComponent({ mode: 'condensed', hasNoSelectAll: true });

  userEvent.tab();

  const buttons = screen.getAllByRole('button');
  const button = buttons[1];
  expect(button).not.toHaveTextContent('Select All');
});

test('in condensed mode selects and deselects ', () => {
  getComponent({ mode: 'condensed' });

  userEvent.tab();

  const listbox = screen.getByRole('listbox');
  const options = within(listbox).getAllByRole('option');
  const firstOption = options[0];
  const buttons = screen.getAllByRole('button');
  const button = buttons[1];
  expect(button).toHaveTextContent('Select All');
  act(() => {
    button.click();
  });

  expect(button).toHaveTextContent('Deselect All');

  expect(screen.getByText('All Selected')).toBeInTheDocument();

  act(() => {
    firstOption.click();
  });
  expect(button).toHaveTextContent('Select All');
  expect(screen.getByText('2 Selected')).toBeInTheDocument();

  act(() => {
    button.click();
  });
  expect(button).toHaveTextContent('Deselect All');
  act(() => {
    button.click();
  });
  expect(button).toHaveTextContent('Select All');
});

test('in condensed mode "onSelectionChange" is called', () => {
  const onSelectionChange = jest.fn();
  getComponent({ mode: 'condensed', onSelectionChange });
  const input = screen.getByRole('combobox');
  const value = 'Aardvark';
  userEvent.type(input, value);
  const option = within(screen.getByRole('listbox')).getByRole('option');
  userEvent.click(option);
  expect(screen.getByText('1 Selected')).toBeInTheDocument();

  expect(onSelectionChange).toBeCalledTimes(1);
  expect(onSelectionChange.mock.calls[0][0].has(value)).toBeTruthy();
});

test('opening and closing listbox fires "onOpenChange" in condensed mode', () => {
  const onOpenChange = jest.fn();
  getComponent({ mode: 'condensed', onOpenChange });
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(onOpenChange).toHaveBeenCalledWith(true);
  act(() => {
    input.blur();
  });
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(onOpenChange).toHaveBeenCalledWith(false);
});

test('selected keys in condensed mode ', () => {
  getComponent({ mode: 'condensed', selectedKeys: [items[1].key, items[2].key] });

  const listbox = screen.queryByRole('listbox');
  expect(listbox).not.toBeInTheDocument();

  expect(screen.getByText('2 Selected')).toBeInTheDocument();
});

test('default selected keys in condensed mode ', () => {
  getComponent({ mode: 'condensed', defaultSelectedKeys: [items[1].key, items[2].key] });

  const listbox = screen.queryByRole('listbox');
  expect(listbox).not.toBeInTheDocument();

  expect(screen.getByText('2 Selected')).toBeInTheDocument();
});

test('onInputChange is called in condensed mode ', () => {
  const onInputChange = jest.fn();
  getComponent({ mode: 'condensed', onInputChange });

  const input = screen.getByRole('combobox');
  const value = 'Aardvark';
  userEvent.type(input, value);

  const listbox = screen.getByRole('listbox');
  expect(listbox).toBeInTheDocument();

  const options = within(listbox).getAllByRole('option');
  expect(options.length).toBe(1);

  expect(onInputChange).toBeCalledTimes(value.length);
  expect(onInputChange).toHaveBeenCalledWith(value);
});

test('opens listbox on focus and fires "onFocus', () => {
  const onFocus = jest.fn();
  getComponent({ mode: 'condensed', onFocus });
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
  getComponent({ mode: 'condensed', onBlur });
  const input = screen.getByRole('combobox');
  userEvent.tab();
  expect(input).toHaveFocus();
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  act(() => {
    input.blur();
  });
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(onBlur).toBeCalled();
});

test('list and button are keyboard accessible', () => {
  getComponent({ mode: 'condensed' });

  userEvent.tab();

  const listbox = screen.getByRole('listbox');
  const options = within(listbox).getAllByRole('option');
  const firstOption = options[0];
  const secondOption = options[1];
  const buttons = screen.getAllByRole('button');
  const button = buttons[1];

  userEvent.tab();
  expect(button).toHaveFocus();

  userEvent.tab();
  expect(firstOption).toHaveFocus();

  userEvent.type(firstOption, '{arrowdown}', { skipClick: true });
  expect(secondOption).toHaveFocus();

  userEvent.type(secondOption, '{esc}', { skipClick: true });
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});

test('popover closes on input blur', () => {
  getComponent({ mode: 'condensed' });

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('option')).not.toBeInTheDocument();

  const input = screen.getByRole('combobox');

  userEvent.click(input);
  const listbox = screen.getByRole('listbox');
  const options = within(listbox).getAllByRole('option');
  const checkboxes = within(listbox).getAllByRole('img');
  expect(checkboxes.length).toBe(3);

  const secondOption = options[1];
  act(() => {
    secondOption.click();
  });

  const value = 'Aardvark';
  userEvent.type(input, value);

  userEvent.click(document.body);
  expect(input).toHaveValue('');
  expect(listbox).not.toBeInTheDocument();
});

test('trigger button handles popover open and close in condensed', () => {
  getComponent({ mode: 'condensed' });

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  const input = screen.getByRole('combobox');

  userEvent.click(screen.getAllByRole('button')[0]);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(input).toHaveFocus();
  userEvent.tab();

  fireEvent.click(screen.getAllByRole('button')[0]);
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});

test('should render items with sections passed in props', () => {
  getSectionsComponent();
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('option')).not.toBeInTheDocument();

  const input = screen.getByRole('combobox');

  userEvent.click(input);
  expect(screen.getAllByRole('group')).toHaveLength(2);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(5);
});

test('should render the separators', () => {
  getSectionsComponent();

  const input = screen.getByRole('combobox');

  userEvent.click(input);
  expect(screen.queryAllByRole('separator')).toHaveLength(3);
  const groups = screen.getAllByRole('group');
  expect(groups).toHaveLength(2);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(5);

  groups.forEach((group, index) => {
    expect(() => within(group).getByText(withSection[index].name));
    const itemOpt = withSection[index].options;
    if (Array.isArray(itemOpt)) {
      itemOpt.forEach(opt => (
        expect(() => within(group).getByText(opt.name))
      ));
    }
  });
});

test('escape focus delegate calls correct functions if anything else is pressed', () => {
  render(<ComponentOnPrevLoad />);
  userEvent.tab();
  const listBox = screen.getAllByRole('listbox');
  fireEvent.scroll(listBox[0], { target: { scrollY: 450 } });
  expect(onLoadMoreFunc).toHaveBeenCalled();
  fireEvent.scroll(listBox[0], { target: { scrollY: 0 } });
  expect(onLoadPrevFunc).toHaveBeenCalled();
});

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <OverlayProvider>
      <MultivaluesField {...defaultProps} {...props}>
        {item => <Item key={item.key} data-id={item.name}>{item.name}</Item>}
      </MultivaluesField>
    </OverlayProvider>
  ),
});

universalFieldComponentTests({
  renderComponent: props => (
    <OverlayProvider>
      <MultivaluesField {...defaultProps} {...props}>
        {item => <Item key={item.key} data-id={item.name}>{item.name}</Item>}
      </MultivaluesField>
    </OverlayProvider>
  ),
  testValue: items[0].name,
  testLabel: defaultProps.label,
  componentType: 'MultivaluesField',
});

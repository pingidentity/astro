import React from 'react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Box } from '../../index';
import { CheckboxFieldGroupItemProps, CheckboxFieldGroupProps } from '../../types';
import { act, fireEvent, render, screen, within } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import { CheckboxFieldGroup, CheckboxFieldGroupItem } from '.';

const groupLabel = 'Pets';
const values = ['dogs', 'cats', 'dragons'];

const longLabel = 'A very long label that wraps within the available group width';

type ItemConfig = CheckboxFieldGroupItemProps & { value: string; label: string };

const defaultItems: ItemConfig[] = values.map(value => ({ value, label: value }));

beforeEach(() => {
  jest.useRealTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

const renderGroup = (
  groupProps: Partial<CheckboxFieldGroupProps> = {},
  itemConfigs: ItemConfig[] = defaultItems,
  options?: RenderOptions,
) => render(
  <CheckboxFieldGroup label={groupLabel} {...groupProps}>
    {itemConfigs.map(({ value, label, ...itemProps }) => (
      <CheckboxFieldGroupItem key={value} value={value} label={label} {...itemProps} />
    ))}
  </CheckboxFieldGroup>,
  options,
);

universalComponentTests({
  renderComponent: props => (
    <CheckboxFieldGroup label={groupLabel} {...props}>
      <CheckboxFieldGroupItem value={values[0]} label="Dogs" />
    </CheckboxFieldGroup>
  ),
});

test.each([
  ['default', {}],
  ['required', { isRequired: true }],
  ['helper and error', {
    helperText: 'Select at least one pet',
    errorMessage: 'A pet selection is required',
    isInvalid: true,
  }],
  ['disabled', { isDisabled: true }],
  ['read-only', { isReadOnly: true }],
  ['horizontal', { orientation: 'horizontal' as const }],
])('has no accessibility violations for the %s state', async (_state, groupProps) => {
  const { container } = renderGroup(groupProps);
  expect(await axe(container)).toHaveNoViolations();
});

test('renders a labelled group and individually labelled checkbox items', () => {
  renderGroup();

  const group = screen.getByRole('group', { name: groupLabel });
  const groupLabelElement = screen.getByText(groupLabel);
  expect(group).toHaveAttribute('aria-labelledby', groupLabelElement.id);
  expect(screen.getByRole('checkbox', { name: 'dogs' })).toBeInTheDocument();
  expect(screen.getByRole('checkbox', { name: 'cats' })).toBeInTheDocument();
});

test('toggles multiple items and reports the next selected array', async () => {
  const onChange = jest.fn();
  renderGroup({ onChange });
  const checkboxes = screen.getAllByRole('checkbox');

  await userEvent.click(checkboxes[0]);
  await userEvent.click(checkboxes[1]);
  await userEvent.click(checkboxes[0]);

  expect(onChange).toHaveBeenNthCalledWith(1, [values[0]]);
  expect(onChange).toHaveBeenNthCalledWith(2, [values[0], values[1]]);
  expect(onChange).toHaveBeenNthCalledWith(3, [values[1]]);
  expect(checkboxes[0]).not.toBeChecked();
  expect(checkboxes[1]).toBeChecked();
});

test('supports controlled selection without changing until the value prop changes', async () => {
  const onChange = jest.fn();
  renderGroup({ value: [values[0]], onChange });
  const checkboxes = screen.getAllByRole('checkbox');

  expect(checkboxes[0]).toBeChecked();
  await userEvent.click(checkboxes[1]);

  expect(onChange).toHaveBeenCalledWith([values[0], values[1]]);
  expect(checkboxes[0]).toBeChecked();
  expect(checkboxes[1]).not.toBeChecked();
});

test('supports an uncontrolled default selection', async () => {
  renderGroup({ defaultValue: [values[0]] });
  const checkboxes = screen.getAllByRole('checkbox');

  expect(checkboxes[0]).toBeChecked();
  await userEvent.click(checkboxes[1]);
  expect(checkboxes[0]).toBeChecked();
  expect(checkboxes[1]).toBeChecked();
});

test('disabled group and items ignore clicks and Space without changing selection', async () => {
  const groupOnChange = jest.fn();
  const { unmount } = renderGroup({
    defaultValue: [values[0]],
    isDisabled: true,
    onChange: groupOnChange,
  });
  const groupCheckboxes = screen.getAllByRole('checkbox');
  groupCheckboxes.forEach(checkbox => expect(checkbox).toBeDisabled());
  const groupItem = groupCheckboxes[0].closest('[data-pendo-id="CheckboxFieldGroupItem"]') as HTMLElement;
  expect(groupItem).toHaveStyleRule('opacity', '0.65', { target: '.is-disabled' });
  await userEvent.click(groupCheckboxes[0]);
  await userEvent.type(groupCheckboxes[0], '{space}');
  expect(groupCheckboxes[0]).toBeChecked();
  expect(groupOnChange).not.toHaveBeenCalled();
  unmount();

  const itemOnChange = jest.fn();
  const { container } = renderGroup({ defaultValue: [values[1]], onChange: itemOnChange }, [
    defaultItems[0],
    { ...defaultItems[1], isDisabled: true },
  ]);
  const itemCheckboxes = within(container).getAllByRole('checkbox');
  expect(itemCheckboxes[0]).toBeEnabled();
  expect(itemCheckboxes[1]).toBeDisabled();
  const itemContainer = itemCheckboxes[1].closest('[data-pendo-id="CheckboxFieldGroupItem"]') as HTMLElement;
  expect(itemContainer).toHaveStyleRule('opacity', '0.65', { target: '.is-disabled' });
  // The base Astro theme resolves space.md to 15px; the rule is serialized on
  // the label's emotion class as a `div` descendant rule.
  expect(itemContainer.querySelector('label')).toHaveStyleRule('margin-right', '15px', { target: 'div' });
  expect(itemCheckboxes[1]).toBeChecked();
  await userEvent.click(itemCheckboxes[1]);
  await userEvent.type(itemCheckboxes[1], '{space}');
  expect(itemCheckboxes[1]).toBeChecked();
  expect(itemOnChange).not.toHaveBeenCalled();
});

test('keeps a read-only group focusable without changing selection or invoking onChange', async () => {
  const onChange = jest.fn();
  renderGroup({ isReadOnly: true, onChange });
  const checkboxes = screen.getAllByRole('checkbox');
  expect(screen.getByRole('group', { name: groupLabel })).toBeInTheDocument();

  expect(checkboxes[0]).toHaveAttribute('aria-readonly', 'true');
  const readOnlyItem = checkboxes[0].closest('[data-pendo-id="CheckboxFieldGroupItem"]') as HTMLElement;
  expect(readOnlyItem).toHaveStyleRule('opacity', '0.65', { target: '.is-read-only' });
  await userEvent.tab();
  expect(checkboxes[0]).toHaveFocus();
  await userEvent.click(checkboxes[0]);
  await userEvent.type(checkboxes[0], '{space}');
  expect(checkboxes[0]).not.toBeChecked();
  expect(onChange).not.toHaveBeenCalled();
  await userEvent.tab();
  expect(checkboxes[1]).toHaveFocus();
  await userEvent.tab({ shift: true });
  expect(checkboxes[0]).toHaveFocus();
});

test('exposes required and invalid semantics and associates helper and error messages', () => {
  const helperText = 'Select at least one pet';
  const errorMessage = 'A pet selection is required';
  renderGroup({
    helperText,
    errorMessage,
    isInvalid: true,
    isRequired: true,
  });

  const group = screen.getByRole('group', { name: new RegExp(groupLabel) });
  const helper = screen.getByText(helperText);
  const error = screen.getByText(errorMessage);
  const describedBy = group.getAttribute('aria-describedby')?.split(' ') || [];
  const checkboxes = screen.getAllByRole('checkbox');

  expect(checkboxes).toHaveLength(defaultItems.length);
  checkboxes.forEach(checkbox => {
    expect(checkbox).toBeRequired();
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox.getAttribute('aria-describedby')?.split(' ')).toEqual(
      expect.arrayContaining([helper.id, error.id]),
    );
  });
  expect(describedBy).toEqual(expect.arrayContaining([helper.id, error.id]));
});

test('associates item helper text with its checkbox', () => {
  const itemHelper = 'Dogs are friendly';
  renderGroup({}, [{ ...defaultItems[0], helperText: itemHelper }]);

  const checkbox = screen.getByRole('checkbox', { name: values[0] });
  const helper = screen.getByText(itemHelper);
  expect(checkbox.getAttribute('aria-describedby')?.split(' ')).toContain(helper.id);
});

test('uses native validity for an empty required group and selected checkbox', async () => {
  render(
    <form aria-label="Pet form">
      <CheckboxFieldGroup
        label={groupLabel}
        isRequired
        validationBehavior="native"
      >
        {defaultItems.map(({ value, label }) => (
          <CheckboxFieldGroupItem key={value} value={value} label={label} />
        ))}
      </CheckboxFieldGroup>
    </form>,
  );
  const form = screen.getByRole('form', { name: 'Pet form' }) as HTMLFormElement;
  const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];

  // checkValidity dispatches native invalid events that update React Aria validation state.
  let initialFormValidity = false;
  act(() => {
    initialFormValidity = form.checkValidity();
  });
  expect(initialFormValidity).toBe(false);
  expect(checkboxes[0].validity.valid).toBe(false);

  /* eslint-disable-next-line testing-library/no-unnecessary-act */
  act(() => {
    fireEvent.click(checkboxes[0]);
  });

  expect(checkboxes[0]).toBeChecked();
  // React Aria applies native required to each item; only the selected input is valid.
  expect(checkboxes[0].validity.valid).toBe(true);
});

test('supports horizontal and vertical layout classes and long labels', () => {
  const { container } = renderGroup({ orientation: 'vertical' });
  const verticalGroup = within(container).getByRole('group', { name: groupLabel });
  const verticalItems = verticalGroup.children[1];
  expect(verticalGroup).not.toHaveClass('is-horizontal');
  expect(verticalItems).not.toHaveClass('is-horizontal');
  expect(verticalItems).toHaveStyleRule('flex-direction', 'column');
  expect(verticalItems).toHaveStyleRule('gap', '5px');

  const { container: horizontalContainer } = render(
    <Box
      data-testid="constrained-group-container"
      sx={{ width: '100%', maxWidth: '240px', overflowX: 'hidden' }}
    >
      <CheckboxFieldGroup label={groupLabel} orientation="horizontal">
        <CheckboxFieldGroupItem value={values[0]} label={longLabel} />
        <CheckboxFieldGroupItem value={values[1]} label={values[1]} />
      </CheckboxFieldGroup>
    </Box>,
  );
  const horizontalGroup = within(horizontalContainer).getByRole('group', { name: groupLabel });
  const constrainedContainer = horizontalGroup.parentElement as HTMLElement;
  const horizontalItems = horizontalGroup.children[1] as HTMLElement;
  const longLabelElement = within(horizontalGroup).getByText(longLabel);
  expect(constrainedContainer).toHaveStyleRule('width', '100%');
  expect(constrainedContainer).toHaveStyleRule('max-width', '240px');
  expect(constrainedContainer).toHaveStyleRule('overflow-x', 'hidden');
  expect(horizontalGroup).toHaveClass('is-horizontal');
  expect(horizontalGroup).toHaveStyleRule('width', '100%');
  expect(horizontalItems).toBeInTheDocument();
  expect(horizontalItems).toHaveClass('is-horizontal');
  expect(horizontalItems).toHaveStyleRule('width', '100%');
  expect(horizontalItems).toHaveStyleRule('flex-wrap', 'wrap', { target: '.is-horizontal' });
  expect(longLabelElement).toHaveStyleRule('max-width', '100%');
  expect(longLabelElement).toHaveStyleRule('flex-wrap', 'wrap');
  expect(horizontalItems.scrollWidth).toBeLessThanOrEqual(horizontalItems.clientWidth);
});

test('supports keyboard Space toggling through the real checkbox input', async () => {
  renderGroup();
  const checkbox = screen.getAllByRole('checkbox')[0];

  await userEvent.tab();
  expect(checkbox).toHaveFocus();
  await userEvent.type(checkbox, '{space}');
  expect(checkbox).toBeChecked();
});

test('renders group and item contents inside the expected group subtree', () => {
  const { container } = renderGroup();
  const group = within(container).getByRole('group', { name: groupLabel });
  expect(within(group).getAllByRole('checkbox')).toHaveLength(defaultItems.length);
});

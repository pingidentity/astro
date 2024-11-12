import React, { forwardRef } from 'react';
import userEvent from '@testing-library/user-event';

import { useSelectField } from '../../hooks';
import { UseSelectFieldProps } from '../../hooks/useSelectField/useSelectField';
import { Item } from '../../index';
import { SelectFieldBaseProps } from '../../types/selectField';
import { modes } from '../../utils/devUtils/constants/labelModes';
import statuses from '../../utils/devUtils/constants/statuses';
import { render, screen, within } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import SelectFieldBase from './SelectFieldBase';

const items = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
const testId = 'test-dropdown';
const controlTestId = `${testId}-input`;
const testValue = 'test';
const defaultProps = {
  align: 'start',
  direction: 'bottom',
  label: 'testLabel',
  'data-testid': testId,
  controlProps: {
    'data-testid': controlTestId,
  },
  value: testValue,
  items,
};

interface ExampleProps {
  align: string,
  direction: string,
  label: string
  'data-testid': string,
  controlProps: {
    'data-testid': string,
  }
  value: string
  items: { name: string }[]
}

const SelectFieldWrapper = forwardRef<HTMLDivElement, ExampleProps>((props, ref) => {
  const { ...selectFieldProps } = useSelectField(props as UseSelectFieldProps<object>, ref);
  return <SelectFieldBase {...props} {...selectFieldProps} />;
});

const getComponent = (props = {}, { renderFn = render } = {}) => renderFn(
  <SelectFieldWrapper {...defaultProps} {...props}>
    {item => (
      <Item key={item.name} data-id={item.name}>
        {item.name}
      </Item>
    )}
  </SelectFieldWrapper>,
);

const onSelectionChange = jest.fn();

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
  onSelectionChange.mockClear();
});

afterAll(() => {
  jest.restoreAllMocks();
});

test('default select field', () => {
  getComponent();
  const container = screen.getByTestId(testId);
  const inputs = screen.getAllByLabelText(defaultProps.label);
  const hiddenInput = inputs[0];
  const visibleInput = inputs[1];
  const labels = screen.getAllByText(defaultProps.label);
  const visibleLabel = labels[0];
  const hiddenLabel = labels[1];

  expect(container).toBeInstanceOf(HTMLDivElement);
  expect(hiddenInput).toBeInstanceOf(HTMLSelectElement);
  expect(visibleInput).toBeInstanceOf(HTMLButtonElement);
  expect(hiddenLabel).toBeInstanceOf(HTMLLabelElement);
  expect(visibleLabel).toBeInstanceOf(HTMLLabelElement);
  expect(container).toBeInTheDocument();
  expect(hiddenInput).toBeInTheDocument();
  expect(visibleInput).toBeInTheDocument();
  expect(hiddenLabel).toBeInTheDocument();
  expect(visibleLabel).toBeInTheDocument();

  // jest-dom .toBeVisible does not take into account aria-hidden
  /* eslint-disable testing-library/no-node-access */
  expect(hiddenInput.closest('[aria-hidden="true"]')).not.toBeNull();
  expect(visibleInput.closest('[aria-hidden="true"]')).toBeNull();
  expect(hiddenLabel.closest('[aria-hidden="true"]')).not.toBeNull();
  expect(visibleLabel.closest('[aria-hidden="true"]')).toBeNull();
  /* eslint-enable testing-library/no-node-access */
});

test('control props work for visible button control', () => {
  getComponent();
  const inputs = screen.getAllByLabelText(defaultProps.label);
  const visibleInput = inputs[1];

  expect(screen.getByTestId(`${testId}-input`)).toBe(visibleInput);
});

test('isDefaultOpen prop', () => {
  getComponent({ isDefaultOpen: true });
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
});

test('should disable the label and control when isDisabled is true', () => {
  getComponent({ isDisabled: true });
  expect(screen.getAllByText(defaultProps.label)[0]).toHaveClass('is-disabled');
  expect(screen.getByTestId(controlTestId)).toHaveClass('is-disabled');
});

test('select field with helper text', () => {
  const helperText = 'some text';
  getComponent({ helperText, status: statuses.ERROR });
  const fieldHelperText = screen.getByText(helperText);
  expect(fieldHelperText).toBeInTheDocument();
  expect(fieldHelperText).toHaveClass(`is-${statuses.ERROR}`);
});

test("label floats after user's interacting", () => {
  getComponent({ labelMode: modes.FLOAT, value: '' });
  const textAreaContainer = screen.getByTestId(testId);
  expect(textAreaContainer).not.toHaveClass('is-float-label-active');
  userEvent.tab();
  expect(textAreaContainer).toHaveClass('is-float-label');
});

test('clicking on the visible button opens the popuplist', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('option')).not.toBeInTheDocument();

  if (button) {
    userEvent.click(button);
  }
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(3);
});

test('clicking on an option then renders its text in the button', () => {
  const defaultText = 'click me';
  const placeholder = null;
  getComponent({ defaultText, placeholder });
  const button = screen.getByRole('button');
  expect(button).toHaveTextContent(defaultText);

  userEvent.click(button);
  const options = screen.queryAllByRole('option');
  userEvent.click(options[0]);
  expect(button).toHaveTextContent(items[0].name);
});

test('hovering an option applies correct styles', () => {
  getComponent();
  const button = screen.getByRole('button');

  userEvent.click(button);
  const options = screen.queryAllByRole('option');
  expect(options[0]).not.toHaveClass('is-focused');
  userEvent.hover(options[0]);
  expect(options[0]).toHaveClass('is-focused');
});

test('onOpenChange prop for field', () => {
  const onOpenChange = jest.fn();
  getComponent({ onOpenChange });
  const button = screen.getByRole('button');
  expect(onOpenChange).not.toHaveBeenCalled();

  userEvent.click(button);
  expect(onOpenChange).toHaveBeenNthCalledWith(1, true);
  userEvent.click(button);
  expect(onOpenChange).toHaveBeenNthCalledWith(2, false);
});

test('onSelectionChange prop for field', () => {
  getComponent({ onSelectionChange });
  const button = screen.getByRole('button');
  expect(onSelectionChange).not.toHaveBeenCalled();

  userEvent.click(button);
  userEvent.click(screen.queryAllByRole('option')[0]);
  expect(onSelectionChange).toHaveBeenNthCalledWith(1, 'a');
  userEvent.click(button);
  userEvent.click(screen.queryAllByRole('option')[1]);
  expect(onSelectionChange).toHaveBeenNthCalledWith(2, 'b');
});

test('selectedKey for controlled select field', () => {
  getComponent({ selectedKey: 'b' });
  const button = screen.getByRole('button');
  expect(button).toHaveTextContent('b');

  userEvent.click(button);
  expect(screen.queryAllByRole('option')[0]).not.toHaveClass('is-selected');
  expect(screen.queryAllByRole('option')[1]).toHaveClass('is-selected');
  expect(screen.queryAllByRole('option')[2]).not.toHaveClass('is-selected');
});

test('isRequired prop for select field', () => {
  getComponent({ isRequired: true });
  const labels = screen.getAllByText(defaultProps.label);
  const visibleLabel = labels[0];
  expect(visibleLabel).toHaveTextContent('testLabel');
});

test('clicking the visually hidden dismiss buttons close the listbox popup', () => {
  getComponent({ isDefaultOpen: true });
  expect(screen.queryByRole('listbox')).toBeInTheDocument();

  // Click first dismiss button
  userEvent.click(screen.getAllByLabelText('Dismiss')[0]);
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  // Click second dismiss button
  getComponent({ isDefaultOpen: true });
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  userEvent.click(screen.getAllByLabelText('Dismiss')[1]);
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});

test('clicking outside of the listbox popup closes it', () => {
  getComponent({ isDefaultOpen: true });
  expect(screen.queryByRole('listbox')).toBeInTheDocument();

  userEvent.click(global.document.body);
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});

test('two listbox can not be open at the same time', () => {
  getComponent({ items: [{ name: 'Alpha' }, { name: 'Bravo' }] });
  getComponent({ items: [{ name: 'Whiskey' }, { name: 'Tango' }, { name: 'Foxtrot' }] });
  const selectfields = screen.getAllByTestId(testId);
  expect(selectfields).toHaveLength(2);

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('option')).not.toBeInTheDocument();

  const [button1, button2] = screen.getAllByRole('button');

  userEvent.click(button1);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(2);
  expect(screen.queryByRole('option', { name: 'Alpha' })).toBeInTheDocument();

  userEvent.click(button2);
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('option')).not.toBeInTheDocument();

  userEvent.click(button2);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(3);
  expect(screen.queryByRole('option', { name: 'Whiskey' })).toBeInTheDocument();
});

test('Item accepts a data-id and the data-id can be found in the DOM', () => {
  getComponent();
  const button = screen.queryByRole('button');
  expect(button).toBeInTheDocument();
  if (button) {
    userEvent.click(button);
  }
  const options = screen.queryAllByRole('option');

  expect(options).toHaveLength(items.length);
  expect(options[0]).toHaveAttribute('data-id', items[0].name);
});

describe('async loading', () => {
  test('displays a loader while loading', async () => {
    const { rerender } = getComponent({ items: [], isLoading: true });

    const button = screen.getByRole('button');
    const loader = within(button).getByRole('alert');
    expect(loader).toHaveAttribute('aria-label', 'Loading in progress');
    expect(loader).not.toHaveAttribute('aria-valuenow');

    getComponent({ items, isLoading: false }, { renderFn: rerender } as {
      renderFn: (ui: React.ReactElement<unknown, string |
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        React.JSXElementConstructor<unknown>>) => any
    });

    expect(() => screen.getByRole('alert')).toThrow();
  });

  test('displays a loader inside the listbox when loading more', () => {
    const newItems = [{ name: 'Foo' }, { name: 'Bar' }];
    const { rerender } = getComponent({ items: newItems, isLoading: true });

    const button = screen.getByRole('button');
    userEvent.click(button);

    const listbox = screen.getByRole('listbox');
    let options = within(listbox).getAllByRole('option');
    expect(options.length).toBe(2);

    const loader = within(listbox).getByRole('alert');
    expect(loader).toHaveAttribute('aria-label', 'Loading more...');
    expect(loader).not.toHaveAttribute('aria-valuenow');

    getComponent({ items: newItems }, { renderFn: rerender } as {
      renderFn: (ui: React.ReactElement<unknown, string |
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        React.JSXElementConstructor<unknown>>) => any
    });

    options = within(listbox).getAllByRole('option');
    expect(options.length).toBe(2);
    expect(loader).not.toBeInTheDocument();
  });
});

test('form wrapper will have default max label column width when no custom width set', () => {
  const labelMode = 'left';
  getComponent({ labelMode });
  const textAreaContainer = screen.getByTestId(testId);
  expect(textAreaContainer).toHaveStyle('grid-template-columns: 40% auto');
});

test('form wrapper will have a max label column width when custom width set', () => {
  const labelMode = 'left';
  const containerProps = { sx: { gridTemplateColumns: '120px auto' } };
  getComponent({ labelMode, containerProps });
  const textAreaContainer = screen.getByTestId(testId);
  expect(textAreaContainer).toHaveStyle('grid-template-columns: 120px auto');
});

test('passing helper text should display it and correct aria attributes on input', () => {
  const testHelperText = 'testHelperText';
  getComponent({ helperText: testHelperText, status: statuses.ERROR });
  const helper = screen.getByText(testHelperText);
  expect(helper).toBeInTheDocument();
  expect(helper).toHaveClass(`is-${statuses.ERROR}`);

  const visibleInput = screen.getAllByLabelText(defaultProps.label)[1];

  const helperTextID = helper.getAttribute('id');
  expect(visibleInput).toHaveAttribute('aria-describedby', helperTextID);
});

test('popover closes on button blur', () => {
  getComponent();

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('option')).not.toBeInTheDocument();

  const button = screen.getByRole('button');

  userEvent.click(button);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(3);
  expect(screen.queryByRole('option', { name: 'a' })).toBeInTheDocument();

  userEvent.click(document.body);
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('option')).not.toBeInTheDocument();
});

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <SelectFieldWrapper {...defaultProps} {...props}>
      {item => (
        <Item key={item.name} data-id={item.name}>
          {item.name}
        </Item>
      )}
    </SelectFieldWrapper>
  ),
});

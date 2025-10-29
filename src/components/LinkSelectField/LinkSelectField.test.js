import React from 'react';
import userEvent from '@testing-library/user-event';

import { Item, LinkSelectField } from '../../index';
import statuses from '../../utils/devUtils/constants/statuses';
import { render, screen, within } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { universalFieldComponentTests } from '../../utils/testUtils/universalFormSubmitTest';

const items = [
  { name: 'a' },
  { name: 'b' },
  { name: 'c' },
];
const testId = 'test-dropdown';
const controlTestId = `${testId}-input`;
const testValue = 'test';
const defaultProps = {
  label: 'testLabel',
  'data-testid': testId,
  controlProps: {
    'data-testid': controlTestId,
  },
  value: testValue,
  items,
};

const getComponent = (props = {}, { renderFn = render } = {}) => renderFn((
  <LinkSelectField {...defaultProps} {...props}>
    {item => <Item key={item.name}>{item.name}</Item>}
  </LinkSelectField>
));

const onSelectionChange = jest.fn();

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

test('should disable the label and control when isDisabled is true', () => {
  getComponent({ isDisabled: true });
  expect(screen.getAllByText(defaultProps.label)[0]).toHaveClass('is-disabled');
  expect(screen.getByTestId(controlTestId)).toHaveClass('is-disabled');
});

test('clicking on the visible button opens the popuplist', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('option')).not.toBeInTheDocument();

  userEvent.click(button);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(3);
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

test('selectedKey for controlled select field', () => {
  getComponent({ selectedKey: 'b' });
  const button = screen.getByRole('button');
  expect(button).toHaveTextContent('Select');

  userEvent.click(button);
  expect(screen.queryAllByRole('option')[0]).not.toHaveClass('is-selected');
  expect(screen.queryAllByRole('option')[1]).toHaveClass('is-selected');
  expect(screen.queryAllByRole('option')[2]).not.toHaveClass('is-selected');
});

test('select field with helper text', () => {
  const helperText = 'some text';
  getComponent({ helperText, status: statuses.ERROR });
  const fieldHelperText = screen.getAllByText(helperText);
  expect(fieldHelperText[1]).toBeInTheDocument();
  expect(fieldHelperText[1]).toHaveClass(`is-${statuses.ERROR}`);
});

test('displays a loader while loading', () => {
  const { rerender } = getComponent({ items: [], isLoading: true });

  const button = screen.getByRole('button');
  const loader = within(button).getByRole('alert');
  expect(loader).toHaveAttribute('aria-label', 'Loading in progress');
  expect(loader).not.toHaveAttribute('aria-valuenow');

  getComponent({ items: [] }, { renderFn: rerender });

  expect(loader).not.toBeInTheDocument();
});

test('passing helper text should display it and correct aria attributes on input', () => {
  const testHelperText = 'testHelperText';
  getComponent({ helperText: testHelperText, status: statuses.ERROR });
  const helper = screen.getAllByText(testHelperText)[0];
  expect(helper).toBeInTheDocument();

  const helperTextID = helper.getAttribute('id');
  expect(screen.getByRole('button')).toHaveAttribute('aria-describedby', helperTextID);
});

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <LinkSelectField {...defaultProps} {...props}>
      {item => <Item key={item.name}>{item.name}</Item>}
    </LinkSelectField>
  ),
});

universalFieldComponentTests({
  renderComponent: props => (
    <LinkSelectField {...defaultProps} {...props}>
      {item => <Item key={item.name}>{item.name}</Item>}
    </LinkSelectField>
  ),
  testValue: items[0].name,
  testLabel: defaultProps.label,
  componentType: 'LinkSelectField',
});

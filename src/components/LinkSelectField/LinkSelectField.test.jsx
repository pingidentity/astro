import React from 'react';
import EarthIcon from '@pingux/mdi-react/EarthIcon';
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

  expect(hiddenInput.closest('[aria-hidden="true"]')).not.toBeNull();
  expect(visibleInput.closest('[aria-hidden="true"]')).toBeNull();
  expect(hiddenLabel.closest('[aria-hidden="true"]')).not.toBeNull();
  expect(visibleLabel.closest('[aria-hidden="true"]')).toBeNull();
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

test('clicking on the visible button opens the popuplist', async () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('option')).not.toBeInTheDocument();

  await userEvent.click(button);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(3);
});

test('onOpenChange prop for field', async () => {
  const onOpenChange = jest.fn();
  getComponent({ onOpenChange });
  const button = screen.getByRole('button');
  expect(onOpenChange).not.toHaveBeenCalled();

  await userEvent.click(button);
  expect(onOpenChange).toHaveBeenNthCalledWith(1, true);
  await userEvent.click(button);
  expect(onOpenChange).toHaveBeenNthCalledWith(2, false);
});

test('selectedKey for controlled select field', async () => {
  getComponent({ selectedKey: 'b' });
  const button = screen.getByRole('button');
  expect(button).toHaveTextContent('Select');

  await userEvent.click(button);
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

test('displays a inline loader while loading', () => {
  const { rerender } = getComponent({ items: [], isLoading: true, hasInlineLoader: true });

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

test('iconProps data-testid is applied to the inner Icon element', () => {
  getComponent({ iconProps: { 'data-testid': 'custom-icon', sx: { color: 'red' } } });
  const icon = screen.getByTestId('custom-icon');
  expect(icon).toBeInTheDocument();
  expect(icon).toBeInstanceOf(SVGSVGElement);
});

test('iconProps with a custom icon renders the substitute icon without throwing', () => {
  getComponent({ iconProps: { icon: EarthIcon } });
  // The default trigger button is still present when only iconProps is provided
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});

test('trigger prop replaces the default Button trigger', () => {
  getComponent({ trigger: <button type="button" data-testid="custom-trigger">Custom</button> });
  expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
  // The default Button trigger (identified by its pendo data attribute) should not be rendered
  expect(document.querySelector('[data-pendo-id="LinkSelectField"]')).not.toBeInTheDocument();
});

test('default render is unchanged when neither iconProps nor trigger is provided', () => {
  getComponent();
  // The default trigger button is present via getByRole
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  // The default button has the pendo ID set by the component
  expect(document.querySelector('[data-pendo-id="LinkSelectField"]')).toBeInTheDocument();
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

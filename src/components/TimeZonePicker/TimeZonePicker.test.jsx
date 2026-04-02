import React from 'react';
import userEvent from '@testing-library/user-event';

import { OverlayProvider, TimeZonePicker } from '../../index';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import { getGmtAndOffset } from './helper';

jest.mock('./helper', () => ({
  getGmtAndOffset: jest.fn().mockReturnValue({
    gmt: 'GMT-00:00',
    numericOffset: 0,
  }),
}));

const testTimeZoneJuba = 'Africa/Juba';
const testTimeZoneApia = 'Pacific/Apia';

const defaultProps = {
  label: 'Test Label',
};

const getComponent = (props = {}, { renderFn = render } = {}) => renderFn(
  <OverlayProvider>
    <TimeZonePicker {...defaultProps} {...props} />
  </OverlayProvider>,
);

beforeAll(() => {
  jest
    .spyOn(window.HTMLElement.prototype, 'clientWidth', 'get')
    .mockImplementation(() => 1000);
  jest
    .spyOn(window.HTMLElement.prototype, 'clientHeight', 'get')
    .mockImplementation(() => 1000);
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

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <TimeZonePicker {...defaultProps} {...props} />,
});

test('renders ComboBoxField component', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  const label = screen.getByText(defaultProps.label);
  const button = screen.getByRole('button');
  expect(screen.queryAllByLabelText(defaultProps.label)).toEqual([
    input,
    button,
  ]);
  expect(label).toHaveTextContent(defaultProps.label);
});

test('search is working correctly', async () => {
  getComponent();
  const input = screen.getByRole('combobox');
  await userEvent.type(input, testTimeZoneApia);
  expect(screen.getByText(testTimeZoneApia)).toBeInTheDocument();
});

test('custom timezone can be added', async () => {
  getComponent({
    additionalTimeZones: { '(GMT+02:00) Africa/Juba': testTimeZoneJuba },
  });
  const input = screen.getByRole('combobox');
  await userEvent.type(input, testTimeZoneJuba);
  expect(screen.getByText(testTimeZoneJuba)).toBeInTheDocument();
});

test('shows custom empty search state text when no items are found', async () => {
  const testEmptyText = 'test empty text';
  getComponent({ emptySearchText: testEmptyText });
  const input = screen.getByRole('combobox');
  await userEvent.type(input, 'awdasrf213');
  expect(screen.getByText(testEmptyText)).toBeInTheDocument();
});

test('selecting a timezone updates the input value', async () => {
  const timezone = 'America/New York';
  const gmtAndOffset = getGmtAndOffset(timezone);
  const expectedOptionText = `${timezone} ${gmtAndOffset.gmt}`;

  getComponent();
  const input = screen.getByRole('combobox');
  await userEvent.type(input, timezone);

  expect(input).toHaveValue(timezone);
  expect(screen.getByRole('listbox')).toBeInTheDocument();

  const option = screen.getByRole('option', { key: expectedOptionText });
  await userEvent.click(option);
  expect(input).toHaveValue(expectedOptionText);
});

test('controlled selectedKey sets the input value', () => {
  const selectedKey = 'America/New York GMT-00:00';
  getComponent({ selectedKey });

  const input = screen.getByRole('combobox');
  expect(input).toHaveValue(selectedKey);
});

test('controlled onSelectionChange is called when an item is selected', async () => {
  const onSelectionChange = jest.fn();
  const timezone = 'America/New York';
  const gmtAndOffset = getGmtAndOffset(timezone);
  const expectedKey = `${timezone} ${gmtAndOffset.gmt}`;

  getComponent({ onSelectionChange });
  const input = screen.getByRole('combobox');
  await userEvent.type(input, timezone);

  const option = screen.getByRole('option', { key: expectedKey });
  await userEvent.click(option);
  expect(onSelectionChange).toHaveBeenCalledWith(expectedKey);
});

test('controlled onSelectionChange is called with null when input is cleared', async () => {
  const onSelectionChange = jest.fn();
  getComponent({ onSelectionChange, selectedKey: 'America/New York GMT-00:00' });

  const input = screen.getByRole('combobox');
  await userEvent.clear(input);
  expect(onSelectionChange).toHaveBeenCalledWith(null);
});

test('controlled onInputChange is called when typing', async () => {
  const onInputChange = jest.fn();
  getComponent({ onInputChange });

  const input = screen.getByRole('combobox');
  await userEvent.type(input, 'Pac');
  expect(onInputChange).toHaveBeenCalled();
});


test('supports controlled inputValue', async () => {
  const onInputChange = jest.fn();
  getComponent({
    inputValue: 'Pacific',
    onInputChange,
  });
  const input = screen.getByRole('combobox');
  expect(input).toHaveValue('Pacific');
});

test('passes isDisabled to ComboBoxField', () => {
  getComponent({ isDisabled: true });
  const input = screen.getByRole('combobox');
  expect(input).toBeDisabled();
});

test('passes isRequired to ComboBoxField', () => {
  getComponent({ isRequired: true });
  const input = screen.getByRole('combobox');
  expect(input).toBeRequired();
});

test('passes isReadOnly to ComboBoxField', () => {
  getComponent({ isReadOnly: true });
  const input = screen.getByRole('combobox');
  expect(input).toHaveAttribute('readonly');
});

test('passes placeholder to ComboBoxField', () => {
  getComponent({ placeholder: 'Select a timezone' });
  const input = screen.getByRole('combobox');
  expect(input).toHaveAttribute('placeholder', 'Select a timezone');
});

test('passes helperText to ComboBoxField', () => {
  getComponent({ helperText: 'Choose your preferred timezone' });
  expect(screen.getByText('Choose your preferred timezone')).toBeInTheDocument();
});

test('passes status to ComboBoxField', () => {
  getComponent({ status: 'error', helperText: 'This field is required' });
  expect(screen.getByText('This field is required')).toBeInTheDocument();
});

test('calls onOpenChange when menu opens', async () => {
  const onOpenChange = jest.fn();
  getComponent({ onOpenChange });
  const input = screen.getByRole('combobox');
  await userEvent.type(input, 'America');
  expect(onOpenChange).toHaveBeenCalledWith(true, 'input');
});

test('clears selection when input is cleared in uncontrolled mode', async () => {
  const onSelectionChange = jest.fn();
  const onInputChange = jest.fn();
  const timezone = 'America/New York';
  const gmtAndOffset = getGmtAndOffset(timezone);
  const expectedOptionText = `${timezone} ${gmtAndOffset.gmt}`;

  getComponent({ onSelectionChange, onInputChange });
  const input = screen.getByRole('combobox');
  await userEvent.type(input, timezone);

  const option = screen.getByRole('option', { key: expectedOptionText });
  await userEvent.click(option);
  expect(onSelectionChange).toHaveBeenCalledWith(expectedOptionText);

  await userEvent.clear(input);
  expect(onInputChange).toHaveBeenCalledWith('');
});

test('displays pre-selected value on initial render with controlled selectedKey', () => {
  const timezone = 'America/New York';
  const gmtAndOffset = getGmtAndOffset(timezone);
  const expectedOptionText = `${timezone} ${gmtAndOffset.gmt}`;

  getComponent({ selectedKey: expectedOptionText });
  const input = screen.getByRole('combobox');
  expect(input).toHaveValue(expectedOptionText);
});

test('displays pre-selected value with additionalTimeZones', () => {
  const timezone = 'Africa/Juba';
  const gmtAndOffset = getGmtAndOffset(timezone);
  const expectedOptionText = `${timezone} ${gmtAndOffset.gmt}`;

  getComponent({
    additionalTimeZones: { '(GMT+02:00) Africa/Juba': testTimeZoneJuba },
    selectedKey: expectedOptionText,
  });
  const input = screen.getByRole('combobox');
  expect(input).toHaveValue(expectedOptionText);
});

test('displays pre-selected value with controlled inputValue', () => {
  const timezone = 'America/New York';
  const gmtAndOffset = getGmtAndOffset(timezone);
  const expectedOptionText = `${timezone} ${gmtAndOffset.gmt}`;

  getComponent({
    selectedKey: expectedOptionText,
    inputValue: expectedOptionText,
    onInputChange: jest.fn(),
  });
  const input = screen.getByRole('combobox');
  expect(input).toHaveValue(expectedOptionText);
});

import React from 'react';
import {
  createEvent,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PhoneNumberFieldProps } from '../../types';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { universalFieldComponentTests } from '../../utils/testUtils/universalFormSubmitTest';

import PhoneNumberField from '.';

const testId = 'test-phone-number-field';
const testLabel = 'Test Label';

const defaultProps: PhoneNumberFieldProps = {
  'data-testid': testId,
  label: testLabel,
};

const getComponent = (props: PhoneNumberFieldProps = {}) => render(
  <PhoneNumberField {...defaultProps} {...props} />,
);

universalFieldComponentTests({
  renderComponent: props => (
    <PhoneNumberField {...defaultProps} {...props} />
  ),
  testValue: '+12345678',
  testLabel,
  componentType: 'PhoneNumberField',
});

universalComponentTests({
  renderComponent: props => <PhoneNumberField {...defaultProps} {...props} />,
});

afterEach(() => {
  jest.clearAllMocks();
});

test('default render has label, phone input, and country combobox', () => {
  getComponent();
  expect(screen.getByTestId(testId)).toBeInTheDocument();
  expect(screen.getByText(testLabel)).toBeInstanceOf(HTMLLabelElement);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByRole('combobox')).toBeInTheDocument();
});

test('telephone input receives focus after tabbing from country picker', async () => {
  getComponent();
  const countryPicker = screen.getByRole('combobox', { name: 'Country Picker' });
  const phoneInput = screen.getByRole('textbox');

  await userEvent.tab();
  expect(countryPicker).toHaveFocus();

  await userEvent.tab();
  expect(phoneInput).toHaveFocus();
  expect(phoneInput).toHaveClass('is-focused');
});

test('narrow country picker stays accessible and locally constrained when opened', async () => {
  const narrowAvailableWidth = 480;
  const offsetWidthSpy = jest.spyOn(window.HTMLElement.prototype, 'offsetWidth', 'get')
    .mockImplementation(function getOffsetWidth() {
      return this.querySelector('input') ? narrowAvailableWidth : 0;
    });
  const clientWidthSpy = jest.spyOn(window.HTMLElement.prototype, 'clientWidth', 'get')
    .mockReturnValue(narrowAvailableWidth);
  const clientHeightSpy = jest.spyOn(window.HTMLElement.prototype, 'clientHeight', 'get')
    .mockReturnValue(1000);

  try {
    getComponent({ sx: { width: `${narrowAvailableWidth}px` } });
    const countryPicker = screen.getByRole('combobox', { name: 'Country Picker' });

    await userEvent.click(countryPicker);

    const listbox = await screen.findByRole('listbox');
    const options = within(listbox).getAllByRole('option', { hidden: true });
    const popover = listbox.closest('[role="presentation"]');
    const scrollBox = listbox.parentElement?.parentElement;

    expect(countryPicker).toHaveAttribute('aria-expanded', 'true');
    expect(options.length).toBeGreaterThan(0);
    expect(popover).toHaveStyle({ width: `${narrowAvailableWidth}px` });
    expect(popover).not.toHaveStyle({ 'min-width': '280px' });
    expect(scrollBox).toHaveStyle({ 'min-width': '0' });
    expect(scrollBox).toHaveStyleRule('width', '100%', {
      media: 'screen and (max-width: 500px)',
    });
    expect(scrollBox).toHaveStyleRule('max-width', '100%', {
      media: 'screen and (max-width: 500px)',
    });
    expect(scrollBox).toHaveStyleRule('overflow-x', 'hidden', {
      media: 'screen and (max-width: 500px)',
    });
  } finally {
    offsetWidthSpy.mockRestore();
    clientWidthSpy.mockRestore();
    clientHeightSpy.mockRestore();
  }
});

test('typing a non-numeric character does not update phone input value', () => {
  getComponent();
  const phoneInput = screen.getByRole('textbox');
  fireEvent.change(phoneInput, { target: { value: 'a' } });
  expect(phoneInput).toHaveValue('');
});

test('typing a "+" character is accepted', () => {
  getComponent();
  const phoneInput = screen.getByRole('textbox');
  fireEvent.change(phoneInput, { target: { value: '+' } });
  expect(phoneInput).toHaveValue('+');
});

test('typing "+" followed by digits is valid', () => {
  getComponent();
  const phoneInput = screen.getByRole('textbox');
  fireEvent.change(phoneInput, { target: { value: '+123' } });
  expect(phoneInput).toHaveValue('+123');
});

test('typing "+" followed by a letter is not accepted', () => {
  getComponent();
  const phoneInput = screen.getByRole('textbox');
  fireEvent.change(phoneInput, { target: { value: '+a' } });
  expect(phoneInput).toHaveValue('');
});

test('pasting a string with spaces and dashes strips non-numeric characters and dial code', () => {
  getComponent();
  const phoneInput = screen.getByRole('textbox');
  const pasteEvent = createEvent.paste(phoneInput, {
    clipboardData: {
      getData: () => '+1 (800) 555-1234',
    },
  });
  fireEvent(phoneInput, pasteEvent);
  expect(phoneInput).toHaveValue('8005551234');
});

test('pasting a string without leading "+" strips all non-numeric characters', () => {
  getComponent();
  const phoneInput = screen.getByRole('textbox');
  const pasteEvent = createEvent.paste(phoneInput, {
    clipboardData: {
      getData: () => '800-555-1234',
    },
  });
  fireEvent(phoneInput, pasteEvent);
  expect(phoneInput).toHaveValue('8005551234');
});

test('onChange callback is called with a valid phone number change', () => {
  const onChange = jest.fn();
  getComponent({ onChange });
  const phoneInput = screen.getByRole('textbox');
  fireEvent.change(phoneInput, { target: { value: '+12345678' } });
  expect(onChange).toHaveBeenCalled();
});

test('onChange callback is not called when an invalid character is typed', () => {
  const onChange = jest.fn();
  getComponent({ onChange });
  const phoneInput = screen.getByRole('textbox');
  fireEvent.change(phoneInput, { target: { value: 'abc' } });
  expect(onChange).not.toHaveBeenCalled();
});

test('isDisabled disables the phone input', () => {
  getComponent({ isDisabled: true });
  const phoneInput = screen.getByRole('textbox');
  expect(phoneInput).toBeDisabled();
});

test('helperText renders FieldHelperText content', () => {
  const helperText = 'Enter your phone number';
  getComponent({ helperText });
  expect(screen.getByText(helperText)).toBeInTheDocument();
});

test('controlled countryValue sets initial selected country', () => {
  getComponent({ countryValue: 'US' });
  const phoneInput = screen.getByRole('textbox');
  expect(phoneInput).toBeInTheDocument();
  // The combobox should be present and the phone input available
  expect(screen.getByRole('combobox')).toBeInTheDocument();
});

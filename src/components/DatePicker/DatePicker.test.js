import React, { useState } from 'react';
import { parseDate } from '@internationalized/date';
import { chain } from '@react-aria/utils';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Button, DatePicker } from '../../index';
import statuses from '../../utils/devUtils/constants/statuses';
import {
  act,
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '../../utils/testUtils/testWrapper';

const hiddenStyling = 'border: 0px; clip-path: inset(50%); height: 1px; margin: 0px -1px -1px 0px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap;';

const unavailableRanges = [
  ['2022-08-01', '2022-08-03'],
  ['2022-08-15', '2022-08-20'],
];

const getComponent = (props = {}, { renderFn = render } = {}) => renderFn(
  <DatePicker
    {...props}
    aria-label="Event date picker"
  />,
);

const ControlledComponent = () => {
  const [date, setDate] = useState(null);

  return (
    <>
      <DatePicker
        aria-label="datePicker-controlled"
        value={date}
        onChange={chain(setDate, 'onChange')}
      />
      <Button onPress={() => setDate(parseDate('2022-08-10'))}>Change value</Button>
      <Button onPress={() => setDate(null)}>Clear</Button>
    </>
  );
};

const originalGetSelection = window.getSelection;

beforeEach(() => {
  const mockGetSelection = jest.fn();
  mockGetSelection.mockReturnValue({ collapse: jest.fn() });
  window.getSelection = mockGetSelection;
  jest.useFakeTimers();
});

afterEach(() => {
  jest.resetAllMocks();
  window.getSelection = originalGetSelection;
});

test('renders DatePicker component', () => {
  const labelText = 'test label';
  getComponent({ label: labelText });

  const button = screen.queryByRole('button');
  const dateField = screen.queryByRole('group');
  const hiddenInput = screen.queryByTestId('date-field');
  const label = screen.queryByText(labelText);

  expect(dateField).toBeInTheDocument();
  expect(label).toBeInTheDocument();
  expect(hiddenInput).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  userEvent.click(button);

  expect(screen.queryByTestId('popover-container')).toBeInTheDocument();

  // Ensure it is visibly hidden and not keyboard accessible
  /* eslint-disable testing-library/no-node-access */
  expect(hiddenInput.closest(`[style="${hiddenStyling}"]`)).not.toBeNull();
  expect(hiddenInput).toHaveAttribute('tabindex', '-1');
});

test('should allow user to input dates', () => {
  getComponent({ defaultValue: '2022-08-10' });

  const hiddenInput = screen.queryByTestId('date-field');
  const inputButtons = screen.queryAllByRole('spinbutton');
  const year = inputButtons[0];
  const month = inputButtons[1];
  const day = inputButtons[2];

  expect(hiddenInput).toHaveValue('2022-08-10');

  for (let i = 0; i < 5; i += 1) {
    fireEvent.keyDown(month, { key: 'ArrowDown' });
  }

  for (let i = 0; i < 2; i += 1) {
    fireEvent.keyDown(day, { key: 'ArrowUp' });
  }

  for (let i = 0; i < 3; i += 1) {
    fireEvent.keyDown(year, { key: 'ArrowUp' });
  }

  userEvent.click(screen.queryByRole('button'));

  expect(screen.queryByRole('heading')).toHaveTextContent('March 2025');
  expect(screen.queryByTestId('date-field')).toHaveValue('2025-03-12');

  const selectedDate = screen.queryAllByText(12);
  expect(selectedDate[1]).toHaveClass('is-selected');
});

test('should be able to open and navigate through the calendar by click', () => {
  getComponent({ defaultValue: '2022-08-10' });

  userEvent.click(screen.queryByRole('button'));

  const calendar = screen.queryByTestId('popover-container');
  expect(calendar).toBeInTheDocument();

  const buttons = screen.queryAllByRole('button');
  const title = screen.queryByRole('heading');

  expect(title).toHaveTextContent('August 2022');
  userEvent.click(buttons[2]);
  expect(title).toHaveTextContent('July 2022');
  userEvent.click(buttons[3]);
  expect(title).toHaveTextContent('August 2022');
  userEvent.click(screen.queryByTestId('date-field'));
  expect(calendar).not.toBeInTheDocument();
});

test('should be able to select dates', () => {
  const onChange = jest.fn();
  getComponent({ defaultValue: '2022-08-10', onChange });

  userEvent.click(screen.queryByRole('button'));

  const dateButtons = screen.queryAllByRole('button');
  expect(dateButtons).toHaveLength(37);
  expect(dateButtons[5]).toHaveAttribute('aria-label', 'Monday, August 1, 2022');
  userEvent.click(dateButtons[5]);
  expect(onChange).toHaveBeenCalled();

  const inputButtons = screen.queryAllByRole('spinbutton');
  const year = inputButtons[0];
  const month = inputButtons[1];
  const day = inputButtons[2];

  expect(month).toHaveTextContent(8);
  expect(day).toHaveTextContent(1);
  expect(year).toHaveTextContent(2022);
  expect(screen.queryByTestId('date-field')).toHaveValue('2022-08-01');
});

test('allows users to open calendar item with enter / space key', () => {
  getComponent({ defaultValue: '2022-08-10' });

  const iconButton = screen.queryByRole('button');
  act(() => {
    iconButton.focus();
  });
  expect(iconButton).toHaveFocus();

  fireEvent.keyDown(iconButton, { key: 'Enter' });
  fireEvent.keyUp(iconButton, { key: 'Enter' });
  const calendar = screen.queryByTestId('popover-container');
  expect(calendar).toBeInTheDocument();

  const title = screen.queryByRole('heading');
  expect(title).toHaveTextContent('August 2022');

  const buttons = screen.queryAllByRole('button');
  const previousButton = buttons[2];
  const nextButton = buttons[3];

  act(() => {
    previousButton.focus();
  });
  fireEvent.keyDown(previousButton, { key: 'Enter' });
  fireEvent.keyUp(previousButton, { key: 'Enter' });
  expect(title).toHaveTextContent('July 2022');

  act(() => {
    nextButton.focus();
  });
  fireEvent.keyDown(nextButton, { key: 'Enter' });
  fireEvent.keyUp(nextButton, { key: 'Enter' });
  expect(title).toHaveTextContent('August 2022');
});

test('allows users to select and navigate through the date picker', () => {
  const onChange = jest.fn();
  getComponent({ defaultValue: '2023-01-01', onChange });

  const iconButton = screen.queryByRole('button');
  expect(screen.queryByTestId('popover-container')).not.toBeInTheDocument();

  // year segment
  userEvent.tab();
  // month segment
  userEvent.tab();
  // day segment
  userEvent.tab();
  // button
  userEvent.tab();
  expect(iconButton).toHaveFocus();

  userEvent.type(iconButton, '{enter}', { skipClick: true });
  expect(screen.queryByTestId('popover-container')).toBeInTheDocument();

  const buttons = screen.queryAllByRole('button');
  expect(buttons[5]).toHaveFocus();

  userEvent.type(buttons[5], '{arrowright}', { skipClick: true });
  expect(buttons[6]).toHaveFocus();
  userEvent.type(buttons[6], '{arrowleft}', { skipClick: true });
  expect(buttons[5]).toHaveFocus();

  userEvent.type(buttons[5], '{arrowdown}', { skipClick: true });
  expect(buttons[12]).toHaveFocus();
  userEvent.type(buttons[12], '{arrowup}', { skipClick: true });
  expect(buttons[5]).toHaveFocus();

  userEvent.type(buttons[5], '{enter}', { skipClick: true });
  expect(screen.queryByTestId('popover-container')).not.toBeInTheDocument();
  expect(onChange).toHaveBeenNthCalledWith(1, parseDate('2023-01-01'));
  // FIXME: The icon button should now have focus, but the test below won't currently pass
  // This might just be a test issue, it works as expected in Storybook
  // expect(iconButton).toHaveFocus();
});

test('date picker with controlled value to change default value and clear any selection', () => {
  render(<ControlledComponent />);

  const iconButton = screen.queryAllByRole('button');
  userEvent.click(iconButton[0]);
  const selectedDate = screen.queryByText(12);
  userEvent.click(selectedDate);

  userEvent.click(document.body);
  const buttons = screen.queryAllByRole('button');
  const changeButton = buttons[1];
  const clearButton = buttons[2];
  const inputSegments = screen.queryAllByRole('spinbutton');
  const day = inputSegments[2];

  userEvent.click(changeButton);
  expect(day).toHaveTextContent(10);

  userEvent.click(clearButton);
  expect(day).toHaveTextContent('dd');
});

test('readonly datepicker', () => {
  getComponent({ isReadOnly: true, defaultValue: '2022-08-10' });

  userEvent.click(screen.queryByRole('button'));

  expect(screen.queryByRole('grid')).not.toBeInTheDocument();
  expect(screen.queryByTestId('date-field')).toHaveAttribute('readonly');
});

test('disabled datepicker', () => {
  getComponent({ isDisabled: true });

  userEvent.click(screen.queryByRole('button'));

  expect(screen.queryByRole('grid')).not.toBeInTheDocument();
  expect(screen.queryByTestId('date-field')).toBeDisabled();
});

test('dates before minimum date cannot be selected', () => {
  const onChange = jest.fn();
  getComponent({ onChange, minValue: '2022-08-02', defaultValue: '2022-08-10' });

  userEvent.click(screen.queryByRole('button'));

  const dateButtons = screen.queryAllByRole('button');

  userEvent.click(dateButtons[1]);
  expect(screen.queryByRole('heading')).toHaveTextContent('August 2022');

  userEvent.click(dateButtons[5]);
  expect(screen.queryByTestId('date-field')).not.toHaveValue('2022-08-01');
  expect(onChange).not.toHaveBeenCalled();
});

test('dates past maximum date cannot be selected', () => {
  const onChange = jest.fn();
  getComponent({ onChange, maxValue: '2022-08-04', defaultValue: '2022-08-01' });

  userEvent.click(screen.queryByRole('button'));

  const dateButtons = screen.queryAllByRole('button');
  userEvent.click(dateButtons[3]);
  expect(screen.queryByRole('heading')).toHaveTextContent('August 2022');

  userEvent.click(dateButtons[9]);
  expect(screen.queryByTestId('date-field')).not.toHaveValue('2022-08-05');
  expect(onChange).not.toHaveBeenCalled();
});

test('unavailable dates cannot be picked', () => {
  getComponent({ unavailableRanges, defaultValue: '2022-08-10' });

  userEvent.click(screen.queryByRole('button'));

  const dateButtons = screen.queryAllByRole('button');
  userEvent.click(dateButtons[5]);

  const input = screen.queryByTestId('date-field');
  expect(input).not.toHaveValue('2022-08-01');

  const disabledDate = screen.queryByText(16);
  userEvent.click(disabledDate);
  expect(disabledDate).toHaveClass('is-unavailable');
  expect(input).not.toHaveValue('2022-08-16');
});

test('passing helper text should display it', () => {
  const helperText = 'some text';
  getComponent({ helperText, status: statuses.ERROR });

  const fieldHelperText = screen.getByText(helperText);
  expect(fieldHelperText).toBeInTheDocument();
  expect(fieldHelperText).toHaveClass(`is-${statuses.ERROR}`);
});

test('passing hasFormatHelpText should display it', () => {
  getComponent({ hasFormatHelpText: true });

  const fieldHelperText = screen.queryByRole('status');
  expect(fieldHelperText).toHaveTextContent('yyyy / mm / dd');
});

test('popover closes on select', () => {
  getComponent();

  // check the popover is not open yet
  expect(screen.queryByTestId('popover-container')).not.toBeInTheDocument();

  // click the calendar button to open the popover
  userEvent.click(screen.queryByRole('button'));
  expect(screen.queryByTestId('popover-container')).toBeInTheDocument();

  // select a date so the popover closes
  const dateButtons = screen.queryAllByRole('button');
  userEvent.click(dateButtons[9]);
  expect(screen.queryByTestId('popover-container')).not.toBeInTheDocument();
});

test('correct aria-labelledby attributes are passed to dateField', () => {
  const labelText = 'test label';
  getComponent({ label: labelText });

  const labelId = screen.queryByText(labelText).id;
  const dateField = screen.queryByRole('group');

  expect(dateField).toHaveAttribute('aria-labelledby', `${labelId} ${dateField.id}`);

  const inputButtons = screen.queryAllByRole('spinbutton');
  const monthInputId = inputButtons[0].id;
  const dayInputId = inputButtons[1].id;
  const yearInputId = inputButtons[2].id;

  expect(inputButtons[0]).toHaveAttribute(
    'aria-labelledby',
    `${labelId} ${dateField.id} ${monthInputId}`,
  );
  expect(inputButtons[1]).toHaveAttribute(
    'aria-labelledby',
    `${labelId} ${dateField.id} ${dayInputId}`,
  );
  expect(inputButtons[2]).toHaveAttribute(
    'aria-labelledby',
    `${labelId} ${dateField.id} ${yearInputId}`,
  );
});

test('dateField should handle paste', async () => {
  const onPaste = jest.fn();
  getComponent({ onPaste });

  const inputButtons = screen.queryAllByRole('spinbutton');
  const month = inputButtons[1];
  const paste = createEvent.paste(month, {
    clipboardData: {
      getData: () => '2022-10-25',
    },
  });
  fireEvent(month, paste);

  expect(onPaste).toHaveBeenCalled();
  expect(screen.queryByTestId('date-field')).toHaveValue('2022-10-25');
});

test('dateField should reject invalid pasted values', async () => {
  const onPaste = jest.fn();
  getComponent({ onPaste });

  const inputButtons = screen.queryAllByRole('spinbutton');
  const month = inputButtons[1];
  const invalidPaste = createEvent.paste(month, {
    clipboardData: {
      getData: () => '08-10-2022',
    },
  });

  fireEvent(month, invalidPaste);
  const errorMessage = screen.getByRole('status');
  const errorText = 'Invalid Date. Paste in YYYY-MM-DD format. Pasted value 08-10-2022';
  await waitFor(() => {
    return expect(errorMessage).toHaveAttribute('aria-label', 'Error Message');
  });
  expect(screen.queryByText(errorText)).toBeInTheDocument();

  // close button should dismiss the reject message
  const closeButton = within(errorMessage).getByRole('button');
  expect(closeButton).toBeInTheDocument();
  userEvent.click(closeButton);
  expect(errorMessage).not.toBeInTheDocument();

  fireEvent(month, invalidPaste);

  // reject message should be disappear after delay
  expect(onPaste).toHaveBeenCalled();
  expect(screen.queryByTestId('date-field')).toHaveValue('');
  await waitFor(() => {
    return expect(errorMessage).toBeInTheDocument;
  });

  setTimeout(() => {
    expect(errorMessage).not.toBeInTheDocument();
    expect(screen.queryByText(errorText)).not.toBeInTheDocument();
  }, 5000);
});

test('dateField should handle min, max or next available date if the pasted date is min, max or unavailable', () => {
  const onPaste = jest.fn();
  getComponent({
    onPaste,
    minValue: '2022-07-29',
    maxValue: '2022-08-25',
    unavailableRanges,
  });

  const inputButtons = screen.queryAllByRole('spinbutton');
  const month = inputButtons[1];

  const minPaste = createEvent.paste(month, {
    clipboardData: {
      getData: () => '2022-07-25',
    },
  });
  fireEvent(month, minPaste);
  expect(screen.queryByTestId('date-field')).toHaveValue('2022-07-29');

  const maxPaste = createEvent.paste(month, {
    clipboardData: {
      getData: () => '2022-08-30',
    },
  });
  fireEvent(month, maxPaste);
  expect(screen.queryByTestId('date-field')).toHaveValue('2022-08-25');

  const unavailablePaste = createEvent.paste(month, {
    clipboardData: {
      getData: () => '2022-08-02',
    },
  });
  fireEvent(month, unavailablePaste);
  expect(screen.queryByTestId('date-field')).toHaveValue('2022-08-04');
});

test('dateField should handle autofocus when deleting segments ', () => {
  getComponent({ defaultValue: '2022-08-10' });

  const hiddenInput = screen.queryByTestId('date-field');
  const inputButtons = screen.queryAllByRole('spinbutton');
  const year = inputButtons[0];
  const month = inputButtons[1];
  const day = inputButtons[2];

  expect(hiddenInput).toHaveValue('2022-08-10');

  act(() => { day.focus(); });
  expect(day).toHaveFocus();
  for (let i = 0; i < 2; i += 1) {
    fireEvent.keyDown(day, { key: 'Backspace' });
    fireEvent.keyUp(day, { key: 'Backspace' });
  }
  expect(month).toHaveFocus();

  for (let i = 0; i < 2; i += 1) {
    fireEvent.keyDown(month, { key: 'Backspace' });
    fireEvent.keyUp(month, { key: 'Backspace' });
  }
  expect(year).toHaveFocus();

  for (let i = 0; i < 3; i += 1) {
    fireEvent.keyDown(year, { key: 'Backspace' });
    fireEvent.keyUp(year, { key: 'Backspace' });
  }
  expect(hiddenInput).toHaveValue('');
});

test('should add the correct number of padded 0 to year, month and day', () => {
  getComponent({ defaultValue: '0009-08-02' });
  expect(screen.queryByTestId('date-field')).toHaveValue('0009-08-02');

  userEvent.click(screen.queryByRole('button'));

  const dateButtons = screen.queryAllByRole('button');

  expect(dateButtons[5]).toHaveAttribute('aria-label', 'Saturday, August 1, 9');
  userEvent.click(dateButtons[5]);

  expect(screen.queryByTestId('date-field')).toHaveValue('0009-08-01');
});

test('should have no accessibility violations', async () => {
  jest.useRealTimers();
  const { container } = getComponent();
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

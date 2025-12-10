import React from 'react';
import { getLocalTimeZone, today } from '@internationalized/date';
import userEvent from '@testing-library/user-event';

import { CalendarProps } from '../../types';
import { isDateWithinRanges } from '../../utils/devUtils/props/isDateWithinRanges';
import { act, fireEvent, render, screen, within } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Calendar from './Calendar';

const unavailableRanges = [
  ['2022-08-01', '2022-08-03'],
  ['2022-08-15', '2022-08-20'],
];
// This function is run against each date in the calendar
const isDateUnavailable = date => isDateWithinRanges(date, unavailableRanges);

const getComponent = (props: CalendarProps = {}, { renderFn = render } = {}) => renderFn((
  <Calendar {...props} />
));

// Needs to be added to each components test file.
universalComponentTests({ renderComponent: props => <Calendar {...props} /> });

test('renders calendar component', () => {
  getComponent({ defaultValue: '2022-08-10' });

  const heading = screen.queryByRole('heading');
  expect(screen.queryByRole('group')).toBeInTheDocument();
  expect(heading).toHaveTextContent('August 2022');
  expect(screen.queryByText('calendar-default, September 2022')).not.toBeInTheDocument();

  const buttons = screen.queryAllByRole('button');
  const previous = buttons[1];
  const next = buttons[2];

  expect(previous).toHaveAttribute('aria-label', 'Previous month navigation');
  expect(next).toHaveAttribute('aria-label', 'Next month navigation');

  expect(screen.queryByRole('grid')).toHaveAttribute('aria-label', 'August 2022');

  const weeksInMonth = screen.getAllByRole('row');
  expect(weeksInMonth).toHaveLength(5);

  const headers = screen.queryAllByRole('columnheader', { hidden: true });
  expect(headers.map(h => h.textContent)).toEqual(['S', 'M', 'T', 'W', 'T', 'F', 'S']);

  const gridCells = screen.queryAllByRole('gridcell').filter(cell => cell.getAttribute('aria-disabled') !== 'true');
  expect(gridCells.length).toBe(31);

  const hiddenButton = screen.queryAllByRole('button').filter(button => button.getAttribute('aria-label') === 'Next')[0];
  expect(hiddenButton).toHaveAttribute('tabindex', '-1');

  userEvent.click(hiddenButton);
  expect(heading).toHaveTextContent('September 2022');
});

test('should able to navigate to previous and next year and month', () => {
  getComponent({ defaultValue: '2022-08-10' });

  const buttons = screen.queryAllByRole('button');

  const heading = screen.queryByRole('heading');
  expect(heading).toHaveTextContent('August 2022');

  // navigation to previous year
  userEvent.click(buttons[0]);
  expect(heading).toHaveTextContent('August 2021');

  // navigation to next year
  userEvent.click(buttons[3]);
  expect(heading).toHaveTextContent('August 2022');

  // navigation to previous month
  userEvent.click(buttons[1]);
  expect(heading).toHaveTextContent('July 2022');

  // navigation to next month
  userEvent.click(buttons[2]);
  expect(heading).toHaveTextContent('August 2022');
});

test('should render disabled previous, disabled next and current date gridcell for a month', () => {
  getComponent({ defaultValue: '2022-08-10' });

  expect(screen.queryAllByRole('gridcell')).toHaveLength(35);

  const previousDate = screen.queryAllByText(31);
  expect(previousDate[0]).toHaveAttribute('aria-label', 'Sunday, July 31, 2022');
  expect(previousDate[0]).toHaveAttribute('aria-disabled', 'true');

  const dates = screen.queryAllByText(1);
  const currentDate = dates[0];
  const nextDate = dates[1];

  expect(currentDate).toHaveAttribute('aria-label', 'Monday, August 1, 2022');
  userEvent.click(currentDate);
  expect(currentDate).toHaveClass('is-selected');

  expect(nextDate).toHaveAttribute('aria-label', 'Thursday, September 1, 2022');
  expect(nextDate).toHaveAttribute('aria-disabled', 'true');
});

test('when a date is selected it should have the class is-selected with controlled value', () => {
  getComponent({ value: '2022-08-10' });

  const selectedDate = screen.queryByText(10);
  expect(selectedDate).toHaveClass('is-selected');
});

test('should be able to select dates', () => {
  getComponent({ defaultValue: '2022-08-10' });

  const dateButtons = screen.queryAllByRole('button');
  expect(dateButtons).toHaveLength(36);
  expect(dateButtons[4]).toHaveAttribute('aria-label', 'Monday, August 1, 2022');
  userEvent.click(dateButtons[4]);
  expect(dateButtons[4]).toHaveClass('is-selected');
});

test('should be able to navigate to previous month dates without selection', () => {
  getComponent({ defaultValue: '2022-08-10' });

  const disabledGridCells = screen.queryAllByRole('gridcell').filter(cell => cell.getAttribute('aria-disabled') !== 'false');
  const previousDate = disabledGridCells[0];

  expect(within(previousDate).getByText(31)).toHaveAttribute('aria-label', 'Sunday, July 31, 2022');
  userEvent.click(previousDate);

  const selectedMonth = screen.queryByRole('grid');
  expect(selectedMonth).toHaveAttribute('aria-label', 'July 2022');
});

test('should be able to navigate to next month dates without selection', () => {
  getComponent({ defaultValue: '2022-08-10' });

  const disabledGridCells = screen.queryAllByRole('gridcell').filter(cell => cell.getAttribute('aria-disabled') !== 'false');

  const NextDate = disabledGridCells[34];

  expect(within(NextDate).getByText(3)).toHaveAttribute('aria-label', 'Saturday, September 3, 2022');
  userEvent.click(NextDate);

  const selectedMonth = screen.queryByRole('grid');
  expect(selectedMonth).toHaveAttribute('aria-label', 'September 2022');
});

test('allows users to open calendar item with enter / space key', () => {
  getComponent({ defaultValue: '2022-08-10' });

  const buttons = screen.queryAllByRole('button');
  const title = screen.queryByRole('heading');
  expect(title).toHaveTextContent('August 2022');

  const previousButton = buttons[1];
  const nextButton = buttons[2];

  act(() => { previousButton.focus(); });
  fireEvent.keyDown(previousButton, { key: 'Enter' });
  fireEvent.keyUp(previousButton, { key: 'Enter' });
  expect(title).toHaveTextContent('July 2022');

  act(() => { nextButton.focus(); });
  fireEvent.keyDown(nextButton, { key: 'Enter' });
  fireEvent.keyUp(nextButton, { key: 'Enter' });
  expect(title).toHaveTextContent('August 2022');
});

test('allows users to select and navigate through calendar items', () => {
  getComponent();

  const buttons = screen.queryAllByRole('button');
  act(() => { buttons[4].focus(); });
  expect(buttons[4]).toHaveFocus();

  fireEvent.keyDown(buttons[4], { key: 'Enter' });
  fireEvent.keyUp(buttons[4], { key: 'Enter' });

  fireEvent.keyDown(buttons[4], { key: 'ArrowRight' });
  expect(buttons[5]).toHaveFocus();
  fireEvent.keyDown(buttons[5], { key: 'ArrowLeft' });
  expect(buttons[4]).toHaveFocus();

  fireEvent.keyDown(buttons[4], { key: 'ArrowDown' });
  expect(buttons[11]).toHaveFocus();
  fireEvent.keyDown(buttons[11], { key: 'ArrowUp' });
  expect(buttons[4]).toHaveFocus();
});

test('readonly calendar', () => {
  getComponent({ isReadOnly: true });

  expect(screen.queryByRole('grid')).toHaveAttribute('aria-readonly', 'true');
  const dateButtons = screen.queryAllByRole('button');

  userEvent.click(dateButtons[4]);
  expect(dateButtons[4]).not.toHaveClass('is-selected');
});

test('disabled calendar date', () => {
  getComponent({ isDisabled: true });

  expect(screen.queryByRole('grid')).toHaveAttribute('aria-disabled', 'true');
  const dateButtons = screen.queryAllByRole('button');
  userEvent.click(dateButtons[4]);
  expect(dateButtons[4]).toHaveAttribute('aria-disabled', 'true');
  expect(dateButtons[4]).toHaveClass('is-disabled');
});

test('dates before minimum date cannot be selected', () => {
  const onChange = jest.fn();
  getComponent({ onChange, minValue: '2022-08-02', defaultValue: '2022-08-10' });

  const dateButtons = screen.queryAllByRole('button');

  userEvent.click(dateButtons[1]);
  expect(screen.queryByRole('heading')).toHaveTextContent('August 2022');

  userEvent.click(dateButtons[2]);
  expect(dateButtons[3]).not.toHaveClass('is-selected');
  expect(onChange).not.toHaveBeenCalled();
});

test('dates past maximum date cannot be selected', () => {
  const onChange = jest.fn();
  getComponent({ onChange, maxValue: '2022-08-04', defaultValue: '2022-08-03' });

  const dateButtons = screen.queryAllByRole('button');

  userEvent.click(dateButtons[2]);
  expect(screen.queryByRole('heading')).toHaveTextContent('August 2022');

  userEvent.click(dateButtons[10]);
  expect(dateButtons[10]).not.toHaveClass('is-selected');
  expect(onChange).not.toHaveBeenCalled();
});

test('unavailable dates cannot be picked', () => {
  getComponent({ isDateUnavailable, defaultValue: '2022-08-05' });

  const dateButtons = screen.queryAllByRole('button');
  userEvent.click(dateButtons[4]);
  expect(dateButtons[4]).not.toHaveClass('is-selected');

  const gridCells = screen.getAllByRole('gridcell').filter(cell => cell.getAttribute('aria-disabled') !== 'true');
  expect(gridCells.length).toBe(22);

  const cells = screen.getAllByRole('button').filter(cell => cell.getAttribute('aria-disabled') === 'true');
  expect(cells.length).toBe(9);

  const disabledDate = screen.getByText(16);
  userEvent.click(disabledDate);
  expect(disabledDate).toHaveAttribute('aria-disabled', 'true');
  expect(disabledDate).not.toHaveClass('is-selected');
  expect(disabledDate).toHaveClass('is-unavailable');
});

test('should autofocus on current day with hasAutoFocus', () => {
  getComponent({ hasAutoFocus: true });

  const dateToday = today(getLocalTimeZone());
  const day = dateToday.day;
  const focusedDay = screen.queryAllByText(day).filter(cell => cell.getAttribute('aria-disabled') !== 'true');
  expect(focusedDay[0]).toHaveTextContent(day.toString());
  expect(focusedDay[0]).toHaveFocus();
});

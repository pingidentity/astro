import React from 'react';
import { CalendarDate, DateValue, getLocalTimeZone, today } from '@internationalized/date';
import userEvent from '@testing-library/user-event';

import { RangeCalendarProps, RangeValue } from '../../types';
import { isDateWithinRanges } from '../../utils/devUtils/props/isDateWithinRanges';
import { act, fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import RangeCalendar, { parseDateIfString, parseDateRangeIfString } from './RangeCalendar';

const unavailableRanges = [
  ['2022-08-10', '2022-08-15'],
];

const defaultProps: RangeCalendarProps = {
  defaultValue: {
    start: new CalendarDate(2022, 8, 1),
    end: new CalendarDate(2022, 8, 7),
  } as RangeValue<DateValue>,

};

const isDateUnavailable = date => isDateWithinRanges(date, unavailableRanges);

const getComponent = (props = {}) => render(<RangeCalendar {...defaultProps} {...props} aria-label="Calendar Range" />);

// Needs to be added to each components test file.
universalComponentTests({ renderComponent: props => <RangeCalendar {...defaultProps} {...props} aria-label="Calendar Range" /> });

test('renders calendar range component', () => {
  getComponent();

  const calendarContainer = screen.getByRole('group');
  expect(calendarContainer).toBeInTheDocument();
  expect(calendarContainer).toHaveTextContent('Calendar Range, August to September 2022');


  const buttons = screen.getAllByRole('button');
  expect(buttons[0]).toHaveAttribute('aria-label', 'Previous month navigation');
  expect(buttons[1]).toHaveAttribute('aria-label', 'Next month navigation');

  const calendarGrids = screen.getAllByRole('grid');
  expect(calendarGrids).toHaveLength(2);

  const calendarHeaders = screen.getAllByRole('columnheader', { hidden: true });
  expect(calendarHeaders).toHaveLength(14);

  const calendarCells = screen.queryAllByRole('gridcell');
  expect(calendarCells).toHaveLength(70);
});

test('should able to navigate to previous and next month', () => {
  getComponent();

  const buttons = screen.getAllByRole('button');

  const heading = screen.getByRole('group');
  expect(heading).toHaveTextContent('Calendar Range, August to September 2022');

  // navigation to previous month
  userEvent.click(buttons[0]);
  expect(heading).toHaveTextContent('Calendar Range, July to August 2022');

  // navigation to next month
  userEvent.click(buttons[1]);
  expect(heading).toHaveTextContent('Calendar Range, August to September 2022');

  // navigation to next month
  userEvent.click(buttons[1]);
  expect(heading).toHaveTextContent('Calendar Range, September to October 2022');
});

test('should be able to select a range of dates', () => {
  getComponent();
  const calendarCells = screen.queryAllByRole('gridcell');
  const startCell = calendarCells[7];
  const endCell = calendarCells[13];

  userEvent.click(startCell);
  userEvent.click(endCell);

  const selectedCells = screen.getAllByRole('gridcell', { selected: true });
  expect(selectedCells).toHaveLength(7);
});

test('should disable unavailable dates', () => {
  getComponent({ isDateUnavailable });
  const calendarCells = screen.queryAllByRole('gridcell');
  const unavailableCells = calendarCells.slice(10, 16);
  unavailableCells.forEach(cell => {
    expect(cell).toHaveAttribute('aria-disabled', 'true');
  });
});

test('allows users to select and navigate through calendar items', () => {
  getComponent();

  const buttons = screen.queryAllByRole('button');
  act(() => { buttons[4].focus(); });
  expect(buttons[4]).toHaveFocus();

  fireEvent.keyDown(buttons[4], { key: 'ArrowRight' });
  expect(buttons[5]).toHaveFocus();
  fireEvent.keyDown(buttons[5], { key: 'ArrowLeft' });
  expect(buttons[4]).toHaveFocus();

  fireEvent.keyDown(buttons[4], { key: 'ArrowDown' });
  expect(buttons[11]).toHaveFocus();
  fireEvent.keyDown(buttons[11], { key: 'ArrowUp' });
  expect(buttons[4]).toHaveFocus();

  fireEvent.keyDown(buttons[4], { key: 'Enter' });
  fireEvent.keyUp(buttons[4], { key: 'Enter' });
  expect(buttons[5]).toHaveFocus();
});

test('readonly calendar', () => {
  getComponent({ isReadOnly: true });

  const calendars = screen.queryAllByRole('grid');
  expect(calendars).toHaveLength(2);
  calendars.forEach(calendar => {
    expect(calendar).toHaveAttribute('aria-readonly', 'true');
  });

  const buttons = screen.queryAllByRole('button');
  userEvent.click(buttons[12]);

  expect(buttons[12]).not.toHaveClass('is-selected');
});

test('dates before minimum date cannot be selected', () => {
  const onChange = jest.fn();
  const defaultValue = {
    start: '2022-08-10',
    end: '2022-08-15',
  };
  getComponent({ onChange, minValue: '2022-08-06', defaultValue });

  const buttons = screen.queryAllByRole('button');
  userEvent.click(buttons[2]);

  expect(buttons[2]).not.toHaveClass('is-selected');
  expect(onChange).not.toHaveBeenCalled();
});

test('dates past maxiumum date cannot be selected', () => {
  const onChange = jest.fn();
  const defaultValue = {
    start: new CalendarDate(2022, 8, 10),
    end: new CalendarDate(2022, 8, 15),
  };
  getComponent({ onChange, maxValue: '2022-08-20', defaultValue });

  const buttons = screen.queryAllByRole('button');
  userEvent.click(buttons[55]);

  expect(buttons[55]).not.toHaveClass('is-selected');
  expect(onChange).not.toHaveBeenCalled();
});

test('should autofocus on current day with hasAutoFocus', () => {
  getComponent({ hasAutoFocus: true, defaultValue: null });

  const dateToday = today(getLocalTimeZone());
  const day = dateToday.day;
  const focusedDay = screen.queryAllByText(day).filter(cell => cell.getAttribute('aria-disabled') !== 'true');

  expect(focusedDay[0]).toHaveTextContent(day.toString());
});

test('parseDateRangeIfString should correctly parse string or DateValue inputs', () => {
  const value1 = {
    start: '2022-08-01',
    end: '2022-08-07',
  };

  const value2 = {
    start: new CalendarDate(2022, 8, 10),
    end: new CalendarDate(2022, 8, 15),
  };

  const result1 = parseDateRangeIfString(value1);
  const result2 = parseDateRangeIfString(value2);

  expect(result1.start).toEqual(new CalendarDate(2022, 8, 1));
  expect(result1.end).toEqual(new CalendarDate(2022, 8, 7));
  expect(result2.start).toEqual(new CalendarDate(2022, 8, 10));
  expect(result2.end).toEqual(new CalendarDate(2022, 8, 15));
});

test('parseDateIfString should correctly parse string or DateValue inputs', () => {
  const value1 = '2022-08-01';
  const value2 = new CalendarDate(2022, 8, 10);

  const result1 = parseDateIfString(value1);
  const result2 = parseDateIfString(value2);

  expect(result1).toEqual(new CalendarDate(2022, 8, 1));
  expect(result2).toEqual(new CalendarDate(2022, 8, 10));
});

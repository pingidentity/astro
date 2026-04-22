import React from 'react';
import { getWeeksInMonth } from '@internationalized/date';
import { AriaCalendarGridProps, CalendarGridAria, useCalendarGrid } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { CalendarState, RangeCalendarState } from '@react-stately/calendar';

import { Table, TableBody, TableCell, TableHead, TableRow } from '../../index';
import { CalendarGridProps, DateValue } from '../../types/calendar';

import CalendarCell from './CalendarCell';

/**
 * The calendar body component with column header and calendar cells.
 * Utilizes useCalendarGrid to return props for an individual grid of dates in a month
 * along with formatted weekday names based on the current locale.
 */

const CalendarGrid = (props: CalendarGridProps) => {
  const { state, customWeekDays } = props;

  const { locale } = useLocale();
  const { visibleRange, getDatesInWeek } = state;

  const { gridProps, headerProps, weekDays }: CalendarGridAria = useCalendarGrid(
    props as AriaCalendarGridProps, state as CalendarState | RangeCalendarState);
  const weeksInMonth = getWeeksInMonth(visibleRange.start as DateValue, locale);

  const getKey = (day, index) => {
    return `${day}-${index}`;
  };

  return (
    <Table {...gridProps} role="grid">
      <TableHead {...headerProps}>
        <TableRow>
          {(customWeekDays || weekDays).map((day, index) => (
            <TableCell variant="calendar.columnHeader" key={getKey(day, index)} role="columnheader">
              {day}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody variant="calendar.calendarBody">
        {Array.from(Array(weeksInMonth).keys()).map(weekIndex => (
          <TableRow key={weekIndex}>
            {getDatesInWeek(weekIndex).map(date => (
              date?.day
              && (
                <CalendarCell
                  key={date.toString()}
                  state={state}
                  date={date}
                />
              )
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};


export default CalendarGrid;

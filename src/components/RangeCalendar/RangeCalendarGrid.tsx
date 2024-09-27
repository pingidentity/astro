import React from 'react';
import { endOfMonth, getWeeksInMonth } from '@internationalized/date';
import { AriaCalendarGridProps, CalendarGridAria, useCalendarGrid } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { CalendarState, RangeCalendarState } from '@react-stately/calendar';

import { Table, TableBody, TableCell, TableHead, TableRow } from '../../index';
import { RangeCalendarGridProps } from '../../types/calendar';

import RangeCalendarCell from './RangeCalendarCell';

const RangeCalendarGrid = (props: RangeCalendarGridProps) => {
  const { state, offset = {} } = props;
  const { visibleRange, getDatesInWeek } = state;

  const { locale } = useLocale();

  const startDate = visibleRange.start.add(offset);
  const endDate = endOfMonth(startDate);

  const { gridProps, headerProps, weekDays }: CalendarGridAria = useCalendarGrid(
    {
      startDate,
      endDate,
    } as AriaCalendarGridProps,
    state as RangeCalendarState | CalendarState);

  const weeksInMonth = getWeeksInMonth(startDate, locale);

  const getKey = (day, index) => {
    return `${day}-${index}`;
  };

  return (
    <Table {...gridProps}>
      <TableHead {...headerProps}>
        <TableRow>
          {weekDays.map((day, index) => (
            <TableCell isHeading variant="rangeCalendar.columnHeader" key={getKey(day, index)} role="columnheader">
              {day}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody variant="rangeCalendar.calendarBody">
        {Array.from(Array(weeksInMonth).keys()).map(weekIndex => (
          <TableRow key={weekIndex}>
            {getDatesInWeek(weekIndex, startDate).map(date => (
              date?.day
              && (
                <RangeCalendarCell
                  key={date.toString()}
                  state={state}
                  date={date}
                  currentMonth={startDate}
                />
              )
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RangeCalendarGrid;

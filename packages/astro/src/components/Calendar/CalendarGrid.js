import React from 'react';
import { getWeeksInMonth } from '@internationalized/date';
import { useCalendarGrid } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import PropTypes from 'prop-types';

import { Table, TableBody, TableCell, TableHead, TableRow } from '../../index';

import CalendarCell from './CalendarCell';

/**
 * The calendar body component with column header and calendar cells.
 * Utilizes useCalendarGrid to return props for an individual grid of dates in a month
 * along with formatted weekday names based on the current locale.
 */

const CalendarGrid = props => {
  const { state, customWeekDays } = props;

  const { locale } = useLocale();
  const { visibleRange, getDatesInWeek } = state;

  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);
  const weeksInMonth = getWeeksInMonth(visibleRange.start, locale);

  const getKey = (day, index) => {
    return `${day}-${index}`;
  };

  return (
    <Table {...gridProps}>
      <TableHead {...headerProps}>
        <TableRow>
          {(customWeekDays || weekDays).map((day, index) => <TableCell variant="calendar.columnHeader" key={getKey(day, index)} role="columnheader">{day}</TableCell>)}
        </TableRow>
      </TableHead>
      <TableBody variant="calendar.calendarBody">
        {Array.from(Array(weeksInMonth).keys()).map(weekIndex => (
          <TableRow key={weekIndex}>
            {getDatesInWeek(weekIndex).map(date => (
              date.day
               && (
               <CalendarCell
                 key={date}
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

CalendarGrid.propTypes = {
  /** State object that is passed in from the  useCalendar hook */
  state: PropTypes.shape({
    visibleRange: PropTypes.shape({
      start: PropTypes.shape({}),
    }),
    getDatesInWeek: PropTypes.func,
  }),
  /** Custom week days for other international calendars */
  customWeekDays: PropTypes.arrayOf(PropTypes.string),
};

export default CalendarGrid;

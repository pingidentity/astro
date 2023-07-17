import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { createCalendar, parseDate } from '@internationalized/date';
import ChevronDoubleLeftIcon from '@pingux/mdi-react/ChevronDoubleLeftIcon';
import ChevronDoubleRightIcon from '@pingux/mdi-react/ChevronDoubleRightIcon';
import ChevronLeftIcon from '@pingux/mdi-react/ChevronLeftIcon';
import ChevronRightIcon from '@pingux/mdi-react/ChevronRightIcon';
import { useCalendar } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useCalendarState } from '@react-stately/calendar';
import PropTypes from 'prop-types';

import { Box, Button, Icon, IconButton, Text } from '../../index';

import CalendarGrid from './CalendarGrid';

/**
 * A simple component to display a monthly grid for date selection.
 * Utilizes [useCalendar, useCalendarGrid, useCalendarCell](https://react-spectrum.adobe.com/react-aria/useCalendar.html),
 * from React Aria and [useCalendarState](https://react-spectrum.adobe.com/react-stately/useCalendarState.html)
 * from React Stately.
 */

const Calendar = forwardRef((props, ref) => {
  const { value, defaultValue, minValue, maxValue } = props;
  const { locale } = useLocale();
  const calenderRef = useRef();

  // istanbul ignore next
  useImperativeHandle(ref, () => calenderRef.current);

  const parsedDates = {
    value: (typeof value === 'string' && parseDate(value)) || value,
    defaultValue: (typeof defaultValue === 'string' && parseDate(defaultValue)) || defaultValue,
    maxValue: (typeof maxValue === 'string' && parseDate(maxValue)) || maxValue,
    minValue: (typeof minValue === 'string' && parseDate(minValue)) || minValue,
  };

  const state = useCalendarState({
    ...props,
    ...parsedDates,
    locale,
    createCalendar,
  });

  const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    { ...props, ...parsedDates },
    state,
    calenderRef,
  );

  /**
   * Grabs the currently displayed date for yearly navigation.
   */

  const [currentDate, setCurrentDate] = useState();
  const todayDate = useMemo(() => {
    setCurrentDate(state.visibleRange.start);
  }, [state.visibleRange.start]);

  const nav = {
    NEXT: 'next',
    PREVIOUS: 'previous',
  };

  /**
   * Function handles the navigation to previous and next year
   * based on the currently displayed date.
   */

  const handleYearSelection = useCallback(navigation => {
    let tempValue;
    if (navigation === nav.PREVIOUS) {
      tempValue = currentDate.subtract({ years: 1 });
    } else if (navigation === nav.NEXT) {
      tempValue = currentDate.add({ years: 1 });
    }
    state.setFocusedDate(tempValue);
    setCurrentDate(tempValue);
  }, [currentDate, state, todayDate]);

  return (
    <Box {...calendarProps} ref={calenderRef} variant="calendar.calendarContainer">
      <Box className="header" isRow variant="calendar.calendarHeader" verticalAlign="middle">
        <IconButton
          onPress={() => handleYearSelection(nav.PREVIOUS)}
          mx="sm"
          isDisabled={prevButtonProps.isDisabled}
          aria-label="Previous year navigation"
        >
          <Icon icon={ChevronDoubleLeftIcon} size={18} title={{ name: 'Chevron Double Left Icon' }} />
        </IconButton>
        <IconButton
          {...prevButtonProps}
          aria-label="Previous month navigation"
        >
          <Icon icon={ChevronLeftIcon} size={18} title={{ name: 'Chevron Left Icon' }} />
        </IconButton>
        <VisuallyHidden>
          <Text>{calendarProps['aria-label']}</Text>
        </VisuallyHidden>
        <Text
          variant="itemTitle"
          role="heading"
          aria-level="3"
          fontWeight={3}
        >
          {title}
        </Text>
        <IconButton
          {...nextButtonProps}
          aria-label="Next month navigation"
        >
          <Icon icon={ChevronRightIcon} size={18} title={{ name: 'Chevron Right Icon' }} />
        </IconButton>
        <IconButton
          onPress={() => handleYearSelection(nav.NEXT)}
          mx="sm"
          isDisabled={nextButtonProps.isDisabled}
          aria-label="Next year navigation"
        >
          <Icon icon={ChevronDoubleRightIcon} size={18} title={{ name: 'Chevron Double Right Icon' }} />
        </IconButton>
      </Box>
      <CalendarGrid state={state} />
      <VisuallyHidden>
        <Button
          aria-label={nextButtonProps['aria-label']}
          isDisabled={nextButtonProps.isDisabled}
          onPress={() => state.focusNextPage()}
          tabIndex={-1}
        />
      </VisuallyHidden>
    </Box>
  );
});

Calendar.propTypes = {
  /** Prop to provide a custom default date (uncontrolled) */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Prop to provide a default date (controlled) */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** custom week days for other calendars */
  customWeekDays: PropTypes.arrayOf(PropTypes.string),
  /** Whether the element should receive focus on render. */
  hasAutoFocus: PropTypes.bool,
  /** The element's unique identifier. */
  id: PropTypes.string,
  /**
   * Callback that is called for each date of the calendar.
   * If it returns true, then the date is unavailable.
   *
   * (date: DateValue) => boolean
   */
  isDateUnavailable: PropTypes.func,
  /** Whether the calendar is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether the calendar dates are only focusable. */
  isReadOnly: PropTypes.bool,
  /** Whether user input is required on the input before form submission. */
  isRequired: PropTypes.bool,
  /** The maximum allowed date that a user may select. */
  maxValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** The minimum allowed date that a user may select. */
  minValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Handler that is called when the element loses focus. */
  onBlur: PropTypes.func,
  /** Handler that is called when the element's selection state changes. */
  onChange: PropTypes.func,
  /** Handler that is called when the element receives focus. */
  onFocus: PropTypes.func,
  /** Handler that is called when the element's focus status changes. */
  onFocusChange: PropTypes.func,
  /** Handler that is called when a key is pressed. */
  onKeyDown: PropTypes.func,
  /** Handler that is called when a key is released. */
  onKeyUp: PropTypes.func,
};

export default Calendar;

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
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

const Calendar = forwardRef((props, ref) => {
  const { value, defaultValue, minValue, maxValue, hasAutoFocus } = props;
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
    autoFocus: hasAutoFocus,
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

  const [yearChangeDirection, setYearChangeDirection] = useState(null);
  const previousYearRef = useRef(null);
  const nextYearRef = useRef(null);

  const nav = {
    NEXT: 'next',
    PREVIOUS: 'previous',
  };

  // after updating visible year, reapplies focus to corresponding year buttons
  useEffect(() => {
    if (yearChangeDirection === nav.NEXT) {
      nextYearRef.current.focus();
    }

    if (yearChangeDirection === nav.PREVIOUS) {
      previousYearRef.current.focus();
    }

    setYearChangeDirection(null);
  }, [nav.NEXT, nav.PREVIOUS, yearChangeDirection]);


  // update visible year
  const handleYearSelection = navigation => {
    if (navigation === nav.PREVIOUS) {
      const previousYear = state.focusedDate.subtract({ years: 1 });
      state.setFocusedDate(previousYear);
    }

    if (navigation === nav.NEXT) {
      const nextYear = state.focusedDate.add({ years: 1 });
      state.setFocusedDate(nextYear);
    }

    setYearChangeDirection(navigation);
  };

  const renderTitle = (
    <Text
      variant="itemTitle"
      role="heading"
      aria-level="3"
      fontWeight={3}
    >
      {title}
    </Text>
  );
  return (
    <Box {...calendarProps} ref={calenderRef} variant="calendar.calendarContainer">
      <VisuallyHidden aria-live="assertive">
        <Text>{title}</Text>
      </VisuallyHidden>
      <Box className="header" isRow variant="calendar.calendarHeader" verticalAlign="middle">
        <IconButton
          ref={previousYearRef}
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
        {renderTitle}
        <IconButton
          {...nextButtonProps}
          aria-label="Next month navigation"
        >
          <Icon icon={ChevronRightIcon} size={18} title={{ name: 'Chevron Right Icon' }} />
        </IconButton>
        <IconButton
          ref={nextYearRef}
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

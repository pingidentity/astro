import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { AriaCalendarProps, CalendarAria } from 'react-aria';
import { createCalendar, DateValue, parseDate } from '@internationalized/date';
import ChevronDoubleLeftIcon from '@pingux/mdi-react/ChevronDoubleLeftIcon';
import ChevronDoubleRightIcon from '@pingux/mdi-react/ChevronDoubleRightIcon';
import ChevronLeftIcon from '@pingux/mdi-react/ChevronLeftIcon';
import ChevronRightIcon from '@pingux/mdi-react/ChevronRightIcon';
import { useCalendar } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { type CalendarState, type CalendarStateOptions, useCalendarState } from '@react-stately/calendar';

import { useLocalOrForwardRef } from '../../hooks';
import { Box, Button, Icon, IconButton, Text } from '../../index';
import { CalendarProps } from '../../types';

import CalendarGrid from './CalendarGrid';

const Calendar = forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
  const {
    defaultFocusedValue,
    defaultValue,
    hasAutoFocus,
    maxValue,
    minValue,
    value,
  } = props;
  const { locale } = useLocale();

  const calenderRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  const parsedDates = {
    value: (typeof value === 'string' && parseDate(value)) || value,
    defaultValue: (typeof defaultValue === 'string' && parseDate(defaultValue)) || defaultValue,
    defaultFocusedValue: (typeof defaultFocusedValue === 'string' && parseDate(defaultFocusedValue)) || defaultFocusedValue,
    maxValue: (typeof maxValue === 'string' && parseDate(maxValue)) || maxValue,
    minValue: (typeof minValue === 'string' && parseDate(minValue)) || minValue,
  };

  const state: CalendarState = useCalendarState({
    autoFocus: hasAutoFocus,
    ...props,
    ...parsedDates,
    locale,
    createCalendar,
  } as CalendarStateOptions);

  const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    { ...props, ...parsedDates } as AriaCalendarProps<DateValue>,
    state,
  ) as CalendarAria;

  // to remove warning for unknown event handler property `onFocusChange`.
  delete prevButtonProps.onFocusChange;
  delete nextButtonProps.onFocusChange;

  const [yearChangeDirection, setYearChangeDirection] = useState(null);
  const previousYearRef = useRef<HTMLButtonElement>(null);
  const nextYearRef = useRef<HTMLButtonElement>(null);

  const nav = {
    NEXT: 'next',
    PREVIOUS: 'previous',
  };

  // after updating visible year, reapplies focus to corresponding year buttons
  useEffect(() => {
    if (yearChangeDirection === nav.NEXT) {
      nextYearRef.current?.focus();
    }

    if (yearChangeDirection === nav.PREVIOUS) {
      previousYearRef.current?.focus();
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
      aria-level={3}
      fontWeight={3}
      flex={1}
    >
      {title}
    </Text>
  );
  return (
    <Box {...calendarProps} ref={calenderRef} variant="calendar.calendarContainer" role="group">
      <VisuallyHidden aria-live="assertive">
        <Text>{title}</Text>
      </VisuallyHidden>
      <Box className="header" isRow variant="calendar.calendarHeader" verticalAlign="middle">
        <IconButton
          ref={previousYearRef}
          onPress={() => handleYearSelection(nav.PREVIOUS)}
          mx="sm"
          p={0}
          isDisabled={prevButtonProps.isDisabled}
          aria-label="Previous year navigation"
        >
          <Icon icon={ChevronDoubleLeftIcon} size={25} title={{ name: 'Chevron Double Left Icon' }} />
        </IconButton>
        <IconButton
          {...prevButtonProps}
          aria-label="Previous month navigation"
          p={0}
        >
          <Icon icon={ChevronLeftIcon} size={25} title={{ name: 'Chevron Left Icon' }} />
        </IconButton>
        {renderTitle}
        <IconButton
          {...nextButtonProps}
          p={0}
          aria-label="Next month navigation"
        >
          <Icon icon={ChevronRightIcon} size={25} title={{ name: 'Chevron Right Icon' }} />
        </IconButton>
        <IconButton
          ref={nextYearRef}
          onPress={() => handleYearSelection(nav.NEXT)}
          mx="sm"
          p={0}
          isDisabled={nextButtonProps.isDisabled}
          aria-label="Next year navigation"
        >
          <Icon icon={ChevronDoubleRightIcon} size={25} title={{ name: 'Chevron Double Right Icon' }} />
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

export default Calendar;

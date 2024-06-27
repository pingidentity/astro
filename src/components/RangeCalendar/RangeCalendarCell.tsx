import React, {
  DOMAttributes,
  forwardRef,
  RefObject,
} from 'react';
import { isSameDay, isSameMonth } from '@internationalized/date';
import {
  AriaCalendarCellProps,
  CalendarCellAria,
  useCalendarCell,
} from '@react-aria/calendar';
import { useFocusRing } from '@react-aria/focus';
import { useHover, usePress } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { RangeCalendarState } from '@react-stately/calendar';

import { useLocalOrForwardRef, useStatusClasses } from '../../hooks';
import { Box, TableCell } from '../../index';
import {
  DateValue,
  FocusableElement,
  RangeCalendarCellProps,
} from '../../types';

const RangeCalendarCell = forwardRef<HTMLDivElement, RangeCalendarCellProps>(
  (props, ref) => {
    const { state, date, currentMonth, className, ...others } = props;

    const cellRef = useLocalOrForwardRef<HTMLDivElement>(ref);

    const {
      cellProps,
      buttonProps,
      isSelected,
      isOutsideVisibleRange,
      isUnavailable,
      formattedDate,
      isDisabled,
    }: CalendarCellAria = useCalendarCell(
      { date } as AriaCalendarCellProps,
      state as RangeCalendarState,
      cellRef as RefObject<HTMLDivElement>,
    );

    const { highlightedRange } = state;

    const isOutsideMonth = !isSameMonth(currentMonth, date as DateValue);

    // The start and end date of the selected range will have
    // an emphasized appearance.
    const isSelectionStart = highlightedRange
      ? isSameDay(date as DateValue, highlightedRange.start)
      : isSelected;
    const isSelectionEnd = highlightedRange
      ? isSameDay(date as DateValue, highlightedRange.end)
      : isSelected;

    const { hoverProps, isHovered } = useHover({});
    const { pressProps, isPressed } = usePress({
      ref: cellRef,
    });

    const { focusProps: focusWithinProps, isFocusVisible } = useFocusRing({
      within: true,
    });

    const mergedProps: DOMAttributes<FocusableElement> = mergeProps(
      cellProps,
      hoverProps,
      pressProps,
      focusWithinProps,
    );

    const { classNames } = useStatusClasses(className, {
      isSelected,
      isExtreme: isDisabled,
      isUnavailable,
      isPressed,
      isFocused: isFocusVisible,
      isHovered,
      isOutsideVisibleRange,
      isCompletelyDisabled: state.isDisabled,
      isRangeEnds: isSelectionStart || isSelectionEnd,
      isStartAndEnd: isSelectionStart && isSelectionEnd,
      isSelectionStart,
      isSelectionEnd,
    });

    return (
      <TableCell {...mergedProps} variant="rangeCalendar.calendarCell">
        <Box style={{ display: isOutsideMonth ? 'none' : 'flex' }}>
          <Box
            variant="rangeCalendar.calendarButton"
            ref={cellRef}
            {...mergeProps(buttonProps, others)}
            isSelected={isSelected}
            isDisabled={isDisabled}
            isUnavailable={isUnavailable}
            className={classNames}
          >
            {formattedDate}
          </Box>
        </Box>
      </TableCell>
    );
  },
);

export default RangeCalendarCell;

import React, { DOMAttributes, forwardRef, RefObject, useCallback } from 'react';
import { AriaCalendarCellProps, CalendarCellAria, useCalendarCell } from '@react-aria/calendar';
import { useFocusRing } from '@react-aria/focus';
import { useHover, usePress } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { CalendarState } from '@react-stately/calendar';

import { useLocalOrForwardRef, useStatusClasses } from '../../hooks';
import { Box, TableCell } from '../../index';
import { CalendarCellProps, FocusableElement } from '../../types';
/**
* Grid cell button element with the formatted day number.
* Utilizes the useCalendarCell hook to return  props for an individual cell,
* along with states and information.
*/

const CalendarCell = forwardRef<HTMLDivElement, CalendarCellProps>((props, ref) => {
  const {
    state,
    date,
    className,
    ...others
  } = props;

  const cellRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isUnavailable,
    formattedDate,
    isDisabled,
  }: CalendarCellAria = useCalendarCell({ date } as AriaCalendarCellProps,
    state as CalendarState,
    cellRef as RefObject<HTMLDivElement>);

  const { focusPreviousPage, focusNextPage, setFocused } = state;

  /**
   * Function handles the navigation and adds focus to previous or next month dates
   * from the visibly disabled dates in the current month.
   */

  const handleDisableClick = useCallback(() => {
    if (cellRef.current?.hidden && !state.isDisabled && Number(formattedDate) > 20) {
      setFocused(false);
      focusPreviousPage();
    } else if (cellRef.current?.hidden && !state.isDisabled && Number(formattedDate) < 15) {
      setFocused(false);
      focusNextPage();
    }
  }, [
    focusNextPage,
    focusPreviousPage,
    formattedDate,
    state,
    setFocused,
    cellRef,
  ]);

  const { hoverProps, isHovered } = useHover({});
  const { pressProps, isPressed } = usePress({ ref: cellRef, onPress: handleDisableClick });

  const {
    focusProps: focusWithinProps, isFocusVisible,
  } = useFocusRing({ within: true });

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
  });

  return (
    <TableCell
      {...mergedProps}
      variant="calendar.calendarCell"
    >
      <Box
        variant="calendar.calendarButton"
        ref={cellRef}
        hidden={isOutsideVisibleRange}
        {...mergeProps(buttonProps, others)}
        isSelected={isSelected}
        isDisabled={isDisabled}
        isUnavailable={isUnavailable}
        className={classNames}
      >
        {formattedDate}
      </Box>
    </TableCell>
  );
});


export default CalendarCell;

import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { useCalendarCell } from '@react-aria/calendar';
import { useFocusRing } from '@react-aria/focus';
import { useHover, usePress } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import PropTypes from 'prop-types';

import { useStatusClasses } from '../../hooks';
import { Box, TableCell } from '../../index';

/**
* Grid cell button element with the formatted day number.
* Utilizes the useCalendarCell hook to return  props for an individual cell,
* along with states and information.
*/

const CalendarCell = forwardRef((props, ref) => {
  const {
    state,
    date,
    className,
    ...others
  } = props;

  const cellRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => cellRef.current);

  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isUnavailable,
    formattedDate,
    isDisabled,
  } = useCalendarCell({ date }, state, cellRef);

  const { focusPreviousPage, focusNextPage, setFocused } = state;

  /**
   * Function handles the navigation and adds focus to previous or next month dates
   * from the visibly disabled dates in the current month.
   */

  const handleDisableClick = useCallback(() => {
    if (cellRef.current?.hidden && !state.isDisabled && formattedDate > 20) {
      setFocused(undefined);
      focusPreviousPage();
    } else if (cellRef.current?.hidden && !state.isDisabled && formattedDate < 15) {
      setFocused(undefined);
      focusNextPage();
    }
  }, [
    date,
    focusNextPage,
    focusPreviousPage,
    formattedDate,
    state,
    setFocused,
  ]);

  const { hoverProps, isHovered } = useHover({});
  const { pressProps, isPressed } = usePress({ ref: cellRef, onPress: handleDisableClick });

  const {
    focusProps: focusWithinProps, isFocusVisible,
  } = useFocusRing({ within: true });

  const mergedProps = mergeProps(
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
        isSelected={isSelected}
        isDisabled={isDisabled}
        isUnavailable={isUnavailable}
        className={classNames}
        {...mergeProps(buttonProps, others)}
      >
        {formattedDate}
      </Box>
    </TableCell>
  );
});

CalendarCell.propTypes = {
  isSelected: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isOutsideVisibleRange: PropTypes.bool,
  isUnavailable: PropTypes.bool,
  formattedDate: PropTypes.string,
  state: PropTypes.shape({
    focusPreviousPage: PropTypes.func,
    setValue: PropTypes.func,
    focusNextPage: PropTypes.func,
    setFocused: PropTypes.func,
    setFocusedDate: PropTypes.func,
    isDisabled: PropTypes.bool,
  }),
  date: PropTypes.shape({}),
};

export default CalendarCell;

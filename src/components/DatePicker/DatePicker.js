import React, { forwardRef, useRef } from 'react';
import { parseDate } from '@internationalized/date';
import { useDatePicker } from '@react-aria/datepicker';
import { FocusScope } from '@react-aria/focus';
import { useOverlayPosition } from '@react-aria/overlays';
import { mergeProps } from '@react-aria/utils';
import { useDatePickerState } from '@react-stately/datepicker';
import { omit } from 'lodash/object';
import PropTypes from 'prop-types';

import { Calendar, FieldHelperText, PopoverContainer } from '../../index';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import statuses from '../../utils/devUtils/constants/statuses';
import { isDateWithinRanges } from '../../utils/devUtils/props/isDateWithinRanges';

import DateField from './DateField';

/**
 * Console Warning: The state update warning is a known issue coming from the react-aria library.
 * The `is-selected` class is added to the button after the component unmounts.
 */

const DatePicker = forwardRef((props, ref) => {
  const {
    defaultValue,
    hasAutoFocus,
    helperText,
    isDefaultOpen,
    isReadOnly,
    maxValue,
    minValue,
    status,
    value,
    unavailableRanges,
  } = props;

  const groupRef = useRef();
  const popoverRef = useRef();

  /**
   *  This function is run against each date in the calendar
   */
  const isDateUnavailable = date => isDateWithinRanges(date, unavailableRanges);

  /**
   * To accept date value as an object or as a string in format YYYY-MM-DD
   */
  const parsedDates = {
    value: value || (value && parseDate(value)),
    defaultValue: defaultValue && parseDate(defaultValue),
    maxValue: maxValue && parseDate(maxValue),
    minValue: minValue && parseDate(minValue),
    isDateUnavailable: unavailableRanges && isDateUnavailable,
  };

  const state = useDatePickerState({
    autoFocus: hasAutoFocus,
    defaultOpen: isDefaultOpen,
    ...mergeProps(props, parsedDates),
  });

  const {
    buttonProps,
    calendarProps,
    dialogProps,
    fieldProps,
    groupProps,
    labelProps,
  } = useDatePicker(
    {
      autoFocus: hasAutoFocus,
      ...mergeProps(props, parsedDates),
    },
    state,
    groupRef,
  );

  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: groupRef,
    overlayRef: popoverRef,
    offset: 15,
    crossOffset: 40,
    isOpen: state.isOpen,
    onClose: state.setOpen,
    shouldUpdatePosition: true,
  });

  const calendar = !isReadOnly && (
    <PopoverContainer
      hasNoArrow
      isDismissable
      isNonModal
      ref={popoverRef}
      isOpen={state.isOpen}
      onClose={state.setOpen}
      overflow="auto"
      {...mergeProps(dialogProps, positionProps)}
    >
      <FocusScope
        autoFocus
        contain
        restoreFocus
      >
        <Calendar {...calendarProps} />
      </FocusScope>
    </PopoverContainer>
  );

  return (
    <>
      <DateField
        {...getPendoID('DatePicker')}
        {...props}
        ref={ref}
        buttonProps={buttonProps}
        fieldProps={fieldProps}
        groupProps={omit(groupProps, 'data-pendo-id')}
        groupRef={groupRef}
        helperText={helperText}
        labelProps={labelProps}
        isOpen={state.isOpen}
        status={status}
        datePickerState={state}
      />
      {calendar}
      {helperText && (
        <FieldHelperText status={status}>{helperText}</FieldHelperText>
      )}
    </>
  );
});

DatePicker.propTypes = {
  /** Prop to provide a custom default date (uncontrolled) */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Prop to provide a default date (controlled) */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Whether the element should receive focus on render. */
  hasAutoFocus: PropTypes.bool,
  /** Text rendered below the input displaying the expected date format for the user's locale. */
  hasFormatHelpText: PropTypes.bool,
  /** Text rendered below the input. */
  helperText: PropTypes.string,
  /** The element's unique identifier. */
  id: PropTypes.string,
  /**
   * Callback that is called for each date of the calendar.
   * If it returns true, then the date is unavailable.
   *
   * (date: DateValue) => boolean
   */
  isDateUnavailable: PropTypes.func,
  /** Sets the default open state of the overlay (uncontrolled). */
  isDefaultOpen: PropTypes.bool,
  /** Whether the calendar is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether the overlay is currently open (controlled). */
  isOpen: PropTypes.bool,
  /** Whether the calendar dates are only focusable. */
  isReadOnly: PropTypes.bool,
  /** Whether user input is required on the input before form submission. */
  isRequired: PropTypes.bool,
  /** The rendered label for the field. */
  label: PropTypes.node,
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
  /** Determines the textarea status indicator and helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
  /** The ranges of unavailable dates passed  */
  unavailableRanges: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

DateField.defaultProps = {
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
};

export default DatePicker;

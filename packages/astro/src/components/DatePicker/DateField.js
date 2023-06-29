import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FocusScope } from 'react-aria';
import { Item } from 'react-stately';
import { createCalendar, parseDate } from '@internationalized/date';
import CalendarIcon from '@pingux/mdi-react/CalendarIcon';
import { useDateField } from '@react-aria/datepicker';
import { useLocale } from '@react-aria/i18n';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useDateFieldState } from '@react-stately/datepicker';
import PropTypes from 'prop-types';

import { useField, useStatusClasses } from '../../hooks';
import {
  Box,
  FieldHelperText,
  Icon,
  IconButton,
  Input,
  Label,
  Messages,
} from '../../index';
import statuses from '../../utils/devUtils/constants/statuses';

import DateSegment from './DateSegment';

/**
 * DateFields allow users to enter and edit date using a keyboard.
 * Parts of the date is displayed in editable segments
 */

const ARIA_LABELS_CALENDAR_BUTTON_EXPANSION = {
  OPEN: 'Open the Calendar Popover',
  CLOSE: 'Close the Calendar Popover',
};

const DateField = forwardRef((props, ref) => {
  const {
    buttonProps,
    className,
    fieldProps,
    groupProps,
    groupRef,
    hasFormatHelpText,
    helperText,
    isDisabled,
    isOpen,
    isReadOnly,
    isRequired,
    status,
    datePickerState,
    minValue,
    maxValue,
    unavailableRanges,
    ...other
  } = props;

  const [errorMessage, setErrorMessage] = useState('');

  const fieldRef = useRef();
  const inputRef = useRef();
  const labelRef = useRef();

  // istanbul ignore next
  useImperativeHandle(ref, () => inputRef.current);

  const { locale } = useLocale();

  const state = useDateFieldState({
    ...fieldProps,
    locale,
    createCalendar,
  });

  const { classNames } = useStatusClasses(className, {
    isDisabled,
    isReadOnly,
    [`is-${status}`]: true,
  });

  const { segments } = state;
  const { setValue } = datePickerState;

  const { fieldProps: dateFieldProps } = useDateField({ ...fieldProps }, state, fieldRef);

  // removing a duplicate id, otherwise the groups element and field element each apply it
  delete dateFieldProps.id;

  // useDateFieldState does not return defaultValue so we separate it out to prevent control clashes
  const { defaultValue, ...others } = props;
  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = useField({
    ...others,
    value: state.value || '',
  });

  const toggleCalendarButtonAriaLabel = isOpen
    ? ARIA_LABELS_CALENDAR_BUTTON_EXPANSION.OPEN
    : ARIA_LABELS_CALENDAR_BUTTON_EXPANSION.CLOSE;

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
    return undefined;
  }, [errorMessage]);

  const getKey = (segment, index) => {
    return `${segment}-${index}`;
  };

  const isLocalEnUS = useMemo(() => {
    return locale === 'en-US';
  }, [locale]);

  /**
   * Reordering segments object for YYYY-MM-DD format
   */
  const enUSSegments = [];

  if (locale === 'en-US') {
    do {
      segments.forEach(item => {
        if (item.type === 'year' && enUSSegments.length === 0) {
          enUSSegments.push(item);
        }
        if (item.type === 'literal' && enUSSegments.length === 1) {
          enUSSegments.push(item);
        }
        if (item.type === 'month' && enUSSegments.length === 2) {
          enUSSegments.push(item);
        }
        if (item.type === 'literal' && enUSSegments.length === 3) {
          enUSSegments.push(item);
        }
        if (item.type === 'day' && enUSSegments.length === 4) {
          enUSSegments.push(item);
        }
      });
    } while (enUSSegments.length < 5);
  }

  /**
   * Creates an expected date format helper text and automatically changes based on locale.
   */

  const formatHelpText = useMemo(() => {
    return (isLocalEnUS ? enUSSegments : segments)
      .map(s => {
        return s.text;
      })
      .join(' ');
  }, [hasFormatHelpText]);

  const handlePaste = useCallback(
    e => {
      const copiedValue = e.clipboardData.getData('text');

      let isNextAvailableDate;
      const handleSetDateValue = isDate => {
        setValue(isDate);
      };

      if (isLocalEnUS && !isDisabled && !isReadOnly) {
        try {
          if (copiedValue.match(/^\d{4}-\d{2}-\d{2}$/) !== null) {
            const DateProps = {
              isMinValue: minValue && parseDate(minValue),
              isMaxValue: maxValue && parseDate(maxValue),
              isValidDate: parseDate(copiedValue),
            };

            // pastes the min/max/isNextAvailable date if the pasted value is
            // min date, beyond max date or is an unavailable date.

            if (DateProps.isValidDate <= DateProps.isMinValue) {
              return handleSetDateValue(DateProps.isMinValue);
            }

            if (DateProps.isValidDate >= DateProps.isMaxValue) {
              return handleSetDateValue(DateProps.isMaxValue);
            }

            if (unavailableRanges) {
              unavailableRanges.map(interval => {
                if (
                  DateProps.isValidDate >= parseDate(interval[0])
                  && DateProps.isValidDate <= parseDate(interval[1])
                ) {
                  isNextAvailableDate = parseDate(interval[1]).add({ days: 1 });
                  return (
                    isNextAvailableDate
                    && setErrorMessage(`Pasted value ${copiedValue} is an unavailable date`)
                  );
                }
                return null;
              });

              return handleSetDateValue(isNextAvailableDate || DateProps.isValidDate);
            }
            return handleSetDateValue(DateProps.isValidDate);
          }
          throw new Error();
        } catch (err) {
          setErrorMessage(
            `Invalid Date. Paste in YYYY-MM-DD format. Pasted value ${copiedValue}`,
          );
        }
      }
      return null;
    },
    [minValue, maxValue, unavailableRanges],
  );

  return (
    <Box
      variant="forms.input.fieldContainer"
      {...fieldContainerProps}
    >
      <Label
        {...fieldLabelProps}
        ref={labelRef}
      />
      <Box
        isRow
        variant="forms.datePicker.inSlotContainer"
        {...groupProps}
        ref={groupRef}
        className={classNames}
      >
        <Box {...fieldControlWrapperProps}>
          <VisuallyHidden>
            <Input
              ref={inputRef}
              tabIndex={-1}
              type="date/text"
              data-testid="date-field"
              {...fieldControlInputProps}
              aria-labelledby={labelRef?.current?.id}
            />
          </VisuallyHidden>
        </Box>
        <Box
          isRow
          variant="forms.datePicker.inputField"
          {...dateFieldProps}
          ref={fieldRef}
          className={classNames}
        >
          <FocusScope>
            {(isLocalEnUS ? enUSSegments : segments).map((segment, index) => (
              <DateSegment
                key={getKey(segment, index)}
                segment={segment}
                state={state}
                isDisabled={isDisabled}
                isReadOnly={isReadOnly}
                isRequired={isRequired}
                segments={isLocalEnUS ? enUSSegments : segments}
                handlePaste={handlePaste}
                segmentIndex={index}
                isLocalEnUS={isLocalEnUS}
                {...other}
              />
            ))}
          </FocusScope>
          <IconButton
            variant="datePicker.containedIcon"
            isDisabled={isDisabled || isReadOnly}
            {...buttonProps}
            aria-label={toggleCalendarButtonAriaLabel}
          >
            <Icon
              icon={CalendarIcon}
              title={{ name: 'Calendar Icon' }}
              size={20}
            />
          </IconButton>
        </Box>
      </Box>
      {hasFormatHelpText && <FieldHelperText>{formatHelpText}</FieldHelperText>}
      {errorMessage && (
        <Messages onClose={() => setErrorMessage('')}>
          <Item
            key="message1"
            status="error"
          >
            {errorMessage}
          </Item>
        </Messages>
      )}
    </Box>
  );
});

DateField.propTypes = {
  /** Prop to provide a custom default date (uncontrolled) */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Prop to provide a default date (controlled) */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Props object that is spread directly into the calendar button element. */
  buttonProps: PropTypes.shape({}),
  /** Props object that is spread directly into the root (top-level) element. */
  containerProps: PropTypes.shape({}),
  /** state management for a date picker component */
  datePickerState: PropTypes.shape({
    setValue: PropTypes.func,
  }),
  /** @ignore Props object that is spread directly into the segmented date field. */
  fieldProps: PropTypes.shape({}),
  /** @ignore Props passed to the box surrounding the input, button, and helper text. */
  groupProps: PropTypes.shape({}),
  /** @ignore Ref which is passed to the role="group" element. */
  groupRef: PropTypes.shape({}),
  /** Whether the input element is automatically focused when loaded onto the page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautofocus). */
  hasAutoFocus: PropTypes.bool,
  /** Text rendered below the input displaying the expected date format for the user's locale. */
  hasFormatHelpText: PropTypes.bool,
  /** Text rendered below the input. */
  helperText: PropTypes.node,
  /** Whether the field is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether the overlay is currently open. */
  isOpen: PropTypes.bool,
  /** Whether the input can be selected, but not changed by the user. */
  isReadOnly: PropTypes.bool,
  /** Whether the field is required. */
  isRequired: PropTypes.bool,
  /** Whether the field is quiet. */
  isQuiet: PropTypes.bool,
  /** Props object that is spread directly into the label element. */
  labelProps: PropTypes.shape({}),
  /** The maximum allowed date that a user may select. */
  maxValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** The minimum allowed date that a user may select. */
  minValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Handler that is called when the element's selection state changes. */
  onChange: PropTypes.func,
  /** Determines the input status indicator and helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
  /** The ranges of unavailable dates passed  */
  unavailableRanges: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  /** Props object that is spread directly into the input wrapper element. */
  wrapperProps: PropTypes.shape({}),
};

DateField.defaultProps = {
  hasAutoFocus: false,
  isDisabled: false,
  isQuiet: false,
  isReadOnly: false,
  isRequired: false,
  status: statuses.DEFAULT,
};

export default DateField;

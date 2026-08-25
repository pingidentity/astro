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
import type { DateSegment as DateSegmentType } from '@react-stately/datepicker';
import { useDateFieldState } from '@react-stately/datepicker';

import { useField, useStatusClasses } from '../../hooks';
import { FieldControlInputProps, UseFieldProps } from '../../hooks/useField/useField';
import {
  Box,
  FieldHelperText,
  Icon,
  IconButton,
  Input,
  Label,
  Messages,
} from '../../index';
import { DateFieldProps } from '../../types';
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

const DateField = forwardRef<HTMLInputElement, DateFieldProps>((props, ref) => {
  const {
    buttonProps,
    className,
    fieldProps,
    groupProps,
    groupRef,
    hasFormatHelpText,
    helperText,
    isDisabled = false,
    isOpen,
    isReadOnly = false,
    isRequired = false,
    isQuiet = false,
    status = statuses.DEFAULT,
    datePickerState,
    minValue,
    maxValue,
    unavailableRanges,
    fieldControlProps,
    hasAutoFocus = false,
    ...other
  } = props;

  const [errorMessage, setErrorMessage] = useState('');

  const fieldRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  // istanbul ignore next
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

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
  const { setValue } = datePickerState || ({} as NonNullable<typeof datePickerState>);

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
    value: (state.value ? String(state.value) : '') as string,
  } as UseFieldProps<DateFieldProps>);

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
  const enUSSegments: DateSegmentType[] = [];

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
        if (setValue) setValue(isDate);
      };

      if (isLocalEnUS && !isDisabled && !isReadOnly) {
        try {
          if (copiedValue.match(/^\d{4}-\d{2}-\d{2}$/) !== null) {
            const DateProps = {
              isMinValue: minValue && parseDate(minValue as string),
              isMaxValue: maxValue && parseDate(maxValue as string),
              isValidDate: parseDate(copiedValue),
            };

            // pastes the min/max/isNextAvailable date if the pasted value is
            // min date, beyond max date or is an unavailable date.

            if (DateProps.isMinValue && DateProps.isValidDate <= DateProps.isMinValue) {
              return handleSetDateValue(DateProps.isMinValue);
            }

            if (DateProps.isMaxValue && DateProps.isValidDate >= DateProps.isMaxValue) {
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
              type="date/text"
              data-testid="date-field"
              {...({ tabIndex: -1, ...fieldControlInputProps } as Omit<FieldControlInputProps, 'onChange'>)}
              aria-labelledby={labelRef?.current?.id}
            />
          </VisuallyHidden>
        </Box>
        <Box
          isRow
          variant="forms.datePicker.inputField"
          {...dateFieldProps}
          {...fieldControlProps}
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

export default DateField;

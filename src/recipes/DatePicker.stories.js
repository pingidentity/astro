import React, { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import CalendarIcon from 'mdi-react/CalendarIcon';
import moment from 'moment';

import { text } from '../components/Text/Text.styles';
import {
  Box,
  Icon,
  IconButton,
  PopoverContainer,
  TextField,
  useOverlayPosition,
  useOverlayTrigger,
  useOverlayTriggerState,
}
from '../index';
import statuses from '../utils/devUtils/constants/statuses';

import 'react-calendar/dist/Calendar.css';

export default {
  title: 'Recipes/Date Picker',
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

const sx = {
  calendarIcon: {
    position: 'absolute',
    right: 5,
    top: 8,
    width: 28,
    height: 28,
  },
  container: {
    maxWidth: 300,
    '.react-calendar': {
      width: 280,
      '& .react-calendar__month-view__days__day': {
        width: 40,
        height: 40,
        color: 'neutral.10',
        fontSize: 'sm',
        fontWeight: 1,
      },
      '& .react-calendar__navigation__label__labelText': text.itemTitle,
      '& .react-calendar__navigation__arrow, & .react-calendar__month-view__days__day--neighboringMonth': {
        color: 'neutral.40',
      },
      '& .react-calendar__month-view__weekdays': {
        borderBottom: '1px solid',
        borderColor: 'neutral.80',
      },
      '& .react-calendar__month-view__weekdays__weekday abbr': {
        textDecoration: 'none',
        textTransform: 'capitalize',
      },
      '& .react-calendar__month-view__days__day--weekend': {
        color: 'decorative.4',
      },
      '& .react-calendar__tile--active, & .react-calendar__tile--hasActive': {
        backgroundColor: 'active',
        color: 'white',
      },
      '& .react-calendar__year-view__months__month': {
        padding: '19px 0',
      },
      '& .react-calendar__decade-view__years__year, & .react-calendar__month-view__days__day, & .react-calendar__year-view__months__month': {
        '&:hover': {
          backgroundColor: 'rgba(70, 96, 162, .1);',
          color: 'neutral.10',
        },
      },
      '& .react-calendar__navigation': {
        marginBottom: 0,
      },
    },
  },
};

export const Default = () => {
  const dateFormat = 'YYYY-MM-DD';
  const [date, setDate] = useState(moment('2021-01-01', 'YYYY-MM-DD'));
  const [inputValue, setInputValue] = useState(date.format(dateFormat));
  const [error, setError] = useState(false);

  const triggerRef = React.useRef();
  const overlayRef = React.useRef();

  const popoverState = useOverlayTriggerState({});

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    popoverState,
    triggerRef,
  );

  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    offset: 15,
    isOpen: popoverState.isOpen,
    onClose: popoverState.close,
    shouldUpdatePosition: true,
  });

  const handleCalendarIconPress = useCallback(() => popoverState.open(), []);

  const handleInputChange = useCallback(({ target: { value } }) => {
    setInputValue(value);
  }, []);

  const handleOnBlur = useCallback(({ target: { value } }) => {
    const dateFromInput = moment(value);
    if (dateFromInput.isValid()) {
      setDate(dateFromInput);
      setInputValue(dateFromInput.format(dateFormat));
      setError(false);
    } else {
      setError(true);
    }
  }, []);

  const handleCalendarChange = useCallback(newDate => {
    setDate(moment(newDate));
    setInputValue(moment(newDate).format(dateFormat));
    setError(false);
  }, []);

  return (
    <Box sx={sx.container}>
      <TextField
        slots={{
          inContainer: (
            <IconButton
              aria-label="calendar-button"
              sx={sx.calendarIcon}
              onPress={handleCalendarIconPress}
              ref={triggerRef}
              {...triggerProps}
            >
              <Icon icon={CalendarIcon} size="sm" />
            </IconButton>
          ),
        }}
        onChange={handleInputChange}
        onBlur={handleOnBlur}
        helperText={error ? 'Invalid Date' : 'yyyy-mm-dd'}
        status={error ? statuses.ERROR : statuses.DEFAULT}
        value={inputValue}
        aria-label="data-picker-input"
      />
      <PopoverContainer
        {...overlayProps}
        {...positionProps}
        ref={overlayRef}
        isOpen={popoverState.isOpen}
        onClose={popoverState.close}
        hasNoArrow
        isDismissable
      >
        <Box sx={sx.container}>
          <Calendar onChange={handleCalendarChange} value={date.toDate()} />
        </Box>
      </PopoverContainer>
    </Box>
  );
};

import React, { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarIcon from 'mdi-react/CalendarIcon';
import moment from 'moment';
import { useOverlayPosition, useOverlayTrigger } from '@react-aria/overlays';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { Box, Icon, IconButton, TextField } from '../index';
import statuses from '../utils/devUtils/constants/statuses';
import PopoverContainer from '../components/PopoverContainer';
import { active, decorative, neutral, white } from '../styles/colors';
import { text } from '../styles/variants';

export default {
  title: 'Recipes/DatePicker',
};

const calendarSx = {
  '.react-calendar': {
    width: 280,
    '& .react-calendar__month-view__days__day': {
      width: 40,
      height: 40,
      color: neutral['10'],
      fontSize: 'sm',
      fontWeight: 1,
    },
    '& .react-calendar__navigation__label__labelText': text.itemTitle,
    '& .react-calendar__navigation__arrow, & .react-calendar__month-view__days__day--neighboringMonth': {
      color: neutral['40'],
    },
    '& .react-calendar__month-view__weekdays': {
      borderBottom: `1px solid ${neutral['80']}`,
    },
    '& .react-calendar__month-view__weekdays__weekday abbr': {
      textDecoration: 'none',
      textTransform: 'capitalize',
    },
    '& .react-calendar__month-view__days__day--weekend': {
      color: decorative['4'],
    },
    '& .react-calendar__tile--active, & .react-calendar__tile--hasActive': {
      background: active,
      color: white,
    },
    '& .react-calendar__year-view__months__month': {
      padding: '19px 0',
    },
    '& .react-calendar__decade-view__years__year, & .react-calendar__month-view__days__day, & .react-calendar__year-view__months__month': {
      '&:hover': {
        backgroundColor: 'rgba(70, 96, 162, .1);',
        color: neutral['10'],
      },
    },
    '& .react-calendar__navigation': {
      marginBottom: 0,
    },
  },
};

export const Default = () => {
  const dateFormat = 'YYYY-MM-DD';
  const [date, setDate] = useState(moment());
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

  const handleCalendarChange = useCallback((newDate) => {
    setDate(moment(newDate));
    setInputValue(moment(newDate).format(dateFormat));
    setError(false);
  }, []);

  return (
    <Box sx={{ maxWidth: 300 }}>
      <TextField
        slots={{
          inContainer: (
            <IconButton
              aria-label="calendar-button"
              sx={{
                position: 'absolute',
                right: 5,
                top: 8,
                width: 28,
                height: 28,
              }}
              onPress={handleCalendarIconPress}
              ref={triggerRef}
              {...triggerProps}
            >
              <Icon icon={CalendarIcon} size={20} />
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
        sx={calendarSx}
        isDismissable
      >
        <Calendar onChange={handleCalendarChange} value={date.toDate()} />
      </PopoverContainer>
    </Box>
  );
};

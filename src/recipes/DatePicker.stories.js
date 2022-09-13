import React, { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarIcon from 'mdi-react/CalendarIcon';
import moment from 'moment';
import { Box, Icon, IconButton, TextField, useOverlayPosition, useOverlayTrigger, useOverlayTriggerState } from '../index';
import statuses from '../utils/devUtils/constants/statuses';
import PopoverContainer from '../components/PopoverContainer';

export default {
  title: 'Recipes/DatePicker',
};

const sx = {
  calendarIcon: {
    position: 'absolute',
    right: 5,
    top: 8,
    width: 28,
    height: 28,
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

  const handleCalendarChange = useCallback((newDate) => {
    setDate(moment(newDate));
    setInputValue(moment(newDate).format(dateFormat));
    setError(false);
  }, []);

  return (
    <Box sx={{ maxWidth: 300 }} variant="boxes.dataPicker">
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
        isDismissable
      >
        <Box variant="boxes.datePicker">
          <Calendar onChange={handleCalendarChange} value={date.toDate()} />
        </Box>
      </PopoverContainer>
    </Box>
  );
};

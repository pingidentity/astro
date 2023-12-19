import { defaultFocus } from '../Button/Buttons.styles';

const calendarBody = {
  borderTop: '1px solid',
  borderTopColor: 'neutral.80',
  '& > tr:nth-of-type(odd) ': {
    backgroundColor: 'white',
  },
};

const calendarButton = {
  py: 'sm',
  fontSize: 'sm',
  fontWeight: 1,
  color: 'neutral.10',
  lineHeight: '16px',
  width: '40.5px',
  height: '40px',
  '&.is-hovered': {
    bg: 'accent.99',
    cursor: 'pointer',
  },
  '&.is-selected': {
    bg: 'active',
    color: 'white',
    outline: 'none',
    boxShadow: 'none',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-unavailable': {
    backgroundColor: 'neutral.80',
  },
  '&:not(.is-outside-visible-range)&.is-extreme&:not(.is-completely-disabled)': {
    backgroundColor: 'neutral.80',
    color: 'neutral.10',
    opacity: 1,
  },
};

const calendarCell = {
  cursor: 'default',
  textAlign: 'center',
  position: 'relative',
  color: '#333',
};

const columnHeader = {
  fontSize: '13px',
  fontWeight: 1,
  width: '40px',
  height: '16px',
  mb: '12px',
};

const calendarContainer = {
  boxShadow: 'standard',
  textAlign: 'center',
  maxWidth: '280px',
};

const calendarHeader = {
  justifyContent: 'space-between',
  mt: '10px',
  mb: '17px',
  alignItems: 'center',
};

export default {
  calendarBody,
  calendarButton,
  calendarCell,
  calendarContainer,
  calendarHeader,
  columnHeader,
};

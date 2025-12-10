import { defaultFocus } from '../Button/Buttons.styles';

const calendarBody = {
  pb: '10px',
  px: '1px',
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
  width: '40px',
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
    outlineOffset: '0px',
    zIndex: 1,
  },
  '&.is-unavailable': {
    backgroundColor: 'neutral.80',
  },
  '&:not(.is-outside-visible-range)&.is-extreme&:not(.is-completely-disabled)': {
    backgroundColor: 'neutral.80',
    color: 'neutral.10',
    opacity: 1,
  },
  '&.is-disabled': {
    '&.is-hovered': {
      backgroundColor: 'unset',
    },
  },
};

const calendarCell = {
  cursor: 'default',
  textAlign: 'center',
  position: 'relative',
  color: '#333',
  padding: '0',
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
  mb: '16px',
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

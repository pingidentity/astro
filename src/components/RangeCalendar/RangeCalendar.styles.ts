const calendarBody = {
  pb: 'sm',
  borderTop: '1px solid',
  borderTopColor: 'neutral.80',
  '& > tr:nth-of-type(odd) ': {
    backgroundColor: 'white',
  },
};

const calendarButton = {
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 'sm',
  fontWeight: 1,
  color: 'neutral.10',
  lineHeight: '16px',
  width: '40px',
  height: '40px',
  outline: 'none',
  '&.is-hovered': {
    bg: 'accent.99',
    cursor: 'pointer',
  },
  '&.is-selected': {
    bg: 'accent.99',
    '&.is-hovered': {
      bg: 'active',
      color: 'white',
    },
  },
  '&.is-range-ends': {
    bg: 'active',
    color: 'white',
    outline: 'none',
    boxShadow: 'none',
  },
  '&.is-selection-start': {
    borderRadius: '6px 0 0 6px',
  },
  '&.is-selection-end': {
    borderRadius: '0 6px 6px 0',
  },
  '&.is-start-and-end': {
    borderRadius: '0',
  },
  '&.is-focused': {
    outline: '1px',
    outlineStyle: 'solid',
    outlineColor: 'focus',
    outlineOffset: '-1px',
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
  width: '40px',
  height: '40px',
};

const columnHeader = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'text.primary',
  fontSize: 'sm',
  fontWeight: 1,
  width: '40px',
  height: '40px',
};

const calendarHeaderContainer = {
  justifyContent: 'space-between',
  mt: 'sm',
  alignItems: 'center',
  width: '586px',
  height: '31px',
};

const calendarHeader = {
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  width: '280px',
  height: '100%',
};

const calendarContainer = {
  width: '586px',
  textAlign: 'center',
};

export default {
  calendarBody,
  calendarButton,
  calendarCell,
  calendarContainer,
  calendarHeader,
  calendarHeaderContainer,
  columnHeader,
};

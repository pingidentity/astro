import { astroTokens } from '@pingux/onyx-tokens';

const calendarBody = {
  py: 'sm',
  borderTop: '1px solid',
  borderTopColor: 'border.separator',
  backgroundColor: 'backgroundBase',
  '& > tr:nth-of-type(odd) ': {
    backgroundColor: 'backgroundBase',
  },
};

const calendarButton = {
  height: '31px',
  width: '31px',
  fontWeight: '2',
  borderRadius: '50%',
  color: 'text.primary',
  '&.is-hovered': {
    bg: 'active',
    color: 'white',
    cursor: 'pointer',
  },
  '&.is-selected': {
    bg: 'lightteal',
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
    borderRadius: '50%',
  },
  '&.is-selection-end': {
    borderRadius: '50%',
  },
  '&.is-start-and-end': {
    borderRadius: '50%',
  },
  '&.is-focused': {
    outline: '2px',
    outlineStyle: 'solid',
    outlineColor: 'focus',
    outlineOffset: '2px',
  },
  '&.is-unavailable': {
    backgroundColor: astroTokens.color.gray[300],
    color: 'text.primary',
  },
  '&:not(.is-outside-visible-range)&.is-extreme&:not(.is-completely-disabled)': {
    backgroundColor: astroTokens.color.gray[300],
    color: 'text.primary',
    opacity: 1,
  },
  '&.is-disabled': {
    '&.is-hovered': {
      color: astroTokens.color.gray[900],
      backgroundColor: 'unset',
    },
  },
};

const calendarCell = {
  height: '36px',
};

const calendarHeaderContainer = {
  mt: 0,
  height: '26px',
  mb: 'md',
  width: '100%',
};

const columnHeader = {
  color: 'text.primary',
  fontWeight: 0,
  '&.is-disabled': {
    opacity: 0.65,
  },
};

const calendarContainer = {
  width: '611px',
  textAlign: 'center',
  color: 'backgroundBase',
  border: '1px solid',
  borderColor: 'border.hairline',
  boxShadow: 'standard',
  borderRadius: '16px',
  p: 'md',
};

const calendarRow = {
  bg: 'backgroundBase',
};

export default {
  calendarBody,
  calendarButton,
  calendarCell,
  calendarContainer,
  calendarHeaderContainer,
  columnHeader,
  calendarRow,
};

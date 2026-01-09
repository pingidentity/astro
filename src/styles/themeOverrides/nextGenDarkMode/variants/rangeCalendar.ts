const calendarButton = {
  color: 'text.secondary',
  '&.is-hovered': {
    bg: 'active',
    color: 'black',
    cursor: 'pointer',
  },
  '&.is-selected': {
    color: 'text.secondary',
    '&.is-hovered': {
      bg: 'active',
      color: 'black',
    },
  },
  '&.is-range-ends': {
    bg: 'active',
    color: 'black',
    outline: 'none',
    boxShadow: 'none',
  },
  '&.is-unavailable': {
    color: 'text.secondary',
    bg: 'border.dark',
  },
  '&:not(.is-outside-visible-range)&.is-extreme&:not(.is-completely-disabled)': {
    color: 'text.secondary',
    bg: 'border.dark',
    opacity: 1,
  },
  '&.is-disabled': {
    '&.is-hovered': {
      backgroundColor: 'unset',
      color: 'gray-100',
    },
  },
};

const columnHeader = {
  color: 'text.secondary',
};

export default {
  calendarButton,
  columnHeader,
};

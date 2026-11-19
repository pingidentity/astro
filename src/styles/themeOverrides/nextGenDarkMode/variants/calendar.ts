import { astroTokensDark } from '@pingux/onyx-tokens';

const calendarBody = {
  backgroundColor: 'backgroundBase',
  '& > tr:nth-of-type(odd) ': {
    backgroundColor: 'backgroundBase',
  },
};

const calendarButton = {
  color: 'text.primary',
  '&.is-focused, &:focus-visible': {
    outline: '2px solid',
    outlineColor: 'focus',
    outlineOffset: '2px',
    borderRadius: astroTokensDark.radius.xl,
  },
  '&.is-hovered': {
    bg: astroTokensDark.color.gray[700],
    color: 'text.primary',
    cursor: 'pointer',
  },
  '&.is-selected': {
    bg: 'active',
    color: 'text.reverse',
    '&.is-hovered': {
      bg: 'active',
      color: 'text.reverse',
    },
  },
  '&.is-unavailable': {
    color: 'text.primary',
    bg: astroTokensDark.color.gray[750],
    cursor: 'default',
  },
  '&:not(.is-outside-visible-range)&.is-extreme&:not(.is-completely-disabled)': {
    color: 'text.primary',
    bg: astroTokensDark.color.gray[750],
    opacity: 1,
    '&.is-hovered': {
      backgroundColor: astroTokensDark.color.gray[750],
      cursor: 'default',
    },
  },
  '&.is-disabled': {
    bg: astroTokensDark.color.gray[750],
    cursor: 'default',
    '&.is-hovered': {
      bg: astroTokensDark.color.gray[750],
    },
  },
};

const calendarCell = {
  color: 'text.primary',
  '&.is-outside-month': {
    opacity: 0.65,
    backgroundColor: 'transparent',
    color: 'text.secondary',
    '& > [hidden]': {
      color: 'text.secondary',
    },
    '&.is-completely-disabled': {
      backgroundColor: 'transparent',
      '& > [hidden]': {
        color: 'text.secondary',
      },
    },
    '&.is-unavailable': {
      backgroundColor: astroTokensDark.color.gray[750],
      color: 'text.primary',
      '& > [hidden]': {
        color: 'text.secondary',
      },
      '&.is-hovered': {
        backgroundColor: astroTokensDark.color.gray[750],
        color: 'text.primary',
      },
    },
    '&.is-extreme:not(.is-completely-disabled):not(.is-unavailable)': {
      backgroundColor: astroTokensDark.color.gray[750],
      color: 'text.primary',
      '& > [hidden]': {
        color: 'text.secondary',
      },
      '&.is-hovered': {
        backgroundColor: astroTokensDark.color.gray[750],
        color: 'text.primary',
      },
    },
  },
};

const calendarHeader = {
  // Month/year title renders at #F6F8FA per the Figma spec; the shared itemTitle
  // variant resolves to text.secondary (#C0C9D5) under the dark theme.
  color: 'text.primary',
  '& :is(div, span, h3)': {
    color: 'inherit',
  },
};

const columnHeader = {
  color: 'text.primary',
  borderBottom: '1px solid',
  borderBottomColor: astroTokensDark.color.common.border,
  pb: '32px',
  mb: '0',
};

const calendarContainer = {
  bg: 'backgroundBase',
  color: 'text.primary',
  border: '1px solid',
  borderColor: astroTokensDark.color.common.border,
};

const calendarRow = {
  bg: 'backgroundBase',
};

export default {
  calendarBody,
  calendarButton,
  calendarCell,
  calendarContainer,
  calendarHeader,
  calendarRow,
  columnHeader,
};

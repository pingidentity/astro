import { astroTokens } from '@pingux/onyx-tokens';
import { background, backgroundColor } from 'styled-system';

const calendarBody = {
  py: 'sm',
  borderTop: 'none',
  backgroundColor: 'backgroundBase',
  '& > tr:nth-of-type(odd) ': {
    backgroundColor: 'backgroundBase',
  },
};

const calendarButton = {
  height: '31px',
  width: '31px',
  margin: '0 auto',
  p: 0,
  fontWeight: '2',
  fontSize: 'small',
  borderRadius: astroTokens.radius.xl,
  color: 'text.primary',
  lineHeight: 1.6,
  justifyContent: 'center',
  '&.is-hovered': {
    bg: astroTokens.color.gray[100],
    color: 'text.primary',
    cursor: 'pointer',
  },
  '&.is-selected': {
    bg: 'active',
    color: 'text.reverse',
    borderRadius: astroTokens.radius.xl,
    outline: 'none',
    boxShadow: 'none',
  },
  '&.is-selection-start': {
    borderRadius: astroTokens.radius.xl,
  },
  '&.is-selection-end': {
    borderRadius: astroTokens.radius.xl,
  },
  '&.is-start-and-end': {
    borderRadius: astroTokens.radius.xl,
  },
  '&.is-focused, &:focus-visible': {
    outline: '2px',
    outlineStyle: 'solid',
    outlineColor: 'focus',
    outlineOffset: '2px',
  },
  '&.is-disabled': {
    backgroundColor: astroTokens.color.gray[300],
    cursor: 'default',
    '&.is-hovered': {
      backgroundColor: astroTokens.color.gray[300],
    },
  },

  '&.is-unavailable': {
    backgroundColor: astroTokens.color.gray[300],
    color: 'text.primary',
    '&.is-hovered': {
      cursor: 'default',
    },
  },
  '&:not(.is-unavailable)&.is-outside-month': {
    backgroundColor: 'unset',
  },
  '&:not(.is-outside-visible-range)&.is-extreme&:not(.is-completely-disabled)': {
    backgroundColor: astroTokens.color.gray[300],
    color: 'text.primary',
    cursor: 'default',
    '&.is-hovered': {
      backgroundColor: astroTokens.color.gray[300],
    },
  },
};

const calendarCell = {
  height: '36px',
  width: '40px',
  px: 0,
  color: 'text.primary',
  '&.is-outside-month': {
    opacity: 0.65,
    backgroundColor: 'transparent',
    color: 'text.secondary',
    '& [data-hidden="true"], & > [hidden]': {
      color: 'text.secondary',
    },
    '&.is-completely-disabled': {
      backgroundColor: 'transparent',
      color: 'text.secondary',
      '& > [hidden]': {
        color: 'text.secondary',
      },
      '&.is-hovered': {
        backgroundColor: 'transparent',
        color: 'text.secondary',
      },
    },
    '&.is-unavailable': {
      backgroundColor: astroTokens.color.gray[300],
      color: 'text.primary',
      '& > [hidden]': {
        color: 'text.secondary',
      },
      '&.is-hovered': {
        backgroundColor: astroTokens.color.gray[300],
        color: 'text.primary',
      },
    },
    '&.is-extreme:not(.is-completely-disabled):not(.is-unavailable)': {
      backgroundColor: astroTokens.color.gray[300],
      color: 'text.primary',
      '& > [hidden]': {
        color: 'text.secondary',
      },
      '&.is-hovered': {
        backgroundColor: astroTokens.color.gray[300],
        color: 'text.primary',
      },
    },
  },
};

const calendarHeader = {
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'text.primary',
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
  fontSize: 'small',
  borderBottom: '1px solid',
  borderBottomColor: astroTokens.color.gray[200],
  pb: '32px',
  mb: '0',
  '&.is-disabled': {
    opacity: 0.65,
  },
};

const calendarContainer = {
  boxShadow: `0 ${astroTokens.spacing.popover.shadow.y}px ${astroTokens.spacing.popover.shadow.blur}px 0 rgba(0, 0, 0, 0.18)`,
  border: '1px solid',
  borderColor: astroTokens.color.common.border,
  borderRadius: astroTokens.radius.xl,
  p: 'md',
  bg: 'backgroundBase',
  color: 'text.primary',
  maxWidth: '312px',
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
  calendarHeaderContainer,
  columnHeader,
  calendarRow,
};

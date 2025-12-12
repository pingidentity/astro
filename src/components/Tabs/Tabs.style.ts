import { borderRadius } from '../../styles/themes/next-gen/variants/listview';
import { defaultFocus, quiet } from '../Button/Buttons.styles';

export const tab = {
  pt: 10,
  cursor: 'pointer',
  alignItems: 'center',
  display: 'inline-flex',
  outline: 'none',
  transform: 'translateY(1px)',
  '&.is-focused': {
    '& > span': {
      ...defaultFocus,
      borderRadius: '4px',
    },
  },
  '&.is-disabled': {
    cursor: 'default',
  },
  '&.is-selected.is-vertical': {
    bg: 'accent.99',
  },
  '& > svg': {
    flexShrink: 0,
  },
  '&.is-vertical': {
    borderRadius: '0px',
    p: '12px 20px',
    WebkitAlignItems: 'start',
    '& > span': {
      m: '0',
      p: '0',
      fontSize: '14px',
      color: '#68747f',
    },
    '&.is-selected': {
      borderLeft: '3px solid',
      borderLeftColor: 'active',
      bg: 'accent.99',
      '& > span': {
        p: '0',
        color: 'active',
      },
      '& > div': {
        border: ' none',
        borderBottomColor: 'none',
        bg: 'transparent',
        height: '0px',
      },
    },
    '&.is-hovered:not(.is-selected)': {
      bg: '#f2f3f4',
    },
    '&.is-hovered.is-selected': {
      bg: 'accent.95',
    },
    '&.is-focused': {
      boxShadow: 'none',
      outline: '2px solid',
      outlineColor: 'active',
      borderRadius: '2px',
      zIndex: 1,
      '& > span': {
        outline: 'none',
      },
    },
  },

};

export const tabLine = {
  height: '2px',
  width: '100%',
  bg: 'active',
  flexShrink: 0,
};

export const tabPanel = {
  outline: 'none',
};

export const tabs = {
  mb: 'lg',
  '&.is-vertical': {
    borderRight: '1px solid #e4e6e9',
  },
  '&.is-horizontal': {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: 'neutral.90',
    gap: 'lg',
  },
};

export const menuTab = {
  ...quiet,
  color: 'neutral.40',
  alignItems: 'center',
  '&.is-selected *, &.is-hovered *': {
    color: 'active',
  },
  '& + *:not(div:first-of-type)': {
    ml: 'md',
  },
  '&.is-selected.is-vertical': {
    bg: 'accent.95',
  },
};

export const tabPanelBody = {};

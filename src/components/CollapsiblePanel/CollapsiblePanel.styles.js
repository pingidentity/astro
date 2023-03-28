import { defaultFocus, focusWithCroppedOutline, link } from '../Button/Buttons.styles';
import { square } from '../IconButton/IconButton.styles';
import { wordWrap } from '../Text/Text.styles';

const container = {
  pr: 'sm',
  minHeight: '80vh',

  '>div': {
    visibility: 'hidden',
    width: 0,
    transition: 'width .3s ease',
  },

  '&.is-open>div': {
    visibility: 'visible',
    width: '300px',
  },
};

const content = {
  bg: 'accent.99',
  fontSize: 'sm',
  height: '100%',
  width: '300px',

  '&.is-focused': {
    borderColor: 'accent.80',
    ...focusWithCroppedOutline,
  },
  '& div': {
    alignItems: 'center',
    display: 'flex',
    minHeight: '45px',
    padding: '3px',
    width: '100%',
    justifyContent: 'space-between',
  },
};

const containerTitle = {
  alignContent: 'center',
  fontWeight: '500',
  minHeight: '40px',
  alignItems: 'center',
  padding: '0 10px !important',
  flexWrap: 'wrap',
  maxWidth: 'max-content !important',
  margin: '0',
  width: '0',

  '.is-open &': {
    width: '300px',
  },
};

const badge = {
  borderRadius: '5px',
  display: 'flex',
  height: '17px',
  justifyContent: 'center',
  minWidth: 'max-content',
  position: 'relative',
  pb: '0px !important',
  pr: '3px !important',
  pl: '3px !important',
  alignItems: 'center',
  fontWeight: 500,

  '.is-open &.title-badge': {
    minWidth: '0',
    display: 'flex',
    transition: 'min-width .3s ease',
    width: 'max-content',
  },
  '&.title-badge': {
    display: 'none',
    width: '0',
  },
};

const item = {
  minHeight: '45px',
  margin: 'auto',
};

export const toggle = {
  ...square,
  bg: 'accent.99',
  borderRadius: '2px',
  height: '40px',
  minWidth: 'max-content',
  pl: 'xs',
  ml: '10px',
  path: {
    fill: 'active',
  },
  '&.is-hovered': {
    backgroundColor: 'accent.99',
  },
  '&.is-pressed': {
    backgroundColor: 'accent.99',
  },
  ':focus': {
    outline: 'none',
  },
  '&.is-focused': {
    ...defaultFocus,
    outlineOffset: '0',
    zIndex: 1,
  },
};

const neutralText = {
  ...link,
  color: 'neutral.10',
};

const itemText = {
  ...wordWrap,
  color: 'neutral.30',
  fontSize: 'sm',
  fontWeight: 500,
  overflow: 'hidden',
  marginRight: 'xs',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const title = {
  ...wordWrap,
  fontSize: 'sm',
  fontWeight: 500,
  color: 'text.secondary',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  mr: 'xs',
};

export default {
  container,
  content,
  containerTitle,
  badge,
  item,
  toggle,
  neutralText,
  itemText,
  title,
};

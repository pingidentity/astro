import accordionGrid from '../AccordionGridGroup/AccordionGrid.styles';
import { defaultFocus } from '../Button/Buttons.styles';
import { wordWrap } from '../Text/Text.styles';

const container = {
  height: '100%',
  width: '230px',
  position: 'absolute',
  zIndex: '1',
  top: '0',
  left: '0',
  backgroundColor: 'accent.20',
  overflowY: 'hidden',
};

const itemHeaderContainer = {
  flexGrow: 1,
  alignItems: 'center',
  maxWidth: '230px',
  padding: '10px 15px 10px 15px',
  cursor: 'pointer',
  minHeight: '40px',
  fontWeight: 0,
  fontSize: '16px',
  '&.is-selected': {
    backgroundColor: 'accent.5',
    boxShadow: 'inset 2px 0 0 0 white',
  },
};

const sectionContainer = {
  pt: '10px',
  height: '100%',
  maxHeight: '100%',
  overflowY: 'auto',
};

const sectionBody = {
  ...accordionGrid.body,
  pl: '0',
};

const itemButton = {
  textDecoration: 'none',
  outline: 'none',
  cursor: 'pointer',
  borderRadius: 0,
  backgroundColor: 'transparent',
  paddingTop: '5px',
  paddingBottom: '5px',
  display: 'block',
  color: 'neutral.95',
  fontSize: 'sm',
  fontWeight: 1,
  flexGrow: '1',
  width: '100%',
  textAlign: 'left',
  lineHeight: '16px',
  whiteSpace: 'break-spaces',
  overflowWrap: 'break-word',
  maxWidth: '100%',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-hovered': {
    bg: 'accent.10',
  },
  '&.is-selected': {
    bg: 'accent.5',
    boxShadow: 'inset 2px 0 0 0 white',
  },
  '&.is-pressed': {
    bg: 'accent.5',
  },
};

const subtitle = {
  ml: 'md',
  mb: '15px',
  fontWeight: 3,
  fontSize: '11px',
  color: 'accent.80',
  zIndex: '100',
};


const headerText = {
  ...wordWrap,
  whiteSpace: 'break-spaces',
  lineHeight: '13px',
  fontSize: '13px',
  fontWeight: 1,
  maxWidth: '150px',
  color: 'white',
};

const headerNav = {
  cursor: 'pointer',
  minHeight: '40px',
  lineHeight: '30px',
  outline: 'none',
  display: 'flex',
  justifyContent: 'flex-start',
  flexShrink: 0,
  wordBreak: 'inherit',
  whiteSpace: 'nowrap',
  color: 'neutral.95',
  flexGrow: 1,
  fontWeight: 0,
  fontSize: '16px',
  '&.is-focused': {
    outline: 'none',
    boxShadow: 'focus',
    WebkitBoxShadow: 'focus',
    MozBoxShadow: 'focus',
  },
  '&.is-hovered': {
    backgroundColor: 'accent.10',
  },
  '&.is-pressed': {
    backgroundColor: 'accent.5',
  },
};

const item = {
  ...headerNav,
  padding: '10px 15px 10px 15px',
  '&.is-selected': {
    backgroundColor: 'accent.5',
    boxShadow: 'inset 2px 0 0 0 white',
  },
};

export default {
  container,
  itemHeaderContainer,
  sectionContainer,
  sectionBody,
  itemButton,
  subtitle,
  headerText,
  headerNav,
  item,
};

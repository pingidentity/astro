import accordionGrid from '../AccordionGridGroup/AccordionGrid.styles';
import { defaultFocus, quiet } from '../Button/Buttons.styles';
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
  py: 'sm',
  px: 'md',
  cursor: 'pointer',
  minHeight: '40px',
  '&.is-selected': {
    backgroundColor: 'accent.5',
    boxShadow: 'inset 2px 0 0 0 white',
  },
};

const sectionContainer = {
  pt: 'sm',
  height: '100%',
  maxHeight: '100%',
  overflowY: 'auto',
  // these rules are for webkit browsers: chrome, safari, edge
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar': {
    width: 10,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'accent.10',
  },
  // this is a newer standard that only ff supports for now
  scrollbarColor: 'rgba(255, 255, 255, 0.2) rgba(0, 0, 0, 0.1)', // can't use theme values here, unfortunately
  // different colors while hovering over the nav bar
  '&:hover': {
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'accent.5',
    },
    scrollbarColor: 'rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0.2)',
  },
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
  paddingTop: 'sm',
  paddingBottom: 'sm',
  display: 'block',
  color: 'neutral.90',
  fontSize: 'md',
  fontWeight: 0,
  flexGrow: '1',
  width: '100%',
  textAlign: 'left',
  whiteSpace: 'break-spaces',
  overflowWrap: 'break-word',
  maxWidth: '100%',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
  '&.is-focused': {
    outline: '1px solid',
    outlineColor: 'focus',
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
  my: 'sm',
  fontWeight: 1,
  fontSize: 'sm',
  color: 'accent.80',
  zIndex: '100',
};


const headerText = {
  ...wordWrap,
  whiteSpace: 'break-spaces',
  lineHeight: 1,
  fontSize: 'md',
  fontWeight: 1,
  maxWidth: '150px',
  color: 'neutral.95',
  '.is-selected &': {
    color: 'white',
  },
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
  py: 'sm',
  px: 'md',
  '&.is-selected': {
    backgroundColor: 'accent.5',
    boxShadow: 'inset 2px 0 0 0 white',
  },
};

const sectionButton = {
  ...quiet,
  width: '100%',
  '&.is-focused': {
    outline: '1px solid',
    outlineColor: 'focus',
  },
  '&.is-hovered': {
    backgroundColor: 'accent.10',
  },
  '&.is-pressed': {
    backgroundColor: 'accent.5',
  },
};

export default {
  container,
  itemHeaderContainer,
  sectionContainer,
  sectionBody,
  sectionButton,
  itemButton,
  subtitle,
  headerText,
  headerNav,
  item,
};

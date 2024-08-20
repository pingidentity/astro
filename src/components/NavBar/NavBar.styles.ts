import accordionGrid from '../AccordionGridGroup/AccordionGrid.styles';
import { quiet } from '../Button/Buttons.styles';
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

const popUpContainer = {
  ...container,
  minWidth: '184px',
  maxWidth: '184px',
  width: '184px',
  backgroundColor: 'white',
  borderRight: '3px solid',
  borderRightColor: 'active',
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

const popUpItemHeaderContainer = {
  ...itemHeaderContainer,
  minHeight: '36px',
  maxWidth: '184px',
  pl: 'sm',
  pr: 'sm',
  '&.is-selected': {
    backgroundColor: 'active',
  },
};

const popUpItemListItem = {
  borderBottom: '1px solid #BDBDBD',
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

const popUpSectionContainer = {
  height: '100%',
  maxHeight: '100%',
  overflowY: 'auto',
  // these rules are for webkit browsers: chrome, safari, edge
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(147, 163, 219, 1)',
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar': {
    width: 7,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'accent.95',
  },
  // this is a newer standard that only ff supports for now
  scrollbarColor: 'rgba(229, 233, 248, 1) rgba(0, 0, 0, 0.1)', // can't use theme values here, unfortunately
  // different colors while hovering over the nav bar
  '&:hover': {
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(147, 163, 219, 1)',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'accent.95',
    },
    scrollbarColor: 'rgba(229, 233, 248, 1) rgba(0, 0, 0, 0.2)',
  },
};

const sectionBody = {
  ...accordionGrid.body,
  pl: '0',
};

const itemButton = {
  marginY: '2px',
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
  paddingLeft: '45px',
  paddingRight: 'md',
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

const popUpItemButton = {
  ...itemButton,
  fontSize: 'sm',
  px: 'sm',
  color: 'text.primary',
  '&.is-focused': {
    outline: '1px solid',
    outlineColor: 'focus',
    outlineOffset: '2px',
  },
  '&.is-selected': {
    bg: 'active',
    color: 'white',
  },
  '&.is-hovered': {
    bg: 'neutral.90',
    color: 'text.primary',
  },
  '&.is-pressed': {
    bg: 'active',
    color: 'white',
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

const popUpHeaderText = {
  ...headerText,
  fontWeight: 3,
  color: 'text.primary',
  '.is-pressed &': {
    color: 'white',
  },
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

const popUpItem = {
  ...headerNav,
  py: 'sm',
  px: 'md',
  '&.is-selected': {
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

const popUpSectionButton = {
  ...quiet,
  width: '100%',
  '&.is-focused': {
    outline: '1px solid',
    outlineColor: 'focus',
  },
  '&.is-hovered': {
    backgroundColor: 'neutral.90',
  },
  '&.is-pressed': {
    backgroundColor: 'active',
    color: 'white',
  },
  '&.is-pressed > div > div > svg > path': {
    fill: 'white !important',
  },
};

const navBarItemBody = {
  alignItems: 'stretch',
  overflow: 'hidden',
  transition: 'max-height 300ms ease, margin-bottom 300ms ease',
  height: 'fit-content',
  marginBottom: 0,
};

const popUpNavBarItemBody = {
  ...navBarItemBody,
  mb: 0,
};

const itemLinkButtonColor = {
  color: 'white',
};

const sectionList = {
  margin: 0,
  padding: 0,
  listStyle: 'none',
};

const itemIcon = {
  mr: 'sm',
  color: 'neutral.95',
  fill: 'neutral.95',
};

const itemIconSelected = {
  ...itemIcon,
  color: 'white',
  fill: 'white',
};

const itemCustomIcon = {
  color: 'neutral.95',
  fill: 'neutral.95',
  ml: 'auto',
};

const itemCustomIconSelected = {
  ...itemCustomIcon,
  color: 'white',
  fill: 'white',
};

export default {
  container,
  popUpContainer,
  itemHeaderContainer,
  popUpItemHeaderContainer,
  popUpItemListItem,
  sectionContainer,
  popUpSectionContainer,
  sectionBody,
  sectionButton,
  popUpSectionButton,
  itemButton,
  popUpItemButton,
  subtitle,
  headerText,
  popUpHeaderText,
  headerNav,
  item,
  popUpItem,
  navBarItemBody,
  popUpNavBarItemBody,
  itemLinkButtonColor,
  sectionList,
  itemIcon,
  itemIconSelected,
  itemCustomIcon,
  itemCustomIconSelected,
};

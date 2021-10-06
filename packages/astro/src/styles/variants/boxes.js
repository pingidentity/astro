const base = {
  display: 'flex',
};

const panel = {
  outline: 'none',
  position: 'relative',
  bg: 'white',
  borderLeft: 'separator',
  transition: 'margin 0.25s ease-in',
  visibility: 'hidden',
  '&.is-focused': {
    boxShadow: 'focus',
  },
  '&.is-visible': {
    visibility: 'visible',
  },
};

const card = {
  boxShadow: 'standard',
  p: 'lg',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '1 1 0',
};

// Used to give a border to radio elements
const radioContainer = {
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'active',
  borderRadius: 3,
  padding: 'md',
  mb: 'md',
};

// Used to add spacing for content shown when a radio is checked
const radioCheckedContent = {
  py: 'md',
};

const listItem = {
  ...base,
  flex: '1 1 0px',
  cursor: 'pointer',
  height: '64px',
  pl: 'md',
  pr: 'sm',
  pt: 16,
  pb: 16,
  justifyContent: 'center',
  bg: 'accent.99',
  '&.is-selected': {
    bg: 'white',
  },
  '&.is-hovered': {
    bg: 'white',
  },
};

const listViewItem = {
  ...base,
  padding: '0px 15px 0px 25px',
  flex: '1 1 0px',
  cursor: 'pointer',
  minHeight: '80px',
  justifyContent: 'center',
  bg: 'accent.99',
  outline: 'none',
  '&.is-selected': {
    bg: 'white',
  },
  '&.is-hovered': {
    bg: 'white',
  },
  '&.is-focused': {
    boxShadow: 'inset 0 0 5px #5873bdbf',
  },
};

const chip = {
  cursor: 'pointer',
  height: '15px',
  p: '10px',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '50px',
  alignSelf: 'flex-start',
  display: 'inline-flex !important',
  borderRadius: '5px',
};

const inputInContainerSlot = {
  position: 'absolute',
  bg: 'transparent',
  right: 'sm',
  top: '50%',
  transform: 'translateY(-50%)',
};

const copy = {
  alignItems: 'center',
  width: 'max-content',
  cursor: 'pointer',
  '& .is-focused': {
    boxShadow: 'inset 0 0 5px #5873bdbf',
  },
};

export default {
  base,
  card,
  chip,
  copy,
  inputInContainerSlot,
  listItem,
  listViewItem,
  panel,
  radioCheckedContent,
  radioContainer,
};

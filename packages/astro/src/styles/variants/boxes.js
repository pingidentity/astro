const base = {
  display: 'flex',
  width: '100%',
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
  minHeight: '80px',
  justifyContent: 'center',
  bg: 'accent.99',
  '&:hover': {
    bg: 'white',
  },
};

const chip = {
  cursor: 'pointer',
  height: '15px',
  p: '10px',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '50px',
  display: 'inline-flex',
  borderRadius: '5px',
};

export default {
  base,
  panel,
  radioContainer,
  radioCheckedContent,
  listItem,
  chip,
  card,
};

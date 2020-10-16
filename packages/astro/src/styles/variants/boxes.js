const base = {
  display: 'flex',
};

const panel = {
  outline: 'none',
  position: 'relative',
  bg: 'white',
  borderLeft: 'separator',
  transition: 'margin 0.25s ease-in',
};

// Used to give a blue left border to inputs
const inputContainer = {
  position: 'relative',
  '&:after': {
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    content: '""',
    position: 'absolute',
    bg: 'active',
    width: 3,
    top: 0,
    left: 0,
    bottom: 0,
  },
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

export default {
  base,
  inputContainer,
  panel,
  radioContainer,
  radioCheckedContent,
  listItem,
};

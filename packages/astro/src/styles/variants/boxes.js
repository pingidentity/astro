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

const listBoxSectionTitle = {
  fontSize: 'sm',
  fontWeight: '3',
  color: 'text.secondary',
  height: '36px',
  ml: 'sm',
  justifyContent: 'center',
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

const topShadowScrollbox = {
  '&.has-shadows.is-top-shadow-showing': {
    position: 'relative',
    zIndex: '10000',
    boxShadow: '0px 4px 2px 1px rgb(37, 55, 70, 0.15)',
    height: '4px',
    marginBottom: '-4px',
    backgroundColor: '#FFFFFF',
  },
};

const bottomShadowScrollbox = {
  '&.has-shadows.is-bottom-shadow-showing': {
    position: 'relative',
    zIndex: '10000',
    boxShadow: '0px -4px 2px 1px rgb(37, 55, 70, 0.15)',
    height: '4px',
    marginTop: '-2px',
    backgroundColor: '#FFFFFF',
  },
};

const scrollbox = {
  '&::-webkit-scrollbar': {
    display: 'none',
    width: '0px !important',
  },
  '&::-webkit-scrollbar-track': {
    width: '0px',
    display: 'none',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '0px',
    display: 'none',
  },
  position: 'relative',
  '& > *': {
    overflow: 'hidden auto',
  },
};

const expandableRow = {
  titleWrapper: {
    maxWidth: '50%',
  },
  lineChart: {
    alignCellRightWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    chart: {
      width: '50px',
      height: '18px',
    },
    chartWrapper: {
      '&:hover': {
        backgroundColor: '#4462ED1A',
      },
    },
    divider: {
      backgroundColor: 'neutral.80',
      height: '35px',
      width: '1px',
    },
  },
};

export default {
  base,
  card,
  chip,
  copy,
  expandableRow,
  inputInContainerSlot,
  listItem,
  listBoxSectionTitle,
  listViewItem,
  panel,
  radioCheckedContent,
  radioContainer,
  scrollbox,
  topShadowScrollbox,
  bottomShadowScrollbox,
};

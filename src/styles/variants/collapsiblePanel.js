const collapsiblePanelContainer = {
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

const collapsiblePanelContent = {
  bg: 'accent.99',
  fontSize: 'sm',
  height: '100%',
  width: '300px',

  '&.is-focused': {
    borderColor: 'accent.80',
    boxShadow: 'focus',
    outline: 'none',
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

const collapsiblePanelContainerTitle = {
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

const collapsiblePanelBadge = {
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

const collapsiblePanellItem = {
  minHeight: '45px',
  margin: 'auto',
};

export default {
  collapsiblePanelContainer,
  collapsiblePanelContent,
  collapsiblePanelContainerTitle,
  collapsiblePanelBadge,
  collapsiblePanellItem,
};

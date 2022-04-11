const multiselectListContainer = {
  overflowX: 'hidden',
  pr: 'sm',
  transition: 'right 500ms',
  minHeight: '80vh',
};

const multiselectListContent = {
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

const multiselectListTitle = {
  alignContent: 'center',
  bg: 'accent.99',
  display: 'flex',
  fontWeight: '500',
  minHeight: '40px',
  alignItems: 'center',
  padding: '0 10px !important',
  flexWrap: 'wrap',
  maxWidth: 'max-content !important',
  margin: '0',
};

const multiselectListBadge = {
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
};

const multiselectFilterItem = {
  minHeight: '45px',
  margin: 'auto',
};

export default {
  multiselectListContainer,
  multiselectListContent,
  multiselectListTitle,
  multiselectListBadge,
  multiselectFilterItem,
};

const accordion = {
  '&:not(:last-of-type)': {
    borderBottom: '1px solid',
    borderBottomColor: 'border.base',
  },
  pb: 'md',
  mb: 'md',
  mt: '0px',
};

const body = {
  pt: 'md',
};

const header = {
  '&.is-focused': {
    borderRadius: '2px',
  },
};

export default {
  accordion,
  body,
  header,
};

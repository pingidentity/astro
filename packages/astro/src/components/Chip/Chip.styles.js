export const baseChip = {
  cursor: 'default',
  p: '3px 5px 4px 5px',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '50px',
  alignSelf: 'flex-start',
  display: 'inline-flex !important',
  borderRadius: '5px',
  fontWeight: 1,
  '& button': {
    backgroundColor: 'transparent',
    marginLeft: 'xs',
    marginTop: '1px',
    padding: '0',
    '&.is-hovered': {
      backgroundColor: 'white',
    },
    '& .mdi-icon': {
      marginLeft: '0',
      padding: '2px',
    },
  },
};

const multivaluesChip = {
  ...baseChip,
  alignSelf: 'center',
  cursor: 'default',
  height: '100%',
  m: 5,
  mr: 10,
  ml: 0,
};

const selectedItemChip = {
  ...multivaluesChip,
  py: 3,
  pr: 0,
  my: 3,
};

const readOnlyChip = {
  ...multivaluesChip,
  p: 2.54,
  border: '1px solid',
  borderColor: 'neutral.80',
};

const environmentChip = {
  ...baseChip,
  alignSelf: 'center',
  height: '17px',
  minWidth: 'fit-content',
  ml: 8,
  '& span': {
    fontSize: 'xs',
    lineHeight: 1,
  },
};

const chipDeleteButton = {
  borderRadius: '50%',
  cursor: 'pointer',
  height: 14,
  mx: '3px !important',
  p: 0,
  width: 14,
  '&.is-focused, &.is-hovered': {
    bg: 'accent.40',
    borderColor: 'accent.40',
    boxShadow: 'standard',
    outline: 'none',
  },
  '&.is-pressed': {
    bg: 'accent.20',
    borderColor: 'accent.20',
  },
};

const countDefault = {
  ...baseChip,
  width: 'fit-content',
  minWidth: '17px',
  minHeight: '17px',
  p: '2px 5px 2px 5px',
  '& span': {
    fontSize: '11px',
    textTransform: 'uppercase',
  },
};

const countChip = {
  ...countDefault,
  backgroundColor: '#640099 !important',
};

const countNeutral = {
  ...countDefault,
  backgroundColor: '#E4E6E9 !important',
  '& span': {
    color: 'neutral.20',
    fontSize: '11px',
    textTransform: 'uppercase',
  },
};

export default {
  baseChip,
  environmentChip,
  multivaluesChip,
  readOnlyChip,
  selectedItemChip,
  chipDeleteButton,
  countChip,
  countNeutral,
};

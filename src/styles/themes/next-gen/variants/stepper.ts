const line = {
  mr: 'xs',
  borderBottomWidth: '2px',
  borderBottomColor: 'active',
  '&.is-inactive': {
    borderBottomStyle: 'solid',
    borderBottomColor: 'blue-200',
  },
};

const stepBase = {
  borderWidth: '2px',
  width: 32,
  height: 32,
  minWidth: 32,
  minHeight: 32,
  position: 'relative',
  fontWeight: 2,
  fontSize: 'md',
};

const tab = {
  mr: 'xs',
};

const step = {
  active: {
    backgroundColor: 'active',
    borderColor: 'active',
    color: 'backgroundBase',
    ...stepBase,
    '&:before': {
      content: '""',
      height: '24px',
      width: '24px',
      top: 0,
      left: 0,
      position: 'absolute',
      borderRadius: '100%',
      borderStyle: 'solid',
      borderColor: 'backgroundBase',
      borderWidth: '2px',
    },
  },
  completed: {
    ...stepBase,
    borderColor: 'active',
  },
  inactive: {
    backgroundColor: 'backgroundBase',
    borderColor: 'blue-200',
    color: 'active',
    ...stepBase,
  },
};

export default {
  tab,
  line,
  step,
};

/** Tabs styles */
import { defaultFocus } from '../Button/Buttons.styles';

const wrapper = {
  width: '100%',
};

const tabs = {
  outline: 'none',
  borderBottom: 'none',
  mb: 'lg',
  justifyContent: 'center',
  '&.is-horizontal': {
    width: '100%',
  },
  '&.is-vertical': {
    minWidth: '217px',
    borderRight: '1px solid #e4e6e9',
  },
};

export const verticalLine = {
  '&:before': {
    position: 'absolute',
    content: '""',
    borderLeft: '2px solid',
    borderLeftColor: 'neutral.80',
    left: '27px',
    top: '28px',
    height: '26px',
  },
};

const tab = {
  '&.is-horizontal': {
    mb: 0,
    mr: 0,
    outline: 'none',
    '&.is-focused': {
      borderRadius: '50%',
      ...defaultFocus,
    },
    '&:not(:first-of-type)': {
      flex: 1,
      maxWidth: 122,
    },
  },
  '&.is-vertical': {
    position: 'relative',
    height: '42px',
    width: '100%',
    py: '12px',
    px: '20px',
    ':focus-visible:not(.is-focused)': {
      outline: 'none',
    },
  },
};

const tabLabel = {
  mb: 0,
};

const outerWrapper = {
  alignItems: 'center',
};

/** Step styles */
const stepBase = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 32,
  height: 32,
  minWidth: 32,
  minHeight: 32,
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: '50%',
  fontSize: '17px',
  fontWeight: 3,
  cursor: 'pointer',
  fontFamily: 'standard',
  '&[aria-expanded="true"]': {
    backgroundColor: 'active',
    borderColor: 'active',
    color: 'text.primaryLight',
  },
};

const stepBaseVertical = {
  ...stepBase,
  width: 16,
  height: 16,
  minWidth: 16,
  minHeight: 16,

};

const step = {
  active: {
    '&.is-horizontal': {
      backgroundColor: 'accent.99',
      borderColor: 'active',
      color: 'active',
      ...stepBase,
    },
    '&.is-vertical': {
      ...stepBaseVertical,
      backgroundColor: '#fff',
      border: '4px solid',
      borderColor: 'active',
    },
  },
  completed: {
    '&.is-horizontal': {
      backgroundColor: 'active',
      borderColor: 'active',
      color: 'text.primaryLight',
      ...stepBase,
    },
    '&.is-vertical': {
      backgroundColor: 'active',
      borderColor: 'transparent',
      ...stepBaseVertical,
    },
  },
  inactive: {
    '&.is-horizontal': {
      backgroundColor: 'white',
      borderColor: 'neutral.80',
      color: 'neutral.40',
      ...stepBase,
    },
    '&.is-vertical': {
      ...stepBaseVertical,
      backgroundColor: '#caced3',
      border: '4px solid #fff',
    },
  },
};

/** Line styles */
const line = {
  alignSelf: 'center',
  width: '100%',
  maxWidth: '90px',
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderBottomColor: 'active',
  '&.is-inactive': {
    borderBottomStyle: 'dashed',
    borderBottomColor: 'neutral.80',
  },
};

export default {
  wrapper,
  tabs,
  tab,
  tabLabel,
  outerWrapper,
  step,
  line,
};

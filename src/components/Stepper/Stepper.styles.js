/** Tabs styles */
import { defaultFocus } from '../Button/Buttons.styles';

const wrapper = {
  width: '100%',
};

const tabs = {
  outline: 'none',
  borderBottom: 'none',
  mb: 0,
  width: '100%',
  justifyContent: 'center',
};

const tab = {
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
};

const tabLabel = {
  mb: 0,
};

const outerWrapper = {
  alignItems: 'center',
};

/** Step styles */
const stepBase = {
  width: 32,
  height: 32,
  minWidth: 32,
  minHeight: 32,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: '50%',
  fontSize: '17px',
  fontWeight: 3,
  cursor: 'pointer',
  '&[aria-expanded="true"]': {
    backgroundColor: 'active',
    borderColor: 'active',
    color: 'text.primaryLight',
  },
};

const step = {
  active: {
    backgroundColor: 'accent.99',
    borderColor: 'active',
    color: 'active',
    ...stepBase,
  },
  completed: {
    backgroundColor: 'active',
    borderColor: 'active',
    color: 'text.primaryLight',
    ...stepBase,
  },
  inactive: {
    backgroundColor: 'white',
    borderColor: 'neutral.80',
    color: 'neutral.40',
    ...stepBase,
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

import { astroTokens } from '@pingux/onyx-tokens';

import spacing from '../spacing';

const line = {
  mx: `${spacing.xs} !important`,
  maxWidth: '82px',
  borderBottomWidth: '2px',
  borderBottomColor: 'active',
  '&.is-inactive': {
    borderBottomStyle: 'solid',
    borderBottomColor: astroTokens.color.blue[200],
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
    '&.is-horizontal': {
      backgroundColor: 'active',
      borderColor: 'active',
      color: 'white',
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
        zIndex: 0,
      },
    },
  },
  completed: {
    ...stepBase,
    borderColor: 'active',
  },
  inactive: {
    '&.is-horizontal': {
      backgroundColor: 'backgroundBase',
      borderColor: astroTokens.color.blue[200],
      color: 'active',
      ...stepBase,
    },
  },
};

export default {
  tab,
  line,
  step,
};

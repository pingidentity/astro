import input, { slateInput } from './endUserInput';
import text from '../endUserText';

/**
 * listBoxPopup and option in this file only apply to astro <= 0.5.0
 *
 * Changes should be made to the endUserListBox and endUserPopoverMenu for
 * newer astro versions.
 */
const listBoxPopup = {
  ...input,
  position: 'absolute',
  width: '100%',
  padding: 0,
  zIndex: 2,
  borderTop: 'none',
  background: 'white',
  boxShadow: 'standard',
};

const option = {
  ...text.base,
  px: 'md',
  py: 'sm',
  alignItems: 'center',
  outline: 'none',
  cursor: 'pointer',
  '&.is-selected': {
    ...text.inputValue,
    pl: 0,
  },
  '&.is-focused': {
    color: 'white',
    bg: 'active',
  },
};

const transparent = {
  select: {
    bg: 'transparent',
  },
  '> div:after': {
    bg: 'transparent',
  },
};

const arrow = {
  marginTop: -5,
};

const endUserSelect = {
  ...input,
  arrow,
  lineHeight: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: 6,
  paddingTop: 6,
  svg: {
    height: 30,
    width: 30,
  },
  '&.is-focused': {
    boxShadow: 'focus',
  },
  '& :after': {
    display: 'none',
  },
  listBoxPopup,
  option,
  transparent,
};

const slateSelect = {
  ...slateInput,
  paddingTop: 10,
  paddingBottom: 5,
  '&:focus': {
    borderColor: null, // Dont change color, when active the dropdown will open
  },
  listBoxPopup: {
    borderRadius: 0,
  },
};

export const templateOverrides = {
  slate: slateSelect,
};

export default endUserSelect;

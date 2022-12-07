import { input } from '../Input/Input.styles';
// Styles for default input and variants go here.

export const baseField = {
  ...input,
  height: 'unset',
  '&.is-unresizable': {
    resize: 'none',
  },
  '.is-float-label &': {
    height: 'unset',
  },
};

const containerSlot = {
  position: 'absolute',
  bg: 'transparent',
  width: '20px',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
};

const floatLabelWrapper = {
  width: 'calc(100% - 4px)',
  backgroundColor: 'white',
  position: 'relative',
  height: '17px',
  bottom: '-18px',
  left: '3px',
  zIndex: 2,
};

export default {
  baseField,
  containerSlot,
  floatLabelWrapper,
};

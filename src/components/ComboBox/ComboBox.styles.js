import { input as inputBase } from '../Input/Input.styles';

const container = {
  position: 'relative',
};

const input = {
  ...inputBase,
  pr: 'xl',
};

const inputInContainerSlot = {
  position: 'absolute',
  bg: 'transparent',
  right: 'sm',
  top: '50%',
  transform: 'translateY(-50%)',
};

const button = {
  bg: 'transparent',
  color: 'text.primary',
  padding: 0,
};

export default {
  container,
  input,
  inputInContainerSlot,
  button,
};

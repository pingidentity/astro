import { text } from '../Text/Text.styles';

const closeIcon = {
  color: 'neutral.40',
};

const container = {
  position: 'fixed',
  zIndex: 100,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  background: '#00000040',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const content = {
  position: 'relative',
  outline: 'none',
  background: 'white',
  color: 'black',
  pt: 'md',
  pr: 'lg',
  pb: 'lg',
  pl: 'lg',
  maxWidth: '400px',
  boxShadow: 'standard',
  borderRadius: 3,
};

const title = {
  ...text.title,
  mr: 'sm',
  fontWeight: 3,
};

export const modalCloseButton = {
  position: 'absolute',
  top: 14,
  right: 10,
};

export default {
  closeIcon,
  container,
  content,
  title,
  modalCloseButton,
};

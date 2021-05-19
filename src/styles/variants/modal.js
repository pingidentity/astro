import { text } from '../variants/text';

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
  background: 'rgba(0, 0, 0, 0.25)',
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
  '.is-dark-mode &': {
    color: 'white',
    bg: 'accent.5',
  },
};

const dark = { ...container };

const title = {
  ...text.title,
  mr: 'sm',
  fontWeight: 3,
  '.is-dark-mode &': {
    color: 'white',
  },
};

export default {
  closeIcon,
  container,
  content,
  dark,
  title,
};

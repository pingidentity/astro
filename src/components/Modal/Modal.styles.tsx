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
  overflowY: 'auto',
};

const content = {
  outline: 'none',
  background: 'white',
  color: 'black',
  boxShadow: 'standard',
  borderRadius: 3,
  margin: 'auto',
  '&.is-extra-small': {
    maxWidth: 'none',
    width: 'container.xs',
  },
  '&.is-small': {
    maxWidth: 'none',
    width: 'container.sm',
  },
  '&.is-medium': {
    maxWidth: 'none',
    width: 'container.md',
  },
  '&.is-large': {
    maxWidth: 'none',
    width: 'container.lg',
  },
  '&.is-full': {
    maxWidth: 'none',
    width: 'container.full',
  },
};

const headingContainer = {
  position: 'relative',
  backgroundColor: 'background.base',
  px: 'lg',
  py: 'md',
};

const header = {
  position: 'relative',
  backgroundColor: 'background.base',
  pb: 'md',
};

const body = {
};

export const closeButton = {
  position: 'absolute',
  top: 0,
  right: -14,
  alignSelf: 'auto',
  width: '22px',
  height: '22px',
};

const bodyContainer = {
  px: 'lg',
};

const footer = {
  py: 'lg',
  background: 'white',
  '& > button': {
    flexGrow: 0,
  },
};

const buttonsContainer = {
  p: 0,
  pb: 'lg',
  pt: 'lg',
  background: 'white',
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
  alignSelf: 'auto',
  width: '22px',
  height: '22px',
};

export default {
  closeIcon,
  container,
  content,
  headingContainer,
  bodyContainer,
  title,
  modalCloseButton,
  buttonsContainer,
  header,
  body,
  footer,
  closeButton,
};

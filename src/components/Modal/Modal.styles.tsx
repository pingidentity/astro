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
  boxShadow: 'standard',
  borderRadius: 3,
  maxHeight: 'calc(100vh - 80px)', // 100% of the window minus 40px on top and bottom
  overflowY: 'auto',
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
  position: 'sticky',
  top: '-md',
  mt: '-md',
  mb: '-md',
  mr: '-lg',
  pt: 'md',
  pr: 'lg',
  pb: 'md',
  background: 'white',
};

const buttonsContainer = {
  position: 'sticky',
  bottom: '-lg',
  p: 0,
  mb: '-lg',
  pb: 'lg',
  pt: 'lg',
  background: 'white',

  '& > button': {
    flexGrow: 0,
  },
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
  width: '22px',
  height: '22px',
};

export default {
  closeIcon,
  container,
  content,
  headingContainer,
  buttonsContainer,
  title,
  modalCloseButton,
};

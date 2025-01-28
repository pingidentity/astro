const iconWrapper = {
  border: '1px solid',
  p: 'xs',
  borderColor: 'gray-200',
  borderRadius: '50%',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  minWidth: '32px',
  minHeight: '32px',
};

const attachmentWrapper = {
  alignItems: 'center',
  height: '60px',
  border: '1px solid',
  borderColor: 'gray-200',
  p: 'md',
  gap: 'sm',
  borderRadius: '4px',
  '&.is-not-loaded': {
    display: 'none',
  },
};

const toolbar = {
  '&.is-not-loaded': {
    display: 'none',
  },
};

export default {
  iconWrapper,
  attachmentWrapper,
  toolbar,
};

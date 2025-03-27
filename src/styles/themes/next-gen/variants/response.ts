const iconWrapper = {
  border: '1px solid',
  p: 'xs',
  borderColor: 'border.base',
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
  borderColor: 'border.base',
  p: 'md',
  gap: 'sm',
  borderRadius: '4px',
  '&.is-not-loaded': {
    display: 'none',
  },
};

const markupComplexContainer = {
  display: 'flex',
  flexDirection: 'column',
  '&.is-not-loaded': {
    display: 'none',
  },
};

const toolbar = {
  '&.is-not-loaded': {
    display: 'none',
  },
};

const list = {
  pl: 'md',
  listStyleType: 'disc',
  listStylePosition: 'inside',
  '&.is-numeric': {
    listStyleType: 'decimal',
  },
  '& > li': {
    '&:marker': {
      content: '"s"',
    },
  },
};

const textWrapper = {
  '&.has-bullet': {
    display: 'list-item !important',
  },
  '&.has-rendered': {
    display: 'list-item',
  },
  '&.has-block': {
    display: 'block',
  },
  '&::marker': {
    color: 'text.primary',
  },
  listStylePosition: 'outside',
};

export default {
  iconWrapper,
  list,
  attachmentWrapper,
  toolbar,
  markupComplexContainer,
  textWrapper,
};

import 'a11y-syntax-highlighting/dist/prism/a11y-light.min.css';

const wrapper = {
  bg: 'accent.99',
  border: '1px solid',
  borderColor: 'accent.95',
  width: 400,
  height: 200,
  my: 5,
  overflow: 'auto',
  alignItems: 'center',
  '&.is-focused, &:focus': {
    boxShadow: 'focus',
    outline: 'none',
  },
  pre: {
    backgroundColor: 'transparent',
    m: 0,
    p: 10,
    pr: 0,
    height: '100%',
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    fontFamily: 'standard',
    fontSize: 'sm',
    '& .token-line': {
      display: 'block',
      alignItems: 'center',
      '& .token': {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
      },
    },
  },
  '&.has-no-copy-button': {
    pre: {
      p: 10,
    },
  },
  '&.has-line-numbers': {
    pre: {
      p: '0 10px 0 0',
      overflow: 'auto',
      '& .token-line:first-of-type *': {
        pt: 10,
      },
      '& .token-line': {
        display: 'flex',
        '& .token': {
          whiteSpace: 'pre',
        },
      },
    },
  },
};

const lineNo = {
  display: 'table-cell',
  userSelect: 'none',
  p: 5,
  m: '0 10px 0 0',
  bg: 'accent.30',
  minWidth: 26,
  color: 'white',
};

export default {
  wrapper,
  lineNo,
};

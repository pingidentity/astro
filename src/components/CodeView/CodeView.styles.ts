const theme = {
  plain: {
    color: '#545454',
    background: 'none',
    lineHeight: 1.5,
    tabSize: 4,
    fontFamily: '"Roboto Mono", "Lucida Console", Courier, monospace',
  },
  styles: [
    {
      types: ['prolog', 'constant', 'builtin'],
      style: {
        color: 'rgb(189, 147, 249)',
      },
    },
    {
      types: ['inserted', 'function'],
      style: {
        color: 'rgb(80, 250, 123)',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgb(255, 85, 85)',
      },
    },
    {
      types: ['changed'],
      style: {
        color: 'rgb(255, 184, 108)',
      },
    },
    {
      types: ['punctuation', 'symbol'],
      style: {
        color: 'rgb(248, 248, 242)',
      },
    },
    {
      types: ['string', 'char', 'tag', 'selector'],
      style: {
        color: 'rgb(255, 121, 198)',
      },
    },
    {
      types: ['keyword', 'variable'],
      style: {
        color: 'rgb(189, 147, 249)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['comment'],
      style: {
        color: 'rgb(98, 114, 164)',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: 'rgb(241, 250, 140)',
      },
    },

    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#696969',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#545454',
      },
    },
    {
      types: ['property', 'tag', 'constant', 'symbol', 'deleted'],
      style: {
        color: '#007299',
      },
    },
    {
      types: ['boolean', 'number', 'operator', 'entity', 'url', 'variable'],
      style: {
        color: '#008000',
      },
    },
    {
      types: ['selector', 'attr-name', 'char', 'builtin', 'inserted', 'atrule', 'attr-value', 'function', 'string'],
      style: {
        color: '#aa5d00',
      },
    },
    {
      types: ['keyword', 'regex', 'important'],
      style: {
        color: '#d91e18',
      },
    },
    {
      types: ['keyword'],
      style: {
        fontStyle: 'normal',
      },
    },
  ],
};

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
    p: 'sm',
    pr: 0,
    height: '100%',
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    fontFamily: 'codeView',
    fontSize: '13px',
    lineHeight: 'md',
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
  px: 5,
  m: '0 10px 0 0',
  bg: 'accent.30',
  minWidth: 26,
  color: 'white',
  lineHeight: '20px',
};

export default {
  theme,
  wrapper,
  lineNo,
};

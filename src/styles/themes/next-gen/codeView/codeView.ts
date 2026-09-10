const nextGenCodeViewTheme = {
  plain: {
    color: '#999999',
    backgroundColor: 'codeEditor.backgroundColor',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#93a1a1',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#999999',
      },
    },
    {
      types: ['deleted', 'property', 'tag', 'boolean', 'number', 'constant', 'symbol'],
      style: {
        color: '#c792ea',
      },
    },
    {
      types: ['inserted', 'selector', 'string', 'char', 'builtin', 'inserted', 'attr-name'],
      style: {
        color: '#A1C281',
      },
    },
    {
      types: ['operator', 'entity', 'url', 'language-css', 'style'],
      style: {
        color: '#dfc084',
        background: 'transparent',
      },
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: {
        color: '#c792ea',
      },
    },
    {
      types: ['function'],
      style: {
        color: '#53bcfd',
      },
    },
    {
      types: ['regex', 'important', 'variable'],
      style: {
        color: '#f07178',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['entity'],
      style: {
        cursor: 'help',
      },
    },
  ],
};

const nextGenCodeViewWrapper = {
  backgroundColor: 'codeEditor.backgroundColor',
  border: '1px solid',
  borderColor: 'codeEditor.headerColor',
  borderRadius: '4px',
  width: 400,
  height: 200,
  my: 'xs',
  overflow: 'auto',
  alignItems: 'center',
  '&.is-focused, &:focus': {
    boxShadow: 'focus',
    outline: 'none',
  },
  pre: {
    backgroundColor: 'transparent',
    padding: 'md',
    height: '100%',
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    fontSize: '13px',
    '& .token-line': {
      display: 'block',
      alignItems: 'center',
      '& .token': {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
      },
    },
    fontFamily: 'codeView',
    lineHeight: 'md',
  },
  '&.has-no-copy-button': {
    pre: {
      p: 'sm',
    },
  },
  '&.has-line-numbers': {
    pre: {
      p: '0 10px 0 0',
      overflow: 'auto',
      '& .token-line:first-of-type *': {
        pt: 'sm',
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

const nextGenCodeViewHeader = {
  backgroundColor: 'codeEditor.headerColor',
  color: 'font.reverse',
  px: 'md',
  width: '100%',
  borderBottom: '1px solid',
  borderBottomColor: 'gray-800',
  lineHeight: 'body',
};

const lineNo = {
  display: 'table-cell',
  userSelect: 'none',
  px: 'xs',
  m: '0 10px 0 0',
  bg: 'accent.30',
  minWidth: 26,
  color: '#93A1A1',
  lineHeight: '20px',
  backgroundColor: 'transparent',
};

export const copyButton = {
  default: {
    mx: 'sm',
    path: {
      fill: 'white',
    },
    border: 'none !important',
  },
  light: {
    mx: 'sm',
    path: {
      fill: 'black',
    },
    border: 'none !important',
  },
};

const codeView = {
  theme: nextGenCodeViewTheme,
  wrapper: nextGenCodeViewWrapper,
  lineNo,
  header: nextGenCodeViewHeader,
  copyButton,
};

const light = {
  ...codeView,
  theme: {
    ...nextGenCodeViewTheme,
    styles: [
      ...nextGenCodeViewTheme.styles,
      {
        types: ['comment', 'prolog', 'doctype', 'cdata'],
        style: {
          color: '#94a0a0',
        },
      },
      {
        types: ['deleted', 'property', 'tag', 'boolean', 'number', 'constant', 'symbol'],
        style: {
          color: '#99329f',
        },
      },
      {
        types: ['inserted', 'selector', 'string', 'char', 'builtin', 'inserted', 'attr-name'],
        style: {
          color: '#63a058',
        },
      },
      {
        types: ['operator', 'entity', 'url', 'language-css', 'style'],
        style: {
          color: '#a67f35',
          background: 'transparent',
        },
      },
      {
        types: ['atrule', 'attr-value', 'keyword'],
        style: {
          color: '#99329f',
        },
      },
      {
        types: ['function'],
        style: {
          color: '#4e76ea',
        },
      },
      {
        types: ['regex', 'important', 'variable'],
        style: {
          color: '#f07178',
        },
      },
      {
        types: ['important', 'bold'],
        style: {
          fontWeight: 'bold',
        },
      },
      {
        types: ['entity'],
        style: {
          cursor: 'help',
        },
      },
    ],
  },
  wrapper: {
    ...nextGenCodeViewWrapper,
    backgroundColor: '#f7f8fa',
    borderColor: '#f7f8fa',
  },
  header: {
    ...nextGenCodeViewHeader,
    backgroundColor: '#f7f8fa',
    borderBottomColor: '#e6edf5',
    color: '#23282f',
  },
};

export default {
  default: codeView,
  light,
};

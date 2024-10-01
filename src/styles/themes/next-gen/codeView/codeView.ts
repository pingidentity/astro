const nextGenCodeViewTheme = {
  plain: {
    color: '#f8f8f2',
    backgroundColor: '#23282e',
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
  backgroundColor: 'gray-900',
  border: '1px solid',
  borderColor: 'gray-900',
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
  color: 'gray-300',
  px: 'md',
  width: '100%',
  border: '1px solid',
  borderColor: 'gray-800',
  lineHeight: 'body',
};

const lineNo = {
  display: 'table-cell',
  userSelect: 'none',
  px: 'xs',
  m: '0 10px 0 0',
  bg: 'accent.30',
  minWidth: 26,
  color: 'white',
  lineHeight: '20px',
};

export const copyButton = {
  path: {
    fill: 'gray-300',
  },
};

export default {
  theme: nextGenCodeViewTheme,
  wrapper: nextGenCodeViewWrapper,
  lineNo,
  header: nextGenCodeViewHeader,
};

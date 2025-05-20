const hTags = {
  h1: {
    fontSize: 'xxx',
    fontWeight: 2,
    color: 'text.secondary',
    fontFamily: 'standard',
  },
  h2: {
    fontSize: 'xx',
    fontWeight: 2,
    color: 'text.secondary',
    fontFamily: 'standard',
  },
  h3: {
    fontSize: 'xl',
    fontWeight: 2,
    color: 'text.secondary',
    fontFamily: 'standard',
  },
  h4: {
    fontSize: 'lg',
    fontWeight: 2,
    color: 'text.secondary',
    fontFamily: 'standard',
  },
  h5: {
    fontSize: 'md',
    fontWeight: 2,
    color: 'text.secondary',
    fontFamily: 'standard',
  },
  h6: {
    textTransform: 'uppercase',
    color: 'text.secondary',
    fontFamily: 'standard',
    fontWeight: 1,
    fontSize: 'xs',
  },
};

export const text = {
  sideNavHeader: {
    py: 'sm',
    lineHeight: 'body',
    textDecoration: 'none',
    color: 'text.secondary',
    px: '0',
    fontWeight: '1',
    letterSpacing: '1px',
  },
  suggestion: {
    fontSize: 'md',
    fontFamily: 'standard',
    color: 'text.primary',
    lineHeight: '24px',
  },
  tabLabel: {
    color: 'text.primary',
  },
  placeholder: {
    color: 'gray-500',
    fontWeight: 1,
  },
  paragraph: {
    lineHeight: 'body',
  },
  listViewItemText: {
    fontFamily: 'standard',
    color: 'text.primary',
    fontWeight: 2,
    mb: 'xs',
    fontSize: 'md',
  },
  listViewItemSubtext: {
    fontSize: 'md',
    lineHeight: 'body',
    color: 'gray-700',
  },
  itemTitle: {
    fontWeight: 2,
    color: 'text.primary',
  },
  small: {
    fontSize: 'sm',
    fontFamily: 'standard',
    lineHeight: 'md',
    color: 'text.primary',
  },
  response: {
    color: 'text.primary',
    fontFamily: 'standard',
    fontSize: 'md',
    display: 'block',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.6rem',
    '&.has-bullet': {
      display: 'list-item',
    },
    '&::marker': {
      color: 'text.primary',
    },
  },
  ...hTags,
  aiPanelHeader: {
    fontFamily: 'standard',
    color: 'text.primary',
    fontSize: 'lg',
    fontWeight: 2,
  },
};

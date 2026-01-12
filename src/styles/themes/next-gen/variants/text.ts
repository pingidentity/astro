const hTags = {
  H1: {
    fontSize: 'xxx',
    fontWeight: 2,
    color: 'text.primary',
    fontFamily: 'standard',
  },
  H2: {
    fontSize: 'xx',
    fontWeight: 2,
    color: 'text.primary',
    fontFamily: 'standard',
  },
  H3: {
    fontSize: 'xl',
    fontWeight: 2,
    color: 'text.primary',
    fontFamily: 'standard',
  },
  H4: {
    fontSize: 'lg',
    fontWeight: 2,
    color: 'text.primary',
    fontFamily: 'standard',
  },
  H5: {
    fontSize: 'md',
    fontWeight: 2,
    color: 'text.primary',
    fontFamily: 'standard',
  },
  H6: {
    textTransform: 'uppercase',
    color: 'text.primary',
    fontFamily: 'standard',
    fontWeight: 1,
    fontSize: 'xs',
    letterSpacing: '1px',
  },
  h1: {
    fontSize: 'xxx',
    fontWeight: 2,
    color: 'text.primary',
    fontFamily: 'standard',
  },
  h2: {
    fontSize: 'xx',
    fontWeight: 2,
    color: 'text.primary',
    fontFamily: 'standard',
  },
  h3: {
    fontSize: 'xl',
    fontWeight: 2,
    color: 'text.primary',
    fontFamily: 'standard',
  },
  h4: {
    fontSize: 'lg',
    fontWeight: 2,
    color: 'text.primary',
    fontFamily: 'standard',
  },
  h5: {
    fontSize: 'md',
    fontWeight: 2,
    color: 'text.primary',
    fontFamily: 'standard',
  },
  h6: {
    textTransform: 'uppercase',
    color: 'text.primary',
    fontFamily: 'standard',
    fontWeight: 1,
    fontSize: 'xs',
    letterSpacing: '1px',
  },
};

const buttonTitle = {
  fontSize: '13px',
};

const buttonSubtitle = {
  fontSize: '13px',
  fontWeight: 2,
};

const stepperTabContent = {
  fontSize: 'md',
  color: 'font.base',
  lineHeight: 'body',
};

const stepperTabContentHeader = {
  ...hTags.H2,
  color: 'font.base',
};

export const text = {
  base: {
    lineHeight: 'body',
  },
  buttonSubtitle,
  buttonTitle,
  pageHeaderBody: {
    lineHeight: '150%',
    color: 'text.primary',
  },
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
    wordBreak: 'normal',
  },
  placeholder: {
    color: 'gray-600',
    fontWeight: 1,
  },
  paragraph: {
    lineHeight: 'body',
  },
  listViewItemText: {
    fontSize: 'md',
    fontFamily: 'standard',
    color: 'text.primary',
    fontWeight: 2,
    lineHeight: 'sm',
  },
  listViewItemExpandedText: {
    mt: 'md',
    fontWeight: 0,
    lineHeight: 'body',
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
  panelHeaderText: {
    ...hTags.h4,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'font.base',
    lineHeight: 'xs',
  },
  messagesText: {
    '&.is-success, &.is-warning, &.is-error, &.is-default': {
      color: 'gray-700',
      '& > a': {
        fontWeight: '600',
        textDecoration: 'underline',
        color: 'gray-700',
      },
    },
  },
  panelHeaderSubtext: {
    fontSize: 'md',
    lineHeight: 'body',
    color: 'font.light',
  },
  stepperTabContent,
  stepperTabContentHeader,
};

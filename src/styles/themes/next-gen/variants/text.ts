import { astroTokens } from '@pingux/onyx-tokens';

const fontSizes = astroTokens.default['font-size'];

const hTags = {
  H1: {
    lineHeight: '1.2',
    fontSize: fontSizes.h1,
    fontWeight: 2,
    color: 'font.base',
    fontFamily: 'standard',
  },
  H2: {
    lineHeight: '1.2',
    fontSize: fontSizes.h2,
    fontWeight: 2,
    color: 'font.base',
    fontFamily: 'standard',
  },
  H3: {
    lineHeight: '1.2',
    fontSize: fontSizes.h3,
    fontWeight: 2,
    color: 'font.base',
    fontFamily: 'standard',
  },
  H4: {
    lineHeight: '1.2',
    fontSize: fontSizes.h4,
    fontWeight: 2,
    color: 'font.base',
    fontFamily: 'standard',
  },
  H5: {
    lineHeight: '1.2',
    fontSize: fontSizes.h5,
    fontWeight: 2,
    color: 'font.base',
    fontFamily: 'standard',
  },
  H6: {
    lineHeight: '1.2',
    textTransform: 'uppercase',
    color: 'font.base',
    fontFamily: 'standard',
    fontWeight: 1,
    fontSize: fontSizes.h6,
    letterSpacing: '1px',
  },
  h1: {
    lineHeight: '1.2',
    fontSize: fontSizes.h1,
    fontWeight: 2,
    color: 'font.base',
    fontFamily: 'standard',
  },
  h2: {
    lineHeight: '1.2',
    fontSize: fontSizes.h2,
    fontWeight: 2,
    color: 'font.base',
    fontFamily: 'standard',
  },
  h3: {
    lineHeight: '1.2',
    fontSize: fontSizes.h3,
    fontWeight: 2,
    color: 'font.base',
    fontFamily: 'standard',
  },
  h4: {
    lineHeight: '1.2',
    fontSize: fontSizes.h4,
    fontWeight: 2,
    color: 'font.base',
    fontFamily: 'standard',
  },
  h5: {
    lineHeight: '1.2',
    fontSize: fontSizes.h5,
    fontWeight: 2,
    color: 'font.base',
    fontFamily: 'standard',
  },
  h6: {
    lineHeight: '1.2',
    textTransform: 'uppercase',
    color: 'font.base',
    fontFamily: 'standard',
    fontWeight: 1,
    fontSize: fontSizes.h6,
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

const modalTitle = {
  ...hTags.H3,
  lineHeight: '2rem',
};

const label = {
  fontSize: fontSizes.label,
};

export const text = {
  base: {
    lineHeight: 'body',
  },
  modalTitle,
  buttonSubtitle,
  buttonTitle,
  pageHeaderBody: {
    lineHeight: 'body',
    color: 'text.primary',
    fontSize: 'md',
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
    color: astroTokens.color.font.base,
    wordBreak: 'normal',
    lineHeight: 'body',
    mb: 'sm',
    mt: 'sm',
    '.is-selected &': {
      color: astroTokens.color.font.link,
      mb: 'sm',
    },
    '.is-selected &, .is-hovered &': {
      color: astroTokens.color.font.link,
    },
  },
  placeholder: {
    color: astroTokens.color.gray[600],
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
    color: 'font.light',
    mt: 0,
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
      color: astroTokens.color.gray[700],
      '& > a': {
        fontWeight: '600',
        textDecoration: 'underline',
        color: astroTokens.color.gray[700],
      },
    },
  },
  panelHeaderSubtext: {
    fontSize: 'md',
    lineHeight: 'body',
    color: 'font.light',
    marginTop: '0px !important',
  },
  pageHeaderTitle: {
    lineHeight: 'xs',
    fontSize: 'xxx',
    fontWeight: 2,
  },
  requirementsListText: {
    color: 'font.base',
    fontSize: 'md',
    fontWeight: 0,
    lineHeight: 'body',
  },
  stepperTabContent,
  stepperTabContentHeader,
  label,
  linkSelectFieldLabel: {
    ...label,
    color: astroTokens.color.font.link,
  },
};

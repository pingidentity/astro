import { ThemeUICSSObject } from 'theme-ui';

import { overflowWrap, wordBreak, wordWrap as wordWrapText } from '../../types';

export const base: ThemeUICSSObject = {
  display: 'block',
  fontSize: 'md',
  color: 'text.primary',
  fontFamily: 'standard',
  overflowWrap: 'break-word' as overflowWrap,
};

export const wordWrap = {
  display: 'block',
  overflowWrap: 'break-word' as overflowWrap,
  maxWidth: '100%',
  wordWrap: 'break-word' as wordWrapText,
  wordBreak: 'break-word' as wordBreak,
};

const tabLabel = {
  ...base,
  ...wordWrap,
  fontSize: 'sm',
  fontWeight: 1,
  mb: 'sm',
  lineHeight: '16px',
  color: 'neutral.40',
  height: '100%',
  '.is-selected &, .is-hovered &': {
    color: 'active',
  },
  '.is-selected &': {
    color: 'active',
    mb: 8,
  },
  '.is-disabled &': {
    color: 'neutral.80',
  },
};

const environmentBreadcrumb = {
  ...base,
  fontSize: 'sm',
  fontWeight: 3,
  color: 'secondary',
  textTransform: 'capitalize',
};

const title = {
  ...wordWrap,
  fontSize: 'xx',
  fontWeight: 1,
  color: 'text.primary',
  fontFamily: 'standard',
};

const sectionTitle = {
  ...wordWrap,
  fontSize: 'lg',
  fontWeight: 2,
  color: 'text.primary',
  fontFamily: 'standard',
};

const itemTitle = {
  ...wordWrap,
  fontSize: 'md',
  fontWeight: 1,
  color: 'text.primary',
  fontFamily: 'standard',
};

const bodyStrong = {
  ...wordWrap,
  color: 'text.primary',
  fontFamily: 'standard',
  fontWeight: 1,
};

const subtitle = {
  ...wordWrap,
  color: 'text.secondary',
  fontFamily: 'standard',
  fontWeight: 0,
};

const textEllipsis = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};

const listViewItemText = {
  ...bodyStrong,
  alignSelf: 'start',
  fontSize: 'md',
};

const listViewItemSubtext = {
  ...subtitle,
  alignSelf: 'start',
  fontSize: 'sm',
  mt: '1px',
};

const hTags = {
  h1: { ...title, fontWeight: 3 },
  h2: { ...sectionTitle, fontWeight: 3 },
  h3: { ...itemTitle, fontWeight: 3 },
  h4: {
    ...wordWrap,
    fontSize: 'sm',
    fontWeight: 3,
    color: 'text.primary',
    fontFamily: 'standard',
  },
};

const HTags = {
  H1: { ...hTags.h1, lineHeight: '28px' },
  H2: { ...hTags.h2, lineHeight: '21px' },
  H3: { ...hTags.h3, lineHeight: '18px' },
  H4: { ...hTags.h4, lineHeight: '16px' },
};

export const text = {
  base,
  bodyStrong,
  bodyWeak: { ...wordWrap, fontSize: 'sm', color: 'text.secondary', fontFamily: 'standard' },
  buttonLabel: { ...wordWrap, fontSize: 'md', fontWeight: 1, color: 'accent.30', fontFamily: 'standard' },
  buttonTitle: { ...wordWrap, fontSize: 'xs', fontWeight: 0, color: 'text.primary', fontFamily: 'standard', lineHeight: '13px' },
  buttonSubtitle: { ...wordWrap, fontSize: 'sm', fontWeight: 3, color: 'text.primary', fontFamily: 'standard', lineHeight: '16px' },
  capsLabel: { ...wordWrap, color: 'text.secondary', textTransform: 'uppercase', fontFamily: 'standard' },
  colorFieldButtonLabel: { ...wordWrap, fontSize: 'sm', fontWeight: 0, lineHeight: '12.65px', fontFamily: 'standard' },
  colorFieldButtonColor: { ...wordWrap, fontSize: 'sm', fontWeight: 1, lineHeight: '12.65px', fontFamily: 'standard' },
  environmentBreadcrumb,
  ...hTags,
  ...HTags,
  inputValue: { fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
  itemTitle,
  itemSubtitle: { ...wordWrap, fontSize: 'sm', fontWeight: 0, color: 'text.secondary', fontFamily: 'standard' },
  label: { ...wordWrap, fontSize: 'sm', color: 'text.secondary', fontFamily: 'standard', fontWeight: 1 },
  listTitle: { ...wordWrap, fontSize: 'md', fontWeight: 1, color: 'text.primary', ...textEllipsis },
  listSubtitle: { ...wordWrap, fontSize: 'sm', fontWeight: 0, color: 'text.secondary', ...textEllipsis },
  listViewItemSubtext: { ...listViewItemSubtext, ...textEllipsis },
  listViewItemText: { ...listViewItemText, ...textEllipsis },
  placeholder: { fontWeight: -1, color: 'text.secondary', fontFamily: 'standard' },
  panelHeaderSubtext: { ...listViewItemSubtext, ...textEllipsis },
  panelHeaderText: { ...listViewItemText, ...textEllipsis },
  sectionTitle,
  subtitle,
  tabLabel,
  tableHeader: { ...wordWrap, fontSize: 'sm', fontWeight: 3, color: 'text.primary', fontFamily: 'standard' },
  tableData: { ...wordWrap, fontSize: 'sm', fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
  textEllipsis,
  title,
};

export const base = {
  display: 'block',
  fontSize: 'md',
  color: 'text.primary',
  fontFamily: 'standard',
  overflowWrap: 'break-word',
};

export const wordWrap = {
  display: 'block',
  overflowWrap: 'break-word',
  maxWidth: '100%',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
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

export const text = {
  base,
  bodyStrong: { ...wordWrap, fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
  bodyWeak: { ...wordWrap, fontSize: 'sm', color: 'text.secondary', fontFamily: 'standard' },
  buttonLabel: { ...wordWrap, fontSize: 'md', fontWeight: 1, color: 'accent.30', fontFamily: 'standard' },
  buttonTitle: { ...wordWrap, fontSize: 'xs', fontWeight: 0, color: 'text.primary', fontFamily: 'standard', lineHeight: '13px' },
  buttonSubtitle: { ...wordWrap, fontSize: 'sm', fontWeight: 3, color: 'text.primary', fontFamily: 'standard', lineHeight: '16px' },
  capsLabel: { ...wordWrap, color: 'text.secondary', textTransform: 'uppercase', fontFamily: 'standard' },
  environmentBreadcrumb,
  inputValue: { fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
  itemTitle: { ...wordWrap, fontSize: 'md', fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
  itemSubtitle: { ...wordWrap, fontSize: 'sm', fontWeight: 0, color: 'text.secondary', fontFamily: 'standard' },
  label: { ...wordWrap, fontSize: 'sm', color: 'text.secondary', fontFamily: 'standard', fontWeight: 1 },
  listTitle: { ...wordWrap, fontSize: 'md', fontWeight: 1, color: 'text.primary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  listSubtitle: { ...wordWrap, fontSize: 'sm', fontWeight: 0, color: 'text.secondary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  placeholder: { fontWeight: -1, color: 'text.secondary', fontFamily: 'standard' },
  sectionTitle: { ...wordWrap, fontSize: 'lg', fontWeight: 2, color: 'text.primary', fontFamily: 'standard' },
  subtitle: { ...wordWrap, fontWeight: 0, color: 'text.secondary', fontFamily: 'standard' },
  tabLabel,
  tableData: { ...wordWrap, fontSize: 'sm', fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
  textEllipsis: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  title: { ...wordWrap, fontSize: 'xx', fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
};

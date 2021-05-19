const base = {
  fontSize: 'md',
  color: 'text.primary',
};

const wordWrap = {
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
  mb: 8,
  color: 'neutral.40',
  '.is-selected &': {
    color: 'active',
  },
  '.is-disabled &': {
    color: 'neutral.80',
  },
};

const fieldHelperText = {
  ...base,
  ...wordWrap,
  fontSize: 'sm',
  pb: 'sm',
  '&.is-default': {
    color: 'text.secondary',
  },
  '&.is-error': {
    color: 'critical.dark',
  },
  '&.is-success': {
    color: 'success.dark',
  },
  '&.is-warning': {
    color: 'warning.dark',
  },
  '.is-left-label > &': {
    gridRowEnd: 3,
    gridColumnEnd: 3,
  },
};

export const text = {
  base,
  bodyStrong: { ...wordWrap, fontWeight: 1, color: 'text.primary' },
  bodyWeak: { ...wordWrap, fontSize: 'sm', color: 'text.secondary' },
  buttonLabel: { ...wordWrap, fontSize: 'md', fontWeight: 1, color: 'accent.30' },
  capsLabel: { ...wordWrap, color: 'text.secondary', textTransform: 'uppercase' },
  fieldHelperText,
  inputValue: { fontWeight: 1, color: 'text.primary' },
  itemTitle: { ...wordWrap, fontWeight: 2, color: 'text.primary' },
  label: { ...wordWrap, fontSize: 'sm', color: 'text.secondary' },
  placeholder: { fontWeight: -1, color: 'text.secondary' },
  sectionTitle: { ...wordWrap, fontSize: 'lg', fontWeight: 2, color: 'text.primary' },
  subtitle: { ...wordWrap, fontWeight: 0, color: 'text.secondary' },
  tabLabel,
  tableData: { ...wordWrap, fontSize: 'sm', fontWeight: 1, color: 'text.primary' },
  title: { ...wordWrap, fontSize: 'xx', fontWeight: 1, color: 'text.primary' },
};

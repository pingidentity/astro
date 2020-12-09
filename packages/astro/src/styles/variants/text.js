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
  textTransform: 'uppercase',
  px: 10,
  mb: 8,
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
};

export const text = {
  base,
  bodyStrong: { ...wordWrap, fontWeight: 1, color: 'text.primary' },
  bodyWeak: { ...wordWrap, fontSize: 'sm', color: 'text.secondary' },
  buttonLabel: { ...wordWrap, fontSize: 'md', fontWeight: 1, color: 'accent.30' },
  capsLabel: { ...wordWrap, color: 'text.secondary', textTransform: 'uppercase' },
  fieldHelperText,
  itemTitle: { ...wordWrap, fontWeight: 2, color: 'text.primary' },
  label: { ...wordWrap, fontSize: 'sm', color: 'text.secondary' },
  sectionTitle: { ...wordWrap, fontSize: 'lg', fontWeight: 2, color: 'text.primary' },
  subtitle: { ...wordWrap, fontWeight: 0, color: 'text.secondary' },
  tabLabel,
  title: { ...wordWrap, fontSize: 'xl', fontWeight: 1, color: 'text.primary' },
};

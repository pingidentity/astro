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
  textTransform: 'uppercase',
  px: 10,
  mb: 8,
  '.is-disabled &': {
    color: 'neutral.80',
  },
};

export const text = {
  base,
  tabLabel,
  title: { ...wordWrap, fontSize: 'xl', fontWeight: 1, color: 'text.primary' },
  sectionTitle: { ...wordWrap, fontSize: 'lg', fontWeight: 2, color: 'text.primary' },
  itemTitle: { ...wordWrap, fontWeight: 2, color: 'text.primary' },
  subtitle: { ...wordWrap, fontWeight: 0, color: 'text.secondary' },
  bodyStrong: { ...wordWrap, fontWeight: 1, color: 'text.primary' },
  bodyWeak: { ...wordWrap, fontSize: 'sm', color: 'text.secondary' },
  label: { ...wordWrap, fontSize: 'sm', color: 'text.secondary' },
  capsLabel: { ...wordWrap, color: 'text.secondary', textTransform: 'uppercase' },
  buttonLabel: { ...wordWrap, fontSize: 'md', fontWeight: 1, color: 'accent.30' },
};

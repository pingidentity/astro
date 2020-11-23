const base = {
  fontSize: 'md',
  color: 'text.primary',
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
  title: { fontSize: 'xl', fontWeight: 1, color: 'text.primary' },
  sectionTitle: { fontSize: 'lg', fontWeight: 2, color: 'text.primary' },
  itemTitle: { fontWeight: 2, color: 'text.primary' },
  subtitle: { fontWeight: 0, color: 'text.secondary' },
  bodyStrong: { fontWeight: 1, color: 'text.primary' },
  bodyWeak: { fontSize: 'sm', color: 'text.secondary' },
  label: { fontSize: 'sm', color: 'text.secondary' },
  capsLabel: { color: 'text.secondary', textTransform: 'uppercase' },
  buttonLabel: { fontSize: 'md', fontWeight: 1, color: 'accent.30' },
};

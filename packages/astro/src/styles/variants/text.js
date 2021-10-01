const base = {
  display: 'block',
  fontSize: 'md',
  color: 'text.primary',
  fontFamily: 'standard',
};

const wordWrap = {
  display: 'block',
  overflowWrap: 'break-word',
  maxWidth: '100%',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
};

const tabLabel = {
  ...base,
  ...wordWrap,
  fontSize: 'md',
  fontWeight: 1,
  mb: 6,
  color: 'neutral.40',
  '.is-selected &, .is-hovered &': {
    color: 'active',
    mb: 5,
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

const tooltipContent = {
  maxWidth: '10em',
  maxHeight: '15em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: '10',
  WebkitBoxOrient: 'vertical',
  display: '-webkit-box !important',
  wordBreak: 'break-word',

  '.is-right > * > &, .is-left > * > &': {
    maxWidth: '24em',
    maxHeight: '6.5em',
    WebkitLineClamp: '4',
  },
};

export const text = {
  base,
  bodyStrong: { ...wordWrap, fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
  bodyWeak: { ...wordWrap, fontSize: 'sm', color: 'text.secondary', fontFamily: 'standard' },
  buttonLabel: { ...wordWrap, fontSize: 'md', fontWeight: 1, color: 'accent.30', fontFamily: 'standard' },
  capsLabel: { ...wordWrap, color: 'text.secondary', textTransform: 'uppercase', fontFamily: 'standard' },
  fieldHelperText,
  inputValue: { fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
  itemTitle: { ...wordWrap, fontSize: 'md', fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
  itemSubtitle: { ...wordWrap, fontSize: 'sm', fontWeight: 0, color: 'text.secondary', fontFamily: 'standard' },
  label: { ...wordWrap, fontSize: 'sm', color: 'text.secondary', fontFamily: 'standard' },
  placeholder: { fontWeight: -1, color: 'text.secondary', fontFamily: 'standard' },
  sectionTitle: { ...wordWrap, fontSize: 'lg', fontWeight: 2, color: 'text.primary', fontFamily: 'standard' },
  subtitle: { ...wordWrap, fontWeight: 0, color: 'text.secondary', fontFamily: 'standard' },
  tabLabel,
  tableData: { ...wordWrap, fontSize: 'sm', fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
  title: { ...wordWrap, fontSize: 'xx', fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
  tooltipContent,
};

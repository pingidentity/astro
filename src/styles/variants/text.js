const base = {
  display: 'block',
  fontSize: 'md',
  color: 'text.primary',
  fontFamily: 'standard',
  overflowWrap: 'break-word',
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

const fieldHelperText = {
  ...base,
  ...wordWrap,
  fontSize: 'sm',
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

const expandableRowSharedStyle = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};

const expandableRow = {
  title: {
    fontSize: 'lg',
    color: 'neutral.20',
    ...expandableRowSharedStyle,
  },
  subtitle: {
    fontSize: 'sm',
    color: 'neutral.60',
    ...expandableRowSharedStyle,
  },
  lineChart: {
    title: {
      fontSize: 'sm',
      color: 'neutral.40',
      maxWidth: '100%',
      ...expandableRowSharedStyle,
    },
    count: {
      color: 'neutral.20',
      fontSize: 22,
      fontWeight: 2,
    },
    countLabel: {
      fontSize: 'xs',
      color: 'neutral.50',
    },
    chartLabel: {
      fontSize: 'xs',
      color: 'neutral.50',
      minWidth: '60px',
    },
    trend: {
      color: 'neutral.20',
      fontSize: 'sm',
      fontWeight: 3,
      whiteSpace: 'nowrap',
    },
  },
};

const breadcrumbLink = {
  color: 'active',
  fontFamily: 'standard',
  fontSize: '15px',
  textDecoration: 'none',
  outline: 'none',
  '&.is-hovered': {
    textDecoration: 'underline',
  },
  '&.is-focused': {
    textDecoration: 'underline',
  },
  '&.is-disabled': {
    pointerEvents: 'none',
  },
  '&.is-current': {
    pointerEvents: 'none',
    ...base,
    fontWeight: 1,
  },
};

const environmentBreadcrumb = {
  ...base,
  fontSize: 'sm',
  fontWeight: 3,
  color: 'secondary',
  textTransform: 'capitalize',
};

const navBarSubtitle = {
  ml: 'md',
  mb: '15px',
  fontWeight: 3,
  fontSize: '11px',
  color: 'accent.80',
  zIndex: '100',
};

const navBarHeaderText = {
  ...wordWrap,
  whiteSpace: 'break-spaces',
  lineHeight: '13px',
  fontSize: '13px',
  fontWeight: 1,
  maxWidth: '150px',
};

const collapsiblePanellItem = {
  ...wordWrap,
  color: 'neutral.30',
  fontSize: 'sm',
  fontWeight: 500,
  overflow: 'hidden',
  marginRight: 'xs',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const collapsiblePanelTitle = {
  ...wordWrap,
  fontSize: 'sm',
  fontWeight: 500,
  color: 'text.secondary',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  mr: 'xs',
};

const maskedValue = {
  width: 252,
  wordBreak: 'break-all',
  '&.is-masked': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    fontWeight: 700,
  },
};

const timeZone = {
  title: {
    color: 'neutral.10',
    fontSize: 'md',
    whiteSpace: 'nowrap',
    lineHeight: 1,
    '.is-focused &': {
      color: 'white',
    },
  },
  subTitle: {
    color: 'neutral.40',
    fontSize: 'sm',
    ml: 10,
    '.is-focused &': {
      color: 'white',
    },
  },
  time: {
    color: 'neutral.10',
    fontSize: 'sm',
    fontWeight: 1,
    '.is-focused &': {
      color: 'white',
    },
  },
};

export const text = {
  base,
  bodyStrong: { ...wordWrap, fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
  bodyWeak: { ...wordWrap, fontSize: 'sm', color: 'text.secondary', fontFamily: 'standard' },
  breadcrumbLink,
  buttonLabel: { ...wordWrap, fontSize: 'md', fontWeight: 1, color: 'accent.30', fontFamily: 'standard' },
  buttonTitle: { ...wordWrap, fontSize: 'xs', fontWeight: 0, color: 'text.primary', fontFamily: 'standard', lineHeight: '13px' },
  buttonSubtitle: { ...wordWrap, fontSize: 'sm', fontWeight: 3, color: 'text.primary', fontFamily: 'standard', lineHeight: '16px' },
  capsLabel: { ...wordWrap, color: 'text.secondary', textTransform: 'uppercase', fontFamily: 'standard' },
  environmentBreadcrumb,
  fieldHelperText,
  inputValue: { fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
  itemTitle: { ...wordWrap, fontSize: 'md', fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
  itemSubtitle: { ...wordWrap, fontSize: 'sm', fontWeight: 0, color: 'text.secondary', fontFamily: 'standard' },
  label: { ...wordWrap, fontSize: 'sm', color: 'text.secondary', fontFamily: 'standard', fontWeight: 1 },
  listTitle: { ...wordWrap, fontSize: 'md', fontWeight: 1, color: 'text.primary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  listSubtitle: { ...wordWrap, fontSize: 'sm', fontWeight: 0, color: 'text.secondary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  maskedValue,
  expandableRow,
  collapsiblePanellItem,
  collapsiblePanelTitle,
  navBarHeaderText,
  navBarSubtitle,
  placeholder: { fontWeight: -1, color: 'text.secondary', fontFamily: 'standard' },
  sectionTitle: { ...wordWrap, fontSize: 'lg', fontWeight: 2, color: 'text.primary', fontFamily: 'standard' },
  subtitle: { ...wordWrap, fontWeight: 0, color: 'text.secondary', fontFamily: 'standard' },
  tabLabel,
  tableData: { ...wordWrap, fontSize: 'sm', fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
  textEllipsis: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  title: { ...wordWrap, fontSize: 'xx', fontWeight: 1, color: 'text.primary', fontFamily: 'standard' },
  tooltipContent,
  timeZone,
};

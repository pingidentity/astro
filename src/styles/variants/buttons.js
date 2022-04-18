import { text as textVariants } from './text';
import { neutral } from '../colors';
import { chip } from './boxes';

const base = {
  cursor: 'pointer',
  height: 36,
  lineHeight: '30px',
  minWidth: 'min-content',
  px: 'md',
  outline: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '2px',
  flexShrink: 0,
  wordBreak: 'inherit',
  whiteSpace: 'nowrap',
  ...textVariants.buttonLabel,
};

const defaultActive = {
  bg: 'active',
  border: '1px solid',
  borderColor: 'active',
  color: 'white',
  'path': {
    fill: 'white',
  },
};

const defaultHover = {
  bg: 'accent.99',
  border: '1px solid',
  borderColor: 'accent.40',
  color: 'accent.40',
  boxShadow: 'standard',
};

const defaultFocus = {
  outline: '1px solid',
  outlineColor: 'active',
  outlineOffset: '4px',
};

const navItemButton = {
  textDecoration: 'none',
  outline: 'none',
  cursor: 'pointer',
  borderRadius: 0,
  backgroundColor: 'transparent',
  paddingTop: '5px',
  paddingBottom: '5px',
  display: 'block',
  color: 'neutral.95',
  fontSize: 'sm',
  fontWeight: 1,
  flexGrow: '1',
  width: '100%',
  textAlign: 'left',
  lineHeight: '16px',
  whiteSpace: 'break-spaces',
  overflowWrap: 'break-word',
  maxWidth: '100%',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-hovered': {
    bg: 'accent.10',
  },
  '&.is-selected': {
    bg: 'accent.5',
    boxShadow: 'inset 2px 0 0 0 white',
  },
  '&.is-pressed': {
    bg: 'accent.5',
  },
};

const iconButton = {
  justifyContent: 'center',
  appearance: 'none',
  alignItems: 'center',
  alignSelf: 'baseline',
  display: 'inline-flex !important',
  flexGrow: 0,
  flexShrink: 0,
  borderRadius: '100%',
  cursor: 'pointer',
  bg: 'transparent',
  p: '3px',
  width: 'inherit',
  height: 'inherit',
  path: {
    fill: 'neutral.40',
  },
  outline: 'none',
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-hovered': {
    bg: 'accent.95',
  },
  '&.is-pressed': {
    'path': {
      fill: 'white',
    },
    bg: 'active',
  },
};

const square = {
  ...iconButton,
  borderRadius: '2px',
};

const modalCloseButton = {
  ...iconButton,
  position: 'absolute',
  top: 14,
  right: 10,
};

const multiselectToggle = {
  ...square,
  bg: 'accent.99',
  height: '40px',
  minWidth: 'max-content',
  pl: '0px',
  ml: '10px',
  path: {
    fill: 'active',
  },
  '&.is-hovered': {
    backgroundColor: 'accent.99',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-pressed': {
    backgroundColor: 'accent.99',
  },
};

const close = {
  ...iconButton,
  p: 0,
  ml: 'auto',
  outline: 'none',
  path: {
    fill: 'neutral.10',
  },
  '&.is-hovered': {
    bg: 'white',
    boxShadow: 'standard',
  },
  '&.is-pressed': {
    boxShadow: 'standard',
    bg: 'neutral.10',
    path: {
      fill: 'white',
    },
  },
  '&.is-success': {
    path: {
      fill: 'success.dark',
    },
    '&.is-pressed': {
      boxShadow: 'standard',
      bg: 'success.dark',
      path: {
        fill: 'white',
      },
    },
  },
  '&.is-warning': {
    path: {
      fill: 'warning.dark',
    },
    '&.is-pressed': {
      boxShadow: 'standard',
      bg: 'warning.dark',
      path: {
        fill: 'white',
      },
    },
  },
  '&.is-error': {
    path: {
      fill: 'critical.dark',
    },
    '&.is-pressed': {
      boxShadow: 'standard',
      bg: 'critical.dark',
      path: {
        fill: 'white',
      },
    },
  },
};

const accordionHeader = {
  ...base,
  display: 'inline-flex',
  bg: 'transparent',
  color: 'neutral.10',
  paddingLeft: '5px',
  paddingRight: '5px',
  flexGrow: 0,
  fontWeight: 700,
  '&.is-hovered': {
    color: 'active',
  },
  '&.is-pressed': {
    color: 'accent.20',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const primary = {
  ...base,
  display: 'inline-flex',
  bg: 'active',
  border: '1px solid',
  borderColor: 'active',
  color: 'white',
  '&.is-hovered': {
    bg: 'accent.40',
    border: '1px solid',
    borderColor: 'accent.40',
    color: 'white',
    boxShadow: 'standard',
  },
  '&.is-pressed': {
    bg: 'accent.20',
    border: '1px solid',
    borderColor: 'accent.20',
    color: 'white',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const success = {
  ...base,
  display: 'inline-flex',
  bg: 'success.bright',
  border: '1px solid',
  borderColor: 'success.bright',
  color: 'white',
};

const critical = {
  ...base,
  display: 'inline-flex',
  bg: 'critical.bright',
  border: '1px solid',
  borderColor: 'critical.bright',
  color: 'white',
};

const inverted = {
  ...iconButton,
  bg: 'active',
  borderColor: 'active',
  'path': {
    fill: 'white',
  },
  '&.is-hovered': {
    bg: 'accent.40',
    borderColor: 'accent.40',
    color: 'white',
    boxShadow: 'standard',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-pressed': {
    bg: 'accent.20',
    borderColor: 'accent.20',
    color: 'white',
  },
};

const invertedSquare = {
  ...inverted,
  borderRadius: '2px',
};

const applicationPortal = {
  ...iconButton,
  background: 'transparent',
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-hovered': {
    'path': {
      fill: 'active',
    },
  },
  '&.is-pressed': {
    'path': {
      fill: 'active',
    },
  },
};

const applicationPortalPinned = {
  ...iconButton,
  'path': {
    fill: 'success.bright',
  },
  background: 'transparent',
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-hovered': {
    'path': {
      fill: 'active',
    },
  },
  '&.is-pressed': {
    'path': {
      fill: 'active',
    },
  },
};

const helpHint = {
  ...iconButton,
  bg: 'neutral.90',
  borderColor: 'active',
  mt: 'auto',
  mb: 'auto',
  ml: '5px',
  maxWidth: '13px',
  maxHeight: '14px',
  borderRadius: '5.5px',
  'svg': {
    'height': '100%',
    mb: 0.75,
  },
  'path': {
    fill: 'neutral.20',
  },
  '&.is-hovered': {
    bg: 'accent.20',
    borderColor: 'accent.20',
    'path': {
      fill: 'white',
    },
    color: 'white',
    boxShadow: 'standard',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-pressed': {
    bg: 'accent.20',
    borderColor: 'accent.20',
    color: 'white',
  },
};

const inline = {
  ...base,
  display: 'inline-flex',
  bg: 'white',
  height: '22px',
  lineHeight: 1,
  fontSize: 'sm',
  borderRadius: '15px',
  border: '1px solid',
  borderColor: 'active',
  alignSelf: 'center',
  paddingTop: '0px',
  paddingBottom: '0px',
  '&.is-hovered': {
    ...defaultHover,
  },
  '&.is-pressed': {
    ...defaultActive,
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const text = {
  ...base,
  display: 'inline-flex',
  bg: 'transparent',
  border: '1px solid',
  borderColor: 'transparent',
  color: 'active',
  height: 'auto',
  padding: '0',
  '&.is-hovered': {
    textDecoration: 'underline',
  },
  '&.is-focused': {
    textDecoration: 'underline',
  },
};

const quiet = {
  all: 'unset',
  display: 'flex',
};

const chipDeleteButton = {
  borderRadius: '50%',
  cursor: 'pointer',
  height: 14,
  mx: '3px !important',
  p: 0,
  width: 14,
  '&.is-focused, &.is-hovered': {
    bg: 'accent.40',
    borderColor: 'accent.40',
    boxShadow: 'standard',
    outline: 'none',
  },
  '&.is-pressed': {
    bg: 'accent.20',
    borderColor: 'accent.20',
  },
};

const rocker = {
  ...base,
  border: '0',
  display: 'inline-flex',
  height: '26px',
  lineHeight: '26px',
  fontSize: '14px',
  borderRadius: '15px',
  alignSelf: 'center',
  paddingTop: '0px',
  paddingBottom: '0px',
  textTransform: 'uppercase',
  bg: 'accent.95',
  '&.is-selected': {
    bg: 'active',
    color: 'white',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const comboBox = {
  bg: 'transparent',
  color: 'black',
  padding: 0,
};

const danger = {
  ...base,
  display: 'inline-flex',
  bg: 'white',
  border: '1px solid',
  borderColor: 'critical.bright',
  color: 'critical.bright',
  '&.is-hovered': {
    ...defaultHover,
    color: 'critical.bright',
    borderColor: 'critical.bright',
  },
  '&.is-pressed': {
    ...defaultActive,
    bg: 'critical.bright',
    borderColor: 'critical.bright',
    color: 'white',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const copy = {
  ml: 'xs',
  outline: 'none',
  cursor: 'pointer',
  path: {
    fill: 'neutral.10',
  },
  '&.is-focused': {
    boxShadow: 'inset 0 0 5px #5873bdbf',
  },
};

const colorField = {
  border: `1px solid ${neutral['80']}`,
  '&:focus-visible': {
    outline: 'none',
  },
  '&.is-focused': {
    borderColor: 'accent.80',
  },
};

const imageUpload = {
  ...base,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  backgroundColor: 'accent.99',
  border: '2px solid',
  borderColor: 'neutral.95',
};

const link = {
  ...text,
  textDecoration: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  width: 'max-content',
  '&.is-current': {
    cursor: 'default',
    color: 'text.primary',
  },
};

const neutralText = {
  ...link,
  color: 'neutral.10',
};

const expandableRow = {
  chartWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
    background: 'none',
    cursor: 'pointer',
    height: 60,
    padding: 0,
    '&:hover': {
      backgroundColor: '#4462ED1A',
    },
  },
};

const environmentBreadcrumb = {
  current: {
    ...text,
    color: 'neutral.30',
    fontSize: 'md',
    fontWeight: 1,
    '&.is-hovered, &.is-focused': {
      color: 'active',
      textDecoration: 'none',
      boxShadow: 'none',
    },
    '&.is-pressed': {
      color: 'accent.20',
      textDecoration: 'none',
    },
  },
  selectItem: {
    ...text,
    color: 'neutral.10',
    fontSize: 'md',
    fontWeight: 0,
    justifyContent: 'start',
  },
};

const fileInputField = {
  background: 'none',
  cursor: 'pointer',
  '& span': {
    textAlign: 'initial',
  },
  '&:focus-visible': {
    outline: 'none',
  },
  '&.is-hovered, &.is-pressed': {
    cursor: 'pointer',
    '& span': { textDecoration: 'underline' },
  },
  '&.is-focused': {
    boxShadow: 'focus',
  },
};

const tooltipChip = {
  ...chip,
  cursor: 'default',
  '&.is-hovered, &.is-pressed': {
    cursor: 'default',
    outline: 'none',
  },
};

const tooltipIconButton = {
  ...iconButton,
  cursor: 'default',
  '&.is-hovered, &.is-pressed': {
    backgroundColor: 'inherit',
    cursor: 'default',
    path: {
      fill: 'neutral.20',
    },
  },
};

const tooltipInline = {
  ...text,
  cursor: 'default',
  alignSelf: 'flex-start',
  '&.is-hovered, &.is-pressed': {
    backgroundColor: 'inherit',
    cursor: 'default',
    textDecoration: 'inherit',
  },
};

const defaultVariant = {
  ...base,
  bg: 'white',
  border: '1px solid',
  borderColor: 'active',
  '&.is-hovered': {
    ...defaultHover,
  },
  '&.is-pressed': {
    ...defaultActive,
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const filter = {
  ...defaultVariant,
  px: 'sm',
  borderColor: 'neutral.80',
  height: 40,
  color: 'active',
  display: 'flex',
};

const colorBlock = {
  bg: 'neutral.95',
  border: '1px solid',
  borderColor: 'neutral.90',
  borderRadius: 10,
  outline: 'none',
  cursor: 'pointer',
  width: 150,
  minHeight: 40,
  p: '5px 15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&.is-hovered': {
    bg: 'neutral.80',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-pressed': {
    bg: 'neutral.60',
    borderColor: 'neutral.60',
  },
  '& span': {
    color: 'text.primary',
    textAlign: 'left',
  },
  '&>div': {
    alignItems: 'baseline',
  },
  '&>svg': {
    color: 'text.secondary',
    fill: 'text.secondary',
  },

  '&.is-configured': {
    bg: 'active',
    borderColor: 'active',
    '& span': {
      color: 'white',
    },
    '&>svg': {
      color: 'white',
      fill: 'white',
    },
  },
  '&.is-configured.is-hovered': {
    bg: 'accent.40',
    borderColor: 'accent.40',
  },
  '&.is-configured.is-pressed': {
    bg: 'accent.20',
    borderColor: 'accent.20',
  },
};

const menuTab = {
  ...quiet,
  color: 'neutral.40',
  alignItems: 'center',
  '&.is-selected *, &.is-hovered *': {
    color: 'active',
  },
  '& + *:not(div:first-of-type)': {
    'ml': 'md',
  },
};


export default {
  accordionHeader,
  chipDeleteButton,
  close,
  colorField,
  comboBox,
  copy,
  critical,
  danger,
  default: {
    ...base,
    bg: 'white',
    border: '1px solid',
    borderColor: 'active',
    '&.is-hovered': {
      ...defaultHover,
    },
    '&.is-pressed': {
      ...defaultActive,
    },
    '&.is-focused': {
      ...defaultFocus,
    },
  },
  environmentBreadcrumb,
  expandableRow,
  fileInputField,
  filter,
  iconButton,
  imageUpload,
  inline,
  inverted,
  link,
  primary,
  quiet,
  rocker,
  success,
  text,
  helpHint,
  modalCloseButton,
  navItemButton,
  applicationPortalPinned,
  applicationPortal,
  square,
  invertedSquare,
  tooltipChip,
  tooltipIconButton,
  tooltipInline,
  colorBlock,
  menuTab,
  multiselectToggle,
  neutralText,
};

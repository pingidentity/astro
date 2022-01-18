import { text } from './text';

const base = {
  display: 'flex',
};

const card = {
  boxShadow: 'standard',
  p: 'lg',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '1 1 0',
};

// Used to give a border to radio elements
const radioContainer = {
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'active',
  borderRadius: 3,
  padding: 'md',
  mb: 'md',
};

// Used to add spacing for content shown when a radio is checked
const radioCheckedContent = {
  py: 'md',
};

const listItem = {
  ...base,
  flex: '1 1 0px',
  cursor: 'pointer',
  height: '64px',
  pl: 'md',
  pr: 'sm',
  pt: 16,
  pb: 16,
  justifyContent: 'center',
  bg: 'accent.99',
  '&.is-selected': {
    bg: 'white',
  },
  '&.is-hovered': {
    bg: 'white',
  },
};

const listViewItem = {
  ...base,
  padding: '0px 15px 0px 25px',
  flex: '1 1 0px',
  cursor: 'pointer',
  minHeight: '80px',
  justifyContent: 'center',
  bg: 'accent.99',
  outline: 'none',
  '&.is-selected': {
    bg: 'white',
  },
  '&.is-hovered': {
    bg: 'white',
  },
  '&.is-focused': {
    boxShadow: 'inset 0 0 5px #5873bdbf',
  },
  '&.has-separator': {
    borderBottom: '1px solid',
    borderBottomColor: 'line.hairline',
  },
};

const listBoxSectionTitle = {
  fontSize: 'sm',
  fontWeight: '3',
  color: 'text.secondary',
  height: '36px',
  ml: 'sm',
  justifyContent: 'center',
};

export const chip = {
  cursor: 'pointer',
  p: '3px 5px 4px 5px',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '50px',
  alignSelf: 'flex-start',
  display: 'inline-flex !important',
  borderRadius: '5px',
  fontWeight: 1,

  '& button': {
    backgroundColor: 'transparent',
    marginLeft: 'xs',
    marginTop: '1px',
    padding: '0',

    '&.is-hovered': {
      backgroundColor: 'white',
    },

    '& .mdi-icon': {
      marginLeft: '0',
      padding: '2px',
    },
  },
};

const inputInContainerSlot = {
  position: 'absolute',
  bg: 'transparent',
  right: 'sm',
  top: '50%',
  transform: 'translateY(-50%)',
};

const copy = {
  alignItems: 'center',
  width: 'max-content',
  cursor: 'pointer',
  '& .is-focused': {
    boxShadow: 'inset 0 0 5px #5873bdbf',
  },
};

const topShadowScrollbox = {
  '&.has-shadows.is-top-shadow-showing': {
    position: 'relative',
    zIndex: '10000',
    boxShadow: '0px 4px 2px 1px rgb(37, 55, 70, 0.15)',
    height: '4px',
    marginBottom: '-4px',
    backgroundColor: '#FFFFFF',
  },
};

const bottomShadowScrollbox = {
  '&.has-shadows.is-bottom-shadow-showing': {
    position: 'relative',
    zIndex: '10000',
    boxShadow: '0px -4px 2px 1px rgb(37, 55, 70, 0.15)',
    height: '4px',
    marginTop: '-2px',
    backgroundColor: '#FFFFFF',
  },
};

const scrollbox = {
  '&::-webkit-scrollbar': {
    display: 'none',
    width: '0px !important',
  },
  '&::-webkit-scrollbar-track': {
    width: '0px',
    display: 'none',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '0px',
    display: 'none',
  },
  position: 'relative',
  '& > *': {
    overflow: 'hidden auto',
  },
};

const expandableRow = {
  titleWrapper: {
    maxWidth: '50%',
  },
  lineChart: {
    alignCellRightWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    chart: {
      width: '50px',
      height: '18px',
    },
    chartWrapper: {
      '&:hover': {
        backgroundColor: '#4462ED1A',
      },
    },
    divider: {
      backgroundColor: 'neutral.80',
      height: '35px',
      width: '1px',
    },
  },
};

const datePicker = {
  '.react-calendar': {
    width: 280,
    '& .react-calendar__month-view__days__day': {
      width: 40,
      height: 40,
      color: 'neutral.10',
      fontSize: 'sm',
      fontWeight: 1,
    },
    '& .react-calendar__navigation__label__labelText': text.itemTitle,
    '& .react-calendar__navigation__arrow, & .react-calendar__month-view__days__day--neighboringMonth': {
      color: 'neutral.40',
    },
    '& .react-calendar__month-view__weekdays': {
      borderBottom: '1px solid',
      borderColor: 'neutral.80',
    },
    '& .react-calendar__month-view__weekdays__weekday abbr': {
      textDecoration: 'none',
      textTransform: 'capitalize',
    },
    '& .react-calendar__month-view__days__day--weekend': {
      color: 'decorative.4',
    },
    '& .react-calendar__tile--active, & .react-calendar__tile--hasActive': {
      backgroundColor: 'active',
      color: 'white',
    },
    '& .react-calendar__year-view__months__month': {
      padding: '19px 0',
    },
    '& .react-calendar__decade-view__years__year, & .react-calendar__month-view__days__day, & .react-calendar__year-view__months__month': {
      '&:hover': {
        backgroundColor: 'rgba(70, 96, 162, .1);',
        color: 'neutral.10',
      },
    },
    '& .react-calendar__navigation': {
      marginBottom: 0,
    },
  },
};

const fileInputFieldWrapper = {
  display: 'flex',
  border: '1px dashed',
  borderColor: 'active',
  padding: '10px 0',
  '&.is-drag-active': {
    backgroundColor: 'accent.95',
  },
  '&.is-error': {
    borderColor: 'critical.dark',
  },
  '&.is-success': {
    borderColor: 'success.dark',
  },
  '&.is-warning': {
    borderColor: 'warning.dark',
  },
  '&.is-loading': {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default {
  base,
  card,
  chip,
  copy,
  datePicker,
  expandableRow,
  inputInContainerSlot,
  fileInputFieldWrapper,
  listItem,
  listBoxSectionTitle,
  listViewItem,
  radioCheckedContent,
  radioContainer,
  scrollbox,
  topShadowScrollbox,
  bottomShadowScrollbox,
};

import { text } from '../../components/Text/Text.styles';

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

export default {
  datePicker,
};

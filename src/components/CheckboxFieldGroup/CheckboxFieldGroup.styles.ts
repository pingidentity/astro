import { ThemeUICSSObject } from 'theme-ui';

type CheckboxFieldGroupStyles = {
  container: ThemeUICSSObject;
  items: ThemeUICSSObject;
  item: ThemeUICSSObject;
};

export const checkboxFieldGroup: CheckboxFieldGroupStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'xs',
    width: '100%',
    '&.is-horizontal': {
      flexDirection: 'row',
      flexWrap: 'wrap',
      columnGap: 'lg',
      rowGap: 'xs',
    },
  },
  item: {
    minWidth: 0,
    flex: '0 1 auto',
    '&.is-horizontal': {
      flex: '0 1 auto',
    },
    '&.is-disabled': {
      opacity: 0.65,
    },
    '&.is-read-only': {
      opacity: 0.65,
    },
  },
};

export default checkboxFieldGroup;

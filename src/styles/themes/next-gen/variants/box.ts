import colors from '../colors/colors';

export const commonContentProps = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  height: '100%',
  width: 'max-content',
  justifyContent: 'center',
};

export const box = {
  indeterminateCheckboxIcon: {
    height: '19.25px',
    width: '19.25px',
    '&.is-disabled': {
      '& rect[id="indeterminate-checkbox-icon-wrapper"]': {
        fill: 'gray-500',
        stroke: 'gray-500',
      },
    },
    '&.is-focused': {
      boxShadow: `inset 0px 0px 0px 1px ${colors.focus}`,
    },
  },
  inputDropDownContentLeft: {
    ...commonContentProps,
    left: 0,
  },
  inputGroupContentLeft: {
    ...commonContentProps,
    left: 0,
    borderRight: `1px solid ${colors['gray-500']}`,
  },
  inputDropDownContentRight: {
    ...commonContentProps,
    right: 0,
  },
  inputGroupContentRight: {
    ...commonContentProps,
    right: 0,
    borderLeft: `1px solid ${colors['gray-500']}`,
  },
};

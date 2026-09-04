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
    height: '16px',
    width: '16px',
    color: 'active',
    '&.is-disabled': {
      opacity: 0.5,
      // Override base Astro theme's neutral.80 fill so disabled state stays blue at 50%
      '& rect[id="indeterminate-checkbox-icon-wrapper"]': {
        fill: 'active',
        stroke: 'active',
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

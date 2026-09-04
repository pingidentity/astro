export const box = {
  indeterminateCheckboxIcon: {
    height: '16px',
    width: '16px',
    color: 'primary',
    '&.is-disabled': {
      opacity: 0.5,
      // Override base Astro theme's neutral.80 fill so disabled state stays blue at 50%
      '& rect[id="indeterminate-checkbox-icon-wrapper"]': {
        fill: 'primary',
        stroke: 'primary',
      },
    },
  },
};

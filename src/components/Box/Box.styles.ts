const base = {
  display: 'flex',
};

const indeterminateCheckboxIcon = {
  width: '24px',
  height: '24px',
  '& rect[id="indeterminate-checkbox-icon-wrapper"]': {
    fill: 'active',
    stroke: 'active',
  },
  '&.is-disabled': {
    '& rect[id="indeterminate-checkbox-icon-wrapper"]': {
      fill: 'neutral.80',
      stroke: 'neutral.80',
    },
  },
};

export default {
  base,
  indeterminateCheckboxIcon,
};

import { focus } from '../../styles/colors';

const base = {
  display: 'flex',
};

const indeterminateCheckboxIcon = {
  width: '24px',
  height: '24px',
  borderRadius: '4px',
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
  '&.is-focused': {
    boxShadow: `inset 0px 0px 0px 1px ${focus}`,
  },
};

export default {
  base,
  indeterminateCheckboxIcon,
};

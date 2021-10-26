import { input } from '../forms/input';

const sharedStyles = {
  WebkitAppearance: 'none',
  margin: 0,
};

const noDefaultArrows = {
  'input::-webkit-outer-spin-button': { ...sharedStyles },
  'input::-webkit-inner-spin-button': {
    ...sharedStyles,
  },
  'input[type=number]': {
    MozAppearance: 'textfield',
  },
};

const arrowsWrapper = {
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  ...input.container,
};

const arrows = {
  position: 'absolute',
  right: '10px',
};

export default {
  arrowsWrapper,
  arrows,
  noDefaultArrows,
};

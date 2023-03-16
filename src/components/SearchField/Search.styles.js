export const clearButtonIcon = {
  color: 'neutral.40',
};

export const wrapper = {
  position: 'relative',
  justifyContent: 'center',
  '> input::-webkit-search-cancel-button, > input::-webkit-search-decoration': {
    WebkitAppearance: 'none',
  },
  '&.is-focused > *': {
    zIndex: 1,
  },
};

export const icon = {
  position: 'absolute',
  color: 'neutral.40',
  ml: 'sm',
};

export default {
  clearButtonIcon,
  wrapper,
  icon,
};

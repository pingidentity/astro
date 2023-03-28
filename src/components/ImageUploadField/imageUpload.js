import { base, defaultFocus } from '../Button/Buttons.styles';

const hoveredPreview = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  shaded: {
    opacity: 0.3,
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 2,
  },
};


const button = {
  ...base,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  backgroundColor: 'accent.99',
  border: '2px solid',
  borderColor: 'neutral.40',
  '&.is-focused': {
    ...defaultFocus,
    borderColor: 'neutral.40',
  },
};

export default {
  hoveredPreview,
  button,
};

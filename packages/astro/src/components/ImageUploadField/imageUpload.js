import { base } from '../Button/Buttons.styles';

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


const imageUpload = {
  ...base,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  backgroundColor: 'accent.99',
  border: '2px solid',
  borderColor: 'neutral.95',
};

export default {
  hoveredPreview,
  imageUpload,
};

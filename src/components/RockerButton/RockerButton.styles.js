import { base, defaultFocus } from '../Button/Buttons.styles';

const container = {
  alignItems: 'flex-start',
};

const innerContainer = {
  bg: 'accent.95',
  border: '1px solid',
  borderColor: 'accent.90',
  boxShadow: 'standard',
  borderRadius: '15px',
  padding: '2px',
};

const thumbSwitch = {
  ...base,
  border: '0',
  display: 'inline-flex',
  height: '26px',
  lineHeight: '26px',
  fontSize: '13px',
  borderRadius: '15px',
  alignSelf: 'center',
  paddingTop: '0px',
  paddingBottom: '0px',
  textTransform: 'uppercase',
  bg: 'accent.95',
  '&.is-selected': {
    bg: 'accent.20',
    color: 'white',
    zIndex: '1',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-hovered': {
    bg: 'white',
  },
};

export default {
  container,
  innerContainer,
  thumbSwitch,
};

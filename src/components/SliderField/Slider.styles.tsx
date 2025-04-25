import { defaultFocus } from '../Button/Buttons.styles';

const test = {
  bg: 'active',
};

const slider = {
  display: 'flex',
  '&.is-horizontal': {
    flexDirection: 'column',
  },
};

const track = {
  backgroundColor: 'slider.track',
  cursor: 'pointer',
  mb: 'sm',
  position: 'relative',
  '&.is-disabled': {
    opacity: 0.4,
  },
  '&.is-horizontal': {
    height: '10px',
    borderRadius: '11px',
    width: '100%',
  },
  '&:before': {
    content: 'attr(x)',
    display: 'block',
    position: 'absolute',
    height: '3px',
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&.is-vertical': {
    width: '10px',
    borderRadius: '11px',
    height: '100%',
    '&:before': {
      content: 'attr(x)',
      display: 'block',
      position: 'absolute',
      width: '3px',
      height: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
};

const hiddenTrack = {
  cursor: 'pointer',
  '&.is-horizontal': {
    height: '10px',
    borderRadius: '11px',
    width: 'calc(100% - 9px)',
    ml: '4.5px',
    mr: '4.5px',
  },
  '&.is-vertical': {
    width: '10px',
    borderRadius: '11px',
    height: 'calc(100% - 9px)',
    mt: '4.5px',
    mb: '4.5px',
  },
};

const thumb = {
  width: '21px',
  height: '21px',
  borderRadius: '50%',
  bg: 'active',
  cursor: 'pointer',
  '&.is-focused': {
    ...defaultFocus,
  },
  '&.is-horizontal': {
    top: '50%',
  },
  '&.is-vertical': {
    left: '50%',
  },
  '&.is-hovered': {
    backgroundColor: 'accent.40',
  },
  '&.is-pressed': {
    backgroundColor: 'accent.20',
  },
};

const activeTrack = {
  bg: 'active',
  position: 'absolute',
  '&.is-horizontal': {
    borderRadius: '11px 0px 0px 11px',
    height: '100%',
    '&.is-single-track': {
      left: '0%',
    },
  },
  '&.is-vertical': {
    borderRadius: '11px 11px 11px 11px',
    width: '100%',
    bottom: '0%',
  },
};

const trackWrapper = {
  '&.is-vertical': {
    py: '9px',
  },
  '&.is-horizontal': {
    px: '9px',
  },
};

const labelContainer = {
  '&.is-horizontal': {
    mb: 'xs',
  },
  '&.is-vertical': {
    mt: 'xs',
    gap: 'xs',
  },
};

const wrapper = {
  '&.is-horizontal': {
    width: '100%',
  },
  '&.is-vertical': {
    height: '100%',
    ml: 'xs',
  },
};

const outputContainer = {
  '&.is-horizontal': {
    marginLeft: 'auto',
    mt: '-3px',
  },
};

export default {
  test,
  slider,
  activeTrack,
  thumb,
  track,
  hiddenTrack,
  trackWrapper,
  labelContainer,
  outputContainer,
  wrapper,
};

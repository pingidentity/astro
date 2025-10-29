import { keyframes } from '@emotion/react';

import colors from '../../styles/themes/next-gen/colors/colors';

// Animation keyframes
const pulsate = keyframes`
  \ 0% {
        opacity: 1;
    }
  \ 50% {
        opacity: 0.4;
    }
  \ 100% {
        opacity: 1;
    }
`;

const wave = keyframes`
  \ 0% { 
      -webkit-transform: translateX(-100%);
      -moz-transform: translateX(-100%);
      -ms-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  \ 50% { 
      -webkit-transform: translateX(100%);
      -moz-transform: translateX(100%);
      -ms-transform: translateX(100%);
      transform: translateX(100%);
    }
  \ 100% {
      -webkit-transform: translateX(100%);
      -moz-transform: translateX(100%);
      -ms-transform: translateX(100%);
      transform: translateX(100%);
    }
`;

const animationSettings = '2s linear 0.5s infinite';

const base = {
  backgroundColor: colors['gray-200'],
  position: 'relative',
  overflow: 'hidden',
  '&.is-pulsate': {
    animation: `${pulsate} ${animationSettings}`,
  },
  '&.is-wave': {
    webkitMaskImage: '-webkit-radial-gradient(white, black)',
    '&:after': {
      content: "''",
      background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.04), transparent)',
      position: 'absolute',
      webkitTransform: 'translateX(-100%)',
      mozTransform: 'translateX(-100%)',
      msTransform: 'translateX(-100%)',
      transform: 'translateX(-100%)',
      bottom: '0',
      left: '0',
      right: '0',
      top: '0',
      animation: `${wave} ${animationSettings}`,
    },
  },
};

const text = {
  ...base,
  height: '1.2rem',
  transform: 'scale(1, 0.60)',
  borderRadius: '4px/6.7px',
};

const circular = {
  ...base,
  borderRadius: '50%',
};

const rounded = {
  ...base,
  borderRadius: '4px',
};

export default {
  base,
  text,
  circular,
  rounded,
};

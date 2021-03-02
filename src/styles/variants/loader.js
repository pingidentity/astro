import { keyframes } from '@emotion/react';

const container = {
  flexDirection: 'row',
};

const pulse = keyframes`
    0% {
        opacity: 0;
    }

    50% {
        opacity: 0;
    }
    80% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }

`;

const wait = keyframes`
    0% { opacity: 0; }
    100% { opacity: 0; }
`;

const animationSettings = '1s ease-out infinite';

const dot = {
  borderRadius: '100%',
  bg: 'currentColor',
  height: '1em',
  width: '1em',
  margin: '0.3em',
  display: 'block',
};


const dotLeft = {
  ...dot,
  animation: `${pulse} ${animationSettings}`,
};

const dotCenter = {
  ...dot,
  animation: `${wait} 0.2s, ${pulse} ${animationSettings} 0.2s`,
};

const dotRight = {
  ...dot,
  animation: `${wait} 0.4s, ${pulse} ${animationSettings} 0.4s`,
};


export default {
  dotLeft,
  dotCenter,
  dotRight,
  container,
};

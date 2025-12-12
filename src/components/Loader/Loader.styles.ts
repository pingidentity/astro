import { keyframes } from '@emotion/react';

const container = {
  color: 'currentColor',
  fontSize: '1em',
};

const withinInput = {
  color: 'active',
  fontSize: '6px',
  alignItems: 'center',
  marginRight: 'xs',
};

const withinListbox = {
  color: 'active',
  fontSize: '6px',
  padding: 'md',
  alignItems: 'center',
  justifyContent: 'center',
};

const withinListView = {
  color: 'active',
  height: '100%',
  padding: 'md',
  alignItems: 'center',
  justifyContent: 'center',
};

const withinDataTable = {
  color: 'active',
  padding: 'md',
  alignItems: 'center',
  justifyContent: 'center',
};

const pulse = keyframes`
  \ 0% {
        opacity: 0;
    }

  \ 50% {
        opacity: 0;
    }
  \ 80% {
        opacity: 1;
    }
  \ 100% {
        opacity: 0;
    }

`;

const wait = keyframes`
  \ 0% { opacity: 0; }
  \ 100% { opacity: 0; }
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

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const circleContainer = {
  justifyContent: 'center',
  alignItems: 'center',
};

const circleSpinner = {
  animation: `${spin} .75s linear infinite`,
};

export default {
  circleContainer,
  circleSpinner,
  dotLeft,
  dotCenter,
  dotRight,
  container,
  withinInput,
  withinListbox,
  withinListView,
  withinDataTable,
};

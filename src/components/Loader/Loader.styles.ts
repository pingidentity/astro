import { keyframes } from '@emotion/react';

const container = {
  color: 'currentColor',
  fontSize: '1em',
};

const withinInput = {
  color: 'neutral.60',
  fontSize: '6px',
  alignItems: 'center',
  marginRight: 'xs',
};

const withinListbox = {
  color: 'neutral.60',
  fontSize: '6px',
  padding: 'md',
  alignItems: 'center',
  justifyContent: 'center',
};

const withinListView = {
  color: 'neutral.60',
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

export default {
  dotLeft,
  dotCenter,
  dotRight,
  container,
  withinInput,
  withinListbox,
  withinListView,
};

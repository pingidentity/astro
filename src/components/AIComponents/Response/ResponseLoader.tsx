import React, { forwardRef } from 'react';
import { ClassNames, keyframes } from '@emotion/react';

import { LoaderProps } from '../../../types';

const typingPulse = keyframes`
   0% {
        opacity: 0.25;
    }

   50% {
        opacity: 0.25;
    }
   80% {
        opacity: 1;
    }
   100% {
        opacity: 0.25;
    }
`;

const animationSettingsType = '2s ease-out infinite';

const ResponseLoader = forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
  const {
    color = 'currentColor',
  } = props;
  return (
    <ClassNames>
      {({ css: className }) => (
        <span
          ref={ref}
          role="alert"
          aria-label="response is loading"
          className={className`
            animation: ${typingPulse} ${animationSettingsType};
            background-color: ${color};
            height: .75rem;
            width: .75rem;
            border-radius: 50%;
            display: inline-block;
            margin-left: 4px;
            margin-bottom: -1px;
        `}
        />
      )}
    </ClassNames>
  );
});


export default ResponseLoader;

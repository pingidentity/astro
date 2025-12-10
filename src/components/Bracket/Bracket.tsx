import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { v4 as uuid } from 'uuid';

import { Box } from '../../index';
import { line } from '../../styles/colors';
import { BracketProps } from '../../types';

const Bracket = forwardRef<HTMLElement, BracketProps>((props, ref) => {
  const {
    isLast,
    color,
    ...others
  } = props;

  const bracketRef = useRef<HTMLElement>(null);

  /* istanbul ignore next */
  useImperativeHandle(ref, () => bracketRef.current as HTMLElement);

  const bracketId = useMemo(() => uuid(), []);
  const bracketFillOneId = useMemo(() => uuid(), []);
  const bracketFillTwoId = useMemo(() => uuid(), []);

  return (
    <Box variant="bracket.base" {...others} ref={bracketRef}>
      {!isLast && (
        <Box width={15} sx={{ position: 'absolute', top: 0, bottom: 0 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            preserveAspectRatio="none"
            viewBox="0 0 10 10"
            style={{ flexGrow: 1 }}
            data-testid="isLastLayer"
            aria-labelledby={`bracket-fill-vertical-icon-title-${bracketId}`}
          >
            <title id={`bracket-fill-vertical-icon-title-${bracketId}`}>bracket-fill</title>
            <g transform="translate(-0.85, 0)">
              <title>Layer 3</title>
              <line
                y2="0"
                x2="1"
                y1="10"
                x1="1"
                stroke={color}
                fill="none"
              // strokeWidth={2}
              />
            </g>
          </svg>
        </Box>
      )}
      <Box flexBasis="50%">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          preserveAspectRatio="none"
          viewBox="0 0 5 5"
          style={{ flexGrow: 1 }}
          aria-labelledby={`bracket-fill-1-icon-title-${bracketFillOneId}`}
        >
          <title id={`bracket-fill-1-icon-title-${bracketFillOneId}`}>bracket-fill</title>
          <g>
            <title>Layer 1</title>
            <line
              y2="0"
              x2="0"
              y1="10"
              x1="0"
              stroke={color}
              fill="none"
            />
          </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="15" aria-labelledby={`bracket-fill-2-icon-title-${bracketFillTwoId}`}>
          <title id={`bracket-fill-2-icon-title-${bracketFillTwoId}`}>bracket-fill</title>
          <g transform="translate(-0.5, -0.5)">
            <title>Layer 2</title>
            <path
              fill="none"
              stroke={color}
              d="M1 0C1 2.5 1 8 1 10C1 12.5 3 14.5 5.5 14.5C7.1 14.5 9.33333 14.5 10.5 14.5"
            />
          </g>
        </svg>
      </Box>
    </Box>
  );
});

Bracket.defaultProps = {
  color: line.light,
};

export default Bracket;

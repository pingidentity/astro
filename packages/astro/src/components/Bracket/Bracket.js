import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';

import { Box } from '../../index';
import { line } from '../../styles/colors';

const Bracket = forwardRef((props, ref) => {
  const {
    isLast,
    color,
    ...others
  } = props;

  const bracketRef = useRef();

  /* istanbul ignore next */
  useImperativeHandle(ref, () => bracketRef.current);

  return (
    <Box variant="bracket.base" {...others}>
      {!isLast && (
        <Box width={15} sx={{ position: 'absolute', top: 0, bottom: 0 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            preserveAspectRatio="none"
            viewBox="0 0 10 10"
            style={{ flexGrow: 1 }}
            data-testid="isLastLayer"
          >
            <title>bracket-fill</title>
            <g>
              <title>Layer 3</title>
              <line
                strokeLinecap="undefined"
                strokeLinejoin="undefined"
                y2="0"
                x2="0"
                y1="10"
                x1="0"
                stroke={color}
                fill="none"
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
          viewBox="0 0 10 10"
          style={{ flexGrow: 1 }}
        >
          <title>bracket-fill</title>
          <g>
            <title>Layer 1</title>
            <line
              strokeLinecap="undefined"
              strokeLinejoin="undefined"
              y2="0"
              x2="0"
              y1="10"
              x1="0"
              stroke={color}
              fill="none"
            />
          </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="15">
          <title>bracket-fill</title>
          <g transform="translate(-1, 0)">
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

Bracket.propTypes = {
  /** A prop to set the strokes color. */
  color: PropTypes.string,
  /** Whether or not the bracket is the last in a series of brackets. */
  isLast: PropTypes.bool,
};

export default Bracket;

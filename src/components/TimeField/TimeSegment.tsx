import React, { useCallback, useRef } from 'react';
import { useFocusManager } from 'react-aria';
import { useDateSegment } from '@react-aria/datepicker';

import { Box } from '../../index';
import { TimeSegmentProps } from '../../types';


const TimeSegment: React.FC<TimeSegmentProps> = props => {
  const { state, segment, segments, segmentIndex } = props;
  const { text, isPlaceholder } = segment;

  const ref = useRef<HTMLElement>(null);

  const { segmentProps } = useDateSegment(segment, state, ref);

  const focusManager = useFocusManager();

  const handleKeyEvents = useCallback(
    e => {
      const getSegmentValue = seg => {
        if (!seg) return false;
        const isNumber = /^\d+$/.test(seg.text);
        return isNumber;
      };

      if (e.key === 'Backspace' && isPlaceholder) {
        let nextSegmentIndex = segmentIndex + 1;
        while (
          segments[nextSegmentIndex]
          && segments[nextSegmentIndex].type === 'literal'
        ) {
          nextSegmentIndex += 1;
        }
        const nextSegment = segments[nextSegmentIndex];

        let previousSegmentIndex = segmentIndex - 1;
        while (
          segments[previousSegmentIndex]
          && segments[previousSegmentIndex].type === 'literal'
        ) {
          previousSegmentIndex -= 1;
        }
        const previousSegment = segments[previousSegmentIndex];

        if (getSegmentValue(nextSegment)) return focusManager.focusNext();
        if (!getSegmentValue(nextSegment) && getSegmentValue(previousSegment)) {
          return focusManager.focusPrevious();
        }
      }
      return null;
    },
    [focusManager, isPlaceholder, segments, segmentIndex],
  );

  return (
    <Box {...segmentProps} ref={ref} variant="forms.timeField.segment" onKeyUp={handleKeyEvents}>
      {text}
    </Box>
  );
};

export default TimeSegment;

import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { useFocusManager } from 'react-aria';
import { useDateSegment } from '@react-aria/datepicker';

import { Box } from '../../index';
import { DateSegmentProps } from '../../types';

/**
 * Each editable segment of date.
 */
const DateSegment = forwardRef<HTMLElement, DateSegmentProps>((props, ref) => {
  const { isLocalEnUS, segment, state, handlePaste, segments, segmentIndex } = props;

  const segmentRef = useRef<HTMLElement>(null);
  // istanbul ignore next
  useImperativeHandle(ref, () => segmentRef.current as HTMLElement);

  const { text, isPlaceholder, type } = segment;
  const { segmentProps } = useDateSegment(segment, state, segmentRef);

  /**
   * Handler to autofocus segments when using delete key
   */
  const focusManager = useFocusManager();

  const handleKeyEvents = useCallback(
    e => {
      const getSegmentValue = index => {
        const isNumber = /^\d+$/.test(segments[index].text);
        return isNumber;
      };

      if (e.key === 'Backspace' && isPlaceholder) {
        switch (segmentIndex) {
          case 0:
            if (getSegmentValue(2)) return focusManager.focusNext();
            if (!getSegmentValue(2) && getSegmentValue(4)) return focusManager.focusLast();
            break;

          case 2:
            if (getSegmentValue(0)) return focusManager.focusPrevious();
            if (getSegmentValue(4)) return focusManager.focusNext();
            break;

          case 4:
            if (getSegmentValue(2)) return focusManager.focusPrevious();
            if (!getSegmentValue(2) && getSegmentValue(0)) return focusManager.focusFirst();
            break;

          default:
        }
      }
      return null;
    },
    [focusManager, segment, isPlaceholder],
  );

  let displayText = text;

  if (text === '/') {
    displayText = '-';
  } else {
    let padLength = 0;

    if (isLocalEnUS) {
      if (type === 'year') {
        padLength = 4;
      } else {
        padLength = 2;
      }
    }

    displayText = text.padStart(padLength, '0');
  }

  return (
    <Box
      {...segmentProps}
      ref={segmentRef}
      variant="forms.datePicker.segment"
      onKeyUp={handleKeyEvents}
      onPaste={handlePaste}
    >
      {displayText}
    </Box>
  );
});

export default DateSegment;

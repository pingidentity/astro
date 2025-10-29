import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { useFocusManager } from 'react-aria';
import { useDateSegment } from '@react-aria/datepicker';
import PropTypes from 'prop-types';

import { Box } from '../../index';

/**
 * Each editable segment of date.
 */
const DateSegment = forwardRef((props, ref) => {
  const { isLocalEnUS, segment, state, handlePaste, segments, segmentIndex } = props;

  const segmentRef = useRef();
  // istanbul ignore next
  useImperativeHandle(ref, () => segmentRef.current);

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

  return (
    <Box
      {...segmentProps}
      ref={segmentRef}
      variant="forms.datePicker.segment"
      onKeyUp={handleKeyEvents}
      onPaste={handlePaste}
    >
      {text === '/' ? '-' : text.padStart(isLocalEnUS && (type === 'year' ? 4 : 2), 0)}
    </Box>
  );
});

DateSegment.propTypes = {
  /** slot for input that indicates each date segment */
  segment: PropTypes.shape({
    isPlaceholder: PropTypes.bool,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.number,
    type: PropTypes.string,
  }),
  /** index value of each segment */
  segmentIndex: PropTypes.number,
  /** An array of segments */
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    }),
  ),
  /** state returned by useDateField */
  state: PropTypes.shape({}),
  /**
   * Handler that is called when a paste event is called.
   * (e: PasteEvent) => void
   */
  handlePaste: PropTypes.func,
  /** checks if the current locale is en-US */
  isLocalEnUS: PropTypes.bool,
};

export default DateSegment;

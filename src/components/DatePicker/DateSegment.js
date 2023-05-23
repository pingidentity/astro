import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { useFocusManager } from 'react-aria';
import { useDateSegment } from '@react-aria/datepicker';
import PropTypes from 'prop-types';

import { Box } from '../../index';

/**
 * Each editable segment of date.
 */
const DateSegment = forwardRef((props, ref) => {
  const { segment, state, handlePaste } = props;

  const segmentRef = useRef();
  // istanbul ignore next
  useImperativeHandle(ref, () => segmentRef.current);

  const { text, isPlaceholder } = segment;
  const { segmentProps } = useDateSegment(segment, state, segmentRef);

  /**
   * Handler to autofocus segments when using delete key
   */
  const focusManager = useFocusManager();

  const handleKeyEvents = useCallback(
    e => {
      if (e.key === 'Backspace' && isPlaceholder && (text === 'mm' || text === 'dd')) {
        focusManager.focusPrevious();
      }
    },
    [focusManager, segment, text, isPlaceholder],
  );

  return (
    <Box
      {...segmentProps}
      ref={segmentRef}
      variant="forms.datePicker.segment"
      onKeyUp={handleKeyEvents}
      onPaste={handlePaste}
    >
      {text === '/' ? '-' : text.padStart(segment.type === 'year' ? 4 : 2, 0)}
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
  /** state returned by useDateField */
  state: PropTypes.shape({}),
  /**
   * Handler that is called when a paste event is called.
   * (e: PasteEvent) => void
   */
  handlePaste: PropTypes.func,
};

export default DateSegment;

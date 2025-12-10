import React from 'react';
import { useVisuallyHidden } from 'react-aria';
import { useDropIndicator } from '@react-aria/dnd';
import PropTypes from 'prop-types';

import {
  Box,
} from '../..';

const InsertionIndicator = props => {
  const insertRef = React.useRef(null);
  const {
    target,
    dropState: state,
  } = props;

  const { visuallyHiddenProps } = useVisuallyHidden();

  const { dropIndicatorProps, isHidden, isDropTarget } = useDropIndicator(
    {
      target,
    },
    state,
    { ref: insertRef },
  );

  if (isHidden) {
    return null;
  }

  if (!isDropTarget) {
    return null;
  }

  return (
    <Box role="row" aria-hidden={dropIndicatorProps['aria-hidden']} data-testid="insertion-indicator">
      <Box
        role="gridcell"
        aria-selected="false"
        variant="treeView.insertionIndicator"
      >
        <Box {...visuallyHiddenProps} role="button" {...dropIndicatorProps} ref={insertRef} />
      </Box>
    </Box>
  );
};

InsertionIndicator.propTypes = {
  dropState: PropTypes.shape({}),
  target: PropTypes.shape({}),
};

export default InsertionIndicator;

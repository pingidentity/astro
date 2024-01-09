import React from 'react';
import { useDropIndicator } from '@react-aria/dnd';
import PropTypes from 'prop-types';

import {
  Box,
} from '../..';
import { useStatusClasses } from '../../hooks';

const InsertionIndicator = props => {
  const insertRef = React.useRef(null);
  const {
    target,
    dropState: state,
  } = props;

  const { dropIndicatorProps, isHidden, isDropTarget } = useDropIndicator(
    {
      target,
      isPresentationOnly: true,
    },
    state,
    { ref: insertRef },
  );

  const { classNames } = useStatusClasses('', {
    isDropTarget,
  });

  if (isHidden) {
    return null;
  }

  return (
    <Box
      as="li"
      {...dropIndicatorProps}
      role="option"
      ref={insertRef}
      className={classNames}
      variant="treeView.insertionIndicator"
    />
  );
};

InsertionIndicator.propTypes = {
  dropState: PropTypes.shape({}),
  target: PropTypes.shape({}),
};

export default InsertionIndicator;

import React, { forwardRef, useEffect } from 'react';
import { mergeProps } from 'react-aria';
import { FocusScope, useFocusManager } from '@react-aria/focus';
import PropTypes from 'prop-types';

import { Box } from '../../index';

export const escapeFocusDelegate = (e, setIsFocusEscaped, focusManager, isFocusEscaped) => {
  if (e.keyCode === 13) {
    setIsFocusEscaped(true);
    focusManager.focusNext();
    e.stopPropagation();
    e.preventDefault();
  } else if (isFocusEscaped) {
    switch (e.keyCode) {
      case 37:
        e.stopPropagation();
        break;
      case 39:
        e.stopPropagation();
        break;
      case 38:
        focusManager.focusPrevious();
        e.stopPropagation();
        e.preventDefault();
        break;
      case 40:
        focusManager.focusNext();
        e.stopPropagation();
        e.preventDefault();
        break;
      default:
        break;
    }
  }
};

const ExpandableItemChildrenContainer = forwardRef((props, ref) => {
  const {
    children,
    gridCellProps,
    focusManager,
    isFocusEscaped,
    setIsFocusEscaped,
    focusProps,
    focusWithinProps,
    isFocused,
    isFocusWithin,
    ...others
  } = props;

  const mergedProps = mergeProps(
    others,
    gridCellProps,
    focusProps,
    focusWithinProps,
  );

  // this handles instances where a user clicks into the container.
  useEffect(() => {
    if (isFocusWithin && !isFocusEscaped && !isFocused) {
      setIsFocusEscaped(true);
    }
  }, [isFocusWithin]);

  return (
    <Box
      ref={ref}
      {...mergedProps}
      tabIndex={0}
      onKeyDown={e => { escapeFocusDelegate(e, setIsFocusEscaped, focusManager, isFocusEscaped); }}
    >
      {children}
    </Box>
  );
});

ExpandableItemChildrenContainer.propTypes = {
  gridCellProps: PropTypes.shape({}),
  focusManager: PropTypes.shape({}),
  focusProps: PropTypes.shape({}),
  focusWithinProps: PropTypes.shape({}),
  isFocusEscaped: PropTypes.bool,
  isFocused: PropTypes.bool,
  isFocusWithin: PropTypes.bool,
  expandableContainerOnBlur: PropTypes.func,
  expandableContainerOnFocus: PropTypes.func,
  setIsFocusEscaped: PropTypes.func,
};

const ListViewFocusWrapper = props => {
  const {
    children,
    containerProps,
    isFocusEscaped,
  } = props;

  const focusManager = useFocusManager();

  return (
    <FocusScope restoreFocus={false} contain={isFocusEscaped}>
      <FocusableItem>
        <ExpandableItemChildrenContainer {...containerProps} focusManager={focusManager}>
          {children}
        </ExpandableItemChildrenContainer>
      </FocusableItem>
    </FocusScope>
  );
};

const FocusableItem = props => {
  const focusManager = useFocusManager();
  const childWithFocusHandle = React.cloneElement(props.children, { focusManager });
  return childWithFocusHandle;
};


ListViewFocusWrapper.propTypes = {
  containerProps: PropTypes.shape({}),
  isFocusEscaped: PropTypes.bool,
};

export default ListViewFocusWrapper;

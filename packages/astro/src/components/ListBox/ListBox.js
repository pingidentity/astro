import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useListBox } from '@react-aria/listbox';
import { mergeProps } from '@react-aria/utils';

import Option from './Option';
import Box from '../Box';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';

const ListBox = forwardRef((props, ref) => {
  const {
    defaultSelectedKeys,
    disabledKeys,
    hasAutoFocus,
    hasFocusWrap,
    hasNoEmptySelection,
    hasVirtualFocus,
    id,
    isLoading,
    isVirtualized,
    items,
    keyboardDelegate,
    label,
    onLoadMore,
    onSelectionChange,
    selectedKeys,
    selectionMode,
    state,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-details': ariaDetails,
    ...others
  } = props;
  const {
    collection,
    focusStrategy,
  } = state;
  // Object matching React Aria API with all options
  const listBoxOptions = {
    autoFocus: hasAutoFocus || focusStrategy,
    defaultSelectedKeys,
    disabledKeys,
    disallowEmptySelection: hasNoEmptySelection,
    id,
    isLoading,
    isVirtualized,
    items,
    keyboardDelegate,
    label,
    onLoadMore,
    onSelectionChange,
    selectedKeys,
    selectionMode,
    shouldFocusWrap: hasFocusWrap,
    shouldUseVirtualFocus: hasVirtualFocus,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-details': ariaDetails,
  };

  const listBoxRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => listBoxRef.current);

  // Get props for the listbox
  const { listBoxProps } = useListBox(listBoxOptions, state, listBoxRef);

  return (
    <Box
      as="ul"
      variant="listBox"
      ref={listBoxRef}
      {...mergeProps(listBoxProps, others)}
    >
      {Array.from(collection).map(item => (
        <Option
          key={item.key}
          item={item}
          state={state}
          hasVirtualFocus={hasVirtualFocus}
        />
      ))}
    </Box>
  );
});

ListBox.propTypes = {
  defaultSelectedKeys: isIterableProp,
  disabledKeys: isIterableProp,
  hasAutoFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  hasFocusWrap: PropTypes.bool,
  hasNoEmptySelection: PropTypes.bool,
  hasVirtualFocus: PropTypes.bool,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  isVirtualized: PropTypes.bool,
  items: isIterableProp,
  keyboardDelegate: PropTypes.any,
  label: PropTypes.node,
  onLoadMore: PropTypes.func,
  onSelectionChange: PropTypes.func,
  selectedKeys: isIterableProp,
  selectionMode: PropTypes.any,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-details': PropTypes.string,
  state: PropTypes.shape({
    close: PropTypes.func,
    collection: PropTypes.shape({}),
    focusStrategy: PropTypes.string,
    isOpen: PropTypes.bool,
  }),
};

ListBox.defaultProps = {
  state: {},
};

export default ListBox;

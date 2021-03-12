import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useListBox } from '@react-aria/listbox';
import { mergeProps } from '@react-aria/utils';
import { FocusScope } from '@react-aria/focus';
import { useOverlay, DismissButton } from '@react-aria/overlays';

import Option from './Option';
import Box from '../Box';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';

const ListBoxPopup = forwardRef((props, ref) => {
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
    close,
    collection,
    focusStrategy,
    isOpen,
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

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  const overlayRef = useRef();
  const { overlayProps } = useOverlay(
    {
      onClose: () => close(),
      shouldCloseOnBlur: true,
      isOpen,
      isDismissable: true,
    },
    overlayRef,
  );

  // Wrap in <FocusScope> so that focus is restored back to the
  // trigger when the popup is closed. In addition, add hidden
  // <DismissButton> components at the start and end of the list
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope restoreFocus>
      <Box ref={overlayRef} {...overlayProps} {...props}>
        <DismissButton onDismiss={() => close()} />
        <Box
          as="ul"
          variant="forms.select.listBoxPopup"
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
        <DismissButton onDismiss={() => close()} />
      </Box>
    </FocusScope>
  );
});

ListBoxPopup.propTypes = {
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

ListBoxPopup.defaultProps = {
  state: {},
};

export default ListBoxPopup;

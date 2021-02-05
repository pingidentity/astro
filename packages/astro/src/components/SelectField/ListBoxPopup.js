import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useListBox } from '@react-aria/listbox';
import { mergeProps } from '@react-aria/utils';
import { FocusScope } from '@react-aria/focus';
import { useOverlay, DismissButton } from '@react-aria/overlays';

import Option from './Option';
import Box from '../Box';

const ListBoxPopup = forwardRef((props, ref) => {
  const {
    state,
    ...others
  } = props;
  const {
    close,
    collection,
    focusStrategy,
    isOpen,
  } = state;
  const listBoxRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => listBoxRef.current);

  // Get props for the listbox
  const { listBoxProps } = useListBox(
    {
      autoFocus: focusStrategy || true,
      disallowEmptySelection: true,
      ...others,
    },
    state,
    listBoxRef,
  );

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
            <Option key={item.key} item={item} state={state} />
          ))}
        </Box>
        <DismissButton onDismiss={() => close()} />
      </Box>
    </FocusScope>
  );
});

ListBoxPopup.propTypes = {
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

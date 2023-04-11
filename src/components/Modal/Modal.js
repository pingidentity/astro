import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  FocusScope,
  OverlayContainer,
  useDialog,
  useModal,
  useOverlay,
  usePreventScroll,
} from 'react-aria';
import CloseIcon from 'mdi-react/CloseIcon';
import PropTypes from 'prop-types';

import { useStatusClasses } from '../../hooks';
import { modalSizes } from '../../utils/devUtils/constants/modalSizes';
import Box from '../Box';
import Icon from '../Icon';
import IconButton from '../IconButton';
import Text from '../Text';

/**
  * Modals are overlays that interrupt a user’s workflow to convey an important message.
  * The component must be wrapped in an OverlayProvider, and the first child should be a trigger,
  * such as Button.
*/

const Modal = forwardRef((props, ref) => {
  const {
    className,
    closeButton,
    hasAutoFocus,
    hasCloseButton,
    id,
    isClosedOnBlur,
    isDismissable,
    isKeyboardDismissDisabled,
    isOpen,
    role,
    size,
    title,
    onClose,
    shouldCloseOnInteractOutside,
    children,
    contentProps: propsContentProps,
    containerProps,
    ...others
  } = props;
  const contentProps = {
    id,
    shouldCloseOnBlur: isClosedOnBlur,
    isDismissable,
    isKeyboardDismissDisabled,
    isOpen,
    role,
    title,
    onClose,
    shouldCloseOnInteractOutside,
    children,
    ...propsContentProps,
  };

  const modalRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => modalRef.current);
  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const { overlayProps } = useOverlay(contentProps, modalRef);

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll();
  const { modalProps } = useModal();

  // Get props for the dialog and its title
  const { dialogProps, titleProps } = useDialog(contentProps, modalRef);

  const { classNames } = useStatusClasses(className, { [`is-${size || 'custom'}`]: size });

  return (
    <OverlayContainer>
      <Box variant="modal.container" {...others} {...containerProps}>
        <FocusScope contain restoreFocus autoFocus={hasAutoFocus}>
          <Box
            variant="modal.content"
            className={classNames}
            {...propsContentProps}
            {...overlayProps}
            {...dialogProps}
            {...modalProps}
            ref={modalRef}
            aria-modal
          >
            {
              hasCloseButton
              && (
                closeButton
                ?? (
                <IconButton
                  aria-label="Close modal window"
                  data-id="icon-button__close-modal-window"
                  variant="modalCloseButton"
                  onPress={onClose}
                >
                  <Icon icon={CloseIcon} />
                </IconButton>
                )
              )
            }
            {
              title
              && (
              <Text
                {...titleProps}
                variant="variants.modal.title"
              >
                  {title}
              </Text>
              )
            }
            {children}
          </Box>
        </FocusScope>
      </Box>
    </OverlayContainer>
  );
});

Modal.propTypes = {
  /** Used in tandem with `hasCloseButton` to customize how the close button is rendered. */
  closeButton: PropTypes.node,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** Whether to auto focus the first focusable element in the focus scope on mount. */
  hasAutoFocus: PropTypes.bool,
  /** Whether the modal has a visible close button. */
  hasCloseButton: PropTypes.bool,
  /** Whether the overlay should close when focus is lost or moves outside it. */
  isClosedOnBlur: PropTypes.bool,
  /** Whether to close the overlay when the user interacts outside it. */
  isDismissable: PropTypes.bool,
  /** Whether pressing the escape key to close the overlay should be disabled. */
  isKeyboardDismissDisabled: PropTypes.bool,
  /** Whether the overlay is currently open. */
  isOpen: PropTypes.bool,
  /** The accessibility role for the dialog. */
  role: PropTypes.oneOf(['dialog', 'alertdialog']),
  /** Sets the size of the modal container. */
  size: PropTypes.oneOf(modalSizes),
  /** The title for the modal. */
  title: PropTypes.node,
  /**
   * Handler that is called when the overlay should close.
   *
   * `() => void`
   */
  onClose: PropTypes.func,
  /**
   * When a user interacts with the argument element outside of the overlay ref, return true if
   * onClose should be called. This gives you a chance to filter out interaction with elements that
   * should not dismiss the overlay. By default, onClose will always be called on interaction
   * outside the overlay ref.
   *
   * `(element: HTMLElement) => boolean`
   */
  shouldCloseOnInteractOutside: PropTypes.func,
  /** Defines a string value that labels the current element. */
  'aria-label': PropTypes.string,
  /** Identifies the element (or elements) that labels the current element. */
  'aria-labelledby': PropTypes.string,
  /** Identifies the element (or elements) that describes the object. */
  'aria-describedby': PropTypes.string,
  /**
   * Identifies the element (or elements) that provide a detailed, extended description for the
   * object.
   */
  'aria-details': PropTypes.string,
  /** Props object spread directly into the modal content Box. */
  contentProps: PropTypes.shape({}),
  /** Props object spread directly into the modal container Box. */
  containerProps: PropTypes.shape({}),
};

Modal.defaultProps = {
  role: 'dialog',
};

Modal.displayName = 'Modal';
export default Modal;

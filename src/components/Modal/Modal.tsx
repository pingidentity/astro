import React, { forwardRef, RefObject } from 'react';
import {
  FocusScope,
  mergeProps,
  OverlayContainer,
  useDialog,
} from 'react-aria';
import CloseIcon from '@pingux/mdi-react/CloseIcon';
import { type AriaModalOverlayProps, type ModalOverlayAria, useModalOverlay } from '@react-aria/overlays';
import { type OverlayTriggerState } from '@react-stately/overlays';

import { useLocalOrForwardRef, useStatusClasses } from '../../hooks';
import { ModalProps } from '../../types';
import Box from '../Box';
import Icon from '../Icon';
import IconButton from '../IconButton';
import Text from '../Text';

const Modal = forwardRef<HTMLElement, ModalProps>((props, ref) => {
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
    state,
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

  const shouldShow = state ? state?.isTransitioning || isOpen : isOpen;

  const modalState = {
    close: onClose,
    isOpen: shouldShow,
  };

  const modalRef = useLocalOrForwardRef<HTMLElement>(ref);

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal,
  // prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  const { modalProps, underlayProps }: ModalOverlayAria = useModalOverlay(
    contentProps as AriaModalOverlayProps,
    modalState as OverlayTriggerState,
    modalRef as RefObject<HTMLElement>);

  // Get props for the dialog and its title
  const { dialogProps, titleProps } = useDialog(contentProps, modalRef);

  // this is code to avoid regressions -- implementations that do not use the
  // useMountTransition hook will not break, because this className gives the
  // component the styling properties that it needs.
  const isOpenNoTransition = state?.isTransitioning === undefined && isOpen === true;

  const { classNames } = useStatusClasses(className, {
    [`is-${size || 'custom'}`]: size,
    isOpen,
    isTransitioning: state?.isTransitioning,
    isOpenNoTransition,
  });

  return (
    <OverlayContainer>
      <Box
        variant="modal.container"
        {...mergeProps(containerProps, underlayProps, others)}
        role="none"
      >
        <FocusScope contain restoreFocus autoFocus={hasAutoFocus}>
          <Box
            variant="modal.content"
            className={classNames}
            {...propsContentProps}
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
                    <Icon icon={CloseIcon} title={{ name: 'Close Icon' }} />
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
                  role="heading"
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

Modal.defaultProps = {
  role: 'dialog',
  size: 'small',
};

Modal.displayName = 'Modal';
export default Modal;

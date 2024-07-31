import { ReactNode } from 'react';

import { AstroOverlayTriggerState } from '../hooks/useModalState/useModalState';

import { DOMAttributes } from './shared/dom';
import { ModalSizeProps } from './shared/style';
import { TestingAttributes } from './shared/test';

export interface ModalProps extends DOMAttributes, TestingAttributes {
  /** Used in tandem with `hasCloseButton` to customize how the close button is rendered. */
  closeButton?: ReactNode;
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id?: string;
  /** Whether to auto focus the first focusable element in the focus scope on mount. */
  hasAutoFocus?: boolean;
  /** Whether the modal has a visible close button. */
  hasCloseButton?: boolean;
  /** Whether the overlay should close when focus is lost or moves outside it. */
  isClosedOnBlur?: boolean;
  /** Whether to close the overlay when the user interacts outside it. */
  isDismissable?: boolean;
  /** Whether pressing the escape key to close the overlay should be disabled. */
  isKeyboardDismissDisabled?: boolean;
  /** Whether the overlay is currently open. */
  isOpen?: boolean;
  /** The accessibility role for the dialog. */
  role?: 'dialog' | 'alertdialog';
  /** Sets the size of the modal container. */
  size?: ModalSizeProps;
  state?: AstroOverlayTriggerState;
  /** The title for the modal. */
  title?: ReactNode;
  /**
   * Handler that is called when the overlay should close.
   *
   * `() => void`
   */
  onClose?: () => void;
  /**
   * When a user interacts with the argument element outside of the overlay ref, return true if
   * onClose should be called. This gives you a chance to filter out interaction with elements that
   * should not dismiss the overlay. By default, onClose will always be called on interaction
   * outside the overlay ref.
   *
   * `(element: HTMLElement) => boolean`
   */
  shouldCloseOnInteractOutside?: (element: Element) => boolean;
  /** Defines a string value that labels the current element. */
  'aria-label'?: string;
  /** Identifies the element (or elements) that labels the current element. */
  'aria-labelledby'?: string;
  /** Identifies the element (or elements) that describes the object. */
  'aria-describedby'?: string;
  /**
   * Identifies the element (or elements) that provide a detailed, extended description for the
   * object.
   */
  'aria-details'?: string;
  /** Props object spread directly into the modal content Box. */
  contentProps?: object;
  /** Props object spread directly into the modal container Box. */
  containerProps?: object;
}

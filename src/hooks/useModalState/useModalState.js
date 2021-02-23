import { useOverlayTriggerState } from '@react-stately/overlays';

/**
 * Returns state-related data and functions for use with a Modal component.
 * @param {Object} [props] Properties provided to the state
 * @param {Boolean} [props.isDefaultOpen] Whether the modal is open by default (uncontrolled).
 * @param {Boolean} [props.isOpen] Whether the modal is currently open (controlled).
 * @param {Function} [props.onOpenChange] Handler that is called when the open state changes.
 * `(isOpen: boolean) => void`
 * @returns {Object} `{ isOpen: Boolean, open: Function, close: Function, toggle: Function }`
 */
const useModalState = (props = {}) => {
  const {
    isDefaultOpen,
    isOpen,
    onOpenChange,
  } = props;

  return useOverlayTriggerState({
    defaultOpen: isDefaultOpen,
    isOpen,
    onOpenChange,
  });
};

export default useModalState;

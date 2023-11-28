import { OverlayTriggerState, useOverlayTriggerState } from 'react-stately';

interface UseModalStateProps {
  isDefaultOpen?: boolean,
  isOpen?: boolean,
  onOpenChange?: (isOpen: boolean) => void,
}

interface UseModalState {
  /**
   * Returns state-related data and functions for use with a Modal component.
   * @param {Object} [props] Properties provided to the state
   *
   * `props.isDefaultOpen`: boolean - Whether the modal is open by default (uncontrolled).
   * `props.isOpen`: boolean - Whether the modal is currently open (controlled).
   * `props.onOpenChange`: boolean - Handler that is called when the open state changes.
   *
   * @returns {Object} `{ isOpen: Boolean, open: Function, close: Function, toggle: Function }`
   */
  (props?: UseModalStateProps): OverlayTriggerState;
}

const useModalState: UseModalState = (props = {}) => {
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

import { OverlayTriggerState, useOverlayTriggerState } from 'react-stately';

import useMountTransition from '../useMountTransition';

interface UseModalStateProps {
  isDefaultOpen?: boolean,
  isOpen?: boolean,
  onOpenChange?: (isOpen: boolean) => void,
  transitionDuration?: number
}

export interface AstroOverlayTriggerState extends OverlayTriggerState {
  isTransitioning: boolean
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
  (props?: UseModalStateProps): AstroOverlayTriggerState;
}

const useModalState: UseModalState = (props = {}) => {
  const {
    isDefaultOpen,
    isOpen,
    onOpenChange,
    transitionDuration,
  } = props;

  const state = useOverlayTriggerState({
    defaultOpen: isDefaultOpen,
    isOpen,
    onOpenChange,
  });

  const { isOpen: modalOpen } = state;

  const isTransitioning = useMountTransition(modalOpen, transitionDuration || 300);

  const returnState = {
    ...state, isTransitioning,
  };

  return returnState;
};

export default useModalState;

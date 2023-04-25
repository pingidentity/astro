import { useOverlayTriggerState } from 'react-stately';

import useMountTransition from '../useMountTransition';

/**
 * Returns state-related data and functions for use with a Modal component.
 * @param {Object} [props] Properties provided to the state
 * @param {Boolean} [props.isDefaultOpen] Whether the modal is open by default (uncontrolled).
 * @param {Boolean} [props.isOpen] Whether the modal is currently open (controlled).
 * @param {Function} [props.onOpenChange] Handler that is called when the open state changes.
 * @param {Number} [props.transitionDuration] Number value of the length of the transition in ms.
 * `(isOpen: boolean) => void`
 * @returns {Object} `{ isOpen: Boolean, open: Function, close: Function, toggle: Function }`
 */
const useOverlayPanelState = (props = {}) => {
  const {
    isDefaultOpen,
    isOpen,
    onOpenChange,
    transitionDuration = 500,
  } = props;

  const state = useOverlayTriggerState({
    defaultOpen: isDefaultOpen,
    isOpen,
    onOpenChange,
  });

  const {
    isOpen: panelOpen,
  } = state;

  const isTransitioning = useMountTransition(panelOpen, transitionDuration);

  const onClose = (stateProp, triggerRef, onCloseProp) => {
    if (stateProp) {
      stateProp.close();
    }
    if (triggerRef?.current) {
      triggerRef.current.focus();
    }
    if (onCloseProp) {
      onCloseProp();
    }
  };

  const thisState = { ...state, isTransitioning };

  return { state: thisState, onClose, isTransitioning };
};

export default useOverlayPanelState;

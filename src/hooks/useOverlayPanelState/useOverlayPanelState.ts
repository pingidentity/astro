import { OverlayTriggerState, useOverlayTriggerState } from 'react-stately';

import useMountTransition from '../useMountTransition';


interface UseOverlayPanelStateProps {
  isDefaultOpen?: boolean,
  isOpen?: boolean,
  onOpenChange?: (isOpen: boolean) => void,
  transitionDuration?: number,
}

export interface UseOverlayPanelReturnState extends OverlayTriggerState {
  isTransitioning?: boolean;
}

export interface UseOverlayPanelStateReturnOnClose {
  (
    stateProp?: OverlayTriggerState,
    triggerRef?: React.RefObject<HTMLButtonElement>,
    onCloseProp?: VoidFunction,
  ): void;
}

interface UseOverlayPanelStateReturnValues {
  state: UseOverlayPanelReturnState;
  onClose: UseOverlayPanelStateReturnOnClose;
  isTransitioning: boolean;
}

interface UseOverlayPanelState {
  /**
   * Returns state-related data and functions for use with a Modal component.
   * @param {Object} [props] Properties provided to the state
   *
   * @param {boolean} [prop.isDefaultOpen] Whether the modal is open by default (uncontrolled).
   * @param {boolean} [prop.isOpen] Whether the modal is currently open (controlled).
   * @param {function} [prop.onOpenChange] Handler that is called when the open state changes.
   * @param {number} [prop.transitionDuration] Number value of the length of the transition in ms.
   *
   * @returns {Object} `{ isOpen: Boolean, open: Function, close: Function, toggle: Function }`
   */

  (props?: UseOverlayPanelStateProps): UseOverlayPanelStateReturnValues;
}
const useOverlayPanelState: UseOverlayPanelState = (props = {}) => {
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

  const onClose: UseOverlayPanelStateReturnOnClose = (stateProp, triggerRef, onCloseProp) => {
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

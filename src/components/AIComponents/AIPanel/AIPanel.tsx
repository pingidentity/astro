import React from 'react';

import { OverlayPanel, OverlayProvider } from '../../../index';
import { AIPanelProps } from '../../../types/aiPanel';

const AIPanel = (props: AIPanelProps) => {
  const {
    state,
    triggerRef,
    isExpanded,
    setIsExpanded,
    onPanelClose,
    children,
    headerProps,
    ...others
  } = props;
  return (
    <OverlayProvider>
      {(state.isOpen || state.isTransitioning)
        && (
        <OverlayPanel
          isTransitioning={state?.isTransitioning}
          isOpen={state.isOpen}
          state={state}
          triggerRef={triggerRef}
          size={isExpanded ? 'full' : 'small'}
          variant="overlayPanel.aiPanelContainer"
          {...others}
        >
          {children}
        </OverlayPanel>
        )}
    </OverlayProvider>
  );
};

export default AIPanel;

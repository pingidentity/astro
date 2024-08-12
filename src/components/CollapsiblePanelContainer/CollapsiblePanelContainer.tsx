import React, { forwardRef } from 'react';
import { useOverlayTriggerState } from 'react-stately';
import ChevronLeftIcon from '@pingux/mdi-react/ChevronLeftIcon';
import ChevronRightIcon from '@pingux/mdi-react/ChevronRightIcon';
import { OverlayTriggerState } from '@react-stately/overlays';

import { useStatusClasses } from '../../hooks';
import { Box, Icon, IconButton } from '../../index';
import { CollapsiblePanelContainerProps } from '../../types';

import CollapsiblePanelBadge from './CollapsiblePanelBadge';

/**
 * The CollapsiblePanelContainer serves as a wrapper around a list and its associated trigger,
 * linking the list's open state with the trigger's press state and providing necessary context.
 */
const CollapsiblePanelContainer = forwardRef<HTMLElement, CollapsiblePanelContainerProps>(
  (props, ref) => {
    const {
      selectedFilterCount,
      className,
      children,
      closeAriaLabel,
      isDefaultOpen,
      isOpen,
      onOpenChange,
      openAriaLabel,
      collapsiblePanelId,
      ...others
    } = props;

    const triggerRef = React.useRef(null);
    const state: OverlayTriggerState = useOverlayTriggerState({
      defaultOpen: isDefaultOpen,
      isOpen,
      onOpenChange,
    });
    const { close } = state;
    const { classNames } = useStatusClasses(className, { isOpen: state.isOpen });

    const handleButtonPress = () => {
      if (state.isOpen) {
        // close(state, triggerRef, close);
        close();
      } else {
        state.open();
      }
    };

    const handleClose = e => {
      if (e.key === 'Escape') {
        // close(state, triggerRef, close);
        close();
      }
    };

    return (
      <Box
        className={classNames}
        onKeyUp={handleClose}
        ref={ref}
        variant="collapsiblePanel.container"
        isRow
        {...others}
      >
        <IconButton
          isRow
          aria-label={state.isOpen ? closeAriaLabel : openAriaLabel}
          aria-expanded={state.isOpen}
          data-testid="collapsible-panel-button"
          onPress={handleButtonPress}
          ref={triggerRef}
          variant="toggle"
          pr="sm"
          aria-controls={state.isOpen ? collapsiblePanelId : ''}
        >
          <Icon
            color="active"
            icon={state.isOpen ? ChevronRightIcon : ChevronLeftIcon}
            title={{ name: state.isOpen ? 'Chevron Right Icon' : 'Chevron Left Icon' }}
            role="button"
            size="30px"
          />
          {!state.isOpen && selectedFilterCount
            && (
              <CollapsiblePanelBadge
                data-testid="collapsible-panel-badge"
                margin="auto"
                selectedFilterCount={selectedFilterCount}
              />
            )}
        </IconButton>
        {children}
      </Box>
    );
  });


CollapsiblePanelContainer.defaultProps = {
  openAriaLabel: 'Open filter menu?',
  closeAriaLabel: 'Close filter menu?',
};

CollapsiblePanelContainer.displayName = 'CollapsiblePanelContainer';
export default CollapsiblePanelContainer;

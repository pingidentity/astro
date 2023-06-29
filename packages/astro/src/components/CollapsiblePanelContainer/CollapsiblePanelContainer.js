import React, { forwardRef } from 'react';
import { useOverlayTriggerState } from 'react-stately';
import ChevronLeftIcon from '@pingux/mdi-react/ChevronLeftIcon';
import ChevronRightIcon from '@pingux/mdi-react/ChevronRightIcon';
import PropTypes from 'prop-types';

import { useStatusClasses } from '../../hooks';
import { Box, Icon, IconButton } from '../../index';

import CollapsiblePanelBadge from './CollapsiblePanelBadge';

/**
 * The CollapsiblePanelContainer serves as a wrapper around a list and its associated trigger,
 * linking the list's open state with the trigger's press state and providing necessary context.
 */

const CollapsiblePanelContainer = forwardRef((props, ref) => {
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

  const triggerRef = React.useRef();
  const state = useOverlayTriggerState({
    defaultOpen: isDefaultOpen,
    isOpen,
    onOpenChange,
  });
  const { close } = state;
  const { classNames } = useStatusClasses(className, { isOpen: state.isOpen });

  const handleButtonPress = () => {
    if (state.isOpen) {
      close(state, triggerRef, close);
    } else {
      state.open();
    }
  };

  const handleClose = e => {
    if (e.key === 'Escape') {
      close(state, triggerRef, close);
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
        aria-controls={state.isOpen ? collapsiblePanelId : null}
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

CollapsiblePanelContainer.propTypes = {
  /** Amount of selected items indicator. */
  selectedFilterCount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /** Defines a string value that labels the trigger icon when menu is open. */
  closeAriaLabel: PropTypes.string,
  /** Sets the default open state of the overlay. */
  isDefaultOpen: PropTypes.bool,
  /** Whether the overlay is currently open. */
  isOpen: PropTypes.bool,
  /**
   * Method that is called when the open state of the menu changes.
   * Returns the new open state and the action that caused the opening of the menu.
   *
   * `(isOpen: boolean, overlayTrigger: OverlayTriggerAction) => void`
   */
  onOpenChange: PropTypes.func,
  /** Defines a string value that labels the trigger icon when menu is closed. */
  openAriaLabel: PropTypes.string,
  /** Used in button aria-controls attribute. */
  collapsiblePanelId: PropTypes.string,
};

CollapsiblePanelContainer.defaultProps = {
  openAriaLabel: 'Open filter menu?',
  closeAriaLabel: 'Close filter menu?',
};

CollapsiblePanelContainer.displayName = 'CollapsiblePanelContainer';
export default CollapsiblePanelContainer;

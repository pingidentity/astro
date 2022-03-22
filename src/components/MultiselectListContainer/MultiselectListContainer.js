import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import { useOverlayTriggerState } from '@react-stately/overlays';
import MultiselectBadge from './MultiselectBadge';
import { Icon, IconButton, Box } from '../../index';
import { useStatusClasses } from '../../hooks';

/**
 * The MultiselectListContainer serves as a wrapper around a list and its associated trigger,
 * linking the list's open state with the trigger's press state and providing necessary context.
 */

const MultiselectListContainer = forwardRef((props, ref) => {
  const {
    selectedFilterCount,
    className,
    children,
    closeAriaLabel,
    isDefaultOpen,
    isOpen,
    onOpenChange,
    openAriaLabel,
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

  const handleClose = (e) => {
    if (e.key === 'Escape') {
      close(state, triggerRef, close);
    }
  };

  return (
    <Box
      className={classNames}
      onKeyUp={handleClose}
      ref={ref}
      variant="multiselectListContainer.multiselectListContainer"
      isRow
      {...others}
    >
      <IconButton
        isRow
        aria-label={state.isOpen ? closeAriaLabel : openAriaLabel}
        data-testid="multiselect-list-button"
        onPress={handleButtonPress}
        ref={triggerRef}
        variant="multiselectToggle"
        pr="sm"
      >
        <Icon
          color="active"
          icon={state.isOpen ? ChevronRightIcon : ChevronLeftIcon}
          role="button"
          size="30px"
        />
        {!state.isOpen && selectedFilterCount &&
          <MultiselectBadge
            data-testid="multiselect-list-badge"
            margin="auto"
            selectedFilterCount={selectedFilterCount}
          />
        }
      </IconButton>
      {state.isOpen &&
        { ...children }
      }
    </Box>
  );
});

MultiselectListContainer.propTypes = {
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
};

MultiselectListContainer.defaultProps = {
  openAriaLabel: 'Open filter menu?',
  closeAriaLabel: 'Close filter menu?',
};

MultiselectListContainer.displayName = 'MultiselectListContainer';
export default MultiselectListContainer;

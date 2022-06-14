import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';
import { useStatusClasses } from '../../hooks';
import CollapsiblePanelBadge from '../CollapsiblePanelContainer/CollapsiblePanelBadge';
import { Box, ListView, CollapsiblePanelContainer, Text } from '../../index';

/**
 * The CollapsiblePanel serves as a filter menu with a menu title
 * and selected count displayed in a badge.
 */

const CollapsiblePanel = forwardRef((props, ref) => {
  const {
    selectedFilterCount,
    className,
    closeAriaLabel,
    children,
    isDefaultOpen,
    isOpen,
    items,
    listTitle,
    onOpenChange,
    onSelectionChange,
    openAriaLabel,
    ...others
  } = props;

  const {
    focusProps: focusWithinProps,
  } = useFocusRing({ within: true });

  const { focusProps, isFocusVisible } = useFocusRing();

  const mergedProps = mergeProps(
    focusWithinProps,
    focusProps,
  );

  const { classNames } = useStatusClasses(className, {
    isFocused: isFocusVisible,
  });

  return (
    <CollapsiblePanelContainer
      closeAriaLabel={closeAriaLabel}
      isDefaultOpen={isDefaultOpen}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      openAriaLabel={openAriaLabel}
      selectedFilterCount={selectedFilterCount}
    >
      <Box
        className={classNames}
        data-testid="collapsible-panel"
        ref={ref}
        tabIndex={0}
        variant="collapsiblePanel.collapsiblePanelContent"
        {...mergedProps}
        {...others}
      >
        <Box
          isRow
          variant="collapsiblePanel.collapsiblePanelContainerTitle"
        >
          <Text variant="collapsiblePanelTitle">
            {listTitle}
          </Text>
          {selectedFilterCount &&
            <CollapsiblePanelBadge
              margin="0"
              className="title-badge"
              selectedFilterCount={selectedFilterCount}
            />
          }
        </Box>
        <Box pl="xs" pr="xs">
          <ListView
            items={items}
            onSelectionChange={onSelectionChange}
            selectionMode="none"
            selectionStyle="highlight"
            style={{ width: '100%' }}
            pl="md"
          >
            {children}
          </ListView>
        </Box>
      </Box>
    </CollapsiblePanelContainer>
  );
});

CollapsiblePanel.propTypes = {
  /** Amount of selected items indicator. */
  selectedFilterCount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /** Title of list content. */
  listTitle: PropTypes.string,
  /** Defines a string value that labels the trigger icon when menu is open. */
  closeAriaLabel: PropTypes.string,
  /** Sets the default open state of the overlay. */
  isDefaultOpen: PropTypes.bool,
  /** Whether the overlay is currently open. */
  isOpen: PropTypes.bool,
  /** The list of ListView items (controlled). */
  items: isIterableProp,
  /**
   * Method that is called when the open state of the menu changes.
   * Returns the new open state and the action that caused the opening of the menu.
   *
   * `(isOpen: boolean, overlayTrigger: OverlayTriggerAction) => void`
   */
  onOpenChange: PropTypes.func,
  /** Callback function that fires when the selected key changes. */
  onSelectionChange: PropTypes.func,
  /** Defines a string value that labels the trigger icon when menu is closed. */
  openAriaLabel: PropTypes.string,
};

CollapsiblePanel.defaultProps = {
  isDefaultOpen: true,
};

CollapsiblePanel.displayName = 'CollapsiblePanel';
export default CollapsiblePanel;

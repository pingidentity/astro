import React, { forwardRef } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';

import { Box, CollapsiblePanelContainer, ListView, Text } from '../..';
import { useStatusClasses } from '../../hooks';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';
import CollapsiblePanelBadge from '../CollapsiblePanelContainer/CollapsiblePanelBadge';

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

  const collapsiblePanelId = `${kebabCase(listTitle)}-collapsible-panel`;

  return (
    <CollapsiblePanelContainer
      closeAriaLabel={closeAriaLabel}
      isDefaultOpen={isDefaultOpen}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      openAriaLabel={openAriaLabel}
      selectedFilterCount={selectedFilterCount}
      collapsiblePanelId={collapsiblePanelId}
    >
      <Box
        className={classNames}
        data-testid="collapsible-panel"
        id={collapsiblePanelId}
        ref={ref}
        tabIndex={-1}
        variant="collapsiblePanel.content"
        {...mergedProps}
        {...others}
      >
        <Box
          isRow
          variant="collapsiblePanel.containerTitle"
        >
          <Text variant="variants.collapsiblePanel.title">
            {listTitle}
          </Text>
          {selectedFilterCount
            && (
              <CollapsiblePanelBadge
                margin="0"
                className="title-badge"
                selectedFilterCount={selectedFilterCount}
              />
            )}
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

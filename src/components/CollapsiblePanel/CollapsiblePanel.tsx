import React, { forwardRef } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';
import type { CollectionChildren } from '@react-types/shared';
import kebabCase from 'lodash/kebabCase';

import { Box, CollapsiblePanelContainer, ListView, Text } from '../..';
import { useStatusClasses } from '../../hooks';
import { CollapsiblePanelProps } from '../../types';
import CollapsiblePanelBadge from '../CollapsiblePanelContainer/CollapsiblePanelBadge';
import { ExampleItemProps } from '../ListView/ListView.stories';

const CollapsiblePanel = forwardRef<HTMLDivElement, CollapsiblePanelProps<object>>(
  (props, ref) => {
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
          role="region"
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
              items={items as Iterable<ExampleItemProps>}
              onSelectionChange={onSelectionChange}
              selectionMode="none"
              selectionStyle="highlight"
              sx={{ width: '100%', pl: 'md' }}
            >
              {children as CollectionChildren<ExampleItemProps>}
            </ListView>
          </Box>
        </Box>
      </CollapsiblePanelContainer>
    );
  });

CollapsiblePanel.defaultProps = {
  isDefaultOpen: true,
};

CollapsiblePanel.displayName = 'CollapsiblePanel';
export default CollapsiblePanel;

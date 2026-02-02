import React, { forwardRef, Key, useEffect, useMemo, useRef, useState } from 'react';
import { useLayoutEffect, useResizeObserver } from '@react-aria/utils';

import { useLocalOrForwardRef } from '../../hooks';
import useProgressiveState from '../../hooks/useProgressiveState';
import { Box, Text } from '../../index';
import { SearchNavProps } from '../../types/searchNav';

import MoreItemsPopover from './MoreItemsPopover';
import SearchNavTab from './SearchNavTab';

const TAB_MARGIN_WIDTH = 32; // Example constant value
const MORE_BUTTON_WIDTH = 60;

/**
 * 1. Measures the width of all items based on their refs.
 */
export const measureItemWidths = (items, measurementRefs) => {
  const widths = {};
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    const itemRef = measurementRefs.current[item.key];
    if (itemRef) {
      widths[item.key] = itemRef.offsetWidth;
    }
  }
  return widths;
};

/**
 * 2. Calculates the number of visible items based on available container width
 * and item widths.
 */

export const calculateVisibleCount = (
  containerWidth, moreButtonWidth, orderedItems, itemWidths) => {
  let totalItemsWidth = 0;
  let visibleCount = 0;

  for (let i = 0; i < orderedItems.length; i += 1) {
    const item = orderedItems[i];
    const itemWidth = itemWidths[item.key] + TAB_MARGIN_WIDTH;

    if (itemWidth) {
      const itemsRemaining = orderedItems.length - (visibleCount + 1);
      // Only require space for 'more' button if there are items that will be hidden
      const requiredSpaceForMoreButton = itemsRemaining > 0 ? moreButtonWidth : 0;
      const widthNeeded = totalItemsWidth + itemWidth + requiredSpaceForMoreButton;

      if (widthNeeded > containerWidth) {
        break;
      }

      totalItemsWidth += itemWidth;
      visibleCount += 1;
    }
  }

  return visibleCount;
};

const SearchNav = forwardRef<HTMLElement, SearchNavProps>((props, ref) => {
  const {
    defaultSelectedKey,
    items,
    labelProps,
    moreButtonText = 'More',
    onSelectionChange,
    onOpenChange,
    popoverButtonProps,
    popoverMenuProps,
    popoverProps,
    rowProps,
    selectedKey: selectedKeyProp,
    setSelectedKey: setSelectedKeyProp,
    tabProps,
    ...others
  } = props;

  const [selectedKey, setSelectedKey] = useProgressiveState(
    selectedKeyProp,
    defaultSelectedKey,
  );

  const [orderedItems, setOrderedItems] = useState(Array.from(items));

  const buttonRef = useRef<HTMLButtonElement>(null);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const measurementRefs = useRef<Record<Key, HTMLDivElement | null>>({});

  const tabListRef = useLocalOrForwardRef<HTMLElement>(ref);
  const [numVisibleItems, setNumVisibleItems] = useState(items.length);

  useEffect(() => {
    setOrderedItems(items);
  }, [items]);

  const calculateVisibleItems = (
  ) => {
    if (!tabListRef.current) return;

    // Step 1: Measure (updates itemWidths ref in parent scope if needed, or returns new object)
    const currentItemWidths = measureItemWidths(items, measurementRefs);

    const containerWidth = tabListRef.current.offsetWidth;
    const moreButtonWidth = buttonRef.current?.offsetWidth || MORE_BUTTON_WIDTH;

    // Step 2: Calculate visible count (pure logic)
    const visibleCount = calculateVisibleCount(
      containerWidth,
      moreButtonWidth,
      orderedItems,
      currentItemWidths,
    );

    // Step 3: Update state
    setNumVisibleItems(visibleCount);
  };

  useResizeObserver({
    ref: tabListRef,
    onResize: calculateVisibleItems,
  });

  const visibleItems = useMemo(() => orderedItems.slice(0, numVisibleItems),
    [orderedItems, numVisibleItems]);
  const hiddenItems = useMemo(() => orderedItems.slice(numVisibleItems),
    [orderedItems, numVisibleItems]);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedKey);
    }
  }, [selectedKey]);

  useLayoutEffect(() => {
    calculateVisibleItems();
  }, [items]);

  const reorderTabs = () => {
    const selectedIndex = orderedItems.findIndex(item => item.key === selectedKey);
    const isSelectedHidden = selectedIndex >= numVisibleItems;

    if (isSelectedHidden && selectedIndex !== -1 && numVisibleItems > 0) {
      const newOrderedItems = [...orderedItems];

      const selectedItem = newOrderedItems[selectedIndex];
      const displacedItem = newOrderedItems[numVisibleItems - 1];

      newOrderedItems[numVisibleItems - 1] = selectedItem;
      newOrderedItems[selectedIndex] = displacedItem;

      setOrderedItems(newOrderedItems);
    }
  };

  useEffect(() => {
    reorderTabs();
  }, [selectedKey, numVisibleItems]);

  const handleSelection = (key: Key) => {
    setSelectedKey(key);
    if (setSelectedKeyProp) {
      setSelectedKeyProp(key);
    }
  };

  return (
    <Box
      maxWidth="100%"
      role="navigation"
    >
      <Box
        role="list"
        isRow
        ref={tabListRef}
        alignItems="center"
        variant="searchNav.list"
        {...others}
        {...rowProps}
      >
        {visibleItems.map(item => (
          <SearchNavTab
            key={item.key}
            item={item}
            selectedKey={selectedKey}
            setSelectedKey={handleSelection}
            tabProps={tabProps}
            labelProps={labelProps}
          />
        ))}
        {
            hiddenItems.length > 0
            && (
            <MoreItemsPopover
              onOpenChange={onOpenChange}
              items={hiddenItems}
              setSelectedKey={handleSelection}
              buttonRef={buttonRef}
              tabProps={tabProps}
              popoverProps={popoverProps}
              popoverButtonProps={popoverButtonProps}
              popoverMenuProps={popoverMenuProps}
              moreButtonText={moreButtonText}
            />
            )
        }
      </Box>
      <Box
        // Off-screen positioning to allow measurement without affecting layout
        sx={{
          position: 'absolute',
          top: 0,
          left: '-9999px',
          overflow: 'hidden',
        }}
      >
        {items.map(item => (
          <Box sx={{ maxWidth: 'fit-content' }} key={`${item.key}-box`}>
            <Text
              key={`hidden-${item.key}`}
              ref={(el: HTMLDivElement | null) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                measurementRefs.current[item.key] = el;
              }}
            >
              {item.text}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default SearchNav;

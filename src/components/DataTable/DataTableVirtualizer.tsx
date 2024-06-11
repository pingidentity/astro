import React, {
  forwardRef,
  ReactNode,
  useCallback,
} from 'react';
import { chain, mergeProps, useLayoutEffect } from '@react-aria/utils';
import {
  ScrollView,
  setScrollLeft,
  useVirtualizer,
} from '@react-aria/virtualizer';
import { useVirtualizerState, VirtualizerState } from '@react-stately/virtualizer';

import { useLocalOrForwardRef } from '../../hooks';
import {
  Box, DataTableItem, DataTableVirtualizerProps,
} from '../../index';

/**
 * Custom Virtualizer using react aria Spectrum TableView/TableVirtualizer
 * Primarily utilizes [TableView](https://react-spectrum.adobe.com/react-spectrum/TableView.html)
*/

const DataTableVirtualizer = forwardRef<HTMLDivElement,
DataTableVirtualizerProps<object, object>>(({
  layout,
  collection,
  renderView,
  renderWrapper,
  domRef,
  bodyRef,
  onVisibleRectChange: onVisibleRectChangeProp,
  ...otherProps
}, ref) => {
  const direction = 'ltr'; // useLocale override

  const headerRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  const loadingState = collection.body.props.loadingState;
  const isLoading = loadingState === 'loading' || loadingState === 'loadingMore';
  const onLoadMore = collection.body.props.onLoadMore;
  /* istanbul ignore next */
  const state = useVirtualizerState({
    layout,
    collection,
    renderView,
    renderWrapper,
    onVisibleRectChange(rect) {
      if (bodyRef.current) {
      // eslint-disable-next-line no-param-reassign
        bodyRef.current.scrollTop = rect.y;
        setScrollLeft(
          bodyRef.current,
          direction,
          rect.x,
        );
      }
    },
    transitionDuration: isLoading ? 160 : 220,
  });

  const { virtualizerProps } = useVirtualizer(
    {
      scrollToItem(key) {
        const item = collection.getItem(key) as DataTableItem;
        state.virtualizer.scrollToItem(key, {
          duration: 0,
          // Prevent scrolling to the top when clicking on column headers.
          shouldScrollY: item?.type !== 'column',
          // Offset scroll position by width of selection cell
          // (which is sticky and will overlap the cell we're scrolling to).
          offsetX: 0,
        });
      },
    },
    state as VirtualizerState<object, object, object>,
    domRef,
  );

  // If column widths change, need to relay out
  useLayoutEffect(() => {
    state.virtualizer.relayoutNow({ sizeChanged: true });
  }, [state.virtualizer]);

  const headerHeight = layout.getLayoutInfo('header')?.rect.height || 0;
  const visibleRect = state.virtualizer.visibleRect;

  // Sync the scroll position from the table body to the header container.
  const onScroll = useCallback(() => {
    if (headerRef.current && bodyRef.current) {
      headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
    }
  }, [bodyRef]);

  const onVisibleRectChange = useCallback(rect => {
    state.setVisibleRect(rect);
    if (!isLoading && onLoadMore) {
      const scrollOffset = state.virtualizer.contentSize.height - rect.height * 2;
      if (rect.y > scrollOffset) {
        onLoadMore();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoadMore, isLoading, state.setVisibleRect, state.virtualizer]);

  useLayoutEffect(() => {
    if (!isLoading && onLoadMore && !state.isAnimating) {
      if (state.contentSize.height <= state.virtualizer.visibleRect.height) {
        onLoadMore();
      }
    }
  }, [
    state.contentSize,
    state.virtualizer,
    state.isAnimating,
    onLoadMore,
    isLoading,
  ]);

  return (
    <Box {...mergeProps(otherProps, virtualizerProps)} ref={domRef}>
      <Box
        role="presentation"
        variant="dataTable.tableHeadWrapper"
        style={{
          width: visibleRect.width,
          height: headerHeight,
          overflow: 'hidden',
          position: 'relative',
          willChange: state.isScrolling ? 'scroll-position' : '',
          transition: state.isAnimating
            ? `none ${state.virtualizer.transitionDuration}ms`
            : undefined,
        }}
        ref={headerRef}
      >
        {state.visibleViews[0] as ReactNode}
      </Box>
      <ScrollView
        style={{ flex: 1 }}
        innerStyle={{
          overflow: 'visible',
          transition: state.isAnimating
            ? `none ${state.virtualizer.transitionDuration}ms`
            : undefined,
        }}
        ref={bodyRef}
        contentSize={state.contentSize}
        onVisibleRectChange={chain(
          onVisibleRectChange,
          onVisibleRectChangeProp,
        )}
        onScrollStart={state.startScrolling}
        onScrollEnd={state.endScrolling}
        onScroll={onScroll}
        tabIndex={0}
      >
        {state.visibleViews[1] as ReactNode}
      </ScrollView>
    </Box>
  );
});

export default DataTableVirtualizer;

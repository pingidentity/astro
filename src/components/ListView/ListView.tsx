import React, { forwardRef, Key, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useGridList } from 'react-aria';
import { useTreeState } from 'react-stately';
import { GridListProps } from '@react-aria/gridlist';
import { useCollator } from '@react-aria/i18n';
import { Virtualizer, VirtualizerItem } from '@react-aria/virtualizer';
import { ListLayout } from '@react-stately/layout';

import useLoadPrev from '../../hooks/useLoadPrev';
import { Box } from '../../index';
import { ListViewProps, ListViewState } from '../../types/listView';
import loadingStates from '../../utils/devUtils/constants/loadingStates';
import Loader from '../Loader';

import { ExampleItemProps } from './ListView.stories';
import { ListViewContext } from './ListViewContext';
import ListViewExpandableItem from './ListViewExpandableItem';
import ListViewItem from './ListViewItem';

export const collectionTypes = {
  ITEM: 'item',
  LOADER: 'loader',
  PLACEHOLDER: 'placeholder',
};

export function useListLayout(state) {
  const ROW_HEIGHT = 81;
  const collator = useCollator({ usage: 'search', sensitivity: 'base' });
  const layout = useMemo(() => new ListLayout({
    estimatedRowHeight: ROW_HEIGHT,
    estimatedHeadingHeight: 26,
    loaderHeight: ROW_HEIGHT,
    placeholderHeight: ROW_HEIGHT,
    collator,
  }), [collator, state.collection]);

  layout.collection = state.collection;
  layout.disabledKeys = state.disabledKeys;
  return layout;
}

const ListView = forwardRef((props: ListViewProps, ref) => {
  const {
    containerProps,
    disabledKeys,
    isHoverable = true,
    loadingState,
    onLoadMore,
    onLoadPrev,
    onSelectionChange,
    onExpandedChange,
    expandedKeys,
    selectedKeys,
    selectionMode,
    selectionStyle,
    items,
    onFocus,
    ...others
  } = props;

  const [hoveredItem, setHoveredItem] = useState<Key | null>(null);

  const isLoading = (
    loadingState === loadingStates.LOADING_MORE || loadingState === loadingStates.LOADING
  );
  const isFocusable = selectionMode !== 'none';

  const renderWrapper = (parent, reusableView) => (
    <VirtualizerItem
      key={reusableView.key}
      reusableView={reusableView}
      parent={parent}
    />
  );

  const listViewRef = useRef(null);

  /* istanbul ignore next */
  useImperativeHandle(ref, () => listViewRef.current);

  const state = useTreeState({
    ...props,
    selectionMode: selectionMode === 'expansion' ? 'single' : selectionMode,
  }) as ListViewState<ExampleItemProps>;

  state.hover = {
    hoveredItem,
    setHoveredItem,
  };

  state.isLoading = useMemo(() => isLoading, [isLoading]);

  const { collection, selectionManager } = state;

  const layout = useListLayout(state);

  const { gridProps } = useGridList({
    ...props as GridListProps<ExampleItemProps>,
    isVirtualized: true,
    keyboardDelegate: layout,
  }, state, listViewRef);
  // Sync loading state into the layout.
  layout.isLoading = isLoading;

  const focusedKey = selectionManager.focusedKey;

  delete gridProps.onMouseDown;

  if (!items) {
    delete others['aria-label'];
  }

  const onFocusCallback = e => {
    if (gridProps?.onFocus) {
      gridProps.onFocus(e);
    }

    if (onFocus) {
      onFocus(e);
    }
  };

  // This code removes hover when scrolling ListView in the Firefox browser.
  const resetHoverState = () => {
    state.hover.setHoveredItem(null);
  };

  const memoedLoadMoreProps = useMemo(() => ({
    isLoading,
    onLoadPrev,
    items,
  }), [isLoading, onLoadPrev, items]);
  useLoadPrev(memoedLoadMoreProps, listViewRef);

  return (
    <ListViewContext.Provider value={{ state }}>
      <Box
        variant="listView.container"
        {...containerProps}
      >
        {loadingState === loadingStates.LOADING_MORE_PREPEND
        && <Loader variant="loader.withinListView" aria-label="Loading more..." />}
        <Virtualizer
          {...(items ? gridProps : { role: 'presentation' })}
          onLoadMore={onLoadMore}
          ref={listViewRef}
          focusedKey={focusedKey}
          renderWrapper={renderWrapper}
          sizeToFit="height"
          scrollDirection="vertical"
          layout={layout}
          isLoading={isLoading}
          collection={collection}
          transitionDuration={0}
          {...others}
          onFocus={isFocusable ? onFocusCallback : undefined}
          onScroll={resetHoverState}
          tabIndex={isFocusable ? 0 : -1}
          shouldUseVirtualFocus={!isFocusable}
        >
          {(type, item) => {
            if (type === 'item') {
              if (props.selectionMode === 'expansion') {
                return (
                  <ListViewExpandableItem
                    isHoverable={isHoverable}
                    isFocusable={isFocusable}
                    item={item}
                  />
                );
              }
              return (
                <ListViewItem
                  isHoverable={isHoverable}
                  isFocusable={isFocusable}
                  item={item}
                />
              );
            } if (type === collectionTypes.LOADER) {
              return <Loader variant="loader.withinListView" aria-label="Loading more..." />;
            }
            return null;
          }}
        </Virtualizer>
      </Box>
    </ListViewContext.Provider>
  );
});

ListView.defaultProps = {
  'aria-label': 'listView',
  selectionMode: 'single',
};

export default ListView;

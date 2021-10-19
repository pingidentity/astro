import React, { useMemo, forwardRef, useRef, useImperativeHandle } from 'react';
import { GridCollection, useGridState } from '@react-stately/grid';
import { GridKeyboardDelegate, useGrid } from '@react-aria/grid';
import { mergeProps } from '@react-aria/utils';
import { ListLayout } from '@react-stately/layout';
import { useListState } from '@react-stately/list';
import PropTypes from 'prop-types';
import { useCollator, useLocale } from '@react-aria/i18n';
import { Virtualizer, VirtualizerItem } from '@react-aria/virtualizer';
import { ListViewContext } from './ListViewContext';
import ListViewItem from '../ListViewItem';
import Loader from '../Loader';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';
import loadingStates from '../../utils/devUtils/constants/loadingStates';

export const collectionTypes = {
  ITEM: 'item',
  LOADER: 'loader',
  PLACEHOLDER: 'placeholder',
};

export function useListLayout(state) {
  const collator = useCollator({ usage: 'search', sensitivity: 'base' });
  const layout = useMemo(() =>
    new ListLayout({
      estimatedRowHeight: 81,
      estimatedHeadingHeight: 26,
      padding: 4,
      loaderHeight: 81,
      placeholderHeight: 81,
      collator,
    })
  , [collator]);

  layout.collection = state.collection;
  layout.disabledKeys = state.disabledKeys;
  return layout;
}

const ListView = forwardRef((props, ref) => {
  const {
    disabledKeys,
    loadingState,
    selectedKeys,
    onLoadMore,
    onSelectionChange,
  } = props;


  const renderWrapper = (parent, reusableView) => (
    <VirtualizerItem
      key={reusableView.key}
      reusableView={reusableView}
      parent={parent}
    />
  );

  const listViewRef = useRef();

  /* istanbul ignore next */
  useImperativeHandle(ref, () => listViewRef.current);

  const { collection } = useListState(props);

  const { direction } = useLocale();

  const collator = useCollator({ usage: 'search', sensitivity: 'base' });

  const gridCollection = useMemo(() => new GridCollection({
    columnCount: 1,
    items: Array.from(collection).map(item => ({
      ...item,
      hasChildNodes: true,
      childNodes: [{
        key: `cell-${item.key}`,
        type: 'cell',
        index: 0,
        value: null,
        level: 0,
        rendered: null,
        textValue: item.textValue,
        hasChildNodes: false,
        childNodes: [],
      }],
    })),
  }), [collection]);

  const state = useGridState({
    ...props,
    disabledKeys,
    selectedKeys,
    collection: gridCollection,
    selectionMode: 'single',
    onSelectionChange,
    loadingState,
  });

  const layout = useListLayout(state);

  const keyboardDelegate = useMemo(() => new GridKeyboardDelegate({
    collection: state.collection,
    disabledKeys: state.disabledKeys,
    ref: listViewRef,
    direction,
    collator,
    focusMode: 'cell',
  }), [state, listViewRef, direction, collator]);

  const { gridProps } = useGrid({
    ...props,
    isVirtualized: true,
    keyboardDelegate,
    loadingState,
  }, state, listViewRef);
  // Sync loading state into the layout.
  layout.isLoading = loadingState;

  let focusedKey = state.selectionManager.focusedKey;
  const focusedItem = gridCollection.getItem(state.selectionManager.focusedKey);
  if (focusedItem?.parentKey != null) {
    focusedKey = focusedItem.parentKey;
  }

  return (
    <ListViewContext.Provider value={{ state, keyboardDelegate }}>
      <Virtualizer
        {...mergeProps(gridProps)}
        onLoadMore={onLoadMore}
        ref={listViewRef}
        focusedKey={focusedKey}
        renderWrapper={renderWrapper}
        sizeToFit="height"
        scrollDirection="vertical"
        layout={layout}
        collection={gridCollection}
        isLoading={loadingState === loadingStates.LOADING_MORE}
        transitionDuration={0}
      >
        {(type, item) => {
          if (type === 'item') {
            return (
              <ListViewItem item={item} />
            );
          } else if (type === collectionTypes.LOADER) {
            return <Loader variant="loader.withinListView" aria-label="Loading more..." />;
          }
          return null;
        }}
      </Virtualizer>
    </ListViewContext.Provider>
  );
});

ListView.propTypes = {
  /** Shows loader instead of children */
  loadingState: PropTypes.oneOf(Object.values(loadingStates)),
  /**
   * The item keys that are disabled. These items cannot be selected, focused, or otherwise
   * interacted with.
   */
  disabledKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  /** The list of ListView items (controlled). */
  items: isIterableProp,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** Defines a string value that labels the current element. */
  'aria-label': PropTypes.string,
  /** Identifies the element (or elements) that labels the current element. */
  'aria-labelledby': PropTypes.string,
  /** Identifies the element (or elements) that describes the object. */
  'aria-describedby': PropTypes.string,
  /**
   * Identifies the element (or elements) that provide a detailed, extended description for the
   * object.
  */
  'aria-details': PropTypes.string,
  /**
   * The currently selected keys in the collection (controlled).
   *
   * `selectedKeys="all"` can be used to select every key.
   */
  selectedKeys: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /** Callback function that fires when the selected key changes. */
  onSelectionChange: PropTypes.func,
  /**
   * Handler that is called when more items should be loaded, e.g. while scrolling near the bottom.
   *
   * () => any
   */
  onLoadMore: PropTypes.func,
};

ListView.defaultProps = {
  'aria-label': 'listView',
};

export default ListView;

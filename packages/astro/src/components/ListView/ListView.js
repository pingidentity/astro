import React, { useMemo, forwardRef, useRef, useImperativeHandle } from 'react';
import { GridCollection, useGridState } from '@react-stately/grid';
import { GridKeyboardDelegate, useGrid } from '@react-aria/grid';
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
  const ROW_HEIGHT = 81;
  const collator = useCollator({ usage: 'search', sensitivity: 'base' });
  const layout = useMemo(() =>
    new ListLayout({
      estimatedRowHeight: ROW_HEIGHT,
      estimatedHeadingHeight: 26,
      paddingRight: 4,
      paddingLeft: 4,
      loaderHeight: ROW_HEIGHT,
      placeholderHeight: ROW_HEIGHT,
      collator,
    })
  , [collator]);

  layout.collection = state.collection;
  layout.disabledKeys = state.disabledKeys;

  return layout;
}

/**
 * ListViews are used to display a list of items. Users can select,
 * view, or edit items in this list. This virtualized component supports
 * asynchronous data in infinitely scrollable lists.
*/

const ListView = forwardRef((props, ref) => {
  const {
    disabledKeys,
    loadingState,
    onLoadMore,
    onSelectionChange,
    selectionMode,
    selectionStyle,
    ...others
  } = props;

  const isLoading = (
    loadingState === loadingStates.LOADING_MORE || loadingState === loadingStates.LOADING
  );

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
    collection: gridCollection,
    focusMode: 'cell',
    selectionBehavior: selectionStyle === 'highlight' ? 'replace' : 'toggle',
  });

  const layout = useListLayout(state);

  const keyboardDelegate = useMemo(() => new GridKeyboardDelegate({
    collection: state.collection,
    disabledKeys: state.disabledKeys,
    ref: listViewRef,
    direction,
    collator,
  }), [state, listViewRef, direction, collator]);

  const { gridProps } = useGrid({
    ...props,
    isVirtualized: true,
    keyboardDelegate,
    loadingState,
  }, state, listViewRef);
  // Sync loading state into the layout.
  layout.isLoading = isLoading;

  const focusedItem = gridCollection.getFirstKey();

  return (
    <ListViewContext.Provider value={{ state, keyboardDelegate }}>
      <Virtualizer
        {...gridProps}
        onLoadMore={onLoadMore}
        ref={listViewRef}
        focusedKey={focusedItem?.parentKey}
        renderWrapper={renderWrapper}
        sizeToFit="height"
        scrollDirection="vertical"
        layout={layout}
        isLoading={isLoading}
        collection={gridCollection}
        transitionDuration={0}
        {...others}
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
  /** The type of selection that is allowed in the collection. */
  selectionMode: PropTypes.oneOf(['none', 'single', 'multiple']),
  /** */
  selectionStyle: PropTypes.oneOf(['highlight', undefined]),
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
  selectionMode: 'single',
};

export default ListView;

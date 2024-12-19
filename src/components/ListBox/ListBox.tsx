import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import { mergeProps } from 'react-aria';
import { useCollator } from '@react-aria/i18n';
import { useListBox } from '@react-aria/listbox';
import { ListLayout } from 'listbox-layout';
import { Virtualizer, VirtualizerItem } from 'listbox-virtualizer';

import { useLocalOrForwardRef } from '../../hooks';
import useLoadPrev from '../../hooks/useLoadPrev';
import { ListBoxProps } from '../../types';
import loadingStates from '../../utils/devUtils/constants/loadingStates';
import Box from '../Box';
import Loader from '../Loader';

import { Option } from './index';
import { ListBoxContext } from './ListBoxContext';
import ListBoxSection from './ListBoxSection';

export const collectionTypes = {
  ITEM: 'item',
  LOADER: 'loader',
  PLACEHOLDER: 'placeholder',
};

export function useListBoxLayout(state) {
  const collator = useCollator({ usage: 'search', sensitivity: 'base' });
  const layout = useMemo(() => (
    new ListLayout({
      estimatedRowHeight: 41,
      estimatedHeadingHeight: 26,
      padding: 4,
      loaderHeight: 41,
      placeholderHeight: 41,
      collator,
    })
  ), [collator]);

  layout.collection = state.collection;
  layout.disabledKeys = state.disabledKeys;
  return layout;
}

const ListBox = forwardRef((props: ListBoxProps, ref) => {
  const {
    defaultSelectedKeys,
    disabledKeys,
    hasAutoFocus,
    hasFocusWrap,
    hasNoEmptySelection,
    hasVirtualFocus,
    id,
    isCondensed,
    isLoading,
    isFocusedOnHover,
    isSelectedOnPressUp,
    isVirtualized,
    items,
    keyboardDelegate,
    label,
    loadingState,
    onLoadMore,
    onLoadPrev,
    onScroll,
    onSelectionChange,
    renderEmptyState,
    selectedKeys,
    selectionMode,
    state,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-details': ariaDetails,
    ...others
  } = props;

  // Object matching React Aria API with all options
  const listBoxOptions = {
    autoFocus: hasAutoFocus,
    defaultSelectedKeys,
    disabledKeys,
    disallowEmptySelection: hasNoEmptySelection,
    id,
    isLoading,
    isVirtualized,
    items,
    keyboardDelegate,
    label,
    onLoadMore,
    onScroll,
    onSelectionChange,
    renderEmptyState,
    selectedKeys,
    selectionMode,
    shouldFocusOnHover: isFocusedOnHover,
    shouldFocusWrap: hasFocusWrap,
    shouldSelectOnPressUp: isSelectedOnPressUp,
    shouldUseVirtualFocus: hasVirtualFocus,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-details': ariaDetails,
  };

  const listBoxRef = useLocalOrForwardRef<HTMLDivElement>(null);
  /* istanbul ignore next */
  useImperativeHandle(ref, () => listBoxRef.current);
  const layout = useListBoxLayout(state);
  layout.isLoading = props.isLoading ? props.isLoading : false;

  // Get props for the listbox
  const { listBoxProps } = useListBox({
    ...listBoxOptions,
    keyboardDelegate: layout,
    isVirtualized: true,
  }, state, listBoxRef);

  const renderWrapper = (parent, reusableView, children, renderChildren) => {
    if (reusableView.viewType === 'section') {
      return (
        <ListBoxSection
          key={reusableView.key}
          reusableView={reusableView}
          header={children.find(c => c.viewType === 'header')}
        >
          {renderChildren(children.filter(c => c.viewType === 'item'))}
        </ListBoxSection>
      );
    }

    return (
      <VirtualizerItem
        key={reusableView.key}
        reusableView={reusableView}
        parent={parent}
      />
    );
  };

  const memoedLoadMoreProps = useMemo(() => ({
    isLoading,
    onLoadPrev,
    items,
  }), [isLoading, onLoadPrev, items]);

  useLoadPrev(memoedLoadMoreProps, listBoxRef);

  return (
    <ListBoxContext.Provider value={state}>
      <Box variant="listBox.container">
        {loadingState === loadingStates.LOADING_MORE_PREPEND
        && <Loader variant="loader.withinListbox" aria-label="Loading more..." />}
        <Virtualizer
          {...mergeProps((listBoxProps), others)}
          autoFocus={hasAutoFocus}
          style={{ outline: 'none' }}
          ref={listBoxRef}
          focusedKey={state?.selectionManager?.focusedKey}
          sizeToFit="height"
          scrollDirection="vertical"
          collection={state.collection}
          renderWrapper={renderWrapper}
          transitionDuration={0}
          layout={layout}
          isLoading={isLoading}
          onLoadMore={onLoadMore}
          shouldUseVirtualFocus={hasVirtualFocus}
          onScroll={onScroll}
        >
          {(type, item) => {
          // Type can be used like so: https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/listbox/src/ListBoxBase.tsx#L129
            if (type === collectionTypes.ITEM) {
              return (
                <Option
                  key={item.key}
                  item={item}
                  hasVirtualFocus={hasVirtualFocus}
                  isCondensed={isCondensed}
                />
              );
            } if (type === collectionTypes.LOADER) {
              return (
                <Loader variant="loader.withinListbox" aria-label="Loading more..." />
              );
            }
            return null;
          }}
        </Virtualizer>
      </Box>
    </ListBoxContext.Provider>
  );
});

export default ListBox;

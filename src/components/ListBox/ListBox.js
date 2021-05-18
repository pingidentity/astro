import React, { forwardRef, useRef, useImperativeHandle, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useListBox } from '@react-aria/listbox';
import { mergeProps } from '@react-aria/utils';
import { Virtualizer, VirtualizerItem } from '@react-aria/virtualizer';
import { useCollator } from '@react-aria/i18n';
import { ListLayout } from '@react-stately/layout';

import { ListBoxContext } from './ListBoxContext';
import { Option } from './index.js';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';

export const collectionTypes = {
  ITEM: 'item',
  LOADER: 'loader',
  PLACEHOLDER: 'placeholder',
};

export function useListBoxLayout(state) {
  const collator = useCollator({ usage: 'search', sensitivity: 'base' });
  const layout = useMemo(() =>
    new ListLayout({
      estimatedRowHeight: 32,
      estimatedHeadingHeight: 26,
      padding: 4,
      collator,
    })
  , [collator]);

  layout.collection = state.collection;
  layout.disabledKeys = state.disabledKeys;
  return layout;
}

const ListBox = forwardRef((props, ref) => {
  const {
    defaultSelectedKeys,
    disabledKeys,
    hasAutoFocus,
    hasFocusWrap,
    hasNoEmptySelection,
    hasVirtualFocus,
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
    state,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-details': ariaDetails,
    ...others
  } = props;
  const { focusStrategy } = state;
  // Object matching React Aria API with all options
  const listBoxOptions = {
    autoFocus: hasAutoFocus || focusStrategy,
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
    shouldFocusWrap: hasFocusWrap,
    shouldUseVirtualFocus: hasVirtualFocus,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-details': ariaDetails,
  };

  const listBoxRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => listBoxRef.current);
  const layout = useListBoxLayout(state);
  layout.isLoading = props.isLoading;

  // Get props for the listbox
  const { listBoxProps } = useListBox({
    ...listBoxOptions,
    keyboardDelegate: layout,
    isVirtualized: true,
  }, state, listBoxRef);

  const renderWrapper = (parent, reusableView) => (
    <VirtualizerItem
      key={reusableView.key}
      reusableView={reusableView}
      parent={parent}
    />
  );

  return (
    <ListBoxContext.Provider value={state}>
      <Virtualizer
        {...mergeProps(listBoxProps, others)}
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
              />
            );
          }

          return null;
        }}
      </Virtualizer>
    </ListBoxContext.Provider>
  );
});

ListBox.propTypes = {
  defaultSelectedKeys: isIterableProp,
  disabledKeys: isIterableProp,
  hasAutoFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  hasFocusWrap: PropTypes.bool,
  hasNoEmptySelection: PropTypes.bool,
  hasVirtualFocus: PropTypes.bool,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  isVirtualized: PropTypes.bool,
  items: isIterableProp,
  keyboardDelegate: PropTypes.any,
  label: PropTypes.node,
  onLoadMore: PropTypes.func,
  onScroll: PropTypes.func,
  onSelectionChange: PropTypes.func,
  renderEmptyState: PropTypes.node,
  selectedKeys: isIterableProp,
  selectionMode: PropTypes.any,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-details': PropTypes.string,
  state: PropTypes.shape({
    close: PropTypes.func,
    collection: PropTypes.shape({}),
    focusStrategy: PropTypes.string,
    isOpen: PropTypes.bool,
    selectionManager: PropTypes.shape({
      focusedKey: PropTypes.string,
    }),
  }),
};

ListBox.defaultProps = {
  state: {},
};

export default ListBox;

import React, {
  forwardRef,
  RefObject,
} from 'react';
import { useTabList, useTabPanel } from 'react-aria';
import { useTabListState } from 'react-stately';
import { AriaTabPanelProps, TabListAria, TabPanelAria } from '@react-aria/tabs';
import { TabListState, TabListStateOptions } from '@react-stately/tabs';

import { useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { AriaTabListOptions, TabListItemProps, TabPanelProps, TabsProps } from '../../types';
import ORIENTATION from '../../utils/devUtils/constants/orientation';
import Box from '../Box';
import { CollectionTab } from '../Tab';

export const TabsContext = React.createContext({});

const TabPanel = forwardRef<HTMLElement, TabPanelProps>(({ state, ...props }, ref) => {
  const { children, tabPanelProps } = props;

  const tabPanelRef = useLocalOrForwardRef<HTMLElement>(ref);

  const { tabPanelProps: raTabPanelProps } = useTabPanel(props as AriaTabPanelProps,
    state as TabListState<object>,
    tabPanelRef as RefObject<Element>) as TabPanelAria;

  if (state?.selectedItem?.props?.isListItem) {
    const parentTab = tabPanelRef.current?.previousElementSibling?.querySelector(
      `[name="${state?.selectedItem?.props?.parentName}"]`);
    raTabPanelProps['aria-labelledby'] = parentTab?.id;
  }

  return (
    <Box {...tabPanelProps} {...raTabPanelProps} ref={tabPanelRef}>
      {children}
    </Box>
  );
});

const Tabs = forwardRef<HTMLElement, TabsProps>((props, ref) => {
  const {
    isDisabled,
    items,
    onSelectionChange,
    orientation,
    mode,
    tabListProps,
    tabPanelProps,
    ...others
  } = props;

  usePropWarning(props, 'disabled', 'isDisabled');

  const tabListRef = useLocalOrForwardRef<HTMLElement>(ref);

  let allItems: Array<TabListItemProps> = [];

  if (mode === 'list' && items) {
    items.forEach(item => {
      allItems = [...allItems, item];
      if (item.list) {
        const list = item.list.map(el => ({
          ...el,
          isListItem: true,
        }));
        allItems = [...allItems, ...list];
      }
    });
  }
  const state = useTabListState({
    ...props,
    onSelectionChange,
    items: mode === 'list' ? allItems : items,
  } as TabListStateOptions<TabListItemProps>) as TabListState<TabListItemProps>;

  const {
    tabListProps: raTabListProps,
  }: TabListAria = useTabList(props as AriaTabListOptions<TabListItemProps>,
    state as TabListState<TabListItemProps>,
    tabListRef as RefObject<HTMLElement>);

  return (
    <TabsContext.Provider value={state}>
      <Box {...others}>
        <Box
          variant="tabs"
          isRow={orientation === ORIENTATION.HORIZONTAL}
          {...tabListProps}
          {...raTabListProps}
          ref={tabListRef}
        >
          {Array.from(state.collection)
            .filter(item => !item?.props?.isListItem)
            .map(item => (
              <CollectionTab
                key={item.key}
                item={item}
                isDisabled={isDisabled}
                orientation={orientation}
                mode={mode}
                slots={item?.props?.slots}
              />
            ))}
        </Box>
        <TabPanel
          key={state.selectedItem?.key}
          state={state}
          tabPanelProps={tabPanelProps}
        >
          {state.selectedItem?.props.children || state.selectedItem?.props.content}
        </TabPanel>
      </Box>
    </TabsContext.Provider>
  );
});


Tabs.defaultProps = {
  isDisabled: false,
  orientation: 'horizontal',
  mode: 'default',
  keyboardActivation: 'manual',
};


Tabs.displayName = 'Tabs';
export default Tabs;

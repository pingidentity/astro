import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useTabList, useTabPanel } from '@react-aria/tabs';
import { useTabListState } from '@react-stately/tabs';

import Box from '../Box';
import { CollectionTab } from '../Tab';
import ORIENTATION from '../../utils/devUtils/constants/orientation';
import { usePropWarning } from '../../hooks';

export const TabsContext = React.createContext({});

/**
 * Tabs are used to divide content, navigate to other views, and indicate work progress.
 */

const TabPanel = forwardRef(({ state, ...props }, ref) => {
  const tabPanelRef = useRef();
  const { children, tabPanelProps } = props;
  /* istanbul ignore next */
  useImperativeHandle(ref, () => tabPanelRef.current);
  const { tabPanelProps: raTabPanelProps } = useTabPanel(props, state, tabPanelRef);

  return (
    <Box {...tabPanelProps} {...raTabPanelProps} ref={tabPanelRef}>
      {children}
    </Box>
  );
});

const Tabs = forwardRef((props, ref) => {
  const {
    children,
    isDisabled,
    items,
    onSelectionChange,
    orientation,
    mode,
    tabListProps,
    tabPanelProps,
    ...others
  } = props;

  const tabListRef = useRef();
  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => tabListRef.current);

  let allItems = [];

  if (mode === 'list') {
    items.forEach((item) => {
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
  });
  const {
    tabListProps: raTabListProps,
  } = useTabList(props, state, tabListRef);

  return (
    <TabsContext.Provider value={state}>
      <Box {...others}>
        <Box
          variant="tabs"
          gap="25px"
          isRow={orientation === ORIENTATION.HORIZONTAL}
          {...tabListProps}
          {...raTabListProps}
          ref={tabListRef}
        >
          {Array.from(state.collection)
            .filter(item => !item?.value?.isListItem)
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

Tabs.propTypes = {
  /** The default tab key to be selected. (uncontrolled) */
  defaultSelectedKey: PropTypes.string,
  /** Array of keys to disable within the tab list. */
  disabledKeys: PropTypes.arrayOf(PropTypes.string),
  /** The tab key that is currently selected. (controlled) */
  selectedKey: PropTypes.string,
  /** Determines the arrangement of the tablist. */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Determines the behavior model for the tabs. */
  mode: PropTypes.oneOf(['default', 'tooltip', 'list']),
  /**
   * *For performance reasons, use this prop instead of Array.map when iteratively rendering Items*.
   * For use with [dynamic collections](https://react-spectrum.adobe.com/react-stately/collections.html#dynamic-collections).
  */
  items: PropTypes.arrayOf(PropTypes.shape({})),
  /** Whether the entire tablist is disabled. */
  isDisabled: PropTypes.bool,
  /** Handler that is called when the selected tab has changed. */
  onSelectionChange: PropTypes.func,
  /** A props object that is subsequently spread into the rendered tablist. */
  tabListProps: PropTypes.shape({}),
  /** Props object that is spread directly into all of the tab panel wrapper elements. */
  tabPanelProps: PropTypes.shape({}),
  /** Whether tabs are activated automatically on focus or manually¸ */
  keyboardActivation: PropTypes.oneOf(['automatic', 'manual']),
};

Tabs.defaultProps = {
  isDisabled: false,
  orientation: 'horizontal',
  mode: 'default',
  keyboardActivation: 'manual',
};

TabPanel.propTypes = {
  state: PropTypes.shape({}),
  tabPanelProps: PropTypes.shape({}),
};

Tabs.displayName = 'Tabs';
export default Tabs;

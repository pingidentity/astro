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

const Tabs = forwardRef((props, ref) => {
  const {
    children,
    isDisabled,
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
  const tabPanelRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => tabPanelRef.current);

  const state = useTabListState({ ...props, onSelectionChange });
  const {
    tabListProps: raTabListProps,
  } = useTabList(props, state, tabListRef);
  const {
    tabPanelProps: raTabPanelProps,
  } = useTabPanel(props, state, tabPanelRef);

  const panelContent = (
    state.selectedItem
      ? (state.selectedItem.props.content || state.selectedItem.props.children)
      : null
  );

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
          {Array.from(state.collection).map(item => (
            <CollectionTab
              key={item.key}
              item={item}
              isDisabled={isDisabled}
              orientation={orientation}
              mode={mode}
            />
          ))}
        </Box>
        <Box
          variant="tabPanel"
          ref={tabPanelRef}
          {...tabPanelProps}
          {...raTabPanelProps}
        >
          {panelContent}
        </Box>
      </Box>
    </TabsContext.Provider>
  );
});

Tabs.propTypes = {
  /** The default tab key to be selected. (uncontrolled) */
  defaultSelectedKey: PropTypes.string,
  /** The tab key that is currently selected. (controlled) */
  selectedKey: PropTypes.string,
  /** Determines the arrangement of the tablist. */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Determines the behavior model for the tabs. */
  mode: PropTypes.oneOf(['default', 'tooltip']),
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
};

Tabs.defaultProps = {
  isDisabled: false,
  orientation: 'horizontal',
  mode: 'default',
};

Tabs.displayName = 'Tabs';
export default Tabs;

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useTabs } from '@react-aria/tabs';
import { useSingleSelectListState } from '@react-stately/list';

import Box from '../Box';
import { CollectionTab } from '../Tab';

export const TabsContext = React.createContext({});
export const ORIENTATION = { HORIZONTAL: 'horizontal', VERTICAL: 'vertical' };

const Tabs = forwardRef((props, ref) => {
  const {
    children,
    isDisabled,
    onSelectionChange,
    orientation,
    tabListProps,
    tabPanelProps,
    ...others
  } = props;
  const tabListRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => tabListRef.current);
  const state = useSingleSelectListState({ ...props, onSelectionChange });
  const {
    tabListProps: raTabListProps,
    tabPanelProps: raTabPanelProps,
  } = useTabs(props, state, tabListRef);

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
          {Array.from(state.collection).map(item => (
            <CollectionTab
              key={item.key}
              item={item}
              isDisabled={isDisabled}
              orientation={orientation}
            />
          ))}
        </Box>
        <Box
          variant="tabPanel"
          {...tabPanelProps}
          {...raTabPanelProps}
        >
          {state.selectedItem && state.selectedItem.props.children}
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
  /** Whether the entire tablist is disabled. */
  isDisabled: PropTypes.bool,
  /** Handler that is called when the selected tab has changed. */
  onSelectionChange: PropTypes.func,
  /** Determines the arrangement of the tablist. */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /** A props object that is subsequently spread into the rendered tablist. */
  tabListProps: PropTypes.shape({}),
  /** Props object that is spread directly into all of the tab panel wrapper elements. */
  tabPanelProps: PropTypes.shape({}),
};

Tabs.defaultProps = {
  isDisabled: false,
  orientation: 'horizontal',
};

Tabs.displayName = 'Tabs';
export default Tabs;

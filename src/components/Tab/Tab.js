import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useTab } from '@react-aria/tabs';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { Item as Tab } from '@react-stately/collections';
import classnames from 'classnames';

import Box from '../Box';
import { TabsContext, ORIENTATION } from '../Tabs';
import Text from '../Text';

export const CollectionTab = forwardRef((props, ref) => {
  const {
    className,
    item,
    isDisabled: tabsDisabled,
    orientation,
  } = props;
  const { key, rendered, props: itemProps } = item;
  const { icon, isDisabled: tabDisabled, tabLineProps } = itemProps;
  const isDisabled = tabsDisabled || tabDisabled;
  const state = useContext(TabsContext);
  const { isFocusVisible, focusProps } = useFocusRing();
  const tabClasses = classnames(className, {
    'is-focused': isFocusVisible,
    'is-disabled': isDisabled,
  });

  const tabRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => tabRef.current);
  const { tabProps } = useTab({ item, isDisabled }, state, tabRef);
  const isSelected = state.selectedKey === key;

  return (
    <Box
      className={tabClasses}
      variant="tab"
      bg={orientation === ORIENTATION.VERTICAL && isSelected && 'accent.95'}
      {...itemProps}
      {...mergeProps(focusProps, tabProps)}
      ref={tabRef}
    >
      {icon}
      <Text variant="tabLabel">{rendered}</Text>
      {isSelected && !isDisabled && <TabLine {...tabLineProps} />}
    </Box>
  );
});

CollectionTab.displayName = 'CollectionTab';
CollectionTab.propTypes = {
  isDisabled: PropTypes.bool,
  item: PropTypes.shape({
    key: PropTypes.string,
    props: PropTypes.shape({}),
    rendered: PropTypes.node,
    tabLineProps: PropTypes.shape({}),
  }),
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

const TabLine = props => (
  <Box
    role="presentation"
    height={2}
    width="100%"
    bg="active"
    {...props}
  />
);

// Export Item as default Tab for simplicity, convert to CollectionTab within Tabs component
export default Tab;

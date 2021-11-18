import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useTab } from '@react-aria/tabs';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { Item as Tab } from '@react-stately/collections';

import Box from '../Box';
import { TabsContext } from '../Tabs';
import Text from '../Text';
import { useStatusClasses, usePropWarning } from '../../hooks';
import ORIENTATION from '../../utils/devUtils/constants/orientation';
import TooltipTrigger, { Tooltip } from '../TooltipTrigger';
import Button from '../Button';

export const CollectionTab = forwardRef((props, ref) => {
  const {
    className,
    item,
    isDisabled: tabsDisabled,
    orientation,
    mode,
    tooltipTriggerProps,
  } = props;
  const { key, rendered, props: itemProps } = item;

  const {
    icon,
    isDisabled: tabDisabled,
    separator,
    tabLabelProps,
    tabLineProps,
    content,
    ...otherItemProps
  } = itemProps;
  const isDisabled = tabsDisabled || tabDisabled;
  const state = useContext(TabsContext);
  const isSelected = state.selectedKey === key;
  const { isFocusVisible, focusProps } = useFocusRing();
  const { hoverProps, isHovered } = useHover({});
  const { classNames } = useStatusClasses(className, {
    'is-focused': isFocusVisible,
    'is-vertical': orientation === ORIENTATION.VERTICAL,
    'is-horizontal': orientation === ORIENTATION.HORIZONTAL,
    isDisabled,
    isHovered,
    isSelected,
  });

  const tabRef = useRef();
  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => tabRef.current);
  const { tabProps } = useTab({ key, isDisabled }, state, tabRef);

  const tab = (
    <Box
      className={classNames}
      variant="tab"
      {...mergeProps(focusProps, hoverProps, tabProps)}
      {...otherItemProps}
      ref={tabRef}
    >
      {icon}
      <Text variant="tabLabel" {...tabLabelProps}>{rendered}</Text>
      {isSelected && !isDisabled && <TabLine {...tabLineProps} />}
    </Box>
  );

  if (mode === 'tooltip') {
    return (
      <>
        {separator}
        <TooltipTrigger {...tooltipTriggerProps} isOpen={isHovered || isFocusVisible}>
          <Button variant="quiet">
            {tab}
          </Button>
          <Tooltip>
            {itemProps.textValue || itemProps.title}
          </Tooltip>
        </TooltipTrigger>
      </>
    );
  }

  return tab;
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
  mode: PropTypes.oneOf(['default', 'tooltip']),
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  tooltipTriggerProps: PropTypes.shape({}),
};

const TabLine = props => (
  <Box
    role="presentation"
    variant="tabLine"
    {...props}
  />
);

// Export Item as default Tab for simplicity, convert to CollectionTab within Tabs component
export default Tab;

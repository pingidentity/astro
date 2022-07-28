import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useTab } from '@react-aria/tabs';
import { useFocusRing } from '@react-aria/focus';
import { Pressable, useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { Item as Tab } from '@react-stately/collections';

import { TabsContext } from '../Tabs';
import { useStatusClasses, usePropWarning } from '../../hooks';
import ORIENTATION from '../../utils/devUtils/constants/orientation';
import TabPicker from '../TabPicker';
import {
  Box,
  Text,
  TooltipTrigger,
  Tooltip,
} from '../..';

/**
 * Tab control for dividing up closely-related content.
 * Typically used as a child of the Tabs component.
 */

export const CollectionTab = forwardRef((props, ref) => {
  const {
    className,
    item,
    isDisabled: tabsDisabled,
    orientation,
    mode,
    slots,
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
    titleAttr,
    ...otherItemProps
  } = itemProps;
  const state = useContext(TabsContext);
  const isDisabled = tabsDisabled || tabDisabled || state.disabledKeys.has(key);
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
    <Box isRow>
      {slots?.beforeTab}
      <Box
        className={classNames}
        variant="tab"
        {...mergeProps(focusProps, hoverProps, tabProps)}
        {...otherItemProps}
        ref={tabRef}
        title={titleAttr || undefined}
      >
        {icon}
        <Text variant="tabLabel" {...tabLabelProps}>
          {rendered}
        </Text>
        {isSelected && !isDisabled && <TabLine {...tabLineProps} />}
      </Box>
      {slots?.afterTab}
    </Box>
  );

  if (mode === 'list' && itemProps.list) {
    return (
      <TabPicker
        ref={tabRef}
        className={classNames}
        items={itemProps.list}
        state={state}
        item={item}
        {...mergeProps(focusProps, hoverProps, tabProps)}
        {...otherItemProps}
      />
    );
  }

  if (mode === 'tooltip') {
    return (
      <>
        {separator}
        <TooltipTrigger {...tooltipTriggerProps} isOpen={isHovered || isFocusVisible}>
          <Pressable>
            <span variant="quiet">
              {tab}
            </span>
          </Pressable>
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
  mode: PropTypes.oneOf(['default', 'tooltip', 'list']),
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  tooltipTriggerProps: PropTypes.shape({}),
  slots: PropTypes.shape({
    beforeTab: PropTypes.node,
    afterTab: PropTypes.node,
  }),
};

export const TabLine = props => (
  <Box
    role="presentation"
    variant="tabLine"
    {...props}
  />
);

// Export Item as default Tab for simplicity, convert to CollectionTab within Tabs component
export default Tab;

import React, { forwardRef, useContext } from 'react';
import { mergeProps, useFocusRing, useTab } from 'react-aria';
import { Item as Tab } from 'react-stately';
import { Pressable, useHover } from '@react-aria/interactions';
import { TabListState } from '@react-stately/tabs';

import {
  Box,
  Button,
  Text,
  Tooltip,
  TooltipTrigger,
} from '../..';
import { useLocalOrForwardRef, usePropWarning, useStatusClasses } from '../../hooks';
import { TabProps } from '../../types';
import ORIENTATION from '../../utils/devUtils/constants/orientation';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import TabPicker from '../TabPicker';
import { TabsContext } from '../Tabs';

/**
 * Tab control for dividing up closely-related content.
 * Typically used as a child of the Tabs component.
 */

export const CollectionTab = forwardRef<HTMLElement, TabProps>((props, ref) => {
  const {
    className,
    item,
    isDisabled: tabsDisabled,
    orientation,
    mode,
    slots,
  } = props;

  const { key, rendered, props: itemProps } = item;

  const state = useContext(TabsContext) as TabListState<object>;
  const isDisabled = tabsDisabled || itemProps?.isDisabled || state.disabledKeys.has(key);
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

  usePropWarning(props, 'disabled', 'isDisabled');
  const tabRef = useLocalOrForwardRef<HTMLElement>(ref);
  const { tabProps } = useTab({ key, isDisabled }, state, tabRef);

  const tab = (
    <Box isRow>
      {slots?.beforeTab}
      <Box
        className={classNames}
        variant="tab"
        {...mergeProps(focusProps, hoverProps, tabProps)}
        {...getPendoID('Tab')}
        ref={tabRef}
        {...itemProps}
        title={itemProps?.textValue}
        data-testid="test-me"
      >
        <>
          {itemProps?.icon}
          <Text variant="tabLabel" {...itemProps?.tabLabelProps}>
            {rendered}
          </Text>
          {isSelected && !isDisabled && <TabLine {...itemProps?.tabLineProps} />}
        </>
      </Box>
      {slots?.afterTab}
    </Box>
  );

  if (mode === 'list' && itemProps?.list) {
    return (
      <TabPicker
        ref={tabRef}
        className={classNames}
        items={itemProps?.list}
        state={state}
        item={item}
        {...mergeProps(focusProps, hoverProps, tabProps)}
        {...itemProps}
      />
    );
  }

  if (mode === 'tooltip') {
    return (
      <>
        {itemProps?.separator}
        <TooltipTrigger {...itemProps?.tooltipTriggerProps} isOpen={isHovered || isFocusVisible}>
          <Pressable>
            <span>
              {tab}
            </span>
          </Pressable>
          <Tooltip>
            {itemProps?.textValue || itemProps?.title}
          </Tooltip>

        </TooltipTrigger>
      </>
    );
  }

  if (mode === 'tooltipIsDisabled') {
    return (
      <>
        {itemProps?.separator}
        <Pressable>
          <span>
            {tab}
          </span>
        </Pressable>
      </>
    );
  }
  return tab;
});


export const TabLine = props => <Box role="presentation" variant="tabLine" {...props} />;

// Export Item as default Tab for simplicity, convert to CollectionTab within Tabs component
export default Tab;

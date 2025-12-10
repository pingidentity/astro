import React, { useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover, usePress } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';

import { useStatusClasses } from '../../hooks';
import { Box, Text } from '../../index';
import { SearchNavTabProps } from '../../types/searchNav';

const SearchNavTab = (props: SearchNavTabProps) => {
  const {
    className,
    item,
    labelProps,
    selectedKey,
    setSelectedKey,
    tabProps,
  } = props;
  const { key, text } = item;
  const isSelected = selectedKey === key;

  const tabRef = useRef<HTMLDivElement>(null);

  const { isFocusVisible, focusProps } = useFocusRing();
  const { hoverProps, isHovered } = useHover({});

  const onPressCallback = () => {
    setSelectedKey(key);
  };

  const { pressProps, isPressed } = usePress({
    ref: tabRef,
    onPress: onPressCallback,
  });

  const { classNames } = useStatusClasses(className, {
    'is-focused': isFocusVisible,
    isHovered,
    isPressed,
    isSelected,
  });

  return (
    <Box
      ref={tabRef}
      variant="searchNav.tab"
      role="listitem"
      tabIndex={0}
      {...mergeProps(tabProps, hoverProps, focusProps, pressProps)}
      className={classNames}
    >
      <Text
        className={classNames}
        role="link"
        variant="searchNavTabLabel"
        {...labelProps}
      >
        {text}
      </Text>
    </Box>
  );
};

export default SearchNavTab;

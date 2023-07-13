import React, { forwardRef } from 'react';
import { useHover } from '@react-aria/interactions';

import { useStatusClasses } from '../../hooks';
import { Box, Icon, Text } from '../../index';

import { listViewItemPropTypes } from './listViewItemAttributes';

const sx = {
  container: {
    m: 1,
    minHeight: 72,
    '&.is-hovered': {
      bg: 'white',
      cursor: 'pointer',
    },
  },
  controls: {
    alignSelf: 'center',
    ml: 'auto',
    pr: 'sm',
  },
  data: {
    alignItems: 'center',
  },
  icon: {
    width: 25,
    color: 'accent.40',
  },
  rightOfData: {
    alignSelf: 'center',
    ml: 'sm',
  },
  subtitle: {
    alignSelf: 'start',
    fontSize: 'sm',
    lineHeight: '16px',
    my: '1px',
  },
  text: {
    ml: 'md',
  },
  title: {
    alignSelf: 'start',
    fontSize: 'md',
  },
  wrapper: {
    cursor: 'pointer',
    display: 'flex',
    flex: '1 1 0px',
    ml: 'md',
  },
};

export const LIST_ITEM_ICON = '-list-item-icon';

const ListViewItem = forwardRef(({
  children,
  className,
  data,
  isHovered,
  isSelected,
  linkProps,
  onHoverChange,
  onHoverEnd,
  onHoverStart,
  slots,
  ...others
}, ref) => {
  const {
    icon,
    subtext,
    text,
  } = data;

  const shouldUseDefaultHover = isHovered === undefined;

  const { hoverProps, isHovered: defaultIsHovered } = useHover({
    onHoverChange,
    onHoverEnd,
    onHoverStart,
  });

  const { classNames } = useStatusClasses(className, {
    isHovered: shouldUseDefaultHover ? defaultIsHovered : isHovered,
    isSelected,
  });

  const wrapperStyles = slots?.leftOfData ? { ...sx.wrapper, ml: 0 } : sx.wrapper;
  const textStyles = slots?.leftOfData ? { ...sx.text, ml: 0 } : sx.text;

  const renderIcon = (
    <Box sx={sx.icon}>
      {icon && (
      <Icon
        icon={icon}
        size="md"
        title={{ id: `${text}${LIST_ITEM_ICON}`, name: `${text}${LIST_ITEM_ICON}` }}
      />
      )}
    </Box>
  );

  const renderData = (
    <Box isRow sx={sx.data}>
      { slots?.leftOfData || renderIcon }
      <Box sx={textStyles}>
        {text && (
          <Text variant="bodyStrong" sx={sx.title}>
            {text}
          </Text>
        )}
        {subtext && <Text variant="subtitle" sx={sx.subtitle}>{subtext}</Text>}
      </Box>
    </Box>
  );

  return (
    <Box
      className={classNames}
      ref={ref}
      sx={sx.container}
      {...hoverProps}
      {...others}
    >
      <Box isRow sx={wrapperStyles}>
        {renderData }
        {slots?.rightOfData && (
        <Box isRow alignSelf="center">
          {slots.rightOfData}
        </Box>
        )}
        <Box isRow gap="sm" alignItems="center" sx={sx.controls}>
          {children}
        </Box>
      </Box>
    </Box>
  );
});

ListViewItem.propTypes = listViewItemPropTypes;

ListViewItem.displayName = 'ListViewItem';

export default ListViewItem;

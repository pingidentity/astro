import React, { forwardRef } from 'react';
import { useHover } from '@react-aria/interactions';

import { useStatusClasses } from '../../hooks';
import { Box, Icon, Image, Text } from '../../index';

import { listViewItemPropTypes } from './listViewItemAttributes';

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
  const { icon, image, subtext, text } = data;

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

  const getWrapperVariant = () => {
    if (slots?.leftOfData) return 'listViewItem.leftOfDataWrapper';
    if (image && !icon) return 'listViewItem.imageWrapper';

    return 'listViewItem.iconWrapper';
  };

  const renderIcon = icon && (
  <Box width="25px">
    <Icon
      color="accent.40"
      icon={icon}
      size="md"
      title={{ id: `${text}${LIST_ITEM_ICON}`, name: `${text}${LIST_ITEM_ICON}` }}
    />
  </Box>
  );

  const renderImage = !icon && image && (
  <Box width="35px">
    <Image
      src={image.src}
      alt={image.alt}
      aria-label={image['aria-label']}
    />
  </Box>
  );

  const renderData = (
    <Box isRow alignItems="center">
      { slots?.leftOfData || renderIcon || renderImage }
      <Box variant={getWrapperVariant()}>
        {text && (
          <Text variant="listViewItemText">
            {text}
          </Text>
        )}
        {subtext && <Text variant="listViewItemSubtext">{subtext}</Text>}
      </Box>
    </Box>
  );

  return (
    <Box
      className={classNames}
      ref={ref}
      variant="listViewItem.styledContainer"
      {...hoverProps}
      {...others}
    >
      <Box isRow variant={getWrapperVariant()}>
        {renderData}
        {slots?.rightOfData && (
          <Box isRow variant="listViewItem.rightOfData">
            {slots.rightOfData}
          </Box>
        )}
        <Box isRow gap="sm" variant="listViewItem.controls">
          {children}
        </Box>
      </Box>
    </Box>
  );
});

ListViewItem.propTypes = listViewItemPropTypes;

ListViewItem.displayName = 'ListViewItem';

export default ListViewItem;

import React, { forwardRef } from 'react';
import { useHover } from '@react-aria/interactions';

import { Box, Icon, Image, Text } from '../..';
import { useGetTheme, usePropWarning, useStatusClasses } from '../../hooks';
import { ListViewItemProps } from '../../types/listViewItem';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';

import ItemAvatar from './ItemAvatar';

export const LIST_ITEM_ICON = '-list-item-icon';

const displayName = 'ListViewItem';

const ListViewItem = forwardRef<HTMLDivElement, ListViewItemProps>((props, ref) => {
  const {
    children,
    className,
    data,
    iconProps,
    // Deprecated: kept so it never leaks onto the DOM; color/colorId/iconProps
    // are still honored below. Warns in development.
    iconWrapperProps,
    isHovered,
    isSelected,
    linkProps,
    onHoverChange,
    onHoverEnd,
    onHoverStart,
    slots,
    colorId,
    avatarProps,
    avatarInitials,
    isIconRound,
    ...others
  } = props;
  const { icon, image, subtext, text, avatarDefaultText } = data;

  usePropWarning(props, 'iconWrapperProps', 'colorId');

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

  const { themeState: { isOnyx } } = useGetTheme();

  const renderIcon = icon && (
    isOnyx ? (
      <ItemAvatar
        icon={icon}
        title={{ name: `${text}${LIST_ITEM_ICON}` }}
        colorId={iconWrapperProps?.color || iconWrapperProps?.colorId || colorId}
        avatarDefaultText={avatarDefaultText}
        avatarInitials={avatarInitials}
        isIconRound={isIconRound}
        avatarProps={avatarProps}
        iconProps={{ ...iconProps, ...iconWrapperProps?.iconProps }}
      />
    ) : (
      <Box width="25px" variant="listViewItem.iconContainer">
        <Icon
          color="accent.40"
          icon={icon}
          size="md"
          title={{ name: `${text}${LIST_ITEM_ICON}` }}
          {...iconProps}
        />
      </Box>
    )
  );

  const renderImage = !icon && image && (
    isOnyx ? (
      <Box variant="listViewItem.imageContainer">
        <Image
          src={image.src}
          alt={image.alt}
          aria-label={image['aria-label']}
          variant="images.avatar"
        />
      </Box>
    ) : (
      <Box width="35px">
        <Image
          src={image.src}
          alt={image.alt}
          aria-label={image['aria-label']}
        />
      </Box>
    )
  );

  const renderNoIconAvatar = isOnyx && !icon && !image
    && (avatarInitials || avatarDefaultText) && (
      <ItemAvatar
        title={{ name: `${text}${LIST_ITEM_ICON}` }}
        colorId={colorId}
        avatarDefaultText={avatarDefaultText}
        avatarInitials={avatarInitials}
        isIconRound={isIconRound}
        avatarProps={avatarProps}
      />
  );

  const renderData = (
    <Box isRow alignItems="center">
      { slots?.leftOfData || renderIcon || renderImage || renderNoIconAvatar }
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
      {...getPendoID(displayName)}
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

ListViewItem.displayName = displayName;

export default ListViewItem;

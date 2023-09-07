import React, { forwardRef } from 'react';
import { useHover } from '@react-aria/interactions';

import { useStatusClasses } from '../../hooks';
import { Box, Icon, Image, Text } from '../../index';

import { listViewItemPropTypes } from './listViewItemAttributes';

const truncate = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};

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
    flexShrink: 0,
  },
  data: {
    alignItems: 'center',
  },
  icon: {
    width: 25,
    color: 'accent.40',
  },
  image: {
    width: 35,
  },
  rightOfData: {
    alignSelf: 'center',
    ml: 'sm',
  },
  subtitle: {
    ...truncate,
    alignSelf: 'start',
    fontSize: 'sm',
    lineHeight: '16px',
    my: '1px',
  },
  text: {
    ml: 'md',
  },
  title: {
    ...truncate,
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
    image,
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

  const iff = (condition, then, otherwise) => (condition ? then : otherwise);

  const wrapperStyles = slots?.leftOfData
    ? { ...sx.wrapper, ml: 0 }
    : iff(!icon && image, { ...sx.wrapper, ml: 10 }, sx.wrapper);
  const textStyles = slots?.leftOfData
    ? { ...sx.text, ml: 0 }
    : iff(!icon && image, { ...sx.wrapper, ml: 10 }, sx.wrapper);

  const renderIcon = icon && (
  <Box sx={sx.icon}>
    <Icon
      icon={icon}
      size="md"
      title={{ id: `${text}${LIST_ITEM_ICON}`, name: `${text}${LIST_ITEM_ICON}` }}
    />
  </Box>
  );

  const renderImage = !icon && image && (
  <Box sx={sx.image}>
    <Image
      src={image.src}
      alt={image.alt}
      aria-label={image['aria-label']}
    />
  </Box>
  );

  const renderData = (
    <Box isRow sx={sx.data}>
      { slots?.leftOfData || renderIcon || renderImage }
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
        {renderData}
        {slots?.rightOfData && (
          <Box isRow alignSelf="center" flexShrink={0}>
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

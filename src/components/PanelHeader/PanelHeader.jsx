import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { useGetTheme } from '../../hooks';
import { Avatar, Box, CopyText, Icon, Image, Text } from '../../index';
import { SharedItemPropTypes } from '../ListViewItem/listViewItemAttributes';

export const PANEL_HEADER_ICON = '-panel-header-icon';

const PanelHeader = forwardRef(({
  avatarProps,
  children,
  className,
  data,
  headerProps,
  headerWrapperProps,
  iconProps,
  isCopyable,
  slots,
  subtextProps,
  ...others
}, ref) => {
  const { icon, image, subtext, text, avatarDefaultText } = data;

  const { themeState } = useGetTheme();

  const { isOnyx } = themeState;

  const renderIcon = (
    <Box width="25px" mx="md">
      {icon && (
        <Icon
          color="accent.40"
          icon={icon}
          size="md"
          title={{ name: `${text}${PANEL_HEADER_ICON}` }}
        />
      )}
    </Box>
  );

  const renderAvatar = (
    <Avatar
      src={image?.src}
      isSquare={!!image?.src}
      size="sm"
      defaultText={avatarDefaultText}
      mr="md"
      {...avatarProps}
    >
      {icon && !image?.src && (
        <Icon
          icon={icon}
          size="sm"
          title={{ name: `${text}${PANEL_HEADER_ICON}` }}
          {...iconProps}
        />
      )}
    </Avatar>
  );

  const renderImage = !icon && image && (
    <Box variant="panelHeader.iconWrapper">
      <Image
        src={image.src}
        alt={image.alt}
        aria-label={image['aria-label']}
      />
    </Box>
  );

  const renderLeftContent = () => {
    if (slots?.leftOfData) {
      return slots.leftOfData;
    }

    if (isOnyx) {
      return renderAvatar;
    }

    if (icon) {
      return renderIcon;
    }

    return renderImage;
  };

  const headerPropsSpread = {
    ...headerProps,
    ...isOnyx && ({ variant: 'H4', as: 'h4' }),
  };

  const headerWrapperPropsSpread = {
    ...headerWrapperProps,
    variant: 'panelHeader.wrapper',
    py: 'sm',
    ...isOnyx && ({ gap: 'xs' }),
  };

  const renderData = (
    <Box isRow variant={text || subtext ? 'panelHeader.data' : 'panelHeader.emptyData'}>
      {renderLeftContent()}
      {(text || subtext) && (
        <Box {...headerWrapperPropsSpread}>
          {text && (<Text {...headerPropsSpread} variant="panelHeaderText">{text}</Text>)}
          {subtext && isCopyable
            ? (
              <CopyText mode="nonClickableContent" textToCopy={subtext}>
                <Text variant="panelHeaderSubtext">{subtext}</Text>
              </CopyText>
            )
            : subtext && (<Text variant="panelHeaderSubtext">{subtext}</Text>)}
        </Box>
      )}
    </Box>
  );

  return (
    <Box
      variant="panelHeader.container"
      className={className}
      ref={ref}
      {...others}
    >
      <Box isRow variant="panelHeader.wrapper">
        {renderData}
        {slots?.rightOfData && (
          <Box isRow variant="panelHeader.rightOfData" sx={{ width: '100%' }}>
            {slots.rightOfData}
          </Box>
        )}
        <Box isRow variant="panelHeader.controls">
          {children}
        </Box>
      </Box>
    </Box>
  );
});

PanelHeader.propTypes = {
  ...SharedItemPropTypes,
  isCopyable: PropTypes.bool,
  iconProps: PropTypes.object,
  slots: PropTypes.shape({
    rightOfData: PropTypes.node,
  }),
};

export default PanelHeader;

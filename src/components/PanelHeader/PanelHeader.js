import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { useGetTheme } from '../../hooks';
import { Avatar, Box, Icon, Image, Text } from '../../index';
import { SharedItemPropTypes } from '../ListViewItem/listViewItemAttributes';

export const PANEL_HEADER_ICON = '-panel-header-icon';

const PanelHeader = forwardRef(({
  avatarProps,
  children,
  className,
  data,
  headerProps,
  headerWrapperProps,
  slots,
  subtextProps,
  ...others
}, ref) => {
  const { icon, image, subtext, text, avatarDefualtText } = data;

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
    <Avatar src={image?.src} size="avatar.lg" defaultText={avatarDefualtText} mr="md" {...avatarProps} />
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
      <Box {...headerWrapperPropsSpread}>
        {text && (<Text {...headerPropsSpread} variant="panelHeaderText">{text}</Text>)}
        {subtext && (<Text variant="panelHeaderSubtext">{subtext}</Text>)}
      </Box>
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
  slots: PropTypes.shape({
    rightOfData: PropTypes.node,
  }),
};

export default PanelHeader;

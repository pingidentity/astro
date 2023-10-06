import React, { forwardRef } from 'react';

import { Box, Icon, Image, Text } from '../../index';
import { SharedItemPropTypes } from '../ListViewItem/listViewItemAttributes';

export const PANEL_HEADER_ICON = '-panel-header-icon';

const PanelHeader = forwardRef(({
  children,
  className,
  data,
  ...others
}, ref) => {
  const { icon, image, subtext, text } = data;

  const getWrapperVariant = () => {
    if (image && !icon) return 'panelHeader.imageWrapper';

    return 'panelHeader.wrapper';
  };

  const renderIcon = (
    <Box width="25px">
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
    <Box isRow variant="panelHeader.data">
      {icon ? renderIcon : renderImage}
      <Box variant={getWrapperVariant()}>
        {text && (<Text variant="panelHeaderText">{text}</Text>)}
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
      <Box isRow variant={getWrapperVariant()}>
        {renderData}
        <Box isRow variant="panelHeader.controls">
          {children}
        </Box>
      </Box>
    </Box>
  );
});

PanelHeader.propTypes = {
  ...SharedItemPropTypes,
};

export default PanelHeader;

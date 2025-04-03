import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Box, Icon, Image, Text } from '../../index';
import { SharedItemPropTypes } from '../ListViewItem/listViewItemAttributes';

export const PANEL_HEADER_ICON = '-panel-header-icon';

const PanelHeader = forwardRef(({
  children,
  className,
  data,
  slots,
  ...others
}, ref) => {
  const { icon, image, subtext, text } = data;

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

  const renderImage = !icon && image && (
    <Box width="35px" mx="sm">
      <Image
        src={image.src}
        alt={image.alt}
        aria-label={image['aria-label']}
      />
    </Box>
  );

  const renderData = (
    <Box isRow variant={text || subtext ? 'panelHeader.data' : 'panelHeader.emptyData'}>
      { slots?.leftOfData || icon ? renderIcon : renderImage}
      <Box variant="panelHeader.wrapper" py="sm">
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

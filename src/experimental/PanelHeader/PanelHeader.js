import React, { forwardRef } from 'react';

import { SharedItemPropTypes } from '../../components/ListViewItem/listViewItemAttributes';
import { Box, Icon, Text } from '../../index';

export const PANEL_HEADER_ICON = '-panel-header-icon';

const PanelHeader = forwardRef(({
  children,
  className,
  data,
  ...others
}, ref) => {
  const {
    icon,
    subtext,
    text,
  } = data;

  const renderIcon = (
    <Box sx={{ width: 25, color: 'accent.40' }}>
      {icon && (
        <Icon
          icon={icon}
          size="md"
          title={{ name: `${text}${PANEL_HEADER_ICON}` }}
        />
      )}
    </Box>
  );

  const renderData = (
    <Box isRow variant="panelHeader.data">
      {renderIcon}
      <Box sx={{ ml: 'md' }}>
        {text && (
          <Text
            variant="bodyStrong"
            sx={{ alignSelf: 'start', fontSize: 'md' }}
          >
            {text}
          </Text>
        )}
        {subtext && (
        <Text
          variant="subtitle"
          sx={{
            fontSize: 'sm',
            lineHeight: '16px',
            my: '1px',
          }}
        >
          {subtext}
        </Text>
        )}
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
      <Box variant="panelHeader.wrapper">
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

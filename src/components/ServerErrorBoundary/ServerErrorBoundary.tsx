import React, { forwardRef } from 'react';
import AlertCircleIcon from '@pingux/mdi-react/AlertCircleIcon';

import {
  Box,
  Button,
  Icon,
  Text,
} from '../../index';
import { ServerErrorBoundaryProps } from '../../types';

const ServerErrorBoundary = forwardRef<HTMLElement, ServerErrorBoundaryProps>(
  (props, ref) => {
    const { hasServerError, children,
      renderElement, iconProps, text, buttonProps, ...others } = props;

    const handleReload = () => {
      window.location.reload();
    };

    if (!hasServerError) {
      return <Box>{children}</Box>;
    }

    return (
      <Box
        ref={ref}
        variant="serverErrorBoundary.base"
        isRow
        alignItems="center"
        justifyContent="center"
        gap="xs"
        {...others}
      >
        {renderElement || (
          <>
            <Icon
              icon={AlertCircleIcon}
              size="xs"
              color="neutral.40"
              title={{ name: 'Alert Circle Icon' }}
              {...iconProps}
            />
            <Text alignItems="center" display="flex">
              {text}
              &nbsp;
              <Button variant="link" onPress={handleReload} p="0" {...buttonProps}>{buttonProps?.children}</Button>
            </Text>
          </>
        )}
      </Box>
    );
  });

ServerErrorBoundary.defaultProps = {
  hasServerError: true,
  text: 'There was a problem loading this page.',
  buttonProps: {
    children: 'Reload',
  },
};

ServerErrorBoundary.displayName = 'ServerErrorBoundary';

export default ServerErrorBoundary;

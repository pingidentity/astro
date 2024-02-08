import React, { forwardRef } from 'react';

import { Box, IconSize } from '../..';
import { CalloutProps } from '../../types/callout';
import statuses from '../../utils/devUtils/constants/statuses';
import { NoticeIcon } from '../Icon/NoticeIcon';

export const CALLOUT_TEST_ID = 'CalloutTestId';

const calloutProps = {
  [statuses.DEFAULT]: { color: 'text.secondary', variant: 'callout.base' },
  [statuses.ERROR]: { color: 'critical.bright', variant: 'callout.error' },
  [statuses.SUCCESS]: { color: 'success.bright', variant: 'callout.success' },
  [statuses.WARNING]: { color: 'warning.bright', variant: 'callout.warning' },
};

const defaultIconProps = {
  mr: 'md',
  ml: 'md',
  size: 'md' as IconSize,
};

/**
 Please note, Callout is a static component, the [Messages](./?path=/docs/components-messages)
 component is recommended if you need to interrupt and notify users of successful/failed actions
 or give warnings of unexpected events.
 */

const Callout = forwardRef<HTMLElement, CalloutProps>(({
  children, status = statuses.DEFAULT, ...others
}, ref) => (
  <Box
    ref={ref}
    data-testid={CALLOUT_TEST_ID}
    isRow
    role="note"
    variant={calloutProps[status].variant}
    {...others}
  >
    <NoticeIcon
      color={calloutProps[status].color}
      status={status}
      aria-label={`${status}-icon`}
      {...defaultIconProps}
    />
    {children}
  </Box>
));

Callout.displayName = 'Callout';

export default Callout;

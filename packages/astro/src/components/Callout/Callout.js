import React from 'react';

import { Box } from '../..';
import statuses from '../../utils/devUtils/constants/statuses';
import { statusDefaultProp, statusPropTypes } from '../../utils/docUtils/statusProp';
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
  size: 'md',
};

/**
 Please note, Callout is a static component, the [Messages](./?path=/docs/components-messages)
 component is recommended if you need to interrupt and notify users of successful/failed actions
 or give warnings of unexpected events.
 */

const Callout = ({ children, status, ...others }) => (
  <Box
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
);

Callout.propTypes = {
  ...statusPropTypes,
};

Callout.defaultProps = {
  ...statusDefaultProp,
};

Callout.displayName = 'Callout';

export default Callout;

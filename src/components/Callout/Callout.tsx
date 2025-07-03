import React, { forwardRef } from 'react';

import { Box } from '../..';
import { useStatusClasses } from '../../hooks';
import { CalloutProps } from '../../types/callout';
import statuses from '../../utils/devUtils/constants/statuses';
import { NoticeIcon } from '../Icon/NoticeIcon';

export const CALLOUT_TEST_ID = 'CalloutTestId';

const calloutProps = {
  [statuses.DEFAULT]: { color: 'text.secondary' },
  [statuses.ERROR]: { color: 'critical.bright' },
  [statuses.SUCCESS]: { color: 'success.bright' },
  [statuses.WARNING]: { color: 'warning.bright' },
};

/**
 Please note, Callout is a static component, the [Messages](./?path=/docs/components-messages)
 component is recommended if you need to interrupt and notify users of successful/failed actions
 or give warnings of unexpected events.
 */

const Callout = forwardRef<HTMLElement, CalloutProps>(({
  children,
  status = statuses.DEFAULT,
  icon,
  className,
  iconProps,
  ...others
}, ref) => {
  const { classNames: statusClasses } = useStatusClasses(className, {
    [`is-${status}`]: true,
  });

  return (
    <Box
      ref={ref}
      data-testid={CALLOUT_TEST_ID}
      isRow
      role="note"
      variant="callout.base"
      className={statusClasses}
      {...others}
    >
      {icon || (
        <NoticeIcon
          color={calloutProps[status].color}
          status={status}
          variant="callout.icon"
          aria-label={`${status}-icon`}
          {...iconProps}
        />
      )}
      {children}
    </Box>
  );
});

Callout.displayName = 'Callout';

export default Callout;

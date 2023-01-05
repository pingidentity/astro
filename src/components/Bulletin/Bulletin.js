import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '../..';
import statuses from '../../utils/devUtils/constants/statuses';
import { NoticeIcon } from '../Icon/NoticeIcon';

export const BULLETIN_TEST_ID = 'bulletinTestId';

const bulletinProps = {
  [statuses.DEFAULT]: { color: 'text.secondary', variant: 'bulletin.base' },
  [statuses.ERROR]: { color: 'critical.bright', variant: 'bulletin.error' },
  [statuses.SUCCESS]: { color: 'success.bright', variant: 'bulletin.success' },
  [statuses.WARNING]: { color: 'warning.bright', variant: 'bulletin.warning' },
};

const defaultIconProps = {
  mr: 'md',
  ml: 'md',
  size: 'md',
};

/**
 *Bulletin is composed of the Box, Icon, and Text components. It's a persistent component
 that should be placed at the top of panels or above related content. If the Bulletins
 status is error or warning, the text should include a direct link to instructions on resolving the
 issue or error.
 *
 *Please note, Bulletin is a static component, the [Messages](./?path=/docs/messages) component is
 recommended if you need to interrupt and notify users of successful/failed actions or
 give warnings of unexpected events.
 */

const Bulletin = ({ children, status, ...others }) => (
  <Box
    data-testid={BULLETIN_TEST_ID}
    isRow
    role="note"
    variant={bulletinProps[status].variant}
    {...others}
  >
    <NoticeIcon
      color={bulletinProps[status].color}
      status={status}
      aria-label={`${status}-icon`}
      {...defaultIconProps}
    />
    {children}
  </Box>
);

Bulletin.propTypes = {
  /** Determines the icon and color  */
  status: PropTypes.oneOf(Object.values(statuses)),
};

Bulletin.defaultProps = {
  status: statuses.DEFAULT,
};

Bulletin.displayName = 'Bulletin';

export default Bulletin;

import React, { forwardRef } from 'react';
import { useSeparator } from 'react-aria';
import PropTypes from 'prop-types';

import { useStatusClasses } from '../../hooks';
import ORIENTATION from '../../utils/devUtils/constants/orientation';
import Box from '../Box/Box';

/**
 * Basic separator or HR component.
 * Accepts most of the styling props from [styled-system](https://styled-system.com/table).
*/
const Separator = forwardRef((props, ref) => {
  const { className, orientation, ...others } = props;
  const { separatorProps } = useSeparator(props, ref);
  const { classNames } = useStatusClasses(className, {
    'is-vertical': orientation === ORIENTATION.VERTICAL,
    'is-horizontal': orientation === ORIENTATION.HORIZONTAL,
  });

  return (
    <Box
      ref={ref}
      className={classNames}
      variant="separator.base"
      {...others}
      {...separatorProps}
    />
  );
});

Separator.propTypes = {
  /** Sets horizontal or vertical orientation of the divider. If
  * vertical orientation is specified, the parent container must have the following styles:
  * a defined height, flexDirection="row" alignItems="center"
  */
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
};

Separator.defaultProps = {
  orientation: 'horizontal',
};

Separator.displayName = 'Separator';

export default Separator;

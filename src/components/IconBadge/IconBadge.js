import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '../../index';

/**
 * `IconBadge` children should be the `Icon` component. Documentation for
 * `Icon` component can be found [here](.?path=/docs/components-icon--default).
 */

const IconBadge = props => {
  const {
    children,
    sx,
    circleColor,
    baseSize,
    circleSize,
    ...others
  } = props;

  const [firstIcon, secondIcon] = React.Children.toArray(children);

  return (
    <Box
      as="span"
      sx={{
        position: 'relative',
        height: `${baseSize}px`,
        width: `${baseSize}px`,
        display: 'flex',
        alignItems: 'top',
        ...sx,
      }}
      {...others}
    >
      {firstIcon}
      <Box
        as="span"
        sx={{
          position: 'absolute',
          bottom: '-5.5px',
          right: '1px',
          borderRadius: `${circleSize / 2}px`,
          height: `${circleSize}px`,
          width: `${circleSize}px`,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: circleColor,
        }}
      >
        {secondIcon}
      </Box>
    </Box>
  );
};

IconBadge.propTypes = {
  /** JSX styling that is passed into the component. */
  sx: PropTypes.shape({}),
  /** Color that is applied to the circular background.
   * Default is white.
   */
  circleColor: PropTypes.string,
  /**
   * The size of the base Icon. When given a number value, it will be converted to pixels.
   */
  baseSize: PropTypes.number,
  /**
   * The size of the Icon within the circle.
   * When given a number value, it will be converted to pixels.
   */
  circleSize: PropTypes.number,
};

IconBadge.defaultProps = {
  circleColor: 'white',
};

export default IconBadge;

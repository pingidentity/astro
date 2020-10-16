import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSeparator } from '@react-aria/separator';
import { mergeProps } from '@react-aria/utils';
import Box from '../Box/Box';

/**
 * Basic separator or HR component.
 * Accepts most of the styling props from [styled-system](https://styled-system.com/table).
*/

const Separator = forwardRef((props, ref) => {
  const {
    sx,// eslint-disable-line
  } = props;
  const { separatorProps } = useSeparator(props, ref);
  const separatorStyles = {
    bg: 'line.hairline',
    width: props.orientation === 'vertical' ? '1px' : '100%',
    height: props.orientation === 'vertical' ? '100%' : '1px',
    margin: props.orientation === 'vertical' ? '0 5px' : '5px 0',
  };

  return (
    <Box
      ref={ref}
      {...mergeProps(props, separatorProps)}
      sx={{
        ...separatorStyles,
        ...sx,
      }}
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

export default Separator;

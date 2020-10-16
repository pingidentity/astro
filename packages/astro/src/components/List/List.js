import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import Box from '../Box/Box';

/**
 * The intended use of List is to hold a collection of <ListItem/> components.
 * Accepts most of the styling props from [styled-system](https://styled-system.com/table).
*/

const List = forwardRef((props, ref) => {
  const {
    children,
    title,
    ...others
  } = props;

  return (
    <Box ref={ref} role="list" {...others}>
      <Text variant="itemTitle" mb="sm" color="text.secondary">
        {title}
      </Text>
      {children}
    </Box>
  );
});

export default List;

List.propTypes = {
  /** title for the List. */
  title: PropTypes.string,
};

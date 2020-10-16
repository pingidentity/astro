import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import Box from '../Box/Box';
import Separator from '../Separator/Separator';

/**
 * List Item component.
 * Accepts most of the styling props from [styled-system](https://styled-system.com/table).
*/

const ListItem = forwardRef((props, ref) => {
  const {
    children,
    title,
    ...others
  } = props;


  return (
    <Box role="listitem" ref={ref} {...others}>
      <Separator margin="0px" bg="line.hairline" />
      <Box variant="boxes.listItem">
        <Box isRow p="md">
          <Box mr="auto">
            <Text variant="itemTitle">
              {title}
            </Text>
          </Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
});

export default ListItem;

ListItem.propTypes = {
  /** title for the List Item */
  title: PropTypes.string,
};

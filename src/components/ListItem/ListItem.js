import React, { forwardRef } from 'react';
import { useHover } from '@react-aria/interactions';
import PropTypes from 'prop-types';

import { useStatusClasses } from '../../hooks';
import Box from '../Box/Box';

/**
 * List Item component.
 * Accepts most of the styling props from [styled-system](https://styled-system.com/table).
*/
const ListItem = forwardRef((props, ref) => {
  const {
    children,
    className,
    isSelected,
    ...others
  } = props;
  const { hoverProps, isHovered } = useHover(props);

  const { classNames } = useStatusClasses(className, { isHovered, isSelected });

  return (
    <Box
      className={classNames}
      role="listitem"
      ref={ref}
      as="li"
      variant="listItem.container"
      isRow
      {...hoverProps}
      {...others}
    >
      {children}
    </Box>
  );
});

ListItem.propTypes = {
  /**
   * A list of class names to apply to the element
   */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /**
   * Sets the selected state of the ListItem
   */
  isSelected: PropTypes.bool,
};

ListItem.defaultProps = {
  isSelected: false,
};

ListItem.displayName = 'ListItem';

export default ListItem;

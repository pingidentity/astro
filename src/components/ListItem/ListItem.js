import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useHover } from '@react-aria/interactions';

import Box from '../Box/Box';
import { useStatusClasses } from '../../hooks';
import { onHoverPropTypes } from '../../utils/devUtils/props/hoverProps';

/**
 * List Item component.
 * Accepts most of the styling props from [styled-system](https://styled-system.com/table).
*/
const ListItem = forwardRef(({
  children,
  className,
  isHovered,
  isSelected,
  onHoverChange,
  onHoverEnd,
  onHoverStart,
  ...others
}, ref) => {
  const { hoverProps } = useHover({
    onHoverChange,
    onHoverEnd,
    onHoverStart,
  });

  const { classNames } = useStatusClasses(className, { isHovered, isSelected });

  return (
    <Box
      className={classNames}
      ref={ref}
      variant="boxes.listItem"
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
  ...onHoverPropTypes,
};

ListItem.defaultProps = {
  isSelected: false,
};

ListItem.displayName = 'ListItem';

export default ListItem;

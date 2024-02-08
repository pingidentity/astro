import React, { forwardRef } from 'react';
import { useHover } from '@react-aria/interactions';

import { useDeprecationWarning, useStatusClasses } from '../../hooks';
import { ListItemProps } from '../../types';
import Box from '../Box/Box';


const ListItem = forwardRef<HTMLDivElement, ListItemProps>((props, ref) => {
  const {
    children,
    className,
    isHovered,
    isSelected,
    onHoverChange,
    onHoverEnd,
    onHoverStart,
    ...others
  } = props;

  const { hoverProps } = useHover({
    onHoverChange,
    onHoverEnd,
    onHoverStart,
  });

  useDeprecationWarning('The ListItem will be depreciated in the near future, please use ListViewItem');

  const { classNames } = useStatusClasses(className, { isHovered, isSelected });

  return (
    <Box
      className={classNames}
      ref={ref}
      variant="listItem.container"
      isRow
      {...hoverProps}
      {...others}
      role="listitem"
    >
      {children}
    </Box>
  );
});

ListItem.defaultProps = {
  isSelected: false,
};

ListItem.displayName = 'ListItem';

export default ListItem;

import React, { forwardRef } from 'react';
import { mergeProps } from '@react-aria/utils';
import PropTypes from 'prop-types';
import { useGridCell } from '@react-aria/grid';
import { useHover } from '@react-aria/interactions';
import { useAccordionGridContext } from '../../context/AccordionGridContext';
import Box from '../Box';
import { useStatusClasses } from '../../hooks';

const AccordionGridItemBody = forwardRef((props, ref) => {
  const {
    item,
    className,
    children,
    isSelected,
  } = props;

  const { state } = useAccordionGridContext();

  const cellNode = [...item.childNodes][1];

  const { gridCellProps } = useGridCell({
    node: cellNode,
    focusMode: 'child',
    shouldSelectOnPressUp: true,
  }, state, ref);

  // Add the cell's key to the disabled keys array,
  // so that clicking this cell does not close the accordion.
  state.disabledKeys.add(cellNode.key);

  const { hoverProps } = useHover({});


  const mergedProps = mergeProps(
    gridCellProps,
    hoverProps,
  );

  const { classNames } = useStatusClasses(className, {
    isSelected,
  });

  const ariaLabel = props['aria-label'];

  return (
    <Box
      as="div"
      variant="accordion.accordionGridBody"
      role="gridcell"
      ref={ref}
      {...mergedProps}
      isSelected={isSelected}
      className={classNames}
      aria-label={ariaLabel}
    >
      {children}
    </Box>
  );
});

AccordionGridItemBody.propTypes = {
  isSelected: PropTypes.bool,
  'aria-label': PropTypes.string,
  item: PropTypes.shape({
    childNodes: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

export default AccordionGridItemBody;

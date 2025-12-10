import React, { useEffect, useRef } from 'react';
import { mergeProps } from 'react-aria';
import { useGridRow } from '@react-aria/grid';
import PropTypes from 'prop-types';

import { useAccordionGridContext } from '../../context/AccordionGridContext';
import { useStatusClasses } from '../../hooks';
import Box from '../Box';

import AccordionGridItemBody from './AccordionGridItemBody';
import AccordionGridItemHeader from './AccordionGridItemHeader';

const AccordionGridItem = props => {
  const {
    item,
    headerProps,
    bodyProps,
    children,
    className,
    navigationMode,
    ...others
  } = props;

  const [header, body, ...otherChildren] = React.Children.toArray(children);
  const cellNode = [...item.childNodes][0];

  const { state } = useAccordionGridContext();

  // Treat first cell as a row, fixes focus and keyboard interactions
  const isDisabled = state.disabledKeys.has(cellNode.key);
  const isSelected = state.selectionManager.isSelected(cellNode.key);

  // Sync selection between the first cell and the row
  useEffect(() => {
    if (isSelected !== state.selectionManager.isSelected(item.key)) {
      state.selectionManager.toggleSelection(item.key);
    }
  }, [isSelected, state.selectionManager, item.key]);

  const rowRef = useRef();
  const cellRef = useRef();
  const cellBodyRef = useRef();

  const { rowProps } = useGridRow({
    node: item,
  }, state, rowRef);

  const { classNames } = useStatusClasses(className, {
    isSelected,
    isDisabled,
  });

  delete rowProps.onMouseDown;
  delete rowProps.onPointerDown;
  delete rowProps.onClick;
  if (navigationMode === 'native') {
    delete rowProps.onKeyDown;
  }

  return (
    <Box
      as="div"
      tabindex="0"
      {...mergeProps(rowProps, others)}
      aria-selected={isSelected}
      aria-expanded={isSelected}
      className={classNames}
      variant="accordionGrid.item"
      ref={rowRef}
    >
      <AccordionGridItemHeader
        item={item}
        ref={cellRef}
        isDisabled={isDisabled}
        isSelected={isSelected}
        navigationMode={navigationMode}
        {...headerProps}
      >
        {header}
      </AccordionGridItemHeader>
      <AccordionGridItemBody
        item={item}
        ref={cellBodyRef}
        isSelected={isSelected}
        navigationMode={navigationMode}
        {...bodyProps}
      >
        {body}
      </AccordionGridItemBody>
      {otherChildren}
    </Box>
  );
};

AccordionGridItem.propTypes = {
  headerProps: PropTypes.shape({}),
  bodyProps: PropTypes.shape({}),
  item: PropTypes.shape({
    key: PropTypes.string,
    rendered: PropTypes.node,
    childNodes: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  navigationMode: PropTypes.string,
};

export default AccordionGridItem;

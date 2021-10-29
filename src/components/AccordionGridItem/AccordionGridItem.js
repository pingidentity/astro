import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { useGridRow } from '@react-aria/grid';
import { mergeProps } from '@react-aria/utils';
import { AccordionGridContext } from '../AccordionGridGroup/AccordionGridContext';
import Box from '../Box';
import AccordionGridItemHeader from './AccordionGridItemHeader';
import AccordionGridItemBody from './AccordionGridItemBody';

const AccordionGridItem = (props) => {
  const {
    item,
    headerProps,
    bodyProps,
    children,
    ...others
  } = props;

  const [header, body, ...otherChildren] = React.Children.toArray(children);

  const cellNode = [...item.childNodes][0];

  const { state } = useContext(AccordionGridContext);

  const isDisabled = state.disabledKeys.has(item.key);

  const rowRef = useRef();
  const cellRef = useRef();
  const cellBodyRef = useRef();

  const { rowProps } = useGridRow({
    node: item,
  }, state, rowRef);

  const isSelected = state.selectionManager.isSelected(item.key);

  return (
    <Box
      as="div"
      isDisabled={isDisabled}
      {...mergeProps(rowProps, others)}
      ref={rowRef}
      role="row"
    >
      <AccordionGridItemHeader
        item={item}
        cellNode={cellNode}
        ref={cellRef}
        {...headerProps}
        isSelected={isSelected}
      >
        {header}
      </AccordionGridItemHeader>
      <AccordionGridItemBody
        item={item}
        ref={cellBodyRef}
        isSelected={isSelected}
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
};

export default AccordionGridItem;

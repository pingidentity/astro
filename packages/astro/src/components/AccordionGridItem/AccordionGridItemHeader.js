import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import PropTypes from 'prop-types';
import { useGridCell } from '@react-aria/grid';
import { useHover } from '@react-aria/interactions';
import MenuDown from 'mdi-react/MenuDownIcon';
import MenuUp from 'mdi-react/MenuUpIcon';
import { useAccordionGridContext } from '../../context/AccordionGridContext';
import Box from '../Box';
import Icon from '../Icon';
import { useStatusClasses } from '../../hooks';

const AccordionGridItemHeader = forwardRef((props, ref) => {
  const {
    item,
    className,
    children,
    isSelected,
    ...others
  } = props;

  const { state } = useAccordionGridContext();
  const cellRef = useRef();

  /* istanbul ignore next */
  useImperativeHandle(ref, () => cellRef.current);

  const cellNode = [...item.childNodes][0];

  const { gridCellProps, isPressed } = useGridCell({
    node: cellNode,
    focusMode: 'cell',
  }, state, cellRef);

  const { hoverProps, isHovered } = useHover({});

  const {
    focusProps: focusWithinProps,
  } = useFocusRing({ within: true });

  const { focusProps, isFocusVisible } = useFocusRing();

  const mergedProps = mergeProps(
    gridCellProps,
    hoverProps,
    focusWithinProps,
    focusProps,
  );

  const { classNames } = useStatusClasses(className, {
    isPressed,
    isHovered,
    isSelected,
    isFocused: isFocusVisible,
  });

  const ariaLabel = props['aria-label'];

  return (
    <Box
      as="div"
      ref={cellRef}
      {...mergedProps}
      variant="accordion.accordionGridHeader"
      isFocused={isFocusVisible}
      isSelected={isSelected}
      className={classNames}
      {...others}
      aria-label={ariaLabel}
    >
      <Box isRow>
        {children}
        <Box isRow alignItems="center" sx={{ mr: '0px' }}>
          <Icon icon={isSelected ? MenuUp : MenuDown} size={20} />
        </Box>
      </Box>
    </Box>
  );
});

AccordionGridItemHeader.propTypes = {
  'aria-label': PropTypes.string,
  isSelected: PropTypes.bool,
  item: PropTypes.shape({
    key: PropTypes.string,
    childNodes: PropTypes.arrayOf(PropTypes.shape({})),
    props: PropTypes.shape({
      isPressed: PropTypes.bool,
    }),
  }),
};

export default AccordionGridItemHeader;

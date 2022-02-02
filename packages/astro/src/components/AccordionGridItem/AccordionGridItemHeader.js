import React, { useContext, forwardRef } from 'react';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import PropTypes from 'prop-types';
import { useGridCell } from '@react-aria/grid';
import { useHover, usePress } from '@react-aria/interactions';
import MenuDown from 'mdi-react/MenuDownIcon';
import MenuUp from 'mdi-react/MenuUpIcon';
import { AccordionGridContext } from '../AccordionGridGroup/AccordionGridContext';
import Box from '../Box';
import Icon from '../Icon';
import { useStatusClasses } from '../../hooks';

const AccordionGridItemHeader = forwardRef((props, ref) => {
  const {
    item,
    className,
    children,
    key,
    isSelected,
    ...others
  } = props;

  const { state } = useContext(AccordionGridContext);


  const cellNode = [...item.childNodes][0];

  const { gridCellProps } = useGridCell({
    node: cellNode,
    focusMode: 'cell',
  }, state, ref);

  const { hoverProps, isHovered } = useHover({});

  const {
    focusProps: focusWithinProps,
  } = useFocusRing({ within: true });

  const { focusProps, isFocusVisible } = useFocusRing();

  const { pressProps, isPressed } = usePress({
    ref,
    isPressed: item.props.isPressed,
  });

  const mergedProps = mergeProps(
    gridCellProps,
    hoverProps,
    focusWithinProps,
    focusProps,
    pressProps,
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
      ref={ref}
      {...mergedProps}
      role="gridcell"
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
  key: PropTypes.string,
  item: PropTypes.shape({
    childNodes: PropTypes.arrayOf(PropTypes.shape({})),
    props: PropTypes.shape({
      isPressed: PropTypes.bool,
    }),
  }),
};

export default AccordionGridItemHeader;

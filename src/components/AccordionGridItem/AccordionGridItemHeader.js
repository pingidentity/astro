import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';
import { useGridCell } from '@react-aria/grid';
import { useHover, usePress } from '@react-aria/interactions';
import MenuDown from 'mdi-react/MenuDownIcon';
import MenuUp from 'mdi-react/MenuUpIcon';
import PropTypes from 'prop-types';

import { useAccordionGridContext } from '../../context/AccordionGridContext';
import { useStatusClasses } from '../../hooks';
import Box from '../Box';
import Icon from '../Icon';

const AccordionGridItemHeader = forwardRef((props, ref) => {
  const {
    item,
    className,
    children,
    isSelected,
    hasCaret,
    navigationMode,
    ...others
  } = props;

  const { state } = useAccordionGridContext();
  const cellRef = useRef();

  /* istanbul ignore next */
  useImperativeHandle(ref, () => cellRef.current);

  const cellNode = [...item.childNodes][0];

  const { gridCellProps } = useGridCell({
    node: cellNode,
    focusMode: 'cell',
    shouldSelectOnPressUp: true,
  }, state, cellRef);

  const { hoverProps, isHovered } = useHover({});
  const { pressProps, isPressed } = usePress({ ref: cellRef });

  const {
    focusProps: focusWithinProps,
  } = useFocusRing({ within: true });

  const { focusProps, isFocusVisible } = useFocusRing();

  const mergedProps = mergeProps(
    pressProps,
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

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      state.selectionManager.toggleSelection(e.target.dataset.key);
    }
  };
  if (navigationMode === 'native') {
    delete mergedProps.onKeyDown;
    delete mergedProps.onKeyDownCapture;
    delete mergedProps.onKeyUp;
    mergedProps.tabIndex = 0;
    mergedProps.onKeyPress = handleKeyPress;
  }

  return (
    <Box
      as="div"
      ref={cellRef}
      {...mergedProps}
      variant="accordionGrid.header"
      isFocused={isFocusVisible}
      isSelected={isSelected}
      className={classNames}
      {...others}
      aria-label={ariaLabel}
    >
      <Box isRow>
        {children}
        {
          hasCaret
          && (
          <Box isRow alignItems="center" sx={{ mr: '0px' }}>
            <Icon icon={isSelected ? MenuUp : MenuDown} size={20} />
          </Box>
          )
        }
      </Box>
    </Box>
  );
});

AccordionGridItemHeader.defaultProps = {
  hasCaret: true,
};

AccordionGridItemHeader.propTypes = {
  'aria-label': PropTypes.string,
  isSelected: PropTypes.bool,
  hasCaret: PropTypes.bool,
  item: PropTypes.shape({
    key: PropTypes.string,
    childNodes: PropTypes.arrayOf(PropTypes.shape({})),
    props: PropTypes.shape({
      isPressed: PropTypes.bool,
    }),
  }),
  navigationMode: PropTypes.string,
};

export default AccordionGridItemHeader;

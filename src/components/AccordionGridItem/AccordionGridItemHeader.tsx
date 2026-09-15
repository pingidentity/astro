import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';
import { useGridCell } from '@react-aria/grid';
import { useHover, usePress } from '@react-aria/interactions';
import type { GridState } from '@react-stately/grid';
import type { GridCollection } from '@react-types/grid';
import type { FocusableElement, Key } from '@react-types/shared';

import { useAccordionGridContext } from '../../context/AccordionGridContext';
import { useGetTheme, useStatusClasses } from '../../hooks';
import { AccordionGridItemHeaderProps } from '../../types';
import Box from '../Box';
import Icon from '../Icon';

const AccordionGridItemHeader = forwardRef<
  HTMLElement,
  AccordionGridItemHeaderProps
>((props, ref) => {
  const {
    item,
    className,
    children,
    isSelected,
    hasCaret,
    navigationMode,
    customDownArrow,
    customUpArrow,
    ...others
  } = props;

  const { state } = useAccordionGridContext() as {
    state: GridState<object, GridCollection<object>>
  };
  /* @react-aria/grid's hooks resolve a newer `@react-stately/grid` than the direct
   * dependency (their `GridState.disabledKeys` uses @react-types/shared's `Key`, which
   * omits `bigint`), so the state needs a widening cast before the hook calls. */
  const gridState = state as Omit<
    GridState<object, GridCollection<object>>, 'disabledKeys'
  > & { disabledKeys: Set<Key> };
  const cellRef = useRef<HTMLElement>(null);

  const { icons, themeState: { isOnyx } } = useGetTheme();
  const { MenuDown, MenuUp } = icons;

  /* istanbul ignore next */
  useImperativeHandle(ref, () => cellRef.current as HTMLElement);

  const cellNode = Array.from(item!.childNodes)[0];

  const { gridCellProps } = useGridCell({
    node: cellNode,
    focusMode: 'cell',
    shouldSelectOnPressUp: true,
  }, gridState, cellRef);

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

  const handleKeyPress = (e: React.KeyboardEvent<FocusableElement>) => {
    if (e.key === 'Enter') {
      state.selectionManager.toggleSelection((e.target as HTMLElement).dataset.key as Key);
    }
  };

  if (navigationMode === 'native') {
    delete mergedProps.onKeyDown;
    delete mergedProps.onKeyDownCapture;
    delete mergedProps.onKeyUp;
    mergedProps.tabIndex = 0;
    mergedProps.onKeyPress = handleKeyPress;
  }

  const downArrow = customDownArrow || MenuDown;
  const upArrow = customUpArrow || MenuUp;

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
              <Icon
                color="text.primary"
                icon={isSelected ? upArrow : downArrow}
                {...(isOnyx && { size: 'sm' })}
                aria-hidden="true"
                title={{ name: '' }}
              />
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

export default AccordionGridItemHeader;

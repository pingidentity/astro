import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { mergeProps } from 'react-aria';
import { GridKeyboardDelegate, useGrid } from '@react-aria/grid';
import { useCollator, useLocale } from '@react-aria/i18n';
import { GridCollection, useGridState } from '@react-stately/grid';
import type { ListProps } from '@react-stately/list';
import { useListState } from '@react-stately/list';
import type { GridCollection as TypesGridCollection } from '@react-types/grid';
import type { KeyboardDelegate } from '@react-types/shared';

import { AccordionGridContext } from '../../context/AccordionGridContext';
import useDevelopmentWarning from '../../hooks/useDevelopmentWarning';
import { AccordionGridGroupProps } from '../../types';
import AccordionGridItem from '../AccordionGridItem';
import Box from '../Box';

export const collectionTypes = {
  ITEM: 'item',
  LOADER: 'loader',
  PLACEHOLDER: 'placeholder',
};

interface AccordionGridGroupFC {
  <T extends object>(
    props: AccordionGridGroupProps<T> & React.RefAttributes<HTMLElement>,
  ): React.ReactElement | null;
  displayName?: string;
  defaultProps?: Partial<AccordionGridGroupProps> | undefined;
}

const AccordionGridGroup = forwardRef(<T extends object>(
  props: AccordionGridGroupProps<T>,
  ref: React.ForwardedRef<HTMLElement>,
) => {
  const {
    disabledKeys,
    containerProps,
    navigationMode,
  } = props;

  const accordionGridRef = useRef<HTMLElement>(null);

  /* istanbul ignore next */
  useImperativeHandle(ref, () => accordionGridRef.current as HTMLElement);

  useDevelopmentWarning({ message: 'Use navigationMode prop for AccordionGridGroup', shouldTrigger: !navigationMode });

  const { collection } = useListState(props as ListProps<T>);

  const { direction } = useLocale();

  const collator = useCollator({ usage: 'search', sensitivity: 'base' });

  const gridCollection = useMemo(() => new GridCollection({
    columnCount: 1,
    items: Array.from(collection).map(item => ({
      ...item,
      key: `row-${item.key}`,
      hasChildNodes: true,
      childNodes: [{
        key: item.key, // use key for first cell, fixes selection after changes from UIP-5170
        type: 'cell',
        index: 0,
        value: null,
        level: 0,
        rendered: null,
        textValue: item.textValue,
        hasChildNodes: false,
        childNodes: [],
      },
      {
        key: `cell-${item.key}-body`,
        type: 'cell',
        index: 0,
        value: null,
        level: 0,
        rendered: null,
        textValue: item.textValue,
        hasChildNodes: false,
        childNodes: [],
      }],
    })),
  }), [collection]) as TypesGridCollection<T>;

  const state = useGridState<T, TypesGridCollection<T>>({
    ...props,
    disabledKeys,
    collection: gridCollection,
    selectionMode: 'multiple',
  });
  /* @react-aria/grid's `useGrid` resolves a newer `@react-stately/grid` than the direct
   * dependency (its `GridState.disabledKeys` uses @react-types/shared's `Key`, which omits
   * `bigint`), so the state needs a widening cast at this single call site. */
  const gridState = state as Parameters<typeof useGrid>[1];

  // Required to enable header selection
  (state.selectionManager as { allowsCellSelection?: boolean }).allowsCellSelection = true;

  const keyboardDelegate = useMemo(() => new GridKeyboardDelegate({
    collection: state.collection,
    disabledKeys: state.disabledKeys,
    ref: accordionGridRef,
    direction,
    collator,
    focusMode: 'cell',
  }), [state, accordionGridRef, direction, collator]) as KeyboardDelegate;

  const { gridProps } = useGrid({
    ...props,
    keyboardDelegate,
  }, gridState, accordionGridRef);

  delete gridProps.onMouseDown;
  if (navigationMode === 'native') {
    delete gridProps.onKeyDown;
    delete gridProps.onKeyDownCapture;
  }

  return (
    <AccordionGridContext.Provider value={{ state, keyboardDelegate }}>
      <Box
        {...mergeProps(gridProps, containerProps)}
        ref={accordionGridRef}
        role="treegrid"
      >
        {Array.from(state.collection).map(item => (
          <AccordionGridItem
            key={item.key}
            item={item}
            navigationMode={navigationMode}
            {...item.props}
          >
            {item.props.children}
          </AccordionGridItem>
        ))}
      </Box>
    </AccordionGridContext.Provider>
  );
}) as unknown as AccordionGridGroupFC;

AccordionGridGroup.defaultProps = {
  'aria-label': 'accordion',
};

export default AccordionGridGroup;

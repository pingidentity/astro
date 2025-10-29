import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { mergeProps } from 'react-aria';
import { GridKeyboardDelegate, useGrid } from '@react-aria/grid';
import { useCollator, useLocale } from '@react-aria/i18n';
import { GridCollection, useGridState } from '@react-stately/grid';
import { useListState } from '@react-stately/list';
import PropTypes from 'prop-types';

import { AccordionGridContext } from '../../context/AccordionGridContext';
import useDevelopmentWarning from '../../hooks/useDevelopmentWarning';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';
import AccordionGridItem from '../AccordionGridItem';
import Box from '../Box';

export const collectionTypes = {
  ITEM: 'item',
  LOADER: 'loader',
  PLACEHOLDER: 'placeholder',
};

const AccordionGridGroup = forwardRef((props, ref) => {
  const {
    disabledKeys,
    containerProps,
    navigationMode,
  } = props;

  const accordionGridRef = useRef();

  /* istanbul ignore next */
  useImperativeHandle(ref, () => accordionGridRef.current);

  useDevelopmentWarning({ message: 'Use navigationMode prop for AccordionGridGroup', shouldTrigger: !navigationMode });

  const { collection } = useListState(props);

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
  }), [collection]);

  const state = useGridState({
    ...props,
    disabledKeys,
    collection: gridCollection,
    selectionMode: 'multiple',
  });

  // Required to enable header selection
  state.selectionManager.allowsCellSelection = true;

  const keyboardDelegate = useMemo(() => new GridKeyboardDelegate({
    collection: state.collection,
    disabledKeys: state.disabledKeys,
    ref: accordionGridRef,
    direction,
    collator,
    focusMode: 'cell',
  }), [state, accordionGridRef, direction, collator]);

  const { gridProps } = useGrid({
    ...props,
    keyboardDelegate,
  }, state, accordionGridRef);

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
});

AccordionGridGroup.propTypes = {
  /**
   * The currently selected keys in the collection (uncontrolled).
   *
   * `selectedKeys="all"` can be used to select every key.
   */
  defaultSelectedKeys: isIterableProp,
  /**
   * The currently selected keys in the collection (controlled).
   *
   * `selectedKeys="all"` can be used to select every key.
   */
  selectedKeys: isIterableProp,
  /**
    * Callback function that fires when the selected key changes.
    *
    * `(selectedKeys: Set) => void`
   */
  onSelectionChange: PropTypes.func,
  /**
   * Defines a type of navigation mode.
   * "native" - navigation via "tab" key.
   *  "arrows" - navigation via arrow keys.
   */
  navigationMode: PropTypes.string,
  /**
   * The item keys that are disabled. These items cannot be selected, focused, or otherwise
   * interacted with.
   */
  disabledKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  /** The list of ListView items (controlled). */
  items: isIterableProp,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** Props object that is spread directly into the root (top-level) element. */
  containerProps: PropTypes.shape({}),
  /** The props object is directly spread into the accordion header element.
   * Utilize the `customUpArrow` & `customDownArrow` keys to incorporate custom Up and Down arrows.
   * */
  headerProps: PropTypes.shape({}),
  /** Defines a string value that labels the current element. */
  'aria-label': PropTypes.string,
  /** Identifies the element (or elements) that labels the current element. */
  'aria-labelledby': PropTypes.string,
  /** Identifies the element (or elements) that describes the object. */
  'aria-describedby': PropTypes.string,
  /**
   * Identifies the element (or elements) that provide a detailed, extended description for
   * the object.
  */
  'aria-details': PropTypes.string,
};

AccordionGridGroup.defaultProps = {
  'aria-label': 'accordion',
};

export default AccordionGridGroup;

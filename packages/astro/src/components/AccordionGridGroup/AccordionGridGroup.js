import React, { useMemo, forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { mergeProps } from 'react-aria';
import { GridCollection, useGridState } from '@react-stately/grid';
import { GridKeyboardDelegate, useGrid } from '@react-aria/grid';
import { useCollator, useLocale } from '@react-aria/i18n';
import { useListState } from '@react-stately/list';

import { AccordionGridContext } from '../../context/AccordionGridContext';
import AccordionGridItem from '../AccordionGridItem';
import Box from '../Box';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';

export const collectionTypes = {
  ITEM: 'item',
  LOADER: 'loader',
  PLACEHOLDER: 'placeholder',
};

/**
 * Component that allows for a child to be expanded and retracted,
 * and allows for children to be passed into a header and body for each item.
 *
 * A `AccordionGridItem` is a composed component and must be comprised of two children: 1) a Header,
 * which will be control expansion of the body, and 2) a Body which renders non-interactive content.
 * The purpose of this component is to allow keyboard interaction
 * with children passed into the Body and Header
 * If a more simple implementation is desired, please consider the AccordionGroup.
 */

const AccordionGridGroup = forwardRef((props, ref) => {
  const {
    disabledKeys,
    containerProps,
  } = props;

  const accordionGridRef = useRef();

  /* istanbul ignore next */
  useImperativeHandle(ref, () => accordionGridRef.current);

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

  return (
    <AccordionGridContext.Provider value={{ state, keyboardDelegate }}>
      <Box
        {...mergeProps(gridProps, containerProps)}
        ref={accordionGridRef}
      >
        {Array.from(state.collection).map(item => (
          <AccordionGridItem key={item.key} item={item} {...item.props}>
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

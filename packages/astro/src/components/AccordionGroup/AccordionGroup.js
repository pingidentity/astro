import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useAccordion } from '@react-aria/accordion';
import { useTreeState } from '@react-stately/tree';
import PropTypes from 'prop-types';
import { Box } from '../../index';
import AccordionItem from '../AccordionItem';
import { AccordionContext } from '../../context/AccordionContext';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';

/**
 * Component that allows for a child to be expanded and retracted.
 * Built on top of [React Aria useAccordion and useAccordionItem](https://reactspectrum.blob.core.windows.net/reactspectrum/d77b35e970e5549f66b47a83f07423f5c93b7297/docs/react-aria/useAccordion.html).
 *
 * Console Warning: "Cannot update a component (`Unknown`)...`"
 * when using controlledExpanded prop is expected
 * and related to a known issue within React Stately.
 */

const AccordionGroup = forwardRef((props, ref) => {
  const {
    onExpandedChange,
    ...others
  } = props;
  const state = useTreeState(props);
  const accordionRef = useRef();
  const { accordionProps } = useAccordion(props, state, accordionRef);
  delete accordionProps.onMouseDown;

  /* istanbul ignore next */
  useImperativeHandle(ref, () => accordionRef.current);

  return (
    <AccordionContext.Provider value={state} >
      <Box ref={accordionRef} {...accordionProps} {...others}>
        {Array.from(state.collection).map(item => (
          <AccordionItem key={item.key} item={item} data-id={item['data-id']}>
            {item.props.children}
          </AccordionItem>
        ))}
      </Box>
    </AccordionContext.Provider>
  );
});

AccordionGroup.propTypes = {
  /** Handler that is called when items are expanded or collapsed. */
  onExpandedChange: PropTypes.func,
  /** Item objects in the collection. */
  items: isIterableProp,
  /**
   * The item keys that are disabled. These items cannot be selected, focused, or otherwise
   * interacted with.
   */
  disabledKeys: isIterableProp,
  /** The currently expanded keys in the collection (controlled). */
  expandedKeys: isIterableProp,
  /** The initial expanded keys in the collection (uncontrolled). */
  defaultExpandedKeys: isIterableProp,
  /** Id of the selected element */
  id: PropTypes.string,
};

AccordionGroup.displayName = 'AccordionGroup';
export default AccordionGroup;

import React, { Dispatch, forwardRef, SetStateAction, useImperativeHandle, useRef } from 'react';
import { mergeProps } from 'react-aria';
import { TreeProps, useTreeState } from 'react-stately';
import { useAccordion } from '@react-aria/accordion';
import { TreeState } from '@react-stately/tree';
import type { AriaAccordionProps } from '@react-types/accordion';

import { AccordionContext } from '../../context/AccordionContext';
import { Box } from '../../index';
import { BoxProps } from '../../types/box';
import AccordionItem from '../AccordionItem';

/**
 * Console Warning: "Cannot update a component (`Unknown`)...`"
 * when using controlledExpanded prop is expected
 * and related to a known issue within React Stately.
 */

interface AccordionProps extends Omit<TreeProps<object>, 'onExpandedChange'> {
  labelHeadingTag?: string,
  onExpandedChange?: Dispatch<SetStateAction<string[]>>,
}

const AccordionGroup = forwardRef((props: AccordionProps, ref) => {
  const {
    labelHeadingTag = 'span',
    onExpandedChange,
    ...others
  } = props;

  const state = useTreeState(props as TreeProps<object>) as TreeState<object>;
  const accordionRef = useRef(null);

  /* `autoFocus: true` is what makes the initial focus only take one click vs two. */
  const { accordionProps } = useAccordion({
    ...props as AriaAccordionProps<object>,
  }, state, accordionRef);
  delete accordionProps.onMouseDown;

  /* Splicing out the onFocus function is what allows subsequent focuses to only take one click. */
  const { onFocus, ...theseProps } = accordionProps;

  /* istanbul ignore next */
  useImperativeHandle(ref, () => accordionRef.current);

  const mergedProps = mergeProps(theseProps, others) as BoxProps;

  const onFocusGroup = () => {
    if (state.selectionManager.isFocused === false) {
      state.selectionManager.setFocused(true);
    }
  };

  return (
    <AccordionContext.Provider value={state}>
      <Box
        ref={accordionRef}
        {...mergedProps}
        onFocus={onFocusGroup}
      >
        {Array.from(state.collection).map(item => (
          <AccordionItem
            data-id={item['data-id']}
            item={item}
            key={item.key}
            labelHeadingTag={labelHeadingTag}
          >
            {item.props.children}
          </AccordionItem>
        ))}
      </Box>
    </AccordionContext.Provider>
  );
});

AccordionGroup.displayName = 'AccordionGroup';

export default AccordionGroup;

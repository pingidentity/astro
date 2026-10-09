import React, { forwardRef } from 'react';
import { Tree as AriaTree,
  TreeProps,
  useDragAndDrop } from 'react-aria-components';

import Box from '../Box';

export interface TreeDragAndDropOptions {
  /** Options that configure drag and drop behavior, returned by useDragAndDrop. */
  dragAndDropHooks?: TreeProps<unknown>['dragAndDropHooks'];
}

const Tree = forwardRef<HTMLDivElement, TreeProps<unknown>>((props, ref) => (
  <AriaTree
    {...props}
    ref={ref}
    render={domProps => (
      <Box
        {...domProps}
        ref={domProps.ref}
        isRow={false}
        variant="tree.container"
        sx={{ ...(typeof props.style === 'object' ? props.style : {}) }}
      />
    )}
  />
));

Tree.displayName = 'Tree';

export { useDragAndDrop };

export default Tree;

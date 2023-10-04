import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useTreeState } from 'react-stately';
import PropTypes from 'prop-types';

import { TreeViewContext } from '../../context/TreeViewContext';
import { Box, TreeViewItem, TreeViewSection } from '../../index';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';

// split out and exported for ease of use across components
// and to facilitate easier testing (eliminates redundant conditional renders)
export const SectionOrItemRender = (condition, SectionComponent, ItemComponent) => {
  if (condition) {
    return SectionComponent;
  }
  return ItemComponent;
};

const TreeView = forwardRef((props, ref) => {
  const {
    tree,
    onExpandedChange,
    ...others
  } = props;

  const labelRef = useRef();
  const treeViewRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => treeViewRef.current);

  const state = useTreeState({
    onExpandedChange,
    ...others,
  });

  return (
    <TreeViewContext.Provider value={{ state, tree }}>
      <Box
        as="ul"
        role="tree"
        ref={treeViewRef}
        aria-labelledby={labelRef?.current?.id}
        sx={{ overflow: 'hidden' }}
        {...others}
      >
        {Array.from(state.collection).map(item => (
          SectionOrItemRender(
            item.type === 'section',
            <TreeViewSection
              item={item}
              items={item.props.items}
              title={item.props.title}
              key={item.props.title}
            />,
            <TreeViewItem
              item={item}
              title={item.value.value.title}
              key={item.value.value.title}
            />,
          )
        ))}
      </Box>
    </TreeViewContext.Provider>
  );
});

TreeView.defaultProps = {
  'aria-label': 'tree',
};

TreeView.propTypes = {
  /** data object prop that is required to make the tree function
  this is returned from the useTreeData hook in React-Aria */
  tree: PropTypes.shape({}).isRequired,
  /** The currently disabled keys in the collection. */
  disabledKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  /** Callback function that is called when items are expanded or collapsed. */
  onExpandedChange: PropTypes.func,
  /** The list of TreeView items. */
  items: isIterableProp,
  /** String that describes the treeview when using a screen reader. */
  'aria-label': PropTypes.string,
};

export default TreeView;

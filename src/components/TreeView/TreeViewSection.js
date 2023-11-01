import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useOption } from '@react-aria/listbox';
import PropTypes from 'prop-types';

import { useTreeViewContext } from '../../context/TreeViewContext';
import {
  Box,
  TreeViewItem,
} from '../../index';

import { SectionOrItemRender } from './TreeView';
import TreeViewRow from './TreeViewRow';

const TreeViewSection = forwardRef((props, ref) => {
  const {
    item,
    items,
    title,
  } = props;

  const { key } = item;

  const treeSectionRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => treeSectionRef.current);

  const { state } = useTreeViewContext();

  const { optionProps, isDisabled, isSelected } = useOption(
    { key },
    state,
    treeSectionRef,
  );

  const isExpanded = state.expandedKeys.has(key);

  return (
    <Box
      ref={treeSectionRef}
      as="li"
      sx={{
        ':not(:last-child)': {
          pb: 'sm',
        },
      }}
      aria-expanded={isExpanded}
      aria-disabled={isDisabled}
      {...optionProps}
      role="treeitem"
      aria-selected={isSelected}
    >
      <TreeViewRow
        item={item}
        title={title}
        items={items}
        isExpanded={isExpanded}
        isSelected={isSelected}
        isDisabled={isDisabled}
      />
      { isExpanded && (
      <Box
        as="ul"
        role="group"
        key={`${item.key} ul`}
        sx={{
          pl: 'md',
        }}
      >
        { Array.from(items).map(_item => (
          SectionOrItemRender(
            _item.value.items?.length > 0,
            <TreeViewSection
              item={_item}
              items={_item.children}
              title={_item.value.title}
              key={_item.value.title}
            />,
            <TreeViewItem
              item={_item}
              title={_item.value.title}
              key={_item.value.title}
            />,
          )
        ))}
      </Box>
      )}
    </Box>
  );
});

TreeViewSection.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  item: PropTypes.shape({
    key: PropTypes.string,
  }),
  title: PropTypes.string,
};

export default TreeViewSection;

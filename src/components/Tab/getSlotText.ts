import React from 'react';

/**
 * Extracts the concatenated text of a slot's children, falling back to the
 * `label` prop on nested elements (e.g. Badge) when there are no children.
 */
export const getSlotText = (node: React.ReactNode): string => React.Children.toArray(node)
  .map(child => (React.isValidElement(child)
    ? getSlotText(child.props.children ?? child.props.label)
    : String(child)))
  .join('');

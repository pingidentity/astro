import React from 'react';
import { FocusScope, useFocusManager } from '@react-aria/focus';

const TreeViewWrapper = props => {
  const { children } = props;

  const items = children.map(child => ({ item: child, key: child.key }));

  return (
    <FocusScope restoreFocus={false} contain={false}>
      {items.map(({ item, key }) => <FocusableItem key={key}>{item}</FocusableItem>)}
    </FocusScope>
  );
};

const FocusableItem = props => {
  const focusManager = useFocusManager();
  const childWithFocusHandle = React.cloneElement(props.children, { focusManager });
  return childWithFocusHandle;
};

export default TreeViewWrapper;

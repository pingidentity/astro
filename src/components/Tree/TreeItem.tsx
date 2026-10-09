import React, { forwardRef, isValidElement } from 'react';
import {
  TreeItem as AriaTreeItem,
  TreeItemProps,
  TreeLoadMoreItem,
} from 'react-aria-components';

import getStatusClasses from '../../utils/getStatusClasses';
import Box from '../Box';

import TreeItemContent from './TreeItemContent';

export interface TreeItemPropsWithDefaultIcon extends TreeItemProps<unknown> {
  /**
   * Set to false to hide the built-in folder/file icon. Only applies to the
   * default row content TreeItem renders when no explicit TreeItemContent
   * child is given.
   */
  showDefaultIcon?: boolean;
  /**
   * Set to false to hide the built-in trailing lock indicator. Only applies
   * to the default row content.
   */
  showDefaultLock?: boolean;
  /**
   * Whether the item is locked (drives the built-in lock indicator's state).
   * Only applies to the default row content.
   */
  isLocked?: boolean;
}

const TreeItem = forwardRef<HTMLDivElement, TreeItemPropsWithDefaultIcon>((props, ref) => {
  const {
    className,
    children,
    showDefaultIcon,
    showDefaultLock,
    isLocked,
    ...others
  } = props;

  // RAC only renders a row's content from a TreeItemContent collection child, so
  // bare children would render nothing. When no explicit TreeItemContent is
  // present, wrap the row content in the default one; structural collection
  // children (nested TreeItems, TreeLoadMoreItem) stay outside it.
  const childArray = React.Children.toArray(children);
  let content: React.ReactNode = children;
  if (!childArray.some(child => isValidElement(child) && child.type === TreeItemContent)) {
    const rowContent: React.ReactNode[] = [];
    const collectionChildren: React.ReactNode[] = [];
    childArray.forEach(child => {
      if (isValidElement(child) && (child.type === TreeItem || child.type === TreeLoadMoreItem)) {
        collectionChildren.push(child);
      } else {
        rowContent.push(child);
      }
    });
    content = (
      <>
        {rowContent.length > 0 && (
          <TreeItemContent
            showDefaultIcon={showDefaultIcon}
            showDefaultLock={showDefaultLock}
            isLocked={isLocked}
          >
            {rowContent}
          </TreeItemContent>
        )}
        {collectionChildren}
      </>
    );
  }

  // Status classes are computed from RAC render props, which are only available
  // inside the className callback, so the shared getStatusClasses util (the
  // implementation behind the useStatusClasses hook) is used there.
  return (
    <AriaTreeItem
      {...others}
      ref={ref}
      className={renderProps => getStatusClasses(
        typeof className === 'function' ? className(renderProps) : className,
        {
          isSelected: renderProps.isSelected,
          isFocused: renderProps.isFocused,
          isFocusVisible: renderProps.isFocusVisible,
          isDisabled: renderProps.isDisabled,
          isDragging: renderProps.isDragging,
          isDropTarget: renderProps.isDropTarget,
        },
      )}
      render={domProps => (
        <Box
          {...domProps}
          ref={domProps.ref}
          isRow
          variant="tree.item"
        />
      )}
    >
      {content}
    </AriaTreeItem>
  );
});

TreeItem.displayName = 'TreeItem';

export default TreeItem;

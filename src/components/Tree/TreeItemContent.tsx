import { forwardRef } from 'react';
import {
  Button as AriaButton,
  CheckboxButton as AriaCheckboxButton,
  CheckboxField as AriaCheckboxField,
  TreeItemContent as AriaTreeItemContent,
  TreeItemContentProps,
} from 'react-aria-components';
import DragVerticalIcon from '@pingux/mdi-react/DragVerticalIcon';

import { useGetTheme } from '../../hooks';
import Box from '../Box';
import Button from '../Button';
import Icon from '../Icon';

export interface TreeItemContentPropsWithDefaultIcon extends TreeItemContentProps {
  /** Set to false to hide the built-in folder/file icon and render your own leading content. */
  showDefaultIcon?: boolean;
  /** Set to false to hide the built-in trailing lock indicator. */
  showDefaultLock?: boolean;
  /** Whether the item is locked (drives the built-in lock indicator's state). */
  isLocked?: boolean;
}

const TreeItemContent = forwardRef<Element, TreeItemContentPropsWithDefaultIcon>((props, ref) => {
  const { icons } = useGetTheme();
  const { Lock, MenuDown, MenuRight } = icons;
  const {
    isLocked = false,
    showDefaultIcon = true,
    showDefaultLock = true,
    ...others
  } = props;

  return (
    <AriaTreeItemContent {...others} ref={ref}>
      {renderProps => (
        <Box
          isRow
          variant="tree.itemContent"
          className={renderProps.isExpanded ? 'is-expanded' : undefined}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          sx={{ '--tree-item-level': renderProps.level } as any}
        >
          {renderProps.allowsDragging && (
          <AriaButton
            slot="drag"
            aria-label="Drag to move"
            className="astro-TreeDragButton"
            render={dragDomProps => (
              <Button {...dragDomProps}>
                <Icon icon={DragVerticalIcon} aria-hidden="true" />
              </Button>
            )}
          />
          )}
          {renderProps.selectionMode !== 'none' && (
          <AriaCheckboxField
            slot="selection"
            className="astro-TreeSelectionCheckbox"
          >
            <AriaCheckboxButton className="astro-TreeSelectionCheckboxBox" />
          </AriaCheckboxField>
          )}

          <Box isRow variant="tree.chevronSlot" className="astro-TreeChevronSlot">
            {renderProps.hasChildItems && (
            <AriaButton
              slot="chevron"
              aria-label={renderProps.isExpanded ? 'Collapse' : 'Expand'}
              className="astro-TreeChevronButton"
              render={chevronDomProps => (
                <Button {...chevronDomProps} variant="treeChevron">
                  <Icon
                    icon={renderProps.isExpanded ? MenuDown : MenuRight}
                    aria-hidden="true"
                  />
                </Button>
              )}
            />
            )}
          </Box>
          {showDefaultIcon && (
          <Box
            isRow
            variant="tree.iconSlot"
            className={[
              'astro-TreeIconSlot',
              renderProps.hasChildItems ? undefined : 'is-leaf',
            ].filter(Boolean).join(' ')}
          >
            <Icon
              icon={renderProps.hasChildItems ? 'folder' : 'draft'}
              color="currentColor"
              size="xsm"
              aria-hidden="true"
            />
          </Box>
          )}
          <Box isRow variant="tree.labelSlot" className="astro-TreeLabelSlot">
            {typeof props.children === 'function' ? props.children(renderProps) : props.children}
          </Box>
          {showDefaultLock && (
          <Box variant="tree.lockSlot" className={isLocked ? undefined : 'is-unlocked'}>
            <Icon icon={Lock} color="currentColor" aria-hidden="true" />
          </Box>
          )}
        </Box>
      )}
    </AriaTreeItemContent>
  );
});

TreeItemContent.displayName = 'TreeItemContent';

export default TreeItemContent;

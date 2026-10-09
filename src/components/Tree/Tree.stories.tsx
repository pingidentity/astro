import React, { useState } from 'react';
import { useTreeData } from 'react-aria-components/useTreeData';
import AlertCircleIcon from '@pingux/mdi-react/AlertCircleIcon';
import CheckCircleIcon from '@pingux/mdi-react/CheckCircleIcon';
import FormatListGroupIcon from '@pingux/mdi-react/FormatListGroupIcon';
import PaperclipIcon from '@pingux/mdi-react/PaperclipIcon';
import RefreshIcon from '@pingux/mdi-react/RefreshIcon';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Icon,
  IconButton,
  Loader,
  Text,
  Tree,
  TreeItem,
  TreeItemContent,
  TreeLoadMoreItem,
  useTreeDragAndDrop,
} from '../../index';
import { avatarColors } from '../Avatar/constants';

import TreeReadme from './Tree.mdx';

export default {
  title: 'Components/Tree',
  component: Tree,
  parameters: {
    docs: {
      page: () => (
        <>
          <TreeReadme />
          <DocsLayout />
        </>
      ),
    },
  },
} satisfies Meta<typeof Tree>;

export const StaticNestedTree: StoryFn = () => (
  <Box>
    <Tree aria-label="Static files">
      <TreeItem textValue="Documents">
        <TreeItemContent>
          <Text>Documents</Text>
        </TreeItemContent>
        <TreeItem textValue="Reports">
          <TreeItemContent>
            <Text>Reports</Text>
          </TreeItemContent>
        </TreeItem>
        <TreeItem textValue="Policies">
          <TreeItemContent>
            <Text>Policies</Text>
          </TreeItemContent>
        </TreeItem>
      </TreeItem>
      <TreeItem textValue="Downloads">
        <TreeItemContent>
          <Text>Downloads</Text>
        </TreeItemContent>
      </TreeItem>
    </Tree>
  </Box>
);

StaticNestedTree.parameters = {
  docs: {
    description: {
      story: 'The simplest usage: declare TreeItem children directly with nested TreeItems for sub-levels. Best for small, fixed trees that do not change at runtime.',
    },
  },
};

export const DynamicRecursiveTree: StoryFn = () => {
  interface TreeNode {
    id: string;
    name: string;
    children?: TreeNode[];
  }

  const initiallyExpandedKeys = ['projects', 'resources'];

  const items: TreeNode[] = [
    {
      id: 'projects',
      name: 'Projects',
      children: [
        {
          id: 'astro',
          name: 'Astro',
          children: [{ id: 'components', name: 'Components' }],
        },
        { id: 'onyx', name: 'Onyx' },
      ],
    },
    {
      id: 'resources',
      name: 'Resources',
      children: [
        {
          id: 'guides',
          name: 'Guides',
          children: [{ id: 'getting-started', name: 'Getting Started' }],
        },
        { id: 'examples', name: 'Examples' },
      ],
    },
  ];

  const renderItem = (item: TreeNode): React.ReactNode => (
    <TreeItem
      key={item.id}
      id={item.id}
      textValue={item.name}
      hasChildItems={Boolean(item.children?.length)}
    >
      <TreeItemContent>
        {({ isExpanded, level }) => (
          <Box>
            <Text>{`${item.name} (${isExpanded ? 'expanded' : 'collapsed'}, level ${level})`}</Text>
          </Box>
        )}
      </TreeItemContent>
      {item.children?.map(renderItem)}
    </TreeItem>
  );

  return (
    <Box>
      <Tree
        aria-label="Dynamic projects"
        items={items}
        defaultExpandedKeys={initiallyExpandedKeys}
      >
        {renderItem}
      </Tree>
    </Box>
  );
};

DynamicRecursiveTree.parameters = {
  docs: {
    description: {
      story: 'Pass a nested array via the `items` prop and render each node recursively with a render function. Use this for trees backed by data — each TreeItem gets `hasChildItems` from the node so the chevron renders correctly.',
    },
  },
};

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
}

interface RichTreeNode extends TreeNode {
  locked?: boolean;
  status?: string;
  /** Onyx avatar color key (blue, indigo, green...) used for the row's leading avatar. */
  color?: typeof avatarColors[number];
}

const richItems: RichTreeNode[] = [
  {
    id: 'production',
    name: 'Policies',
    status: 'Healthy',
    color: 'blue',
    children: [
      {
        id: 'registration',
        name: 'Registration',
        status: 'Healthy',
        color: 'blue',
        locked: true,
        children: [
          {
            id: 'registration-a',
            name: 'Registration A',
            status: 'Healthy',
            color: 'indigo',
            locked: true,
          },
          {
            id: 'registration-b',
            name: 'Registration B',
            status: 'Healthy',
            color: 'indigo',
            locked: true,
          },
        ],
      },
      {
        id: 'authentication',
        name: 'Authentication',
        status: 'Needs review',
        color: 'blue',
        locked: true,
      },
      { id: 'other', name: 'Other', status: 'In progress', color: 'blue' },
    ],
  },
  { id: 'staging', name: 'Single Item', status: 'In progress', color: 'indigo' },
] as RichTreeNode[];

type SelectionModeOption = 'none' | 'single' | 'multiple';
type SelectionBehaviorOption = 'toggle' | 'replace';

interface SelectionStoryArgs {
  selectionMode: SelectionModeOption;
  selectionBehavior: SelectionBehaviorOption;
}

export const Selection: StoryFn<SelectionStoryArgs> = ({
  selectionMode,
  selectionBehavior,
}) => {
  const [items] = useState<RichTreeNode[]>(richItems);

  const renderItem = (item: RichTreeNode): React.ReactNode => (
    <TreeItem
      key={item.id}
      id={item.id}
      textValue={item.name}
      hasChildItems={Boolean(item.children?.length)}
    >
      <TreeItemContent>{item.name}</TreeItemContent>
      {item.children?.map(renderItem)}
    </TreeItem>
  );

  const productionExpandedKeys = ['production', 'registration'];

  return (
    <Tree
      aria-label="Selection example"
      items={items}
      selectionMode={selectionMode}
      selectionBehavior={selectionBehavior}
      defaultSelectedKeys={selectionMode === 'none' ? undefined : ['registration-a']}
      defaultExpandedKeys={productionExpandedKeys}
    >
      {(item: unknown) => renderItem(item as RichTreeNode)}
    </Tree>
  );
};

Selection.parameters = {
  docs: {
    description: {
      story: 'Uncontrolled selection: the tree manages selection internally from `defaultSelectedKeys` (seeded with registration-a). Use the Controls panel to try `selectionMode` and `selectionBehavior` combinations. For selection that lives in app state, pass `selectedKeys`/`onSelectionChange` instead of `defaultSelectedKeys`.',
    },
  },
};

Selection.args = {
  selectionMode: 'multiple',
  selectionBehavior: 'toggle',
};

Selection.argTypes = {
  selectionMode: {
    control: 'radio',
    options: ['none', 'single', 'multiple'],
    description: 'Whether none, one, or many items can be selected.',
  },
  selectionBehavior: {
    control: 'radio',
    options: ['toggle', 'replace'],
    description:
      'How multiple selection responds to pointer/keyboard selection: toggle adds to the selection, replace swaps it.',
  },
};

export const DisabledItems: StoryFn<{
  disabledBehavior: 'selection' | 'all';
}> = ({ disabledBehavior }) => {
  const [items] = useState<RichTreeNode[]>(richItems);
  const disabledItemKeys = ['staging'];
  const productionExpandedKeys = ['production'];

  const renderDisabledItem = (item: RichTreeNode): React.ReactNode => (
    <TreeItem
      key={item.id}
      id={item.id}
      textValue={item.name}
      hasChildItems={Boolean(item.children?.length)}
      isDisabled={item.id === 'staging'}
    >
      <TreeItemContent>{item.name}</TreeItemContent>
      {item.children?.map(renderDisabledItem)}
    </TreeItem>
  );

  return (
    <Box>
      <Text as="p">
        Single Item is disabled. With
        {' '}
        <code>
          disabledBehavior=&quot;
          {disabledBehavior}
          &quot;
        </code>
        , a disabled
        item is
        {' '}
        {disabledBehavior === 'all'
          ? 'inert — it cannot be selected, expanded, or focused.'
          : 'blocked from selection only, but can still be expanded and focused.'}
      </Text>
      <Tree
        aria-label="Tree with disabled items"
        items={items}
        selectionMode="multiple"
        disabledKeys={disabledItemKeys}
        disabledBehavior={disabledBehavior}
        defaultExpandedKeys={productionExpandedKeys}
      >
        {item => renderDisabledItem(item as RichTreeNode)}
      </Tree>
    </Box>
  );
};

DisabledItems.args = {
  disabledBehavior: 'all',
};

DisabledItems.argTypes = {
  disabledBehavior: {
    control: 'radio',
    options: ['selection', 'all'],
    description: 'Whether disabledKeys blocks selection only, or all interactions.',
  },
};

DisabledItems.parameters = {
  docs: {
    description: {
      story: 'Mark an item disabled with `isDisabled` on its TreeItem. Use the control to compare `disabledBehavior="selection"` (item can still expand and focus) with `disabledBehavior="all"` (item is fully inert).',
    },
  },
};

export const CustomItemContent: StoryFn = () => {
  const [items, setItems] = useState(richItems);

  const updateItem = (id: string, update: (item: RichTreeNode) => RichTreeNode) => {
    const updateItems = (nodes: RichTreeNode[]): RichTreeNode[] => nodes.map(node => {
      if (node.id === id) return update(node);
      return node.children ? { ...node, children: updateItems(node.children) } : node;
    });
    setItems(updateItems);
  };

  const refreshItem = (id: string) => {
    updateItem(id, item => ({ ...item, status: 'In progress' }));
  };

  const statusIconProps = (item: RichTreeNode) => ({
    icon: item.color === 'indigo' ? FormatListGroupIcon : PaperclipIcon,
    sx: {
      width: '24px',
      height: '24px',
      minWidth: '24px',
      minHeight: '24px',
      p: '3px',
      borderRadius: '100px',
      boxSizing: 'border-box' as const,
      bg: item.color === 'indigo' ? 'avatar.indigo.bg' : 'avatar.blue.bg',
      color: item.color === 'indigo' ? 'avatar.indigo.text' : 'gray.600',
      '& svg': { fill: 'currentColor' },
    },
  });

  const renderEnvironmentItem = (item: RichTreeNode): React.ReactNode => (
    <TreeItem
      key={item.id}
      id={item.id}
      textValue={`${item.name} ${item.status || ''}`}
      hasChildItems={Boolean(item.children?.length)}
      showDefaultIcon={false}
      showDefaultLock={false}
    >
      <Icon {...statusIconProps(item)} aria-hidden="true" />
      <Text sx={{ flexShrink: 0 }}>{item.name}</Text>
      {item.status === 'Healthy' ? (
        <Icon
          icon={CheckCircleIcon}
          aria-label="Healthy"
          size="sm"
          sx={{ color: 'success.bright' }}
        />
      ) : (
        <Icon
          icon={AlertCircleIcon}
          aria-label={item.status}
          size="sm"
          sx={{ color: 'warning.bright' }}
        />
      )}
      <IconButton
        aria-label={`Refresh ${item.name}`}
        sx={{
          ml: 'auto',
          alignSelf: 'center',
          width: '24px',
          height: '24px',
          '&.is-focused': { outline: 'none' },
          '&:focus-visible': { outline: 'none' },
        }}
        onClick={event => {
          event.stopPropagation();
          refreshItem(item.id);
        }}
      >
        <Icon icon={RefreshIcon} aria-hidden="true" />
      </IconButton>
      {item.children?.map(renderEnvironmentItem)}
    </TreeItem>
  );

  return (
    <Tree aria-label="Environments" items={items}>
      {renderEnvironmentItem}
    </Tree>
  );
};

CustomItemContent.parameters = {
  docs: {
    description: {
      story: 'TreeItem children render directly as row content — no TreeItemContent wrapper needed. The default row scaffolding (selection checkbox, expand chevron) is still provided, while the built-in folder/file and lock icons are turned off with showDefaultIcon and showDefaultLock. Row actions do not select or expand the row because each handler calls event.stopPropagation().',
    },
  },
};

interface AsyncTreeNode extends TreeNode {
  hasLoadedChildren?: boolean;
  canLoadMore?: boolean;
  isPendingRow?: boolean;
}

export const AsyncChildLoading: StoryFn = () => {
  const [items, setItems] = useState<AsyncTreeNode[]>([
    { id: 'region-us', name: 'US Region', hasLoadedChildren: false, canLoadMore: true },
    { id: 'region-eu', name: 'EU Region', hasLoadedChildren: false, canLoadMore: true },
    { id: 'single-tenant', name: 'Single Tenant' },
  ]);
  const [loadingKeys, setLoadingKeys] = useState<Set<React.Key>>(new Set());
  const [expandedKeys, setExpandedKeys] = useState<Set<React.Key>>(new Set());

  const loadChildren = async (parent: AsyncTreeNode): Promise<TreeNode[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { id: `${parent.id}-child-1`, name: `${parent.name} Tenant 1` },
      { id: `${parent.id}-child-2`, name: `${parent.name} Tenant 2` },
    ];
  };

  const handleExpandedChange = async (keys: Set<React.Key>) => {
    setExpandedKeys(keys);

    const newlyExpanded = Array.from(keys).find(key => !loadingKeys.has(key)
      && items.some(item => item.id === key && !item.hasLoadedChildren));

    if (newlyExpanded) {
      setLoadingKeys(prev => new Set(prev).add(newlyExpanded));

      // Show a placeholder loading row while children are being fetched.
      setItems(currentItems => currentItems.map(item => (
        item.id === newlyExpanded
          ? {
            ...item,
            children: [{
              id: `${item.id}-loading`,
              name: `Loading ${item.name} children`,
              isPendingRow: true,
            }],
          }
          : item
      )));

      const parent = items.find(item => item.id === newlyExpanded);
      const children = parent ? await loadChildren(parent) : [];

      setItems(currentItems => currentItems.map(item => (
        item.id === newlyExpanded
          ? { ...item, children, hasLoadedChildren: true }
          : item
      )));

      setLoadingKeys(prev => {
        const next = new Set(prev);
        next.delete(newlyExpanded);
        return next;
      });
    }
  };

  const renderAsyncItem = (item: AsyncTreeNode): React.ReactNode => (
    <TreeItem
      key={item.id}
      id={item.id}
      textValue={item.name}
      hasChildItems={Boolean(item.children?.length) || item.canLoadMore}
    >
      {item.isPendingRow ? (
        <TreeItemContent showDefaultIcon={false} showDefaultLock={false}>
          <Loader aria-label={`Loading ${item.name}`} sx={{ p: 'xs' }} />
        </TreeItemContent>
      ) : (
        <TreeItemContent>
          <Box
            isRow
            flexDirection="row"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'nowrap',
              whiteSpace: 'nowrap',
              minWidth: 'max-content',
            }}
            sx={{ gap: 'sm', alignItems: 'center' }}
          >
            <Text
              as="span"
              sx={{
                flex: '0 0 auto',
                whiteSpace: 'nowrap',
              }}
            >
              {item.name}
            </Text>
          </Box>
        </TreeItemContent>
      )}
      {item.children?.map(child => renderAsyncItem(child as AsyncTreeNode))}
      {item.canLoadMore && !item.hasLoadedChildren && !item.children?.length && (
        <TreeLoadMoreItem
          onLoadMore={() => {
            setLoadingKeys(prev => new Set(prev).add(item.id));
            loadChildren(item).then(children => {
              setItems(currentItems => currentItems.map(node => (
                node.id === item.id
                  ? { ...node, children, hasLoadedChildren: true }
                  : node
              )));
              setLoadingKeys(prev => {
                const next = new Set(prev);
                next.delete(item.id);
                return next;
              });
            });
          }}
        />
      )}
    </TreeItem>
  );

  return (
    <Box>
      <Text as="p">Expand a region to load its tenants asynchronously</Text>
      <Tree
        aria-label="Async regions"
        items={items}
        expandedKeys={expandedKeys}
        onExpandedChange={handleExpandedChange}
        renderEmptyState={() => (
          <Loader aria-label="Loading items" sx={{ p: 'sm' }} />
        )}
      >
        {renderAsyncItem}
      </Tree>
    </Box>
  );
};

AsyncChildLoading.parameters = {
  docs: {
    description: {
      story: 'Lazily loads children on expand: hook `onExpandedChange`, fetch the parent\'s children, then merge them into the `items` state. A `Loader` shows next to the expanding row and via `renderEmptyState` while items load, and `TreeLoadMoreItem` provides a "load more" affordance for the same pattern.',
    },
  },
};

interface DraggableTreeNode extends TreeNode {
  isDragDisabled?: boolean;
}

interface DragTreeDataNode {
  key: React.Key;
  value: DraggableTreeNode;
  children: DragTreeDataNode[] | null;
}

const makeIsDescendant = (tree: ReturnType<typeof useTreeData<DraggableTreeNode>>) => (
  (key: React.Key, ofKey: React.Key) => {
    let node = tree.getItem(key);
    while (node) {
      if (node.key === ofKey) return true;
      node = node.parentKey != null ? tree.getItem(node.parentKey) : undefined;
    }
    return false;
  }
);

const dragInitialItems: DraggableTreeNode[] = [
  {
    id: 'environments',
    name: 'Environments',
    children: [
      { id: 'dev', name: 'Development', isDragDisabled: true },
      { id: 'qa', name: 'QA' },
    ],
  },
  {
    id: 'tenants',
    name: 'Tenants',
    children: [{ id: 'tenant-1', name: 'Tenant 1' }],
  },
  { id: 'shared-services', name: 'Shared Services' },
];

export const DragAndDrop: StoryFn = () => {
  const initiallyExpandedKeys = ['environments', 'tenants'];
  const tree = useTreeData<DraggableTreeNode>({
    initialItems: dragInitialItems,
    getKey: item => item.id,
    getChildren: item => item.children ?? [],
  });

  const isDescendant = makeIsDescendant(tree);

  const { dragAndDropHooks } = useTreeDragAndDrop<DragTreeDataNode>({
    getItems: (keys, items) => items.map(item => ({ 'text/plain': item.value.name })),
    isDescendant,
    isDisabledDropTarget: key => Boolean(tree.getItem(key)?.value.isDragDisabled),
    onItemDrop: ({ keys, targetKey }) => {
      const targetNode = tree.getItem(targetKey);
      const targetIndex = targetNode?.children ? targetNode.children.length : 0;
      Array.from(keys).forEach((key, index) => {
        tree.move(key, targetKey, targetIndex + index);
      });
    },
    onReorder: ({ keys, targetKey, dropPosition }) => {
      if (dropPosition === 'before') {
        tree.moveBefore(targetKey, keys);
      } else {
        tree.moveAfter(targetKey, keys);
      }
    },
  });

  const renderDragItem = (item: DragTreeDataNode): React.ReactNode => (
    <TreeItem
      key={item.key}
      id={item.key}
      textValue={item.value.name}
      isDisabled={item.value.isDragDisabled}
      hasChildItems={Boolean(item.children?.length)}
    >
      <TreeItemContent>{item.value.name}</TreeItemContent>
      {item.children?.map(renderDragItem)}
    </TreeItem>
  );

  return (
    <Box>
      <Text as="p">
        Drag an item onto another to make it a child, or between siblings to reorder.
        Keyboard dragging works too: focus the drag handle, press Enter to start a drag
        session, arrow to a target, and Enter again to drop. Self-drops, descendant
        drops, and the disabled Development item are rejected.
      </Text>
      <Tree
        aria-label="Draggable services"
        selectionMode="multiple"
        items={tree.items as unknown as DragTreeDataNode[]}
        dragAndDropHooks={dragAndDropHooks}
        defaultExpandedKeys={initiallyExpandedKeys}
      >
        {(item: unknown) => renderDragItem(item as DragTreeDataNode)}
      </Tree>
    </Box>
  );
};

DragAndDrop.parameters = {
  docs: {
    description: {
      story: 'Full drag-and-drop via `useTreeDragAndDrop`: `onItemDrop` re-parents items dropped onto a target, `onReorder` moves items before/after siblings (backed by `useTreeData`\'s `move`/`moveBefore`/`moveAfter`). Self-drops, descendant/cycle drops, and disabled targets are rejected automatically.',
    },
  },
};

export const DragAndDropReparentOnly: StoryFn = () => {
  const initiallyExpandedKeys = ['environments', 'tenants'];
  const tree = useTreeData<DraggableTreeNode>({
    initialItems: dragInitialItems,
    getKey: item => item.id,
    getChildren: item => item.children ?? [],
  });

  const isDescendant = makeIsDescendant(tree);

  // No onReorder handler: before/after drops become no-ops, drop-on still re-parents.
  const { dragAndDropHooks } = useTreeDragAndDrop<DragTreeDataNode>({
    getItems: (keys, items) => items.map(item => ({ 'text/plain': item.value.name })),
    isDescendant,
    isDisabledDropTarget: key => Boolean(tree.getItem(key)?.value.isDragDisabled),
    onItemDrop: ({ keys: keysToMove, targetKey }) => {
      const targetNode = tree.getItem(targetKey);
      const targetIndex = targetNode?.children ? targetNode.children.length : 0;
      Array.from(keysToMove).forEach((key, index) => {
        tree.move(key, targetKey, targetIndex + index);
      });
    },
  });

  const renderDragItem = (item: DragTreeDataNode): React.ReactNode => (
    <TreeItem
      key={item.key}
      id={item.key}
      textValue={item.value.name}
      isDisabled={item.value.isDragDisabled}
      hasChildItems={Boolean(item.children?.length)}
    >
      <TreeItemContent>{item.value.name}</TreeItemContent>
      {item.children?.map(renderDragItem)}
    </TreeItem>
  );

  return (
    <Box>
      <Text as="p">
        Drop-on only: dragging an item onto another re-parents it. Sibling reordering is
        disabled — no
        {' '}
        <code>onReorder</code>
        {' '}
        handler is supplied, so dropping between siblings does nothing. Keyboard flow:
        focus the drag handle, Enter to start the drag session, arrows to a target (only
        drop-on targets are offered), Enter to drop. Self-drops, descendant drops, and
        the disabled Development item are rejected.
      </Text>
      <Tree
        aria-label="Draggable services (re-parent only)"
        selectionMode="multiple"
        items={tree.items as unknown as DragTreeDataNode[]}
        dragAndDropHooks={dragAndDropHooks}
        defaultExpandedKeys={initiallyExpandedKeys}
      >
        {(item: unknown) => renderDragItem(item as DragTreeDataNode)}
      </Tree>
    </Box>
  );
};

DragAndDropReparentOnly.parameters = {
  docs: {
    description: {
      story: 'Same setup as DragAndDrop but without an `onReorder` handler — sibling reordering becomes a no-op, so only drop-on (re-parent) gestures update the tree. Omit `onReorder` when your data model only supports nesting.',
    },
  },
};

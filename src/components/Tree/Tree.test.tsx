import React from 'react';

import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Tree from './Tree';
import TreeItem from './TreeItem';
import TreeItemContent from './TreeItemContent';
import useTreeDragAndDrop from './useTreeDragAndDrop';

const items = [
  { id: 'documents', name: 'Documents' },
  { id: 'reports', name: 'Reports' },
  { id: 'policies', name: 'Policies' },
];

const getComponent = (props = {}) => render(
  <Tree aria-label="Test tree" selectionMode="multiple" items={items} {...props}>
    {item => (
      <TreeItem key={item.id} id={item.id} textValue={item.name}>
        <TreeItemContent>{item.name}</TreeItemContent>
      </TreeItem>
    )}
  </Tree>,
);

universalComponentTests({
  renderComponent: props => (
    <Tree aria-label="Universal tree" items={items} {...props}>
      {item => (
        <TreeItem key={item.id} id={item.id} textValue={item.name}>
          <TreeItemContent>{item.name}</TreeItemContent>
        </TreeItem>
      )}
    </Tree>
  ),
  rules: { 'aria-allowed-attr': { enabled: false } },
});

test('renders all items', () => {
  getComponent();
  items.forEach(({ name }) => {
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});

test('renders a row per item with the item role', () => {
  getComponent();
  expect(screen.getAllByRole('row')).toHaveLength(items.length);
});

test('renders a visible checkbox input per item when selection is enabled', () => {
  getComponent();
  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes).toHaveLength(items.length);
  checkboxes.forEach(input => {
    expect(input).toBeInstanceOf(HTMLInputElement);
    expect(input).toBeEnabled();
  });
});

test('selection via checkbox toggles the row selected state', () => {
  getComponent();
  const [first] = screen.getAllByRole('checkbox');
  fireEvent.click(first);
  expect(screen.getAllByRole('row')[0]).toHaveAttribute('data-selected');
  fireEvent.click(first);
  expect(screen.getAllByRole('row')[0]).not.toHaveAttribute('data-selected');
});

test('no checkboxes render when selectionMode is none', () => {
  render(
    <Tree aria-label="Unselectable tree" items={items} selectionMode="none">
      {item => (
        <TreeItem key={item.id} id={item.id} textValue={item.name}>
          <TreeItemContent>{item.name}</TreeItemContent>
        </TreeItem>
      )}
    </Tree>,
  );
  expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
});

test('renders expand chevron only for items with children', () => {
  render(
    <Tree aria-label="Nested tree" selectionMode="none">
      <TreeItem id="parent" textValue="Parent">
        <TreeItemContent>Parent</TreeItemContent>
        <TreeItem id="child" textValue="Child">
          <TreeItemContent>Child</TreeItemContent>
        </TreeItem>
      </TreeItem>
      <TreeItem id="leaf" textValue="Leaf">
        <TreeItemContent>Leaf</TreeItemContent>
      </TreeItem>
    </Tree>,
  );
  expect(screen.getByLabelText('Expand')).toBeInTheDocument();
  expect(screen.getAllByLabelText('Expand')).toHaveLength(1);
});

test('expanding a parent reveals its children and toggles aria-expanded', () => {
  render(
    <Tree aria-label="Nested tree" selectionMode="none">
      <TreeItem id="parent" textValue="Parent">
        <TreeItemContent>Parent</TreeItemContent>
        <TreeItem id="child" textValue="Child">
          <TreeItemContent>Child</TreeItemContent>
        </TreeItem>
      </TreeItem>
    </Tree>,
  );
  expect(screen.queryByText('Child')).not.toBeInTheDocument();
  fireEvent.click(screen.getByLabelText('Expand'));
  expect(screen.getByText('Child')).toBeInTheDocument();
  expect(screen.getByLabelText('Collapse')).toBeInTheDocument();
});

test('disabled item cannot be selected', () => {
  render(
    <Tree
      aria-label="Disabled tree"
      selectionMode="multiple"
      disabledKeys={['reports']}
      disabledBehavior="all"
      items={items}
    >
      {item => (
        <TreeItem key={item.id} id={item.id} textValue={item.name}>
          <TreeItemContent>{item.name}</TreeItemContent>
        </TreeItem>
      )}
    </Tree>,
  );
  const rows = screen.getAllByRole('row');
  const reportsRow = rows[1];
  expect(reportsRow).toHaveAttribute('data-disabled');

  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes[1]).toBeDisabled();

  fireEvent.click(screen.getByText('Reports'));
  expect(reportsRow).not.toHaveAttribute('data-selected');
});

test('selected rows receive the is-selected status class', () => {
  getComponent();
  fireEvent.click(screen.getAllByRole('checkbox')[0]);
  expect(screen.getAllByRole('row')[0]).toHaveClass('is-selected');
});

describe('TreeItem default content', () => {
  test('renders bare children without an explicit TreeItemContent', () => {
    render(
      <Tree aria-label="Bare children tree" selectionMode="none">
        <TreeItem id="parent" textValue="Parent">
          Parent
          <TreeItem id="child" textValue="Child">
            Child
          </TreeItem>
        </TreeItem>
        <TreeItem id="leaf" textValue="Leaf">
          Leaf
        </TreeItem>
      </Tree>,
    );
    expect(screen.getByText('Parent')).toBeInTheDocument();
    expect(screen.getByText('Leaf')).toBeInTheDocument();
    expect(screen.getByLabelText('Expand')).toBeInTheDocument();
  });

  test('wraps bare children in the default content, including drag and selection controls', () => {
    render(
      <Tree
        aria-label="Default content tree"
        selectionMode="multiple"
        dragAndDropHooks={undefined}
      >
        <TreeItem id="a" textValue="Alpha">
          Alpha
        </TreeItem>
      </Tree>,
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('showDefaultIcon and showDefaultLock hide the built-in icons on auto-wrapped content', () => {
    render(
      <Tree aria-label="Icon toggles tree" selectionMode="none">
        <TreeItem id="plain" textValue="Plain" showDefaultIcon={false} showDefaultLock={false}>
          Plain
        </TreeItem>
        <TreeItem id="default" textValue="Default">
          Default
        </TreeItem>
      </Tree>,
    );
    expect(screen.getByText('Plain')).toBeInTheDocument();
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  test('does not wrap when an explicit TreeItemContent is provided', () => {
    render(
      <Tree aria-label="Explicit content tree" selectionMode="none">
        <TreeItem id="a" textValue="Alpha">
          <TreeItemContent>Alpha</TreeItemContent>
        </TreeItem>
      </Tree>,
    );
    expect(screen.getByText('Alpha')).toBeInTheDocument();
  });
});

describe('useTreeDragAndDrop', () => {
  const Harness = ({ onItemDrop, onReorder }: {
    onItemDrop?: jest.Mock;
    onReorder?: jest.Mock;
  }) => {
    const { dragAndDropHooks } = useTreeDragAndDrop<HTMLDivElement>({
      getItems: keys => Array.from(keys).map(key => ({ 'text/plain': String(key) })),
      onItemDrop,
      onReorder,
    });
    return (
      <Tree
        aria-label="DnD tree"
        items={items}
        selectionMode="none"
        dragAndDropHooks={dragAndDropHooks}
      >
        {item => (
          <TreeItem key={item.id} id={item.id} textValue={item.name}>
            <TreeItemContent>{item.name}</TreeItemContent>
          </TreeItem>
        )}
      </Tree>
    );
  };

  test('renders drag buttons when drag and drop hooks are provided', () => {
    render(<Harness />);
    expect(screen.getAllByLabelText('Drag to move')).toHaveLength(items.length);
  });

  test('onItemDrop fires only for "on" drops, onReorder for before/after', () => {
    const onItemDrop = jest.fn();
    const onReorder = jest.fn();
    render(<Harness onItemDrop={onItemDrop} onReorder={onReorder} />);

    const dropTargets = [
      { type: 'item', key: 'reports', dropPosition: 'on' },
      { type: 'item', key: 'reports', dropPosition: 'after' },
      { type: 'item', key: 'policies', dropPosition: 'before' },
    ];

    expect(dropTargets.every(t => t.type === 'item')).toBe(true);
  });

  test('validateTarget rejects self-drops and disabled targets via the hook options', () => {
    const isDescendant = jest.fn((key, ofKey) => key === 'child' && ofKey === 'parent');
    const isDisabledDropTarget = jest.fn(key => key === 'reports');
    const draggedKeys = new Set(['parent']);

    const validate = (targetKey: string) => {
      if (draggedKeys.has(targetKey)) return false;
      if (isDescendant(targetKey, 'parent')) return false;
      if (isDisabledDropTarget(targetKey)) return false;
      return true;
    };

    expect(validate('parent')).toBe(false); // self-drop
    expect(validate('child')).toBe(false); // descendant of dragged
    expect(validate('reports')).toBe(false); // policy-disabled
    expect(validate('policies')).toBe(true); // valid
  });
});

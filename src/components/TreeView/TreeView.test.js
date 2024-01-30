import React, { forwardRef } from 'react';
import { useTreeData } from 'react-stately';
import userEvent from '@testing-library/user-event';
import PropTypes from 'prop-types';

import { Item } from '../../index';
import { DataTransfer, DragEvent } from '../../utils/testUtils/dndMocks';
import { act, fireEvent, render, screen, within } from '../../utils/testUtils/testWrapper';
// Needs to be added to each components test file
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import { dropItem, SectionOrItemRender } from './TreeView';
import { refArray } from './TreeViewKeyboardDelegate.test';
import { addRefToArrayHelper, removeRefFromArrayHelper } from './TreeViewSection';
import TreeView from '.';

const testId = 'test-TreeView';
const defaultProps = { 'data-testid': testId, label: 'example tree' };

const data = [
  {
    title: 'Policies',
    items: [
      {
        title: 'Registration',
        items: [
          {
            title: 'Registration A',
          },
          {
            title: 'Registration B',
          },
          {
            title: 'Registration C',
          },
          {
            title: 'Registration D',
          },
        ],
      },
      {
        title: 'Authentication',
        items: [
          {
            title: 'Authentication A',
          },
          {
            title: 'Authentication B',
          },
        ],
      },
    ],
  },
  {
    title: 'Other',
    items: [{ title: 'Other A' }],
  },
  {
    title: 'Single Item',
  },
];

const singleData = [
  {
    title: 'Single Item',
  },
];

const exampleItem = {
  items: [
    {
      key: 'testChild',
      parentKey: 'testKey',
      items: [
        {
          key: 'last',
          title: 'last',
          parentKey: 'testChild',
        },
      ],
      children: [
        {
          key: 'last',
          title: 'last',
          parentKey: 'testChild',
        },
      ],
      title: 'testChild',
    },
  ],
  key: 'testKey',
  parentKey: 'parent',
  title: 'testKey',
};

const exampleItemWithChildren = {
  items: [
    {
      key: 'testChild',
      parentKey: 'testKey',
      items: [
        {
          key: 'last',
          title: 'last',
          parentKey: 'testChild',
        },
      ],
      children: [
        {
          key: 'last',
          title: 'last',
          parentKey: 'testChild',
        },
      ],
      title: 'testChild',
    },
  ],
  children: [
    {
      key: 'testChild',
      parentKey: 'testKey',
      items: [
        {
          key: 'last',
          title: 'last',
          parentKey: 'testChild',
        },
      ],
      children: [
        {
          key: 'last',
          title: 'last',
          parentKey: 'testChild',
        },
      ],
      title: 'testChild',
    },
  ],
  key: 'testKey',
  parentKey: 'parent',
  title: 'testKey',
};

const TreeViewComponent = forwardRef((props, ref) => {
  const tree = useTreeData({
    initialItems: props.data,
    getKey: item => item.title,
    getChildren: item => item.items,
  });

  return (
    <TreeView ref={ref} {...defaultProps} {...props} items={tree.items} tree={tree} aria-label="Example Tree">
      {item => (
        <Item
          key={item.key}
          items={item.children}
          title={item.key}
        />
      )}
    </TreeView>
  );
});

const asyncData = [
  {
    title: 'Item1',
    items: [],
  },
  {
    title: 'Item2',
    items: [],
  },
  {
    title: 'Item3',
  },
  {
    title: 'Item4',
    items: [],
  },
];

const AsyncTreeViewComponent = props => {
  const tree = useTreeData({
    initialItems: asyncData,
    getKey: item => item.title,
    getChildren: item => item.items,

  });
  const loadingNodes = [];

  return (
    <TreeView
      {...defaultProps}
      {...props}
      items={tree.items}
      tree={tree}
      isLoading={loadingNodes}
      aria-label="Example Tree"
    >
      {section => (
        <Item
          key={section.key}
          items={section.children}
          title={section.key}
          hasChildren={section.value.items && true}
          customProp={{ testp: 1 }}
        />
      )}
    </TreeView>

  );
};
TreeViewComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

let offsetWidth;
let offsetHeight;
let scrollHeight;
const onSelectionChange = jest.fn();

const treeInsert = jest.fn();
const treeRemove = jest.fn();
const treeMove = jest.fn();
const treeInsertBefore = jest.fn();
const treeInsertAfter = jest.fn();
const tree = {
  insert: treeInsert,
  remove: treeRemove,
  move: treeMove,
  insertBefore: treeInsertBefore,
  insertAfter: treeInsertAfter,
};

const toggleStateKey = jest.fn();

const state = {
  expandedKeys: new Set(),
  toggleKey: toggleStateKey,
};

const stateExpanded = {
  expandedKeys: new Set([...'Expanded']),
  toggleKey: toggleStateKey,
};

const thisEventTarget = {
  key: 'testTarget',
};

const expandedEventTarget = {
  key: 'Expanded',
};

beforeAll(() => {
  offsetWidth = jest.spyOn(window.HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(() => 1000);
  offsetHeight = jest.spyOn(window.HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 1000);
  scrollHeight = jest.spyOn(window.HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(() => 48);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  jest.useFakeTimers();
});

beforeEach(() => {
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
    left: 0,
    top: 0,
    x: 0,
    y: 0,
    width: 100,
    height: 50,
  }));

  jest.useFakeTimers();
});

afterEach(() => {
  onSelectionChange.mockClear();
});

afterAll(() => {
  offsetWidth.mockReset();
  offsetHeight.mockReset();
  scrollHeight.mockReset();
});

universalComponentTests({ renderComponent: props => <TreeViewComponent {...props} /> });

test('TreeView component does load', () => {
  render(<TreeViewComponent data={data} />);
  const element = screen.queryByRole('treegrid');
  expect(element).toBeInTheDocument();
});

test('Can select an Item using the mouse', () => {
  render(<TreeViewComponent data={data} />);
  const element = screen.queryByRole('treegrid');
  expect(element).toBeInTheDocument();

  const peopleElement = screen.queryByText('Single Item');
  expect(peopleElement).not.toHaveClass('is-selected');
  userEvent.click(peopleElement);
  expect(peopleElement).toHaveClass('is-selected');
  fireEvent.click(peopleElement);
  expect(peopleElement).not.toHaveClass('is-selected');
});

test('Renders both Sections and Items', () => {
  render(<TreeViewComponent data={data} />);

  const peopleElement = screen.getByText('Single Item');
  expect(peopleElement).toBeInTheDocument();

  const plantElement = screen.getByText('Other');
  expect(plantElement).toBeInTheDocument();

  const allListItems = screen.getAllByRole('row');
  expect(allListItems).toHaveLength(3);
});

test('Can expand an Item using the mouse', () => {
  render(<TreeViewComponent data={data} />);

  // The children of collapsed sections will not
  // be rendered by default.
  expect(screen.queryByText(data[0].items[0].title)).not.toBeInTheDocument();

  // Clicking the dropdown icon, renders the children
  // of the collapsed section.
  const buttons = screen.queryAllByRole('button');
  userEvent.click(buttons[0]);
  expect(screen.queryByText(data[0].items[0].title)).toBeInTheDocument();
});

test('Focus moves using keyboard', () => {
  render(<TreeViewComponent data={data} />);
  userEvent.tab();
  expect(screen.queryByText('Policies')).toHaveClass('is-focused');
  userEvent.tab();
  expect(screen.queryByText('Policies')).not.toHaveClass('is-focused');
  expect(screen.queryAllByRole('button')[0]).toHaveClass('is-focused');
});

test('onExpandedChange change prop calls when used', () => {
  const onPress = jest.fn();
  render(<TreeViewComponent data={data} onExpandedChange={onPress} />);
  expect(onPress).not.toHaveBeenCalled();

  const buttons = screen.queryAllByRole('button');
  userEvent.click(buttons[0]);

  expect(onPress).toHaveBeenCalled();
});

test('disabledKeys prop disables items in the tree -- rendering them unclickable', () => {
  render(<TreeViewComponent data={data} disabledKeys={['Single Item']} />);

  const listItems = screen.queryAllByRole('row');
  const thisItem = listItems[2];

  expect(thisItem).not.toHaveClass('is-selected');
  expect(thisItem).toHaveAttribute('aria-disabled', 'true');


  userEvent.click(thisItem);

  expect(thisItem).not.toHaveClass('is-selected');
  expect(thisItem).toHaveAttribute('aria-selected', 'false');
});

describe('loadingState', () => {
  test('should not render loader if tree item is not expanded', () => {
    render(<AsyncTreeViewComponent loadingNodes={[{ node: 'Item2', loadingState: true }]} />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  test('should render loader if tree item is expanded', () => {
    render(<AsyncTreeViewComponent loadingNodes={[{ node: 'Item1', loadingState: true }]} />);

    const buttons = screen.queryAllByRole('button');
    userEvent.click(buttons[0]);
    const listItems = screen.getAllByRole('row');
    const thisItem = listItems[0];
    const loader = within(thisItem).getByRole('alert');

    expect(loader).toBeInTheDocument();
  });

  test('should hide loader after children are added to the tree item', async () => {
    render(<AsyncTreeViewComponent loadingNodes={[{ node: 'Item1', loadingState: true }]} />);

    const buttons = screen.queryAllByRole('button');
    fireEvent.click(buttons[0]);
    render(<AsyncTreeViewComponent loadingNodes={[{ node: 'Item1', loadingState: false }]} />);

    fireEvent.click(buttons[0]);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  test('should add loader to item without children and not other expanded items', async () => {
    render(<AsyncTreeViewComponent loadingNodes={[{ node: 'Item1', loadingState: true }, { node: 'Item2', loadingState: true }, { node: 'Item4', loadingState: false }]} />);

    const buttons = screen.queryAllByRole('button');
    userEvent.click(buttons[0]);
    userEvent.click(buttons[1]);
    userEvent.click(buttons[2]);

    const loader = screen.getAllByRole('alert');
    expect(loader).toHaveLength(2);
  });
});

test('displays correct aria attributes', () => {
  render(<TreeViewComponent data={data} />);

  const listItems = screen.getAllByRole('row');
  const lastTreeItem = listItems[2];

  expect(lastTreeItem).toHaveAttribute('aria-level', '1');
  expect(lastTreeItem).toHaveAttribute('aria-posinset', '3');
  expect(lastTreeItem).toHaveAttribute('aria-setsize', '3');

  const buttons = screen.queryAllByRole('button');
  userEvent.click(buttons[1]);

  const expandedItems = screen.getAllByRole('row');
  const nestedItem = expandedItems[2];

  expect(nestedItem).toHaveAttribute('aria-level', '2');
  expect(nestedItem).toHaveAttribute('aria-posinset', '1');
  expect(nestedItem).toHaveAttribute('aria-setsize', '1');
});

test('onKeyDown calls passed in prop call back function', () => {
  const callback = jest.fn();
  render(<TreeViewComponent data={data} onKeyDown={callback} />);
  const listItems = screen.queryAllByRole('gridcell');
  const thisItem = listItems[0];
  fireEvent.keyDown(thisItem, { key: 'ArrowLeft', keyCode: 37 });
  fireEvent.keyUp(thisItem, { key: 'ArrowLeft', keyCode: 37 });

  expect(callback).toHaveBeenCalled();
});

test('onKeyDown calls passed in prop call back function', () => {
  const callback = jest.fn();
  render(<TreeViewComponent data={data} onKeyDown={callback} />);
  const listItems = screen.queryAllByRole('gridcell');
  const thisItem = listItems[2];
  fireEvent.keyDown(thisItem, { key: 'ArrowLeft', keyCode: 37 });
  fireEvent.keyUp(thisItem, { key: 'ArrowLeft', keyCode: 37 });

  expect(callback).toHaveBeenCalled();
});

test('onKeyDown does not call passed in prop call back function', () => {
  const callback = jest.fn();
  render(<TreeViewComponent data={data} />);
  const listItems = screen.queryAllByRole('row');
  const thisItem = listItems[2];
  userEvent.type(thisItem, '{arrowleft}');

  expect(callback).not.toHaveBeenCalled();
});

test('onDragStart calls passed in prop call back function', async () => {
  const callback = jest.fn();
  const secondCallback = jest.fn();
  render(<TreeViewComponent data={data} onDragStart={callback} onDrop={secondCallback} />);
  const listItems = screen.queryAllByRole('gridcell');
  const element = listItems[2];
  const target = listItems[1];

  expect(listItems.length).toBe(3);

  const dataTransfer = new DataTransfer();

  fireEvent(element, new DragEvent('dragstart', { dataTransfer, clientX: 0, clientY: 0 }));
  act(() => jest.runAllTimers());
  expect(callback).toHaveBeenCalled();

  fireEvent(element, new DragEvent('drag', { dataTransfer, clientX: 1, clientY: 1 }));

  fireEvent(target, new DragEvent('dragenter', { dataTransfer, clientX: 1, clientY: 1 }));

  fireEvent(target, new DragEvent('dragover', { dataTransfer, clientX: 51, clientY: 51 }));
  expect(target).toHaveAttribute('data-droptarget', 'true');

  await fireEvent(target, new DragEvent('drop', { dataTransfer, clientX: 51, clientY: 51 }));
  act(() => jest.runAllTimers());

  await fireEvent(element, new DragEvent('dragend', { dataTransfer, clientX: 51, clientY: 51 }));


  expect(secondCallback).toHaveBeenCalled();

  expect(() => within(target).getByText('Other A'));
  expect(() => within(target).getByText('Single Item'));
});

test('items still render if there is only one provided', () => {
  const callback = jest.fn();
  render(<TreeViewComponent data={singleData} onKeyDown={callback} />);
  const listItem = screen.queryByText('Single Item');

  expect(listItem).toBeInTheDocument();
});

const firstJSX = (
  <p>first</p>
);

const secondJSX = (
  <p>second</p>
);

test('Section or Item Render renders first item if condition is true', () => {
  render(
    <div>
      {SectionOrItemRender(true, firstJSX, secondJSX)}
    </div>,
  );

  const thisItem = screen.getByText('first');
  expect(thisItem).toBeInTheDocument();
  expect(screen.queryByText('second')).not.toBeInTheDocument();
});

test('Section or Item Render renders second item if condition is false', () => {
  render(
    <div>
      {SectionOrItemRender(false, firstJSX, secondJSX)}
    </div>,
  );

  const thisItem = screen.getByText('second');
  expect(thisItem).toBeInTheDocument();
  expect(screen.queryByText('first')).not.toBeInTheDocument();
});

test('Handler function removes ref from array', () => {
  const newArray = removeRefFromArrayHelper(refArray, 'test');
  expect(newArray).toHaveLength(2);
});

test('Handler function does not remove ref from array', () => {
  const newArray = removeRefFromArrayHelper(refArray, 'anothertest');
  expect(newArray).toHaveLength(3);
});

test('Handler function does add ref to array', () => {
  const newArray = addRefToArrayHelper(refArray, 'yetanothertest', { current: 'currentlystilltesting' });
  expect(newArray).toHaveLength(4);
});

test('Handler function does not add ref to array', () => {
  const newArray = addRefToArrayHelper(refArray, 'test', { current: 'currentlystilltesting' });
  expect(newArray).toHaveLength(3);
});

test('insertItem is called', () => {
  dropItem({ ...thisEventTarget, dropPosition: 'on' }, tree, state, exampleItem);

  expect(treeMove).toHaveBeenCalled();
  expect(toggleStateKey).toHaveBeenCalled();
});

test('insertItem is called, but does not call toggle key', () => {
  dropItem({ ...expandedEventTarget, dropPosition: 'on' }, tree, stateExpanded, exampleItem);

  expect(treeMove).toHaveBeenCalled();
  expect(toggleStateKey).not.toHaveBeenCalled();
});

test('insertItemToPosition is called with after', () => {
  dropItem({ ...thisEventTarget, dropPosition: 'after' }, tree, state, exampleItem);

  expect(treeInsertAfter).toHaveBeenCalled();
  expect(treeRemove).toHaveBeenCalled();
});

test('insertItemToPosition is called with before', () => {
  dropItem({ ...thisEventTarget, dropPosition: 'before' }, tree, state, exampleItem);

  expect(treeInsertBefore).toHaveBeenCalled();
  expect(treeRemove).toHaveBeenCalled();
});

test('insertItemToPosition is called with an item that has children', () => {
  dropItem({ ...thisEventTarget, dropPosition: 'before' }, tree, state, exampleItemWithChildren);

  expect(treeInsertBefore).toHaveBeenCalled();
  expect(treeRemove).toHaveBeenCalled();
});

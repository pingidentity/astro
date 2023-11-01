import React from 'react';
import { useTreeData } from 'react-stately';

import { Item } from '../../index';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';

import { SectionOrItemRender } from './TreeView';
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

const TreeViewComponent = props => {
  const tree = useTreeData({
    initialItems: data,
    getKey: item => item.title,
    getChildren: item => item.items,
  });

  return (
    <TreeView {...defaultProps} {...props} items={tree.items} tree={tree} aria-label="Example Tree">
      {item => (
        <Item
          key={item.key}
          items={item.children}
          title={item.key}
        />
      )}
    </TreeView>
  );
};

let offsetWidth;
let offsetHeight;
let scrollHeight;
const onSelectionChange = jest.fn();

beforeAll(() => {
  offsetWidth = jest.spyOn(window.HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(() => 1000);
  offsetHeight = jest.spyOn(window.HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 1000);
  scrollHeight = jest.spyOn(window.HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(() => 48);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
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

test('TreeView component does load', () => {
  render(<TreeViewComponent />);
  const element = screen.queryByRole('treegrid');
  expect(element).toBeInTheDocument();
});

test('Can select an Item using the mouse', () => {
  render(<TreeViewComponent />);
  const element = screen.queryByRole('treegrid');
  expect(element).toBeInTheDocument();

  const peopleElement = screen.queryByText('Single Item');
  expect(peopleElement).not.toHaveClass('is-selected');
  fireEvent.click(peopleElement);
  expect(peopleElement).toHaveClass('is-selected');
});

test('Renders both Sections and Items', () => {
  render(<TreeViewComponent />);

  const peopleElement = screen.getByText('Single Item');
  expect(peopleElement).toBeInTheDocument();

  const plantElement = screen.getByText('Other');
  expect(plantElement).toBeInTheDocument();

  const allListItems = screen.getAllByRole('treeitem');
  expect(allListItems).toHaveLength(3);
});

test('Can expand an Item using the mouse', () => {
  render(<TreeViewComponent />);

  // The children of collapsed sections will not
  // be rendered by default.
  expect(screen.queryByText(data[0].items[0].title)).not.toBeInTheDocument();

  // Clicking the dropdown icon, renders the children
  // of the collapsed section.
  const buttons = screen.queryAllByRole('button');
  fireEvent.click(buttons[0]);
  expect(screen.queryByText(data[0].items[0].title)).toBeInTheDocument();
});

test('onExpandedChange change prop calls when used', () => {
  const onPress = jest.fn();
  render(<TreeViewComponent onExpandedChange={onPress} />);
  expect(onPress).not.toHaveBeenCalled();

  const buttons = screen.queryAllByRole('button');
  fireEvent.click(buttons[0]);

  expect(onPress).toHaveBeenCalled();
});

test('disabledKeys prop disables items in the tree -- rendering them unclickable', () => {
  render(<TreeViewComponent disabledKeys={['Single Item']} />);

  const listItems = screen.queryAllByRole('treeitem');
  const thisItem = listItems[2];

  expect(thisItem).not.toHaveClass('is-selected');
  expect(thisItem).toHaveAttribute('aria-disabled', 'true');


  fireEvent.mouseDown(thisItem);
  fireEvent.mouseUp(thisItem);

  expect(thisItem).not.toHaveClass('is-selected');
  expect(thisItem).toHaveAttribute('aria-selected', 'false');
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

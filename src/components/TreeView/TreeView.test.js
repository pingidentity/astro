import React, { forwardRef } from 'react';
import { useTreeData } from 'react-stately';
import userEvent from '@testing-library/user-event';
import PropTypes from 'prop-types';

import { Item } from '../../index';
import { render, screen } from '../../utils/testUtils/testWrapper';
// Needs to be added to each components test file
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import { SectionOrItemRender } from './TreeView';
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

TreeViewComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
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

universalComponentTests({ renderComponent: props => <TreeViewComponent {...props} /> });

test('TreeView component does load', () => {
  render(<TreeViewComponent />);
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
  const listItems = screen.queryAllByRole('row');
  const thisItem = listItems[0];

  userEvent.type(thisItem, '{arrowleft}');

  expect(callback).toHaveBeenCalled();
});

test('onKeyDown calls passed in prop call back function', () => {
  const callback = jest.fn();
  render(<TreeViewComponent data={data} onKeyDown={callback} />);
  const listItems = screen.queryAllByRole('row');
  const thisItem = listItems[2];
  userEvent.type(thisItem, '{arrowleft}');

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

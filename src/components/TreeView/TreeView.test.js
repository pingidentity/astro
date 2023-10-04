import React from 'react';
import { useTreeData } from 'react-stately';

import { Item, Section } from '../../index';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';

import { SectionOrItemRender } from './TreeView';
import TreeView from '.';

const testId = 'test-TreeView';
const defaultProps = { 'data-testid': testId };

const data = [
  {
    title: 'People',
    items: [{ title: 'David', customProp: 1 }, { title: 'Sam' }, { title: 'Jane' }],
  },
  {
    title: 'Animals',
    items: [
      {
        title: 'Bears',
        items: [{ title: 'Black Bear' }, { title: 'Brown Bear' }],
      },
      { title: 'Kangaroo' }, { title: 'Snake' },
    ],
  },
  {
    title: 'Plant',
  },
];

const TreeViewComponent = props => {
  const tree = useTreeData({
    initialItems: data,
    getKey: item => item.title,
    getChildren: item => item.items,
  });

  return (
    <TreeView {...defaultProps} {...props} items={tree.items} tree={tree}>
      {section => (
        SectionOrItemRender(
          section.children?.length > 0,
          <Section
            key={section.key}
            items={section.children}
            title={section.key}
            customProp={{ testp: 1 }}
          />,
          <Item
            key={section.key}
            title={section.key}
          />,
        )
      )}
    </TreeView>
  );
};

test('Can select an Item using the mouse', () => {
  render(<TreeViewComponent />);
  const element = screen.getByTestId(testId);
  expect(element).toBeInTheDocument();

  const peopleElement = screen.getByText('People');
  expect(peopleElement).not.toHaveClass('is-selected');

  fireEvent.click(peopleElement);
  expect(peopleElement).toHaveClass('is-selected');
});

test('Renders both Sections and Items', () => {
  render(<TreeViewComponent />);

  const peopleElement = screen.getByText('People');
  expect(peopleElement).toBeInTheDocument();

  const plantElement = screen.getByText('Plant');
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
  render(<TreeViewComponent disabledKeys={['Plant']} />);

  const listItems = screen.getAllByRole('treeitem');
  const thisItem = listItems[2];

  expect(thisItem).not.toHaveClass('is-selected');
  expect(thisItem).toHaveAttribute('aria-disabled', 'true');

  fireEvent.mouseDown(thisItem);
  fireEvent.mouseUp(thisItem);
  expect(thisItem).not.toHaveClass('is-selected');
  expect(thisItem).toHaveAttribute('aria-selected', 'false');
});

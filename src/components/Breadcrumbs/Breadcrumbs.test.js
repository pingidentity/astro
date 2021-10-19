import React from 'react';
import { mergeProps } from '@react-aria/utils';
import CreateIcon from 'mdi-react/CreateIcon';
import { Item } from '@react-stately/collections';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import userEvent from '@testing-library/user-event';
import Breadcrumbs from './Breadcrumbs';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';

const testId = 'test-breadcrumbs';
const testItemId = 'test-breadcrumb-item';
const testIconId = 'test-icon-item';

const defaultProps = {
  'data-testid': testId,
  icon: ChevronRightIcon,
};
const testItemsArr = ['item1', 'item2', 'item3'];

const getComponent = (props = {}, itemProps = {}) =>
  render(
    <Breadcrumbs {...mergeProps(defaultProps, props)}>
      {testItemsArr.map((testItem, idx) => (
        <Item
          key={testItem}
          data-id={testItem}
          {...itemProps}
          isCurrent={idx === testItemsArr.length - 1}
        >
          {testItem}
        </Item>
      ))}
    </Breadcrumbs>,
  );

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default breadcrumbs', () => {
  getComponent();
  expect(screen.getByTestId(testId)).toBeInTheDocument();
});

test('should render nodes from the children', () => {
  getComponent();
  expect(screen.getByText(testItemsArr[0])).toBeInTheDocument();
  expect(screen.getByText(testItemsArr[1])).toBeInTheDocument();
  expect(screen.getByText(testItemsArr[2])).toBeInTheDocument();
});

test('should render correct amount of icons', () => {
  getComponent({ iconProps: { 'data-testid': testIconId } });
  expect(screen.getAllByTestId(testIconId).length).toBe(
    testItemsArr.length - 1,
  );
});

test('breadcrumbItem should render breadcrumbItem as a Text component when appropriate elementType passed', () => {
  getComponent(
    {},
    {
      elementType: 'Text',
      'data-testid': testItemId,
    },
  );
  expect(screen.getAllByTestId(testItemId)[0]).toBeInstanceOf(HTMLSpanElement);
});

test('breadcrumbItem should render breadcrumbItem as a IconButton component when appropriate elementType passed', () => {
  getComponent(
    {},
    {
      elementType: 'IconButton',
      'data-testid': testItemId,
      icon: CreateIcon,
    },
  );
  expect(screen.getAllByTestId(testItemId)[0]).toBeInstanceOf(
    HTMLButtonElement,
  );
});

test('breadcrumbItem should render breadcrumbItem as a html tag when appropriate elementType passed', () => {
  getComponent(
    {},
    {
      elementType: 'a',
      'data-testid': testItemId,
      icon: CreateIcon,
    },
  );
  expect(screen.getAllByTestId(testItemId)[0]).toBeInstanceOf(
    HTMLAnchorElement,
  );
});

test('breadcrumbs will use onAction if provided', () => {
  const mockOnAction = jest.fn();
  getComponent({}, { elementType: 'Button', onAction: mockOnAction });
  userEvent.click(screen.getByText(testItemsArr[0]));
  expect(mockOnAction).toHaveBeenCalled();
});

test('Item accepts a data-id and the data-id can be found in the DOM', () => {
  getComponent();
  const item = screen.getByText(testItemsArr[0]);
  expect(item).toBeInTheDocument();
  expect(item).toHaveAttribute('data-id', testItemsArr[0]);
});

import React from 'react';
import { mergeProps } from 'react-aria';
import { Item } from 'react-stately';
import ChevronRightIcon from '@pingux/mdi-react/ChevronRightIcon';
import CreateIcon from '@pingux/mdi-react/CreateIcon';
import userEvent from '@testing-library/user-event';

import { breadCrumbsProps } from '../../types';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import { ELEMENT_TYPE } from './BreadcrumbItem';
import Breadcrumbs from './Breadcrumbs';

const testId = 'test-breadcrumbs';
const testItemId = 'test-breadcrumb-item';
const testIconId = 'test-icon-item';

const defaultProps = {
  'data-testid': testId,
  icon: ChevronRightIcon,
};
const testItemsArr = ['item1', 'item2', 'item3'];

const getComponent = (props: breadCrumbsProps = {}, itemProps = {}) => render(
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

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <Breadcrumbs {...mergeProps(defaultProps, props)}>
      <Item>{testItemsArr[0]}</Item>
    </Breadcrumbs>
  ),
});

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
      elementType: ELEMENT_TYPE.TEXT,
      'data-testid': testItemId,
    },
  );
  expect(screen.getAllByTestId(testItemId)[0]).toBeInstanceOf(HTMLSpanElement);
});

test('breadcrumbItem should render breadcrumbItem as a IconButton component when appropriate elementType passed', () => {
  getComponent(
    {},
    {
      elementType: ELEMENT_TYPE.ICON_BUTTON,
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
  getComponent({}, { elementType: ELEMENT_TYPE.LINK, onAction: mockOnAction });
  userEvent.click(screen.getByText(testItemsArr[0]));
  expect(mockOnAction).toHaveBeenCalled();
});

test('Item accepts a data-id and the data-id can be found in the DOM', () => {
  getComponent();
  const item = screen.getByText(testItemsArr[0]);
  expect(item).toBeInTheDocument();
  expect(item).toHaveAttribute('data-id', testItemsArr[0]);
});

test('will render correctly with single child item', () => {
  render(
    <Breadcrumbs {...mergeProps(defaultProps)}>
      <Item
        key={testItemsArr[0]}
        data-id={testItemsArr[0]}
        isCurrent
      >
        {testItemsArr[0]}
      </Item>
    </Breadcrumbs>,
  );
  expect(screen.getByTestId(testId)).toBeInTheDocument();
  expect(screen.getByText(testItemsArr[0])).toBeInTheDocument();
});

test('will render the last item as a span when isCurrent is true', () => {
  getComponent();
  const lastItem = screen.getByText(testItemsArr[testItemsArr.length - 1]);

  expect(lastItem).toBeInstanceOf(HTMLSpanElement);
  expect(lastItem).toHaveAttribute('aria-current', 'page');
  expect(lastItem).toHaveAttribute('role', 'text');
});

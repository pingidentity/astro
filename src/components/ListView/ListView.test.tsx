import React, { useState } from 'react';
import { FocusScope } from 'react-aria';
import { Item } from 'react-stately';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';

import loadingStates from '../../utils/devUtils/constants/loadingStates';
import { act, fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import Button from '../Button';
import CheckboxField from '../CheckboxField';

import ListView from './ListView';
import { ExampleItemProps } from './ListView.stories';
import { escapeFocusDelegate } from './ListViewFocusWrapper';

const items = [
  { key: 'Aardvark', name: 'Aardvark', id: '1' },
  { key: 'Kangaroo', name: 'Kangaroo', id: '2' },
  { key: 'Snake', name: 'Snake', id: '3' },
];

const testId = 'testId';

const defaultProps = {
  label: 'Test Label',
  'data-testid': testId,
};

const stopPropagation = jest.fn();
const preventDefault = jest.fn();
const focusNext = jest.fn();
const focusPrevious = jest.fn();
const setIsFocusEscaped = jest.fn();
const onLoadMoreFunc = jest.fn();
const onLoadPrevFunc = jest.fn();

const testEvent = {
  stopPropagation,
  preventDefault,
};

const focusManager = {
  focusNext,
  focusPrevious,
};

beforeAll(() => {
  jest.spyOn(window.HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(() => 1000);
  jest.spyOn(window.HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 1000);
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  jest.spyOn(window.screen, 'width', 'get').mockImplementation(() => 1024);
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

const getComponent = (props = {}, { renderFn = render } = {}) => renderFn((
  <FocusScope restoreFocus>
    <ListView {...defaultProps} {...props} items={items}>
      {(item: ExampleItemProps) => (
        <Item
          key={item.key}
          textValue={item.name}
          data-id={item.key}
        >
          <h1
            key={item.key}
            data-testid={item.name}
          >
            {item.name}
          </h1>
        </Item>
      )}
    </ListView>
  </FocusScope>
));

const getComponentExpandable = (props = {}, { renderFn = render } = {}) => renderFn((
  <ListView {...defaultProps} {...props} items={items}>
    {(item: ExampleItemProps) => (
      <Item
        key={item.name}
        textValue={item.name}
      >
        <h1>I am a heading</h1>
        <Button>I am a button</Button>
      </Item>
    )}
  </ListView>
));

const getComponentEmpty = (props = {}, { renderFn = render } = {}) => renderFn((
  <FocusScope restoreFocus>
    <ListView {...defaultProps} {...props} />
  </FocusScope>
));

const getComponentWithCheckbox = (props = {}, { renderFn = render } = {}) => renderFn((
  <FocusScope restoreFocus>
    <ListView {...defaultProps} {...props} items={items}>
      {(item: ExampleItemProps) => (
        <Item
          key={item.key}
          textValue={item.name}
          data-id={item.key}
        >
          <CheckboxField label={item.name} containerProps={{ 'data-testid': 'TestID' }} />
        </Item>
      )}
    </ListView>
  </FocusScope>
));

const ComponentOnPrevLoad = () => {
  const initialItems = new Array(10).fill({ key: 'string', name: 'string' }).map((_item, index) => ({ name: `name: ${index}`, key: `name: ${index}`, id: index }));
  const [listItems, setListItems] = useState(initialItems);

  const onLoadMore = async () => {
    onLoadMoreFunc();
  };

  const onLoadPrev = async () => {
    onLoadPrevFunc();
  };
  return (
    <ListView
      {...defaultProps}
      items={listItems}
      onLoadMore={onLoadMore}
      onLoadPrev={onLoadPrev}
    >
      {(item: ExampleItemProps) => (
        <Item
          key={item.key}
          textValue={item.name}
          data-id={item.key}
        >
          <h1
            key={item.key}
            data-testid={item.name}
          >
            {item.name}
          </h1>
        </Item>
      )}
    </ListView>
  );
};

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <ListView {...defaultProps} {...props} items={items}>
      {(item: ExampleItemProps) => (
        <Item
          key={item.key}
          textValue={item.name}
          data-id={item.key}
        >
          <h1
            key={item.key}
            data-testid={item.name}
          >
            {item.name}
          </h1>
        </Item>
      )}
    </ListView>
  ),
});

test('renders listview component', () => {
  getComponent();
  const listView = screen.getByTestId(testId);
  expect(listView).toBeInTheDocument();
});

test('navigating the list using the keyboard causes the isSelected and isFocused state to change', async () => {
  getComponent();
  const listView = screen.getByTestId(testId);
  // Open the list arrow down to the second option,
  // and ensure that it is focused, and then selected after enter is pressed
  userEvent.tab();
  userEvent.type(listView, '{arrowdown}', { skipClick: true });
  const options = screen.getAllByRole('gridcell');
  expect(options[1]).toHaveClass('is-focused');
  userEvent.type(listView, '{enter}', { skipClick: true });
  const updatedOption = await screen.findAllByRole('gridcell');
  expect(updatedOption[1]).toHaveClass('is-selected');
});

test('navigating to a disabled key will not apply the isFocused class', async () => {
  getComponent({ disabledKeys: ['Kangaroo'] });
  const listView = screen.getByTestId(testId);
  // Open the list arrow down to the second option,
  // and ensure that it is focused, and then selected after enter is pressed
  userEvent.tab();
  userEvent.type(listView, '{arrowdown}', { skipClick: true });
  const options = screen.getAllByRole('gridcell');
  expect(options[1]).not.toHaveClass('is-focused');
});

test('navigating to a disabled key will not apply the isFocused class', async () => {
  getComponent({ selectionMode: 'expansion', disabledKeys: ['Kangaroo'] });
  const listView = screen.getByTestId(testId);
  // Open the list arrow down to the second option,
  // and ensure that it is focused, and then selected after enter is pressed
  userEvent.tab();
  userEvent.type(listView, '{arrowdown}', { skipClick: true });
  const options = screen.getAllByRole('gridcell');
  expect(options[1]).not.toHaveClass('is-focused');
});

test('clicking an item on the list selects the item', async () => {
  getComponent();
  const options = screen.getByTestId(items[1].name);
  userEvent.click(options);
  const updatedOption = await screen.findAllByRole('gridcell');
  expect(updatedOption[1]).toHaveClass('is-selected');
});

test('clicking an item fires "onSelectionChange" handler and returns Set with keys of items', async () => {
  const expectedResult = new Set();
  expectedResult.add(items[1].key);
  const onSelectionChange = jest.fn();
  getComponent({ onSelectionChange });
  const option1 = screen.getByTestId(items[1].name);
  userEvent.click(option1);
  expect(onSelectionChange).toHaveBeenCalled();
  const selectedItems = onSelectionChange.mock.calls[0][0];
  expect(_.isEqual(expectedResult, selectedItems)).toBeTruthy();
});

test('renders loader, if a loader component is passed in, and state is loading', () => {
  getComponent({ loadingState: loadingStates.LOADING });
  const loader = screen.getByRole('alert');
  expect(loader).toBeInTheDocument();
});

test('renders top loader, if a loader component is passed in, and state is loading', () => {
  getComponent({ loadingState: loadingStates.LOADING });
  const loader = screen.getByRole('alert');
  expect(loader).toBeInTheDocument();
});

test('renders loader, if a loader component is passed in, and state is loading', () => {
  getComponent({ loadingState: loadingStates.LOADING });
  const listView = screen.getByTestId(testId);
  userEvent.tab();

  userEvent.type(listView, '{arrowdown}', { skipClick: true });

  const loaders = screen.getAllByRole('alert');
  expect(loaders).toHaveLength(2);
});

test('renders loader, if a loader component is passed in, and state is loadingMore', () => {
  getComponent({ loadingState: loadingStates.LOADING_MORE });
  const loader = screen.getByRole('alert');
  expect(loader).toBeInTheDocument();
});

test('does not render loader, if loadingState is not loadingMore', () => {
  getComponent({ loadingState: loadingStates.SORTING });
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('renders neither loader nor item if the component is given no items nor a loading state prop', () => {
  getComponentEmpty();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  expect(screen.queryByRole('gridcell')).not.toBeInTheDocument();
});

test('Item accepts a data-id and the data-id can be found in the DOM', () => {
  getComponent();
  const options = screen.getAllByRole('gridcell');

  expect(options).toHaveLength(items.length);
  expect(options[0]).toHaveAttribute('data-id', items[0].name);
});

test('selectionMode "none" disallows to select item', async () => {
  getComponent({ selectionMode: 'none' });
  const option1 = screen.getByTestId(items[1].name);
  userEvent.click(option1);
  const updatedOption = await screen.findAllByRole('gridcell');
  expect(updatedOption[1]).not.toHaveClass('is-selected');
});

test('selectionMode "multiple" allows to select more than one item', async () => {
  getComponent({ selectionMode: 'multiple' });
  const option1 = screen.getByTestId(items[1].name);
  userEvent.click(option1);
  const option2 = screen.getByTestId(items[2].name);
  userEvent.click(option2);
  const updatedOption = await screen.findAllByRole('gridcell');
  expect(updatedOption[1]).toHaveClass('is-selected');
  expect(updatedOption[2]).toHaveClass('is-selected');
});

test('when user navigates with tab and arrows keys, onFocus is called and the is-focused class is applied', async () => {
  const onFocus = jest.fn();
  getComponent({ onFocus });
  const listView = screen.getByTestId(testId);
  userEvent.tab();
  expect(onFocus).toHaveBeenCalled();
  userEvent.type(listView, '{arrowdown}', { skipClick: true });
  const options = screen.getAllByRole('gridcell');
  expect(options[1]).toHaveClass('is-focused');
  expect(onFocus).toHaveBeenCalled();
});

test('list view not receive focus when click on checkbox', () => {
  getComponentWithCheckbox();
  const listItem = screen.getAllByRole('gridcell');
  const checkbox = screen.getAllByTestId('TestID');

  expect(listItem[0]).not.toHaveClass('is-focused');
  act(() => {
    checkbox[0].click();
  });
  expect(listItem[0]).not.toHaveClass('is-focused');
});

test('list view reset hover on item when scroll', () => {
  getComponent();
  const listView = screen.getAllByRole('grid');
  const listItem = screen.getAllByRole('gridcell');

  expect(listItem[0]).not.toHaveClass('is-hovered');
  userEvent.hover(listItem[0]);
  expect(listItem[0]).toHaveClass('is-hovered');

  fireEvent.scroll(listView[0], { target: { scrollY: 100 } });
  expect(listItem[0]).not.toHaveClass('is-hovered');
  userEvent.hover(listItem[1]);
  expect(listItem[0]).not.toHaveClass('is-hovered');
});

test('list view expandable reset hover on item when scroll', async () => {
  getComponentExpandable({ selectionMode: 'expansion' });
  // const listView = screen.getAllByRole('grid');
  const listItem = screen.getAllByRole('gridcell');
  const listRow = screen.getAllByRole('row');

  expect(listItem[0]).not.toHaveClass('is-hovered');
  userEvent.hover(listRow[0]);
  userEvent.hover(listRow[1]);
  expect(listItem[0]).not.toHaveClass('is-hovered');
});

test('list view item should not receive focus when selectionMode is "none"', () => {
  const onFocus = jest.fn();
  getComponent({ onFocus, selectionMode: 'none' });
  const options = screen.getAllByRole('gridcell');

  userEvent.tab();
  expect(onFocus).not.toHaveBeenCalled();
  expect(options[0]).not.toHaveClass('is-focused');
});

test('list view item should receive focus when selectionMode is default or a value other than "none"', () => {
  const onFocus = jest.fn();
  getComponent({ onFocus });
  const options = screen.getAllByRole('gridcell');

  userEvent.tab();
  expect(onFocus).toHaveBeenCalled();
  expect(options[0]).toHaveClass('is-focused');
});

test('selectionMode "expanded" cells render expandable list items, and can be expanded, and collapsed', async () => {
  getComponent({ selectionMode: 'expansion' });
  const options = screen.getAllByRole('gridcell');

  expect(options[0]).toHaveAttribute('aria-expanded', 'false');

  userEvent.click(options[0]);

  const updatedOptions = await screen.findAllByRole('gridcell');

  expect(updatedOptions[0]).toHaveAttribute('aria-expanded', 'true');

  userEvent.click(options[0]);

  const updatedOptions1 = await screen.findAllByRole('gridcell');

  expect(updatedOptions1[0]).toHaveAttribute('aria-expanded', 'false');
});

test('should navigate to expandable listitems with keyboard ', async () => {
  getComponentExpandable({ selectionMode: 'expansion' });
  const option = screen.getAllByRole('gridcell')[0];
  const row = screen.getAllByRole('row')[0];

  userEvent.tab();
  userEvent.type(option, '{enter}', { skipClick: true });
  userEvent.type(option, '{arrowright}', { skipClick: true });

  const focusContainer = screen.getAllByTestId('focuscontainer')[0];
  expect(focusContainer).toHaveClass('is-focused');

  userEvent.type(row, '{arrowright}', { skipClick: true });
  userEvent.type(row, '{arrowright}', { skipClick: true });

  userEvent.type(option, '{arrowleft}', { skipClick: true });
  userEvent.type(option, '{arrowleft}', { skipClick: true });

  userEvent.type(focusContainer, '{enter}', { skipClick: true });

  const button = await screen.findByRole('button');
  expect(button).toHaveClass('is-focused');

  userEvent.type(row, '{esc}', { skipClick: true });
});

test('should navigate to expandable container ', async () => {
  getComponentExpandable({ selectionMode: 'expansion' });
  const option = screen.getAllByRole('gridcell')[0];

  userEvent.tab();
  userEvent.type(option, '{enter}', { skipClick: true });
  userEvent.type(option, '{arrowright}', { skipClick: true });

  userEvent.type(option, '{arrowleft}', { skipClick: true });

  expect(option).toHaveClass('is-focused');

  userEvent.type(option, '{arrowright}', { skipClick: true });
  userEvent.type(option, '{arrowright}', { skipClick: true });

  expect(option).toHaveClass('is-focused');

  userEvent.type(option, '{arrowleft}', { skipClick: true });
  userEvent.type(option, '{arrowleft}', { skipClick: true });
  expect(option).toHaveClass('is-focused');

  fireEvent.keyDown(option, { key: 'ArrowLeft' });
  fireEvent.keyUp(option, { key: 'ArrowLeft' });
  fireEvent.keyDown(option, { key: 'ArrowLeft' });
  fireEvent.keyUp(option, { key: 'ArrowLeft' });
});

test('escape focus delegate turns on if enter is pressed', () => {
  escapeFocusDelegate({ ...testEvent, keyCode: 13 }, setIsFocusEscaped, focusManager, false);
  expect(setIsFocusEscaped).toHaveBeenCalled();
  expect(focusNext).toHaveBeenCalled();
});

test('escape focus delegate calls correct functions if left is pressed', () => {
  escapeFocusDelegate({ ...testEvent, keyCode: 37 }, setIsFocusEscaped, focusManager, true);
  expect(setIsFocusEscaped).not.toHaveBeenCalled();
  expect(focusNext).not.toHaveBeenCalled();
  expect(stopPropagation).toHaveBeenCalled();
});

test('escape focus delegate calls correct functions if left is pressed', () => {
  escapeFocusDelegate({ ...testEvent, keyCode: 39 }, setIsFocusEscaped, focusManager, true);
  expect(setIsFocusEscaped).not.toHaveBeenCalled();
  expect(focusNext).not.toHaveBeenCalled();
  expect(stopPropagation).toHaveBeenCalled();
});

test('escape focus delegate calls correct functions if left is pressed', () => {
  escapeFocusDelegate({ ...testEvent, keyCode: 38 }, setIsFocusEscaped, focusManager, true);
  expect(focusNext).not.toHaveBeenCalled();
  expect(focusPrevious).toHaveBeenCalled();
});

test('escape focus delegate calls correct functions if left is pressed', () => {
  escapeFocusDelegate({ ...testEvent, keyCode: 40 }, setIsFocusEscaped, focusManager, true);
  expect(focusNext).toHaveBeenCalled();
  expect(focusPrevious).not.toHaveBeenCalled();
});

test('escape focus delegate calls correct functions if anything else is pressed', () => {
  escapeFocusDelegate({ ...testEvent, keyCode: 4 }, setIsFocusEscaped, focusManager, true);
  expect(focusNext).not.toHaveBeenCalled();
  expect(focusPrevious).not.toHaveBeenCalled();
});

test('escape focus delegate calls correct functions if anything else is pressed', () => {
  render(<ComponentOnPrevLoad />);
  const listView = screen.getAllByRole('grid');
  fireEvent.scroll(listView[0], { target: { scrollY: 450 } });
  expect(onLoadMoreFunc).toHaveBeenCalled();
  fireEvent.scroll(listView[0], { target: { scrollY: 0 } });
  expect(onLoadPrevFunc).toHaveBeenCalled();
});

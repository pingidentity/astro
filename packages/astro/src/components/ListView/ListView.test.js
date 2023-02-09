import React from 'react';
import _ from 'lodash';
import { FocusScope } from 'react-aria';
import { Item } from 'react-stately';
import userEvent from '@testing-library/user-event';

import { render, screen } from '../../utils/testUtils/testWrapper';
import loadingStates from '../../utils/devUtils/constants/loadingStates';

import ListView from './ListView';
import CheckboxField from '../CheckboxField';

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

beforeAll(() => {
  jest.spyOn(window.HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(() => 1000);
  jest.spyOn(window.HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 1000);
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  jest.spyOn(window.screen, 'width', 'get').mockImplementation(() => 1024);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

const getComponent = (props = {}, { renderFn = render } = {}) => renderFn((
  <FocusScope restoreFocus >
    <ListView {...defaultProps} {...props} items={items}>
      {item => (
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

const getComponentEmpty = (props = {}, { renderFn = render } = {}) => renderFn((
  <FocusScope restoreFocus >
    <ListView {...defaultProps} {...props} />
  </FocusScope>
));

const getComponentWithCheckbox = (props = {}, { renderFn = render } = {}) => renderFn((
  <FocusScope restoreFocus >
    <ListView {...defaultProps} {...props} items={items}>
      {item => (
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
  checkbox[0].click();
  expect(listItem[0]).not.toHaveClass('is-focused');
});

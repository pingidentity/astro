import React from 'react';
import userEvent from '@testing-library/user-event';
import { FocusScope } from '@react-aria/focus';
import { Item } from '@react-stately/collections';
import { render, screen } from '../../utils/testUtils/testWrapper';

import ListView from './ListView';

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
  const options = screen.getAllByRole('listitem');
  expect(options[1]).toHaveClass('is-focused');
  userEvent.type(listView, '{enter}', { skipClick: true });
  const updatedOption = await screen.findAllByRole('listitem');
  expect(updatedOption[1]).toHaveClass('is-selected');
});

test('navigating to a disabled key will not apply the isFocused class', async () => {
  getComponent({ disabledKeys: ['Kangaroo'] });
  const listView = screen.getByTestId(testId);
  // Open the list arrow down to the second option,
  // and ensure that it is focused, and then selected after enter is pressed
  userEvent.tab();
  userEvent.type(listView, '{arrowdown}', { skipClick: true });
  const options = screen.getAllByRole('listitem');
  expect(options[1]).not.toHaveClass('is-focused');
});

test('clicking an item on the list selects the item', async () => {
  getComponent();
  const options = screen.getByTestId(items[1].name);
  userEvent.click(options);
  const updatedOption = await screen.findAllByRole('listitem');
  expect(updatedOption[1]).toHaveClass('is-selected');
});

test('renders loader, if a loader component is passed in', () => {
  getComponent({ loadingState: 'loading' });
  const loader = screen.getByRole('progressbar');
  expect(loader).toBeInTheDocument();
});

test('renders neither loader nor item if the component is given no items nor a loading state prop', () => {
  getComponentEmpty();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
});

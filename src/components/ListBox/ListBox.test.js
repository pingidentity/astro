import React from 'react';
import { axe } from 'jest-axe';
import { useListState } from '@react-stately/list';
import { render, screen } from '@testing-library/react';

import ListBox from '.';
import { Item } from '../../index';

const testId = 'test-label';
const items = [
  { name: 'a' },
  { name: 'b' },
  { name: 'c' },
];
const defaultProps = {
  'data-testid': testId,
  'aria-labelledby': 'label',
  items,
};

const ListBoxWithState = (props) => {
  const state = useListState(props);

  return (
    <ListBox {...props} state={state}>
      {item => <Item key={item.name}>{item.name}</Item>}
    </ListBox>
  );
};

const getComponent = (props = {}) => render((
  <ListBoxWithState {...defaultProps} {...props} />
));


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

test('default listbox', () => {
  getComponent();
  const listbox = screen.getByTestId(testId);
  expect(listbox).toBeInTheDocument();
});

test('should have no accessibility violations', async () => {
  jest.useRealTimers();
  const { container } = getComponent();
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

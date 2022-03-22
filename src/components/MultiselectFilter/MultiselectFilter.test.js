import React from 'react';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';
import MultiselectFilter from './MultiselectFilter';

const testId = 'multiselect-filter-item';
const onSelectionChange = jest.fn();
const defaultProps = {
  'data-testid': testId,
  isOpen: true,
  items: [{ name: 'item name' }],
  listTitle: 'Selected Groups',
  selectedFilterCount: 8,
  onSelectionChange,
};
const getComponent = (props = {}) => render(
  <MultiselectFilter {...defaultProps} {...props} />,
);

beforeAll(() => {
  jest.spyOn(window.HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(() => 1000);
  jest.spyOn(window.HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 1000);
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  jest.spyOn(window.screen, 'width', 'get').mockImplementation(() => 1024);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
});

afterEach(() => {
  jest.clearAllMocks();
  onSelectionChange.mockClear();
});

afterAll(() => {
  jest.restoreAllMocks();
});

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent, {
  rules: {
    'aria-required-children': { enabled: false },
    'aria-required-parent': { enabled: false },
  },
});

test('default multiselectFilter', () => {
  getComponent();
  const multiselectFilter = screen.getByTestId(testId);
  expect(multiselectFilter).toBeInTheDocument();
});

test('custom classname can be passed', () => {
  getComponent({ className: 'testing-class' });
  const multiselectFilter = screen.getByTestId(testId);
  expect(multiselectFilter).toHaveClass('testing-class');
});

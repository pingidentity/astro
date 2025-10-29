import React from 'react';

import { CollapsiblePanelProps } from '../../types';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import CollapsiblePanel from './CollapsiblePanel';

const testId = 'collapsible-panel-item';
const onSelectionChange = jest.fn();
const defaultProps = {
  'data-testid': testId,
  isOpen: true,
  items: [{ name: 'item name' }],
  listTitle: '',
  selectedFilterCount: 8,
  onSelectionChange,
};
const getComponent = (props: CollapsiblePanelProps<object> = {}) => render(
  <CollapsiblePanel {...defaultProps} {...props} />,
);

beforeAll(() => {
  jest.spyOn(window.HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(() => 1000);
  jest.spyOn(window.HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 1000);
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  jest.spyOn(window.screen, 'width', 'get').mockImplementation(() => 1024);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
    cb(0);
    return 0;
  });
});

afterEach(() => {
  jest.clearAllMocks();
  onSelectionChange.mockClear();
});

afterAll(() => {
  jest.restoreAllMocks();
});

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <CollapsiblePanel {...defaultProps} {...props} />,
});

test('default CollapsiblePanel', () => {
  getComponent();
  const collapsiblePanel = screen.getByTestId(testId);
  expect(collapsiblePanel).toBeInTheDocument();
});

test('custom classname can be passed', () => {
  getComponent({ className: 'testing-class' });
  const collapsiblePanel = screen.getByTestId(testId);
  expect(collapsiblePanel).toHaveClass('testing-class');
});

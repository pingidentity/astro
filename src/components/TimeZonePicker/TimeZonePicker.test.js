import React from 'react';
import userEvent from '@testing-library/user-event';

import { OverlayProvider, TimeZonePicker } from '../../index';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const testTimeZoneJuba = 'Africa/Juba';
const testTimeZoneApia = 'Pacific/Apia';

const defaultProps = {
  label: 'Test Label',
};

const getComponent = (props = {}, { renderFn = render } = {}) => renderFn(
  <OverlayProvider>
    <TimeZonePicker {...defaultProps} {...props} />
  </OverlayProvider>,
);

beforeAll(() => {
  jest
    .spyOn(window.HTMLElement.prototype, 'clientWidth', 'get')
    .mockImplementation(() => 1000);
  jest
    .spyOn(window.HTMLElement.prototype, 'clientHeight', 'get')
    .mockImplementation(() => 1000);
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

test('renders ComboBoxField component', () => {
  getComponent();
  const input = screen.queryByRole('combobox');
  const label = screen.getByText(defaultProps.label);
  const button = screen.queryByRole('button');
  expect(input).toBeInTheDocument();
  expect(screen.queryAllByLabelText(defaultProps.label)).toEqual([
    input,
    button,
  ]);
  expect(label).toBeInTheDocument();
  expect(label).toHaveTextContent(defaultProps.label);
  expect(button).toBeInTheDocument();
});

test('search is working correctly', () => {
  getComponent();
  const input = screen.queryByRole('combobox');
  userEvent.type(input, testTimeZoneApia);
  expect(screen.getByText(testTimeZoneApia)).toBeInTheDocument();
});

test('custom timezone can be added', () => {
  getComponent({
    additionalTimeZones: { '(GMT+02:00) Africa/Juba': testTimeZoneJuba },
  });
  const input = screen.queryByRole('combobox');
  userEvent.type(input, testTimeZoneJuba);
  expect(screen.getByText(testTimeZoneJuba)).toBeInTheDocument();
});

test('shows custom empty search state text when no items are found', () => {
  const testEmptyText = 'test empty text';
  getComponent({ emptySearchText: testEmptyText });
  const input = screen.queryByRole('combobox');
  userEvent.type(input, 'awdasrf213');
  expect(screen.getByText(testEmptyText)).toBeInTheDocument();
});

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <TimeZonePicker {...defaultProps} {...props} />,
});

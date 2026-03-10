import React from 'react';
import userEvent from '@testing-library/user-event';

import { OverlayProvider, TimeZonePicker } from '../../index';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import { getGmtAndOffset } from './helper';

jest.mock('./helper', () => ({
  getGmtAndOffset: jest.fn().mockReturnValue({
    gmt: 'GMT-00:00',
    numericOffset: 0,
  }),
}));

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

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <TimeZonePicker {...defaultProps} {...props} />,
});

test('renders ComboBoxField component', () => {
  getComponent();
  const input = screen.getByRole('combobox');
  const label = screen.getByText(defaultProps.label);
  const button = screen.getByRole('button');
  expect(screen.queryAllByLabelText(defaultProps.label)).toEqual([
    input,
    button,
  ]);
  expect(label).toHaveTextContent(defaultProps.label);
});

test('search is working correctly', async () => {
  getComponent();
  const input = screen.getByRole('combobox');
  await userEvent.type(input, testTimeZoneApia);
  expect(screen.getByText(testTimeZoneApia)).toBeInTheDocument();
});

test('custom timezone can be added', async () => {
  getComponent({
    additionalTimeZones: { '(GMT+02:00) Africa/Juba': testTimeZoneJuba },
  });
  const input = screen.getByRole('combobox');
  await userEvent.type(input, testTimeZoneJuba);
  expect(screen.getByText(testTimeZoneJuba)).toBeInTheDocument();
});

test('shows custom empty search state text when no items are found', async () => {
  const testEmptyText = 'test empty text';
  getComponent({ emptySearchText: testEmptyText });
  const input = screen.getByRole('combobox');
  await userEvent.type(input, 'awdasrf213');
  expect(screen.getByText(testEmptyText)).toBeInTheDocument();
});

test('selecting a timezone updates the input value', async () => {
  const timezone = 'America/New York';
  const gmtAndOffset = getGmtAndOffset(timezone);
  const expectedOptionText = `${timezone} ${gmtAndOffset.gmt}`;

  getComponent();
  const input = screen.getByRole('combobox');
  await userEvent.type(input, timezone);

  expect(input).toHaveValue(timezone);
  expect(screen.getByRole('listbox')).toBeInTheDocument();

  const option = screen.getByRole('option', { key: expectedOptionText });
  await userEvent.click(option);
  expect(input).toHaveValue(expectedOptionText);
});

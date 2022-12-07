import React from 'react';
import { axe } from 'jest-axe';
import { Section } from 'react-stately';
import userEvent from '@testing-library/user-event';

import { render, screen } from '../../utils/testUtils/testWrapper';
import { EnvironmentBreadcrumb, Item, OverlayProvider } from '../../index';
import { breadCrumbDataIds } from './EnvironmentBreadcrumb';

const testEnvBreadcrumb = 'test-env-breadcrumb';
const testName = 'test-name';
const testSelectedItem = 'test-selected-item';
const testSearchLabel = 'test-Search-Label';

const items = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];

const itemsWithSections = [
  {
    name: 'Heading 1',
    options: [{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }],
  },
];

const defaultProps = {
  'data-testid': testEnvBreadcrumb,
  name: testName,
  selectedItem: testSelectedItem,
  searchProps: {
    label: testSearchLabel,
  },
  items,
};

const popoverProps = {
  maxWidth: '100px',
  'data-testid': 'popover-container',
};

const defaultWithSectionsProps = {
  'data-testid': testEnvBreadcrumb,
  name: testName,
  selectedItem: testSelectedItem,
  searchProps: {
    label: testSearchLabel,
  },
  items: itemsWithSections,
};

const onSelectionChange = jest.fn();

const getComponent = props =>
  render(
    <OverlayProvider>
      <EnvironmentBreadcrumb {...defaultProps} {...props}>
        {item => <Item key={item.name} data-testid={item.name}>{item.name}</Item>}
      </EnvironmentBreadcrumb>
    </OverlayProvider>,
  );

const getSectionsComponent = (props = {}) =>
  render(
    <OverlayProvider>
      <EnvironmentBreadcrumb {...defaultWithSectionsProps} {...props}>
        {section => (
          // eslint-disable-next-line testing-library/no-node-access
          <Section
            key={section.name}
            name={section.name}
            items={section.options}
          >
            {/* eslint-disable-next-line testing-library/no-node-access */}
            {item => (
              <Item key={item.name} childItems={item.options}>
                {item.name}
              </Item>
            )}
          </Section>
        )}
      </EnvironmentBreadcrumb>
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
  onSelectionChange.mockClear();
});

afterAll(() => {
  jest.restoreAllMocks();
});

test('should render environment breadcrumb component by default', () => {
  getComponent();
  const breadcrumbList = screen.getByTestId(testEnvBreadcrumb);
  expect(breadcrumbList).toBeInstanceOf(HTMLOListElement);
  expect(breadcrumbList).toBeInTheDocument();

  const firstButton = screen.getByTestId('name');
  expect(firstButton).toBeInstanceOf(HTMLButtonElement);
  expect(firstButton).toBeInTheDocument();

  const lastButton = screen.getByText('test-selected-item');
  expect(lastButton).toBeInstanceOf(HTMLButtonElement);
  expect(lastButton).toBeInTheDocument();
});

test('should display name', () => {
  getComponent();
  expect(screen.getByText(testName)).toBeInTheDocument();
});

test('should spread props into popover container', () => {
  getComponent({ ...popoverProps, isDefaultOpen: true });

  userEvent.click(screen.getByText(testSelectedItem));

  expect(screen.queryByTestId('popover-container')).toHaveStyle('max-width: 100px');
});

test('should display selectedItem', () => {
  getComponent();
  expect(screen.getByText(testSelectedItem)).toBeInTheDocument();
});

test('should call onNamePress when name pressed', () => {
  const onNamePressMock = jest.fn();
  getComponent({ onNamePress: onNamePressMock });
  expect(onNamePressMock).not.toHaveBeenCalled();

  userEvent.click(screen.getByText(testName));
  expect(onNamePressMock).toHaveBeenCalledTimes(1);
});

test('should not call onNamePress when current env button pressed', () => {
  const onNamePressMock = jest.fn();
  getComponent({ onNamePress: onNamePressMock });
  expect(onNamePressMock).not.toHaveBeenCalled();

  userEvent.click(screen.getByText(testSelectedItem));
  expect(onNamePressMock).not.toHaveBeenCalled();
});

test('should render items passed in props', async () => {
  getComponent();
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('option')).not.toBeInTheDocument();

  userEvent.click(screen.getByText(testSelectedItem));
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(3);
});

test('should render items with sections passed in props', () => {
  getSectionsComponent();
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('option')).not.toBeInTheDocument();

  userEvent.click(screen.getByText(testSelectedItem));
  expect(screen.getByRole('group')).toBeInTheDocument();
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(3);
});

test('should call onSelectionChange when env clicked', () => {
  const onSelectionChangeMock = jest.fn();
  getComponent({ onSelectionChange: onSelectionChangeMock });
  expect(onSelectionChangeMock).not.toHaveBeenCalled();

  userEvent.click(screen.getByText(testSelectedItem));
  userEvent.click(screen.getByText(items[0].name));
  expect(onSelectionChangeMock).toHaveBeenNthCalledWith(1, items[0].name);
});

test('should disable item if his hey passed in the disabledKeys prop', () => {
  getComponent({ disabledKeys: ['a'] });
  userEvent.click(screen.getByText(testSelectedItem));
  expect(screen.getByText(items[0].name)).toHaveClass('is-disabled');
});

test('should call onPopoverOpen if it is passed in the props', () => {
  const onPopoverOpenMock = jest.fn();
  getComponent({ onPopoverOpen: onPopoverOpenMock });
  expect(onPopoverOpenMock).not.toHaveBeenCalled();
  userEvent.click(screen.getByText(testSelectedItem));
  expect(onPopoverOpenMock).toHaveBeenCalled();
});

test('should call onPopoverClose if it is passed in the props', () => {
  const onPopoverCloseMock = jest.fn();
  getComponent({ onPopoverClose: onPopoverCloseMock });
  expect(onPopoverCloseMock).not.toHaveBeenCalled();
  userEvent.click(screen.getByText(testSelectedItem));
  userEvent.click(screen.getByText(testName));
  expect(onPopoverCloseMock).toHaveBeenCalled();
});

test('should close popover when other component clicked', () => {
  getComponent();
  userEvent.click(screen.getByText(testSelectedItem));

  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(3);

  userEvent.click(screen.getByText(testName));
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryAllByRole('option')).not.toHaveLength(3);
});

test('should render current env node if passed in props', () => {
  const testSelectedItemId = 'testSelectedItemId';
  getComponent({ selectedItem: <div data-testid={testSelectedItemId} /> });
  expect(screen.getByTestId(testSelectedItemId)).toBeInTheDocument();
});

test('should show empty state in search if there are no results', () => {
  const testEmptySearchText = 'testEmptySearchText';
  getComponent({ emptySearchText: testEmptySearchText });
  userEvent.click(screen.getByText(testSelectedItem));
  userEvent.type(screen.getByRole('searchbox'), '111');
  expect(screen.getByText(testEmptySearchText)).toBeInTheDocument();
});

test('should have no accessibility violations', async () => {
  jest.useRealTimers();
  const { container } = getComponent();
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

test('should be open when isDefaultOpen is true', () => {
  getComponent({ isDefaultOpen: true });
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(3);
  userEvent.click(screen.getByText(testSelectedItem));
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.queryAllByRole('option')).not.toHaveLength(3);
});

test('should respond to onOpenChange', () => {
  const onOpenChange = jest.fn();
  getComponent({ onOpenChange });
  expect(onOpenChange).not.toHaveBeenCalled();
  userEvent.click(screen.getByText(testSelectedItem));
  expect(onOpenChange).toHaveBeenNthCalledWith(1, true);
  userEvent.click(screen.getByText(testSelectedItem));
  expect(onOpenChange).toHaveBeenNthCalledWith(2, false);
});

test('should add data-ids to environment button and org button', () => {
  getComponent();

  expect(screen.getByText(testSelectedItem)).toHaveAttribute('data-id', breadCrumbDataIds.environmentButton);
  expect(screen.getByText(testName)).toHaveAttribute('data-id', breadCrumbDataIds.orgButton);
});

test('should add data-id to dropdown list', () => {
  getComponent();

  userEvent.click(screen.getByText(testSelectedItem));

  expect(screen.getByRole('listbox', { name: 'Items List' })).toHaveAttribute('data-id', breadCrumbDataIds.dropdownList);
});

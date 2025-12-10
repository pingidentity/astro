import React from 'react';
import { Section } from 'react-stately';
import userEvent from '@testing-library/user-event';

import { EnvironmentBreadcrumb, Item, OverlayProvider } from '../..';
import { EnvironmentBreadcrumbProps, EnvironmentItemProps } from '../../types';
import { render, screen, within } from '../../utils/testUtils/testWrapper';

import { breadCrumbDataIds } from './EnvironmentBreadcrumb';

const testEnvBreadcrumb = 'test-env-breadcrumb';
const testName = 'test-name';
const testSelectedItem = 'test-selected-item';
const testSearchLabel = 'test-Search-Label';


const items: EnvironmentItemProps[] = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];

const itemsWithSections: EnvironmentItemProps[] = [
  {
    name: 'Heading 1',
    key: 'Heading 1',
    options: [{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }],
  },
  {
    name: 'Heading 2',
    key: 'Heading 2',
    options: [{ name: 'Foo1' }, { name: 'Bar1' }, { name: 'Baz1' }],
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

export const renderComponent = (props: EnvironmentBreadcrumbProps<EnvironmentItemProps>) => (
  <OverlayProvider>
    <EnvironmentBreadcrumb {...defaultProps} {...props}>
      {item => <Item key={item.name} data-testid={item.name}>{item.name}</Item>}
    </EnvironmentBreadcrumb>
  </OverlayProvider>
);

export const renderSectionsComponent = (
  props: EnvironmentBreadcrumbProps<EnvironmentItemProps>) => {
  return (
    <OverlayProvider>
      <EnvironmentBreadcrumb {...defaultWithSectionsProps} {...props}>
        {(section: EnvironmentItemProps) => (
          <Section
            key={section.key}
            title={section.name}
            items={section.options}
          >
            {item => (
              <Item key={`${section.name}-${item.name}`} childItems={item.options}>
                {item.name}
              </Item>
            )}
          </Section>
        )}
      </EnvironmentBreadcrumb>
    </OverlayProvider>
  );
};

const getComponent = (props: EnvironmentBreadcrumbProps<
  EnvironmentItemProps> = {}) => render(renderComponent(props));
const getSectionsComponent = (props: EnvironmentBreadcrumbProps<
  EnvironmentItemProps> = {}) => render(renderSectionsComponent(props));

// This file does not call universalComponentTests directly. There is a separate file,
// ./EnvironmentalBreadcrumbUniversal.test.tsx, that calls it for both the EnvironmentBreadcrumb
// and the EnvironmentBreadcrumb with sections.

beforeAll(() => {
  const callback = cb => cb();

  jest
    .spyOn(window.HTMLElement.prototype, 'clientWidth', 'get')
    .mockImplementation(() => 1000);
  jest
    .spyOn(window.HTMLElement.prototype, 'clientHeight', 'get')
    .mockImplementation(() => 1000);
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  jest.spyOn(window.screen, 'width', 'get').mockImplementation(() => 1024);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback);
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
  expect(screen.getAllByRole('group')).toHaveLength(2);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(6);
});

test('should render the separators', () => {
  getSectionsComponent();

  userEvent.click(screen.getByText(testSelectedItem));
  expect(screen.queryAllByRole('separator')).toHaveLength(3);
  const groups = screen.getAllByRole('group');
  expect(groups).toHaveLength(2);
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(6);

  groups.forEach((group, index) => {
    expect(() => within(group).getByText(itemsWithSections[index].name));
    const itemOpt = itemsWithSections[index].options;
    if (Array.isArray(itemOpt)) {
      itemOpt.forEach(opt => (
        expect(() => within(group).getByText(opt.name))
      ));
    }
  });
});

test('should call onSelectionChange when env clicked', () => {
  const onSelectionChangeMock = jest.fn();
  getComponent({ onSelectionChange: onSelectionChangeMock });
  expect(onSelectionChangeMock).not.toHaveBeenCalled();

  userEvent.click(screen.getByText(testSelectedItem));
  expect(screen.getByText(items[0].name)).toBeInTheDocument();
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

test('should hide section title if no search results within it', () => {
  getSectionsComponent();

  // Open popover
  userEvent.click(screen.getByText(testSelectedItem));
  // Search for option exclusive to only one section
  userEvent.type(screen.getByRole('searchbox'), 'Bar1');

  // 'Heading 1' should not be rendered, but 'Heading 2' should be
  expect(screen.queryByText(itemsWithSections[0].name)).not.toBeInTheDocument();
  expect(screen.queryByText(itemsWithSections[1].name)).toBeInTheDocument();
});

test('should reflect the selection change when env is clicked', () => {
  const onSelectionChangeMock = jest.fn();
  getSectionsComponent({ isDefaultOpen: true, onSelectionChange: onSelectionChangeMock });

  const itemOpt = itemsWithSections[1].options;
  if (Array.isArray(itemOpt)) {
    userEvent.click(screen.getByText(itemOpt[1].name));
    expect(onSelectionChangeMock).toHaveBeenNthCalledWith(
      1,
      `${itemsWithSections[1].name}-${itemOpt[1].name}`,
    );
  }
});

test('should indicate selected item on first render', () => {
  const selectedItem = items[0].name;
  const envNode = (
    <Item key={selectedItem}>
      {selectedItem}
    </Item>
  );

  getComponent({ isDefaultOpen: true, selectedItem: envNode });
  expect(screen.queryByRole('listbox')).toBeInTheDocument();
  expect(screen.queryAllByRole('option')).toHaveLength(3);
  expect(screen.getByText(selectedItem)).toHaveClass('is-selected');
});

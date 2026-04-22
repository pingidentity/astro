import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';

import { Box, Text } from '../../index';
import { act, render, screen, waitFor } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import SearchNav, { calculateVisibleCount, measureItemWidths } from './SearchNav';

const items = [
  { text: 'Overview', key: 'Overview', children: <Text>Overview body</Text> },
  { text: 'Configuration', key: 'Configuration', children: <Text>Configuration body</Text> },
  { text: 'Resources', key: 'Resources', children: <Text>Resources body</Text> },
  { text: 'Policies', key: 'Policies', children: <Text>Policies body</Text> },
  { text: 'Attribute Mappings', key: 'Attribute Mappings', children: <Text>Attribute body</Text> },
  { text: 'Access', key: 'Access', children: <Text>Access body</Text> },
  { text: 'Integration', key: 'Integration', children: <Text>Integration body</Text> },
];

const testId = 'searchNavId';
const onSelectionChangeCallback = jest.fn();
const onOpenChangeCallback = jest.fn();

const defaultProps = {
  items,
  'data-testid': testId,
  onSelectionChange: onSelectionChangeCallback,
};

const MORE_BUTTON_TEXT = 'More';
const TAB_ITEM_WIDTH = 100;

let offsetWidthMock: jest.SpyInstance<number, []>;
let mockContainerWidth = 0;

const TestComponent = (props: object) => {
  const [selectedKey, setSelectedKey] = useState(items[0].key);

  const setSelectedKeyCallback = e => {
    setSelectedKey(e);
  };

  return (
    <Box maxWidth="600px">
      <SearchNav
        {...props}
        items={items}
        selectedKey={selectedKey}
        setSelectedKey={e => setSelectedKeyCallback(e)}
      />
      {items.find(item => item.key === selectedKey)?.children}
    </Box>
  );
};

let resizeObserverCallbacks: ((entries: { contentRect: { width: number } }[]) => void)[] = [];

const triggerResizeObservers = (width: number) => {
  resizeObserverCallbacks.forEach(cb => cb([{ contentRect: { width } }]));
};

// Mock the global ResizeObserver
class MockResizeObserver {
  callback;

  constructor(callback) {
    this.callback = callback;
    resizeObserverCallbacks.push(callback);
  }

  observe = jest.fn();

  unobserve = jest.fn();

  disconnect = jest.fn();
}

beforeAll(() => {
  // Overwrite the global ResizeObserver for testing environment
  Object.defineProperty(global, 'ResizeObserver', {
    value: MockResizeObserver,
    writable: true,
  });
});

beforeEach(() => {
  resizeObserverCallbacks = [];
  mockContainerWidth = 1000; // Default large container width

  // Mock offsetWidth to return different values for container and children
  offsetWidthMock = jest
    .spyOn(window.HTMLElement.prototype, 'offsetWidth', 'get')
    .mockImplementation(function (this: HTMLElement) {
      // The tab list container is identified by its role="list"
      if (this.getAttribute('role') === 'list') {
        return mockContainerWidth;
      }
      // The individual items are the <Text> components in the hidden box
      return TAB_ITEM_WIDTH;
    });

  jest.useFakeTimers();
});

afterEach(() => {
  offsetWidthMock.mockRestore();
  jest.useRealTimers();
});

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <SearchNav {...props} items={items} /> });


const getComponent = (props: object) => render(
  <TestComponent {...defaultProps} {...props} />,
);
const MORE_BUTTON_WIDTH = 60; // Use the value from your component

describe('Pure Functions Tests', () => {
  // Test the measurement function
  it('measureItemWidths correctly measures the offsetWidth of items', () => {
    // Mock the input data: items array and a refs object with mock offsetWidths
    const mockItems = [
      { key: '1', text: 'Item One' },
      { key: '2', text: 'Item Two' },
    ];
    const mockMeasurementRefs = {
      current: {
        '1': { offsetWidth: 100 } as HTMLDivElement,
        '2': { offsetWidth: 150 } as HTMLDivElement,
        '3': null, // handle missing refs
      },
    };

    const widths = measureItemWidths(mockItems, mockMeasurementRefs);

    // Assert the expected output
    expect(widths).toEqual({
      '1': 100,
      '2': 150,
    });
  });

  // Test the core logic for calculating visible count
  describe('calculateVisibleCount', () => {
    const mockOrderedItems = items.slice(0, 3); // Overview, Configuration, Resources
    // Mock widths for these 3 items (width + margin)
    // Overview: 90 + 10 = 100 total width
    // Config: 120 + 10 = 130 total width
    // Resources: 100 + 10 = 110 total width
    const mockItemWidths = {
      'Overview': 90,
      'Configuration': 120,
      'Resources': 100,
    };
    const moreButtonWidth = MORE_BUTTON_WIDTH; // 60px

    it('returns the total count when all items fit within the container', () => {
      // Container width: 100 + 130 + 110 = 340 needed. Set wide enough (e.g., 500)
      const containerWidthFull = 500;
      const visibleCount = calculateVisibleCount(containerWidthFull,
        moreButtonWidth,
        mockOrderedItems,
        mockItemWidths);
      expect(visibleCount).toBe(3);
    });

    it('breaks when adding an item and the required space for the "More" button exceeds container width', () => {
      // Set container width to only allow the first two items and the "More" button
      const containerWidthPartial = 334;
      const visibleCount = calculateVisibleCount(containerWidthPartial,
        moreButtonWidth,
        mockOrderedItems,
        mockItemWidths);
      // It should fit the first two, but break on the third, so count should be 2.
      expect(visibleCount).toBe(2);
    });

    it('handles an edge case where no items can be visible', () => {
      // Container width is too small to even fit one item's width + the "More" button width
      const containerWidthTiny = 100;
      const visibleCount = calculateVisibleCount(containerWidthTiny,
        moreButtonWidth,
        mockOrderedItems,
        mockItemWidths);
      expect(visibleCount).toBe(0);
    });
  });
});

test('component does render', () => {
  getComponent({ items });
  const searcgNavComponent = screen.getByTestId(testId);
  expect(searcgNavComponent).toBeInTheDocument();
});

test('visible tab selection updates the selected key and content', async () => {
  // Setup: Ensure all tabs fit (default mockContainerWidth=1000)
  getComponent({ items });
  jest.advanceTimersByTime(100);

  // Initial state: 'Overview' is selected
  expect(screen.getByText('Overview body')).toBeInTheDocument();

  // Click 'Resources' tab
  const resourcesTab = screen.getByRole('link', { name: 'Resources' });
  await userEvent.click(resourcesTab);

  // Expect selected key and content to change
  await screen.findByText('Resources body');
});


test('tabs show a "More" button when content overflows', async () => {
  // Use a mock setup that only allows ONE tab to fit:
  offsetWidthMock.mockImplementation(function (this: HTMLElement) {
    if (this.getAttribute('role') === 'list') {
      // Container size only slightly larger than Tab 1's required width (100 + 30 = 130)
      return 250;
    }
    return 100; // Item width
  });

  getComponent({ items });

  // Advance timers to trigger the visibility calculation
  jest.advanceTimersByTime(100);

  // Expect 1 visible tab and 2 hidden tabs
  const tabs = screen.getByRole('link');
  expect(tabs).toBeInTheDocument(); // Only 'Tab 1' is visible

  // Expect the "More" button to show the other 2 tabs
  const moreButton = screen.getByText(MORE_BUTTON_TEXT);
  expect(moreButton).toBeInTheDocument();

  // Test selection from the menu
  await userEvent.click(moreButton);
  const hiddenItem = screen.getByRole('menuitem', { name: 'Access' });
  await userEvent.click(hiddenItem);

  // // Expect Tab 2 content to be shown
  if (items[1].children) {
    await screen.findByText('Access body');
  }

  expect(onSelectionChangeCallback).toHaveBeenCalled();
});

test('hidden tab selection updates key, content, and triggers swap', async () => {
  // Setup: Mock widths so only the first 2 tabs fit (2 * 110 = 220 + 40(More) = 260)
  // Set container to 300px
  mockContainerWidth = 300;
  getComponent({ items, onOpenChange: onOpenChangeCallback });

  jest.advanceTimersByTime(100);

  // Initial check: 'Resources' is hidden, 'More' button is visible
  const moreButton = screen.getByText(MORE_BUTTON_TEXT);
  expect(moreButton).toBeInTheDocument();

  // Click 'More' button to open menu
  await userEvent.click(moreButton);

  // Click 'Resources' (hidden item 3)
  const resourcesMenuItem = screen.getByRole('menuitem', { name: 'Resources' });
  await userEvent.click(resourcesMenuItem);

  // 1. Expect content update
  await screen.findByText('Resources body');

  // 2. Expect swap: 'Resources' should now be visible as the second tab
  // (since 'Configuration' was the second tab)

  await waitFor(() => {
    // Check the final tab in the visible list (which should be 'Resources')
    const visibleTabs = screen.getAllByRole('link');

    // We expect 2 visible tabs: Tab 1 ('Overview') and the newly swapped-in tab ('Resources')
    // We expect the 'More' button to be the third listitem
    expect(visibleTabs.length).toBe(1);
  });

  // 2. Expect swap: 'Resources' should now be visible as the
  // second tab (since 'Configuration' was the second tab)
  await userEvent.click(moreButton);
  await waitFor(() => {
    // The displaced tab ('Configuration') should now be in the menu
    expect(screen.getByRole('menuitem', { name: 'Configuration' })).toBeInTheDocument();
  });
  expect(onOpenChangeCallback).toHaveBeenCalled();
});

test('resizing container to be very small hides all but one tab', async () => {
  // Start large (mockContainerWidth = 1000)
  mockContainerWidth = 1200;
  getComponent({ items });

  // Initial calculation (from useLayoutEffect)
  jest.advanceTimersByTime(100);

  // Initial check: All 7 tabs should be visible
  expect(screen.queryByText(MORE_BUTTON_TEXT)).not.toBeInTheDocument();

  // --- Resize Step ---

  // 1. Shrink: Set container size to allow only 1 tab (110px) + More button (40px) = 150px
  mockContainerWidth = 250;

  // 2. Manually trigger the ResizeObserver callback
  // This tells the component the container dimensions have changed.

  act(() => {
    triggerResizeObservers(mockContainerWidth);
  });


  // 3. Advance timers to process state updates from the calculation
  act(() => {
    jest.advanceTimersByTime(100);
  });

  // 4. Final check: Only the first tab ('Overview') should remain visible
  await waitFor(() => {
    // The first tab should be visible
    expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument();
  });

  await waitFor(() => {
    // The second tab should be hidden
    expect(screen.queryByRole('link', { name: 'Configuration' })).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(MORE_BUTTON_TEXT)).toBeInTheDocument();
  });

  await waitFor(() => {
    const visibleListItems = screen.getAllByRole('listitem');
    expect(visibleListItems.length).toBe(2);
  });

  mockContainerWidth = 628;

  act(() => {
    triggerResizeObservers(mockContainerWidth);
  });


  // 3. Advance timers to process state updates from the calculation
  act(() => {
    jest.advanceTimersByTime(100);
  });

  // 4. Final check: Only the first tab ('Overview') should remain visible
  await waitFor(() => {
    // The first tab should be visible
    expect(screen.getAllByRole('link').length).toBe(4);
  });


  //   await waitFor(() => {
  const moreButton = screen.getByText(MORE_BUTTON_TEXT);
  expect(moreButton).toBeInTheDocument();

  // Click 'More' button to open menu
  await userEvent.click(moreButton);

  // Click 'Resources' (hidden item 3)
  const longMenuItem = screen.getByRole('menuitem', { name: 'Attribute Mappings' });
  await userEvent.click(longMenuItem);

  act(() => {
    jest.advanceTimersByTime(100);
  });
});

test('recalculates visible items when More button causes an item to be hidden', async () => {
  // Setup: Container wide enough for 3 tabs, but NOT 3 tabs + More button.
  mockContainerWidth = 420; // Max allowed width

  // We ensure the mock returns 100 for items and 60 for the More button.
  offsetWidthMock.mockImplementation(function (this: HTMLElement) {
    if (this.getAttribute('role') === 'list') {
      return mockContainerWidth;
    }
    // Assume the 'More' button element has a specific class/role/text for measurement
    // If your More button component has a fixed width in the test environment (60),
    // this mock might not be necessary, but we include it for safety.
    if (this.textContent === 'More') {
      return 60;
    }
    return 100; // Item width
  });

  getComponent({ items });

  // Manually trigger the ResizeObserver/LayoutEffect calculation
  act(() => {
    triggerResizeObservers(mockContainerWidth);
    jest.advanceTimersByTime(100);
  });

  // Wait for the state update (numVisibleItems = 2)
  //   await waitFor(() => {
  // We expect only 2 tabs to be visible (Overview, Configuration)
  // Tab 3 ('Resources') should be hidden.

  expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Configuration' })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Resources' })).not.toBeInTheDocument();

  // The More button must be visible
  expect(screen.getByText(MORE_BUTTON_TEXT)).toBeInTheDocument();

  // Check the final count
  const visibleListItems = screen.getAllByRole('listitem');
  expect(visibleListItems.length).toBe(3); // 2 tabs + 1 More button
//   });
});

test('covers adjustment logic when More button overflows last item', async () => {
  // Force a tight scenario:
  // Container: 279. Max fit for 2 tabs (220). Max fit for 2 tabs + More (280).
  mockContainerWidth = 279;

  // We ensure the mock returns 100 for items and 60 for the More button.
  offsetWidthMock.mockImplementation(function (this: HTMLElement) {
    if (this.getAttribute('role') === 'list') {
      return mockContainerWidth;
    }
    if (this.textContent === 'More') {
      return 60; // More button width
    }
    return 100; // Item width
  });

  getComponent({ items });

  // Manually trigger the ResizeObserver calculation
  act(() => {
    triggerResizeObservers(mockContainerWidth);
    jest.advanceTimersByTime(100);
  });

  // Wait for the state update (numVisibleItems will be 1)
  await waitFor(() => {
    // The while loop should have run once, reducing visibleCount from 2 to 1.

    expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByRole('link', { name: 'Configuration' })).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(MORE_BUTTON_TEXT)).toBeInTheDocument();
  });

  await waitFor(() => {
    // Total visible items: 1 tab + 1 More button
    const visibleListItems = screen.getAllByRole('listitem');
    expect(visibleListItems.length).toBe(2);
  });
});

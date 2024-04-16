import React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import userEvent from '@testing-library/user-event';

import { TabListItemProps } from '../../types';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import Tab from '../Tab';

import Tabs from './Tabs';

// Emotion Cache added as test fails otherwise, root cause of this failure is unknown.
// Failure occured with ThemeUI refactor.
// https://github.com/emotion-js/emotion/issues/1105#issuecomment-557726922
const emotionCache = createCache({ key: 'tabs-test' });
emotionCache.compat = true;

const testId = 'testId';
const defaultTabs: TabListItemProps[] = [
  { name: 'Tab 1', children: 'Tab 1 body', props: {} },
  { name: 'Tab 2', children: 'Tab 2 body', props: {} },
  { name: 'Tab 3', children: 'Tab 3 body', props: {} },
];

const tabsWithList: TabListItemProps[] = [
  { name: 'Tab 1', children: 'Tab 1 body', props: {} },
  {
    name: 'Tab 2',
    list: [
      { key: 'tab1list', name: 'Tab 1 list', children: 'Tab 1 from list', role: 'menuitemradio' },
      { key: 'tab2list', name: 'Tab 2 list', children: 'Tab 2 from list', role: 'menuitemradio' },
    ],
    props: {},
  },
];

const defaultProps = {
  'data-testid': testId,
  defaultSelectedKey: defaultTabs[0].name,
};

const getComponent = (props = {}, { tabs = defaultTabs, renderFn = render } = {}) => renderFn((
  <CacheProvider value={emotionCache}>
    <Tabs {...defaultProps} {...props}>
      {tabs.map(({ name, children, props: tabProps }) => (
        <Tab key={name} title={name} {...tabProps}>
          {children}
        </Tab>
      ))}
    </Tabs>
  </CacheProvider>
));

const getComponentWithDynamicItems = props => render((
  <CacheProvider value={emotionCache}>
    <Tabs {...props}>
      {({ name, children, ...tabProps }: TabListItemProps) => (
        <Tab key={name} title={name} {...tabProps}>
          {children}
        </Tab>
      )}
    </Tabs>
  </CacheProvider>
));

const getTabs = () => {
  const tabs = screen.queryAllByRole('tab');
  const [tab0, tab1, tab2] = tabs;
  return { tabs, tab0, tab1, tab2 };
};

const testTabPanel = expectedTabIndex => defaultTabs.forEach(({ children }, index) => {
  if (typeof children === 'string') {
    return index === expectedTabIndex
      ? expect(screen.queryByText(children)).toBeInTheDocument()
      : expect(screen.queryByText(children)).not.toBeInTheDocument();
  }
  return null;
});

const testSingleTab = (tabs, tab, thisTest, testParams: unknown[] = []) => {
  tabs.forEach(t => {
    if (t === tab) {
      expect(t)[thisTest](...testParams);
    } else {
      expect(t).not[thisTest](...testParams);
    }
  });
};

afterEach(() => {
  jest.restoreAllMocks();
});

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <Tabs {...props}>
      <Tab key="key" title="title">
        Content
      </Tab>
    </Tabs>
  ),
});

test('default tabs', () => {
  getComponent();
  const tabList = screen.getByRole('tablist');
  const tabs = screen.getAllByRole('tab');
  const tabLine = screen.getByRole('presentation');
  const tabPanel = screen.getByRole('tabpanel');
  expect(tabList).toBeInTheDocument();
  expect(tabs).toHaveLength(tabs.length);
  tabs.forEach(tab => expect(tab).toBeInTheDocument());
  expect(tabLine).toBeInTheDocument();
  expect(tabPanel).toBeInTheDocument();
});

test('interacting with tabs via click', () => {
  getComponent();
  const { tabs, tab0, tab1 } = getTabs();

  // Expect the first tab to be default selected
  testSingleTab(tabs, tab0, 'toContainElement', [screen.getByRole('presentation')]);
  testTabPanel(0);

  userEvent.click(tab1);
  testSingleTab(tabs, tab1, 'toContainElement', [screen.getByRole('presentation')]);
  testTabPanel(1);

  userEvent.click(tab0);
  testSingleTab(tabs, tab0, 'toContainElement', [screen.getByRole('presentation')]);
  testTabPanel(0);
});

test('interacting with tabs with manual activation', () => {
  getComponent();
  const { tabs, tab0, tab1 } = getTabs();
  tabs.forEach(tab => expect(tab).not.toHaveFocus());

  userEvent.tab();
  testSingleTab(tabs, tab0, 'toHaveFocus');
  testTabPanel(0);

  fireEvent.keyDown(tab0, { key: 'ArrowRight', code: 'ArrowRight' });
  testSingleTab(tabs, tab1, 'toHaveFocus');
  testTabPanel(0);

  fireEvent.keyDown(tab1, { key: 'Enter', code: 'Enter' });
  testSingleTab(tabs, tab1, 'toHaveFocus');
  testTabPanel(1);
});

test('interacting with tabs via focus -- horizontal', () => {
  getComponent({ keyboardActivation: 'automatic' });
  const { tabs, tab0, tab1 } = getTabs();
  tabs.forEach(tab => expect(tab).not.toHaveFocus());

  userEvent.tab();
  testSingleTab(tabs, tab0, 'toHaveFocus');
  testTabPanel(0);

  fireEvent.keyDown(tab0, { key: 'ArrowRight', code: 'ArrowRight' });
  testSingleTab(tabs, tab1, 'toHaveFocus');
  testTabPanel(1);

  fireEvent.keyDown(tab0, { key: 'ArrowLeft', code: 'ArrowLeft' });
  testSingleTab(tabs, tab0, 'toHaveFocus');
  testTabPanel(0);
});

test('interacting with tabs via focus -- vertical', () => {
  getComponent({ orientation: 'vertical', keyboardActivation: 'automatic' });
  const { tabs, tab0, tab1 } = getTabs();
  tabs.forEach(tab => expect(tab).not.toHaveFocus());

  userEvent.tab();
  testSingleTab(tabs, tab0, 'toHaveFocus');
  testTabPanel(0);

  fireEvent.keyDown(tab0, { key: 'ArrowDown', code: 'ArrowDown' });
  testSingleTab(tabs, tab1, 'toHaveFocus');
  testTabPanel(1);

  fireEvent.keyDown(tab0, { key: 'ArrowUp', code: 'ArrowUp' });
  testSingleTab(tabs, tab0, 'toHaveFocus');
  testTabPanel(0);
});

test('disabled all tabs', () => {
  getComponent({ isDisabled: true });
  const { tab0, tab1 } = getTabs();
  const tabLine = screen.queryByRole('presentation');

  // Tabs cannot be DOM disabled so must check visuals
  defaultTabs.forEach(tab => {
    if (tab.name) {
      const tabText = screen.getByText(tab.name);
      const { parentElement } = tabText;
      expect(parentElement).toHaveClass('is-disabled');
    }
  });
  expect(tabLine).not.toBeInTheDocument();

  // Ensure that clicking a tab does nothing
  userEvent.click(tab1);
  expect(tab0).not.toContainElement(screen.queryByRole('presentation'));
  expect(tab1).not.toContainElement(screen.queryByRole('presentation'));
  testTabPanel(0);
});

test('disabled tab is not accessible on click or focus', () => {
  getComponent({ disabledKeys: [defaultTabs[1].name], keyboardActivation: 'automatic' });

  testTabPanel(0);

  const { tabs, tab0, tab1, tab2 } = getTabs();

  // Ensure that clicking a disabled tab does nothing
  userEvent.click(tab1);
  testTabPanel(0);

  // Ensure that disabled tab is not accessible via focus
  userEvent.tab();
  testSingleTab(tabs, tab0, 'toHaveFocus');
  fireEvent.keyDown(tab0, { key: 'ArrowRight', code: 'ArrowRight' });
  testSingleTab(tabs, tab2, 'toHaveFocus');
  testTabPanel(2);
});

test('controlled tabs', () => {
  const selectedKey = defaultTabs[1].name;
  const onSelectionChange = jest.fn();
  const { rerender } = getComponent({ selectedKey, onSelectionChange });
  const { tabs, tab0, tab1, tab2 } = getTabs();

  // Expect the second tab to be selected
  expect(onSelectionChange).not.toHaveBeenCalled();
  testSingleTab(tabs, tab1, 'toContainElement', [screen.queryByRole('presentation')]);
  testTabPanel(1);

  // Ensure the event handler is fired, but selected tab does not change
  userEvent.click(tab2);
  expect(onSelectionChange).toHaveBeenCalledWith(defaultTabs[2].name);
  testSingleTab(tabs, tab1, 'toContainElement', [screen.queryByRole('presentation')]);
  testTabPanel(1);

  // Ensure the tab DOES change when selectedKey is updated
  userEvent.click(tab0);
  expect(onSelectionChange).toHaveBeenCalledWith(defaultTabs[0].name);

  getComponent({ selectedKey: defaultTabs[0].name, onSelectionChange },
    { renderFn: rerender } as {
      tabs: TabListItemProps[],
      renderFn: (ui: React.ReactElement<unknown, string |
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        React.JSXElementConstructor<unknown>>) => any
    });
  testSingleTab(tabs, tab0, 'toContainElement', [screen.queryByRole('presentation')]);
  testTabPanel(0);
});

test('tab line props', () => {
  const newTabs = Array.from(defaultTabs);
  newTabs[0].props = { tabLineProps: { bg: 'red' } };
  const { rerender } = getComponent({}, { tabs: newTabs });
  const { tabs, tab0 } = getTabs();
  const tabLine = screen.getByRole('presentation');

  // Expect the tab line to have a red background
  testSingleTab(tabs, tab0, 'toContainElement', [tabLine]);

  // Expect the tab line to be updated with a blue background
  newTabs[0].props = { tabLineProps: { bg: 'blue' } };
  getComponent({}, { tabs: newTabs, renderFn: rerender } as {
    tabs: TabListItemProps[],
    renderFn: (ui: React.ReactElement<unknown, string |
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      React.JSXElementConstructor<unknown>>) => any
  });
  testSingleTab(tabs, tab0, 'toContainElement', [tabLine]);
});

test('tab with icon', () => {
  const newTabs = Array.from(defaultTabs);
  newTabs[0].props = { icon: <div data-testid="icon" /> };
  getComponent({}, { tabs: newTabs });
  const { tabs, tab0 } = getTabs();
  const icon = screen.getByTestId('icon');

  // Expect the tab to have the given icon element
  testSingleTab(tabs, tab0, 'toContainElement', [icon]);
});

test('tooltip renders on tab\'s hover in `tooltip` mode', async () => {
  getComponent({ mode: 'tooltip' });
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

  const { tab0 } = getTabs();
  fireEvent.mouseMove(tab0);
  fireEvent.mouseEnter(tab0);
  setTimeout(() => {
    expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  }, 0);
});

test('tabs without selected keys show null tab panel content', () => {
  getComponent({ defaultSelectedKey: undefined });
  expect(screen.queryByRole('tabpanel')).not.toHaveTextContent('');
});

test('hover tab style', () => {
  getComponent();

  const { tab0 } = getTabs();
  expect(tab0).not.toHaveClass('is-hovered');
  userEvent.hover(tab0);
  expect(tab0).toHaveClass('is-hovered');
});

test('will render slots.beforeTab if provided', () => {
  const testText = 'test-text';
  const testComponent = <div>{testText}</div>;
  const tabs = [
    {
      name: 'Tab 1',
      children: 'Tab 1 body',
      props: { slots: { beforeTab: testComponent } },
    },
  ];
  getComponent({}, { tabs });
  expect(screen.getByText(testText)).toBeInTheDocument();
});

test('will render slots.afterTab if provided', () => {
  const testText = 'test-text';
  const testComponent = <div>{testText}</div>;
  const tabs = [
    {
      name: 'Tab 1',
      children: 'Tab 1 body',
      props: { slots: { afterTab: testComponent } },
    },
  ];
  getComponent({}, { tabs });
  expect(screen.getByText(testText)).toBeInTheDocument();
});

test('will render tab with list if provided', async () => {
  getComponentWithDynamicItems({ items: tabsWithList, mode: 'list' });

  testTabPanel(0);

  const { tab1: { parentElement: menuBtn } } = getTabs();

  if (menuBtn) userEvent.click(menuBtn);
  expect(screen.queryByRole('menu')).toBeInTheDocument();
  testTabPanel(0);

  const menuItems = screen.queryAllByRole('menuitemradio');
  if (tabsWithList[1].list) {
    expect(menuItems).toHaveLength(tabsWithList[1].list.length);
  }
  expect(menuItems[0]).not.toHaveFocus();

  userEvent.click(menuItems[0]);
  if (tabsWithList[1].list) {
    const { children: firstListItemContent } = tabsWithList[1].list[0];
    expect(screen.queryByRole('tabpanel')).toHaveTextContent(firstListItemContent);
  }
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});

test('tab list is accessible via keyboard', () => {
  getComponentWithDynamicItems({ items: tabsWithList, mode: 'list' });

  const { tabs, tab0, tab1 } = getTabs();
  tabs.forEach(tab => expect(tab).not.toHaveFocus());

  userEvent.tab();
  testTabPanel(0);

  fireEvent.keyDown(tab0, { key: 'ArrowRight', code: 'ArrowRight' });
  expect(tab1).toHaveFocus();

  fireEvent.keyDown(tab1, { key: 'Enter', code: 'Enter' });
  expect(screen.queryByRole('menu')).toBeInTheDocument();
  testTabPanel(0);

  const menuItems = screen.queryAllByRole('menuitemradio');
  if (tabsWithList[1].list) {
    expect(menuItems).toHaveLength(tabsWithList[1].list.length);
  }
  expect(menuItems[0]).toHaveFocus();

  fireEvent.keyDown(menuItems[0], { key: 'Enter', code: 'Enter' });
  if (tabsWithList[1].list) {
    const { children: firstListItemContent } = tabsWithList[1].list[0];
    expect(screen.queryByRole('tabpanel')).toHaveTextContent(firstListItemContent);
  }
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});

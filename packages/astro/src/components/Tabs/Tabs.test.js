import React from 'react';
import userEvent from '@testing-library/user-event';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import Tabs from './Tabs';
import Tab from '../Tab';

const emotionCache = createCache({ key: 'tabs-test' });
emotionCache.compat = true;

const testId = 'testId';
const defaultTabs = [
  { name: 'Tab 1', children: 'Tab 1 body' },
  { name: 'Tab 2', children: 'Tab 2 body' },
  { name: 'Tab 3', children: 'Tab 3 body' },
];
const defaultProps = {
  'data-testid': testId,
  defaultSelectedKey: defaultTabs[0].name,
};
const getComponent = (props = {}, { tabs = defaultTabs, renderFn = render } = {}) => renderFn((
  <CacheProvider value={emotionCache}>
    <Tabs {...defaultProps} {...props}>
      {tabs.map(({ name, props: tabProps, children }) => (
        <Tab key={name} title={name} {...tabProps}>
          {children}
        </Tab>
    ))}
    </Tabs>
  </CacheProvider>
));

const getTabs = () => {
  const tabs = screen.queryAllByRole('tab');
  const [tab0, tab1, tab2] = tabs;
  return { tabs, tab0, tab1, tab2 };
};

const testTabPanel = expectedTabIndex => defaultTabs.forEach(({ children }, index) => (
  index === expectedTabIndex
    ? expect(screen.queryByText(children)).toBeInTheDocument()
    : expect(screen.queryByText(children)).not.toBeInTheDocument()
));

const testSingleTab = (tabs, tab, thisTest, testParams = []) => {
  tabs.forEach((t) => {
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

test('interacting with tabs via focus -- horizontal', () => {
  getComponent();
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
  getComponent({ orientation: 'vertical' });
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
  defaultTabs.forEach((tab) => {
    const tabText = screen.getByText(tab.name);
    const { parentElement } = tabText;
    expect(parentElement).toHaveClass('is-disabled');
  });
  expect(tabLine).not.toBeInTheDocument();

  // Ensure that clicking a tab does nothing
  userEvent.click(tab1);
  expect(tab0).not.toContainElement(screen.queryByRole('presentation'));
  expect(tab1).not.toContainElement(screen.queryByRole('presentation'));
  testTabPanel(0);
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
  getComponent({ selectedKey: defaultTabs[0].name, onSelectionChange }, { renderFn: rerender });
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
  getComponent({}, { tabs: newTabs, renderFn: rerender });
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

test('tooltip renders on tab\'s hover in `tooltip` mode', () => {
  getComponent({ mode: 'tooltip' });
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

  const { tab0 } = getTabs();
  fireEvent.mouseMove(tab0);
  fireEvent.mouseEnter(tab0);
  expect(screen.queryByRole('tooltip')).toBeInTheDocument();
});

test('tabs without selected keys show null tab panel content', () => {
  getComponent({ defaultSelectedKey: undefined });
  expect(screen.queryByRole('tabpanel')).not.toHaveTextContent();
});

test('hover tab style', () => {
  getComponent();

  const { tab0 } = getTabs();
  expect(tab0).not.toHaveClass('is-hovered');
  userEvent.hover(tab0);
  expect(tab0).toHaveClass('is-hovered');
});

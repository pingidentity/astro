import React from 'react';
import { Item, Section } from 'react-stately';
import { useListState } from '@react-stately/list';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import ListBox from '.';

const testId = 'test-label';

const items = [
  { name: 'a' },
  { name: 'b' },
  { name: 'c' },
];

const itemsWithSections = [
  { name: 'Heading 1',
    options: [
      { name: 'Foo' },
      { name: 'Bar' },
      { name: 'Baz' },
    ] },
];

const defaultProps = {
  'data-testid': testId,
  'aria-label': 'listbox',
  'aria-labelledby': 'label',
  items,
};

const defaultWithSectionsProps = {
  'data-testid': testId,
  'aria-label': 'listbox',
  'aria-labelledby': 'label',
  items: itemsWithSections,
};

const ListBoxWithState = React.forwardRef((props, ref) => {
  const state = useListState({ props });

  return (
    <ListBox {...props} state={state} ref={ref}>
      {item => <Item key={item.name} childItems={item.options}>{item.name}</Item>}
    </ListBox>
  );
});

const ListBoxWithSections = props => {
  const state = useListState(props);

  return (
    <ListBox {...props} state={state} />
  );
};

const getComponent = (props = {}) => render((
  <ListBoxWithState {...defaultProps} {...props} />
));

const getSectionsComponent = (props = {}) => render((
  <ListBoxWithSections {...defaultWithSectionsProps} {...props}>
    {section => (
      // eslint-disable-next-line testing-library/no-node-access
      <Section key={section.name} title={section.name} items={section.options}>
        {/* eslint-disable-next-line testing-library/no-node-access */}
        {item => <Item key={item.name} childItems={item.options}>{item.name}</Item>}
      </Section>
    )}
  </ListBoxWithSections>
));

let offsetWidth;
let offsetHeight;
let scrollHeight;
const onSelectionChange = jest.fn();

beforeAll(() => {
  offsetWidth = jest.spyOn(window.HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(() => 1000);
  offsetHeight = jest.spyOn(window.HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => 1000);
  scrollHeight = jest.spyOn(window.HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(() => 48);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  jest.useFakeTimers();
});

afterEach(() => {
  onSelectionChange.mockClear();
});

afterAll(() => {
  offsetWidth.mockReset();
  offsetHeight.mockReset();
  scrollHeight.mockReset();
});

test('default listbox', () => {
  getComponent();
  const listbox = screen.getByRole('listbox');
  expect(listbox).toBeInTheDocument();
});

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <ListBoxWithState aria-label="label" {...props} />,
});

test('renders sections and items within section', () => {
  getSectionsComponent();
  const listbox = screen.getByRole('listbox');
  expect(listbox).toBeInTheDocument();
  const section = screen.getByRole('group');
  expect(section).toBeInTheDocument();

  const options = screen.getAllByRole('option');
  expect(options.length).toBe(itemsWithSections[0].options.length);
});

test('should have is-focused class when hover', () => {
  getSectionsComponent();
  const options = screen.getAllByRole('option');

  expect(options[0]).not.toHaveClass('is-focused');
  userEvent.hover(options[0]);
  expect(options[0]).toHaveClass('is-focused');
  userEvent.hover(options[1]);
  expect(options[0]).not.toHaveClass('is-focused');
  expect(options[1]).toHaveClass('is-focused');
});

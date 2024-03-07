import React, { forwardRef } from 'react';
import { Item, Section } from 'react-stately';
import { ListProps, useListState } from '@react-stately/list';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ListBoxProps, ListStateType } from '../../types';
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

type TestItem = {
  name: string,
  options: Iterable<object>
}

type TestInterface = Omit<ListBoxProps, 'state'>

const ListBoxWithState = forwardRef((props: TestInterface, ref) => {
  const theseProps = {} as ListProps<object>;
  const state = useListState(theseProps) as ListStateType;


  return (
    <ListBox {...props} state={state} ref={ref} />
  );
});

const ListBoxWithSections = props => {
  const state = useListState(props);

  return (
    <ListBox {...props} state={state} />
  );
};

const getComponent = (props = {}) => render((
  <ListBoxWithState {...defaultProps} {...props} items={items}>
    {item => (
      <Item
        key={(item as TestItem).name}
        childItems={(item as TestItem).options}
      >
        {(item as TestItem).name}
      </Item>
    )}
  </ListBoxWithState>
));

const getSectionsComponent = (props = {}) => render((
  <ListBoxWithSections {...defaultWithSectionsProps} {...props}>
    {section => (
      <Section key={section.name} title={section.name} items={section.options}>
        {item => (
          <Item
            key={(item as TestItem).name}
            childItems={(item as TestItem).options}
          >
            {(item as TestItem).name}
          </Item>
        )}
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

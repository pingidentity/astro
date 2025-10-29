import React, { useRef } from 'react';
import { useSelectState } from 'react-stately';

import { Item } from '../../index';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { SelectItemProps } from '../SelectField/SelectField.stories';

import { HiddenSelect } from './HiddenSelect';

const items: SelectItemProps[] = [
  { key: 'a', name: 'a' },
  { key: 'b', name: 'b' },
  { key: 'c', name: 'c' },
];

const testId = 'hidden-select-field';

const defaultProps = {
  label: 'Select',
  name: 'select',
  items,
  'data-testid': testId,
};

const makeItems = (size: number) => new Array(size).fill('').map((__, index) => ({
  key: index + 1,
  name: `${index + 1}`,
}));

type HiddenSelectTestProps = {
  items: SelectItemProps[];
  label: string;
  name: string;
  isDisabled?: boolean;
  selectedKey?: string;
};

const HiddenSelectTest: React.FC<HiddenSelectTestProps> = props => {
  const triggerRef = useRef(null);
  const { label, name, isDisabled, selectedKey, ...others } = props;

  // Set up the state for the select component
  const state = useSelectState({
    children: (item: SelectItemProps) => <Item key={item.key}>{item.name}</Item>,
    selectedKey,
    ...props,
  });

  return (
    <HiddenSelect
      state={state}
      label={label}
      name={name}
      isDisabled={isDisabled}
      triggerRef={triggerRef}
      {...others}
    />
  );
};

const getComponent = (props = {}, { renderFn = render } = {}) => renderFn(
  <HiddenSelectTest {...defaultProps} {...props} />,
);

test('should render HiddenSelect', () => {
  getComponent();
  const container = screen.getByTestId('hidden-select-container');
  const select = screen.getByTestId('hidden-select-field');
  expect(container).toBeInTheDocument();
  expect(select).toBeInTheDocument();
});

test('should render select element when collection size is less than or equal to 300', () => {
  getComponent({
    items: makeItems(300),
  });
  const select = screen.getByTestId('hidden-select-field');
  expect(select).toBeInstanceOf(HTMLSelectElement);
});

test('should render hidden input when collection size is greater than 300', () => {
  getComponent({
    items: makeItems(301),
  });
  const input = screen.getByTestId('hidden-select-field');
  expect(input).toBeInTheDocument();
  expect(input).toBeInstanceOf(HTMLInputElement);
  expect(input).toHaveAttribute('type', 'hidden');
});

test('should render select element with correct options when collection size is less than or equal to 300', () => {
  getComponent({
    items: makeItems(3),
  });
  const select = screen.getByTestId('hidden-select-field');
  expect(select).toBeInTheDocument();
  expect(select).toBeInstanceOf(HTMLSelectElement);
  expect(select.children).toHaveLength(3);
  expect(select.children[0]).toHaveValue('1');
  expect(select.children[1]).toHaveValue('2');
  expect(select.children[2]).toHaveValue('3');
});

test('should render hidden input with correct value when collection size is greater than 300 and a key is selected', async () => {
  getComponent({
    items: makeItems(301),
    selectedKey: '150',
  });
  const input = screen.getByTestId('hidden-select-field');
  expect(input).toHaveValue('150');
});

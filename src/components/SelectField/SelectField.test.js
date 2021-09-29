import React from 'react';
import axeTest from '../../utils/testUtils/testAxe';

import { render, screen } from '../../utils/testUtils/testWrapper';
import { SelectField, Item } from '../../index';

const items = [
  { name: 'a' },
  { name: 'b' },
  { name: 'c' },
];
const testId = 'test-dropdown';
const controlTestId = `${testId}-input`;
const testValue = 'test';
const defaultProps = {
  label: 'testLabel',
  'data-testid': testId,
  controlProps: {
    'data-testid': controlTestId,
  },
  value: testValue,
  items,
};

const getComponent = (props = {}, { renderFn = render } = {}) => renderFn((
  <SelectField {...defaultProps} {...props}>
    {item => <Item key={item.name}>{item.name}</Item>}
  </SelectField>
));

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default select field', () => {
  getComponent();
  const container = screen.getByTestId(testId);
  const inputs = screen.getAllByLabelText(defaultProps.label);
  const hiddenInput = inputs[0];
  const visibleInput = inputs[1];
  const labels = screen.getAllByText(defaultProps.label);
  const visibleLabel = labels[0];
  const hiddenLabel = labels[1];

  expect(container).toBeInstanceOf(HTMLDivElement);
  expect(hiddenInput).toBeInstanceOf(HTMLSelectElement);
  expect(visibleInput).toBeInstanceOf(HTMLButtonElement);
  expect(hiddenLabel).toBeInstanceOf(HTMLLabelElement);
  expect(visibleLabel).toBeInstanceOf(HTMLLabelElement);
  expect(container).toBeInTheDocument();
  expect(hiddenInput).toBeInTheDocument();
  expect(visibleInput).toBeInTheDocument();
  expect(hiddenLabel).toBeInTheDocument();
  expect(visibleLabel).toBeInTheDocument();

  // jest-dom .toBeVisible does not take into account aria-hidden
  /* eslint-disable testing-library/no-node-access */
  expect(hiddenInput.closest('[aria-hidden="true"]')).not.toBeNull();
  expect(visibleInput.closest('[aria-hidden="true"]')).toBeNull();
  expect(hiddenLabel.closest('[aria-hidden="true"]')).not.toBeNull();
  expect(visibleLabel.closest('[aria-hidden="true"]')).toBeNull();
  /* eslint-enable testing-library/no-node-access */
});

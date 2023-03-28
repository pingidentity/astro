import React from 'react';
import { OverlayProvider } from 'react-aria';
import userEvent from '@testing-library/user-event';

import { Item, Section, SelectField } from '../../index';
import statuses from '../../utils/devUtils/constants/statuses';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';

const items = [
  { name: 'a' },
  { name: 'b' },
  { name: 'c' },
];

const withSection = [
  { name: 'Animals',
    key: 'Animals',
    kids: [
      { name: 'Aardvark' },
      { name: 'Kangaroo' },
      { name: 'Snake' },
    ] },
  { name: 'People',
    key: 'People',
    kids: [
      { name: 'Michael' },
      { name: 'Dwight' },
      { name: 'Creed' },
    ] },
  { name: null,
    key: 'Fruit',
    kids: [
      { name: 'Apple' },
      { name: 'Strawberry' },
      { name: 'Blueberry' },
    ] },
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

const getComponentWithSections = (props = {}, { renderFn = render } = {}) => renderFn((
  <OverlayProvider>
    <SelectField {...defaultProps} {...props} items={withSection}>
      {section => (
        <Section key={section.key} items={section.kids} title={section.name}>
          {item => <Item key={item.name}>{item.name}</Item>}
        </Section>
      )}
    </SelectField>
  </OverlayProvider>
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

test('passing helper text should display it and correct aria attributes on input', () => {
  const testHelperText = 'testHelperText';
  getComponent({ helperText: testHelperText, status: statuses.ERROR });
  const helper = screen.getByText(testHelperText);
  expect(helper).toBeInTheDocument();
  expect(helper).toHaveClass(`is-${statuses.ERROR}`);

  const visibleInput = screen.getAllByLabelText(defaultProps.label)[1];
  expect(visibleInput).toHaveAttribute('aria-invalid', 'true');

  const helperTextID = helper.getAttribute('id');
  expect(screen.getByRole('button')).toHaveAttribute('aria-describedby', helperTextID);
});

test('passing sections, renders separators', () => {
  getComponentWithSections();
  const button = screen.getByRole('button');
  userEvent.click(button);
  expect(screen.queryAllByRole('separator')).toHaveLength(2);
});

test('a blank title does not render', () => {
  getComponentWithSections();
  const button = screen.getByRole('button');
  userEvent.click(button);
  expect(screen.queryByText('Fruit')).not.toBeInTheDocument();
});

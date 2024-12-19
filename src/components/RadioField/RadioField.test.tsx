import React from 'react';
import { RadioGroupState } from 'react-stately';

import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import RadioField, { RadioContext } from './RadioField';

const testId = 'test-radio';
const testLabel = 'Test Label';
const testValue = 'test';
const defaultProps = {
  'data-testid': testId,
  label: testLabel,
  controlProps: {
    'data-testid': `${testId}-input`,
  },
  value: testValue,
};
const defaultState = {
  setLastFocusedValue: () => jest.fn(),
} as unknown as RadioGroupState;
const getComponent = (props = {}, state = defaultState) => render((
  <RadioContext.Provider value={state}>
    <RadioField {...defaultProps} {...props} />
  </RadioContext.Provider>
));

afterEach(() => {
  jest.restoreAllMocks();
});

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <RadioContext.Provider value={defaultState}>
      <RadioField {...defaultProps} {...props} />
    </RadioContext.Provider>
  ),
});

test('default radio', () => {
  getComponent();
  const container = screen.getByTestId(testId);
  const input = screen.getByLabelText(testLabel);
  const label = screen.getByText(testLabel);
  expect(container).toBeInstanceOf(HTMLDivElement);
  expect(input).toBeInstanceOf(HTMLInputElement);
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(container).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(label).toBeInTheDocument();
});

test('disabled radio', () => {
  getComponent({ isDisabled: true });
  const label = screen.getByText(testLabel);
  const input = screen.getByLabelText(testLabel);
  const { nextSibling: icon } = input;

  expect(label).toHaveClass('is-disabled');
  expect(icon).toHaveClass('is-disabled');
});

test('radio with checked content does not display if not checked', () => {
  const testContent = 'test content';
  getComponent({ checkedContent: <div>{testContent}</div> });
  const content = screen.queryByText(testContent);
  expect(content).not.toBeInTheDocument();
});

test('radio with checked content displays if checked', () => {
  const testContent = 'test content';

  const customState = {
    selectedValue: testValue,
  } as RadioGroupState;

  getComponent({ checkedContent: <div>{testContent}</div> },
    customState,
  );
  const content = screen.queryByText(testContent);
  expect(content).toBeInTheDocument();
});

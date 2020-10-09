import React from 'react';
import { useFocusRing } from '@react-aria/focus';
import { render, screen } from '@testing-library/react';
import RadioField, { RadioContext } from './RadioField';

const testId = 'test-radio';
const testLabel = 'Test Label';
const testValue = 'test';
const defaultProps = {
  'data-testid': testId,
  children: testLabel,
  controlProps: {
    'data-testid': `${testId}-input`,
  },
  value: testValue,
};
const getComponent = (props = {}, value = {}) => render((
  <RadioContext.Provider value={value}>
    <RadioField {...defaultProps} {...props} />
  </RadioContext.Provider>
));

afterEach(() => {
  jest.restoreAllMocks();
});

test('default radio', () => {
  getComponent();
  const container = screen.getByTestId(testId);
  const input = screen.getByLabelText(testLabel);
  const label = screen.getByText(testLabel);
  const icon = document.querySelector('svg');
  expect(container).toBeInstanceOf(HTMLDivElement);
  expect(input).toBeInstanceOf(HTMLInputElement);
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(container).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(label).toBeInTheDocument();
  expect(icon).toHaveStyleRule('background-color', 'transparent', { target: ':focus' });
});

test('radio with focus', () => {
  useFocusRing.mockImplementation(() => ({ isFocusVisible: true, focusProps: {} }));
  getComponent();
  const icon = document.querySelector('svg');
  expect(icon).toHaveStyleRule('background-color', 'highlight', { target: ':focus' });
});

test('radio with checked content does not display if not checked', () => {
  const testContent = 'test content';
  getComponent({ checkedContent: <div>{testContent}</div> });
  const content = screen.queryByText(testContent);
  expect(content).not.toBeInTheDocument();
});

test('radio with checked content displays if checked', () => {
  const testContent = 'test content';
  getComponent({
    checkedContent: <div>{testContent}</div>,
  }, {
    selectedValue: testValue,
  });
  const content = screen.queryByText(testContent);
  expect(content).toBeInTheDocument();
});

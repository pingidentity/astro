import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../utils/testUtils/testWrapper';
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

test('disabled radio', () => {
  getComponent({ isDisabled: true });
  const label = screen.getByText(testLabel);
  const icon = document.querySelector('svg');

  expect(label).toHaveClass('is-disabled');
  expect(icon).toHaveClass('is-disabled');

  expect(label).toHaveStyle({ opacity: 0.5, pointerEvents: 'none' });
  expect(icon).toHaveStyle({ opacity: 0.5, pointerEvents: 'none' });
});

test('radio with focus', () => {
  getComponent();
  const input = screen.getByLabelText(testLabel);
  const icon = document.querySelector('svg');

  userEvent.tab();
  expect(input).toHaveFocus();
  expect(icon).toHaveStyle({ backgroundColor: 'highlight' });
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

import React from 'react';
import { render, screen } from '@testing-library/react';
import TextField from '.';

const testId = 'test-text-field';
const testLabel = 'Test Label';
const defaultProps = {
  'data-testid': testId,
  label: testLabel,
};
const getComponent = (props = {}) => render(<TextField {...defaultProps} {...props} />);

test('default text field', () => {
  getComponent();
  const field = screen.getByTestId(testId);
  const label = screen.getByText(testLabel);
  const control = screen.getByLabelText(testLabel);
  expect(field).toBeInstanceOf(HTMLDivElement);
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(control).toBeInstanceOf(HTMLInputElement);
  expect(field).toBeInTheDocument();
  expect(label).toBeInTheDocument();
  expect(control).toBeInTheDocument();
});

test('text field with control props', () => {
  getComponent({ controlProps: { color: 'red' } });
  const control = screen.getByLabelText(testLabel);
  expect(control).toHaveStyleRule('color', 'red');
});

test('text field with label props', () => {
  getComponent({ labelProps: { color: 'red' } });
  const label = screen.getByText(testLabel);
  expect(label).toHaveStyleRule('color', 'red');
});

test('text field with left label', () => {
  getComponent({ labelMode: 'left' });
  const label = screen.getByText(testLabel);
  expect(label).toHaveClass('is-left-label');
});

test('text field with helper text', () => {
  const helperText = 'helper text';
  getComponent({ helperText });
  const helper = screen.getByText(helperText);
  expect(helper).toBeInTheDocument();
});

test('label will receive gridRow attribute if it will be higher than input', () => {
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight',
  );
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetHeight: {
      get() { return this.tagName === 'LABEL' ? 500 : 100; },
    },
  });
  getComponent();
  expect(screen.getByText(defaultProps.label)).toHaveStyle('grid-row: 1/5');
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
});

import React from 'react';
import { render, screen } from '../../utils/testUtils/testWrapper';
import Field from '.';

const testId = 'test-field';
const testLabel = 'Test Label';
const defaultProps = {
  'data-testid': testId,
  label: testLabel,
  render: props => <input {...props} />,
};
const getComponent = (props = {}) => render(
  <Field {...defaultProps} {...props}>
    {props.children}
  </Field>,
);

test('field with input', () => {
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

test('field with select', () => {
  const renderProp = props => <select {...props} />;
  getComponent({ render: renderProp });
  const field = screen.getByTestId(testId);
  const label = screen.getByText(testLabel);
  const control = screen.getByLabelText(testLabel);
  expect(field).toBeInstanceOf(HTMLDivElement);
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(control).toBeInstanceOf(HTMLSelectElement);
  expect(field).toBeInTheDocument();
  expect(label).toBeInTheDocument();
  expect(control).toBeInTheDocument();
});

test('field with textarea', () => {
  const renderProp = props => <textarea {...props} />;
  getComponent({ render: renderProp });
  const field = screen.getByTestId(testId);
  const label = screen.getByText(testLabel);
  const control = screen.getByLabelText(testLabel);
  expect(field).toBeInstanceOf(HTMLDivElement);
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(control).toBeInstanceOf(HTMLTextAreaElement);
  expect(field).toBeInTheDocument();
  expect(label).toBeInTheDocument();
  expect(control).toBeInTheDocument();
});

test('id can be set distinctly on container and control', () => {
  getComponent({ id: 'test', controlProps: { id: 'test-control' } });
  const field = screen.getByTestId(testId);
  const label = screen.getByText(testLabel);
  const control = screen.getByLabelText(testLabel);
  expect(field).toHaveAttribute('id', 'test');
  expect(control).toHaveAttribute('id', 'test-control');
  expect(label).toHaveAttribute('for', 'test-control');
});

test('field with isDisabled prop disables input and applies disabled styling to label', () => {
  const renderProp = props => <textarea {...props} />;
  getComponent({ isDisabled: true, render: renderProp });
  const input = document.querySelector('textarea');
  expect(input).toBeDisabled();
  const label = screen.getByText(testLabel);
  expect(label).toHaveStyle('opacity: 0.5');
});

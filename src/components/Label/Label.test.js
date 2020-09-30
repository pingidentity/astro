import React from 'react';
import { render, screen } from '@testing-library/react';
import Label from '.';
import Input from '../Input';

const testId = 'test-label';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(<Label {...defaultProps} {...props} />);

test('default label', () => {
  getComponent();
  const label = screen.getByTestId(testId);
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(label).toBeInTheDocument();
});

test('label with an input', () => {
  const labelText = 'This is a label';
  const inputId = 'blah';
  const children = (
    <>
      {labelText}
      <Input id={inputId} />
    </>
  );
  getComponent({ children, htmlFor: inputId });
  const label = screen.getByLabelText(labelText);
  expect(label).toBeInTheDocument();
});

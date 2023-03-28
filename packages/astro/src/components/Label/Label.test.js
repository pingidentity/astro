import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import axeTest from '../../utils/testUtils/testAxe';
import Input from '../Input';

import Label from '.';


const testId = 'test-label';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(<Label {...defaultProps} {...props} />);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default label', () => {
  getComponent();
  const label = screen.getByTestId(testId);
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(label).toBeInTheDocument();
});

test('required label', () => {
  getComponent({ isRequired: true });
  const label = screen.getByTestId(testId);
  expect(label).toHaveTextContent('*');
});

test('required label with custom indicator', () => {
  const requiredIndicator = '>Required<';
  getComponent({ isRequired: true, requiredIndicator });
  const label = screen.getByTestId(testId);
  expect(label).not.toHaveTextContent('*');
  expect(label).toHaveTextContent(requiredIndicator);
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

test('label with helpHint', () => {
  const hintText = 'Hint Text';
  getComponent({ hintText });
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  fireEvent.mouseMove(button);
  fireEvent.mouseEnter(button);
  expect(screen.getByText(hintText)).toBeInTheDocument();
});

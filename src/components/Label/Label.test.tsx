import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Input, Label } from '../..';
import { LabelProps } from '../../types';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const testId = 'test-label';
const defaultProps: LabelProps = {
  'data-testid': testId,
};
const getComponent = (props: LabelProps = {}) => render(<Label {...defaultProps} {...props} />);

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <Label {...props} /> });

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

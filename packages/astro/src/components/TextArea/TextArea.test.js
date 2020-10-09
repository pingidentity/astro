import React from 'react';
import { render, screen } from '@testing-library/react';
import TextArea from '.';

const testId = 'textAreaField';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(
  <TextArea {...defaultProps} {...props} />,

);

test('TextArea renders', () => {
  getComponent();
  const textArea = screen.getByTestId(testId);
  expect(textArea).toBeInstanceOf(HTMLTextAreaElement);
  expect(textArea).toBeInTheDocument();
});

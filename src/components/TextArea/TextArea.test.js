import React from 'react';
import { render, screen } from '@testing-library/react';
import TextArea from '.';
import axeTest from '../../utils/testUtils/testAxe';

const testId = 'textAreaField';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(
  <TextArea {...defaultProps} {...props} />,
);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent, {
  // TextArea with label provided by TextAreaField
  rules: {
    'label': { enabled: false },
  },
});

test('TextArea renders', () => {
  getComponent();
  const textArea = screen.getByTestId(testId);
  expect(textArea).toBeInstanceOf(HTMLTextAreaElement);
  expect(textArea).toBeInTheDocument();
});

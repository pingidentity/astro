import React from 'react';
import { render, screen } from '@testing-library/react';

import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import TextArea from '.';

const testId = 'textAreaField';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(
  <TextArea {...defaultProps} {...props} />,
);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <TextArea label="label" {...props} />,
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

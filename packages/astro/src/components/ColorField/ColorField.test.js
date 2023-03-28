import React from 'react';
import userEvent from '@testing-library/user-event';

import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';

import ColorField from './ColorField';

const testId = 'test-colorField';
const testLabel = 'test-colorField-label';
const hexLabel = 'hex';
const testColor1 = '#ffffff';
const testColor2 = '#fffff1';

const defaultProps = {
  'data-testid': testId,
  label: testLabel,
  helperText: 'test-helper-text',
};

const getComponent = (props = {}) => render(<ColorField {...defaultProps} {...props} />);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('renders ColorField component', () => {
  getComponent();
  const container = screen.getByLabelText(testLabel);
  expect(container).toBeInTheDocument();
});

test('button will have provided color background', () => {
  getComponent({ value: testColor1 });
  const button = screen.getByRole('button');
  expect(button).toHaveStyle(`background-color: ${testColor1}`);
});

test('will call onChange with arguments if provided', () => {
  const testOnChange = jest.fn();
  getComponent({ onChange: testOnChange, value: testColor1 });
  const button = screen.getByRole('button');
  userEvent.click(button);
  const hexInput = screen.getByLabelText(hexLabel);
  userEvent.clear(hexInput);
  userEvent.type(hexInput, testColor2);
  expect(testOnChange).toHaveBeenCalled();
});

test('clicking within the popover does not close it', () => {
  const testOnChange = jest.fn();
  getComponent({ onChange: testOnChange, value: testColor1 });
  const button = screen.getByRole('button');
  userEvent.click(button);
  // should be open now
  const hexLabelElement = screen.queryByText(hexLabel);
  expect(hexLabelElement).toBeInTheDocument();
  // click the popover container, which has caused closing in regressions
  userEvent.click(screen.queryByRole('presentation'));
  expect(screen.queryByRole('presentation')).toBeInTheDocument();
});

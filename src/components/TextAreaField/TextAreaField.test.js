import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { screen, render } from '../../utils/testUtils/testWrapper';
import theme from '../../styles/theme';
import TextAreaField from '.';

const testId = 'test-textAreaField';
const defaultProps = {
  'data-testid': testId,
  label: 'testLabel',
};
const getComponent = (props = {}) => render(
  <TextAreaField {...defaultProps} {...props} />,
);

const mockfunction = jest.fn();

test('disabled prop disables input', () => {
  getComponent({ isDisabled: true });
  const textArea = screen.getByLabelText(defaultProps.label);
  expect(textArea).toBeDisabled();
});

test('text area field has focus', () => {
  getComponent();
  const textArea = screen.getByLabelText(defaultProps.label);

  userEvent.tab();
  expect(textArea).toHaveFocus();
  expect(textArea).toHaveClass('is-focused');
  expect(textArea).toHaveStyle({ borderColor: theme.colors.accent[80] });
});

test('disabled prop disables text field label', () => {
  getComponent({ isDisabled: true });
  const label = screen.getByText(defaultProps.label);
  expect(label).toHaveClass('is-disabled');
  expect(label).toHaveStyle({ opacity: 0.5 });
});

test('text area field with helper text', () => {
  const helperText = 'helper text';
  getComponent({ helperText });
  const helper = screen.getByText(helperText);
  expect(helper).toBeInTheDocument();
});

test('float label prop adds float label class', () => {
  const labelMode = 'float';
  const helperText = 'helper text';
  getComponent({ helperText, labelMode });
  const label = screen.getByText(defaultProps.label);
  expect(label).toHaveClass('is-float-label');
});

test('mousemove calls resize event', () => {
  const labelMode = 'float';
  const helperText = 'helper text';
  getComponent({ helperText, labelMode, resizeCallback: mockfunction });
  const textArea = screen.getByLabelText(defaultProps.label);
  fireEvent.mouseMove(textArea);
  fireEvent.mouseMove(textArea);
  expect(mockfunction).toHaveBeenCalledTimes(2);
});

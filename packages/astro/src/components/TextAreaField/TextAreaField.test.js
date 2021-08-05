import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { screen, render } from '../../utils/testUtils/testWrapper';
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
});

test('disabled prop disables text field label', () => {
  getComponent({ isDisabled: true });
  const label = screen.getByText(defaultProps.label);
  expect(label).toHaveClass('is-disabled');
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

test('label will receive gridRow attribute if it will be higher than textarea', () => {
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

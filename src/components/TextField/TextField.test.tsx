import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextFieldProps } from '../../types';
import statuses from '../../utils/devUtils/constants/statuses';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { universalFieldComponentTests } from '../../utils/testUtils/universalFormSubmitTest';

import TextField from '.';

const testId = 'test-text-field';
const testLabel = 'Test Label';
const defaultProps = {
  'data-testid': testId,
  label: testLabel,
};
const getComponent = (props: TextFieldProps = {}) => render(
  <TextField {...defaultProps} {...props} />,
);

universalFieldComponentTests({
  renderComponent: props => (
    <TextField {...defaultProps} {...props} />
  ),
  testValue: 'testvalue',
  testLabel,
  componentType: 'TextField',
});

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <TextField {...defaultProps} {...props} /> });

test('default text field', () => {
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

test('text field with left label', () => {
  getComponent({ labelMode: 'left' });
  const label = screen.getByText(testLabel);
  expect(label).toHaveClass('is-left-label');
});

test('text field with helper text', () => {
  const helperText = 'helper text';
  getComponent({ helperText });
  const helper = screen.getByText(helperText);
  expect(helper).toBeInTheDocument();
});

test('label will receive gridRow attribute if it will be higher than input', () => {
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight',
  );
  if (originalOffsetHeight) {
    Object.defineProperties(window.HTMLElement.prototype, {
      offsetHeight: {
        get() { return this.tagName === 'LABEL' ? 500 : 100; },
      },
    });
    getComponent();
    expect(screen.getByText(defaultProps.label)).toHaveStyle('grid-row: 1/5');
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
  }
});

test('form wrapper will have default max label column width when no custom width set', () => {
  const labelMode = 'left';
  getComponent({ labelMode });
  const textAreaContainer = screen.getByTestId(testId);
  expect(textAreaContainer).toHaveStyle('grid-template-columns: 40% auto');
});

test('form wrapper will have a max label column width when custom width set', () => {
  const labelMode = 'left';
  const containerProps = { sx: { gridTemplateColumns: '120px auto' } };
  getComponent({ labelMode, containerProps });
  const textAreaContainer = screen.getByTestId(testId);
  expect(textAreaContainer).toHaveStyle('grid-template-columns: 120px auto');
});

test('text aria container have class name when value is provided', () => {
  const labelMode = 'float';
  getComponent({ labelMode, value: 'text' });
  const textAreaContainer = screen.getByTestId(testId);
  expect(textAreaContainer.className).toMatch('has-value');
});

test('text aria container have class name when default value is provided', () => {
  const labelMode = 'float';
  getComponent({ labelMode, defaultValue: 'text' });
  const textAreaContainer = screen.getByTestId(testId);
  expect(textAreaContainer.className).toMatch('has-value');
});

test('text aria container have class name when placeholder is provided', () => {
  const labelMode = 'float';
  getComponent({ labelMode, placeholder: 'text' });
  const textAreaContainer = screen.getByTestId(testId);
  expect(textAreaContainer.className).toMatch('has-value');
});

test('text aria container have class name when placeholder is provided and value was entered and then removed', () => {
  const labelMode = 'float';
  getComponent({ labelMode, placeholder: 'text' });
  const textAreaContainer = screen.getByTestId(testId);
  const inputControl = screen.getByLabelText(testLabel);
  expect(textAreaContainer).toHaveClass('has-value');
  userEvent.type(inputControl, 'test text{enter}');
  expect(textAreaContainer).toHaveClass('has-value');
  userEvent.clear(inputControl);
  expect(textAreaContainer).toHaveClass('has-value');
});

test('text field container and input have is-read-only class name when isReadOnly prop provided', () => {
  getComponent({ isReadOnly: true });
  const control = screen.getByLabelText(testLabel);
  expect(control).toHaveClass('is-read-only');
});

test('passing helper text should display it and correct aria attributes on input', () => {
  const testHelperText = 'testHelperText';
  getComponent({ helperText: testHelperText, status: statuses.ERROR });
  const helper = screen.getByText(testHelperText);
  expect(helper).toBeInTheDocument();
  expect(helper).toHaveClass(`is-${statuses.ERROR}`);

  const input = screen.getByRole('textbox');
  expect(input).toHaveAttribute('aria-invalid', 'true');

  const helperTextID = helper.getAttribute('id');
  expect(input).toHaveAttribute('aria-describedby', helperTextID);
});

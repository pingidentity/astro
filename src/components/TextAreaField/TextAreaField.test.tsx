import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextAreaFieldProps } from '../../types/TextAreaField';
import statuses from '../../utils/devUtils/constants/statuses';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { universalFieldComponentTests } from '../../utils/testUtils/universalFormSubmitTest';

import TextAreaField from '.';

const testId = 'test-textAreaField';
const defaultProps: TextAreaFieldProps = {
  'data-testid': testId,
  label: 'testLabel',
};

const label = defaultProps.label as string;

const getComponent = (props = {}) => render(
  <TextAreaField {...defaultProps} {...props} />,
);

const mockfunction = jest.fn();

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <TextAreaField {...defaultProps} {...props} />,
});

universalFieldComponentTests({
  renderComponent: props => (
    <TextAreaField {...defaultProps} {...props} />
  ),
  testValue: 'testvalue',
  testLabel: defaultProps.label,
  componentType: 'TextAreaField',
});

test('disabled prop disables input', () => {
  getComponent({ isDisabled: true });
  const textArea = screen.getByLabelText(label);
  expect(textArea).toBeDisabled();
});

test('text area field has focus', () => {
  getComponent();
  const textArea = screen.getByLabelText(label);

  userEvent.tab();
  expect(textArea).toHaveFocus();
  expect(textArea).toHaveClass('is-focused');
});

test('disabled prop disables text field label', () => {
  getComponent({ isDisabled: true });
  const labelDom = screen.getByText(label);
  expect(labelDom).toHaveClass('is-disabled');
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
  const labelDom = screen.getByText(label);
  expect(labelDom).toHaveClass('is-float-label');
});

test('mousemove calls resize event', () => {
  const labelMode = 'float';
  const helperText = 'helper text';
  getComponent({ helperText, labelMode, resizeCallback: mockfunction });
  const textArea = screen.getByLabelText(label);
  fireEvent.mouseMove(textArea);
  fireEvent.mouseMove(textArea);
  expect(mockfunction).toHaveBeenCalledTimes(2);
});

test('label will receive gridRow attribute if it will be higher than textarea', () => {
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight',
  ) || {};
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetHeight: {
      get() { return this.tagName === 'LABEL' ? 500 : 100; },
    },
  });
  getComponent();
  expect(screen.getByText(label)).toHaveStyle('grid-row: 1/5');
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
});

test('form wrapper will have default max label column width when no custom width set', () => {
  const labelMode = 'left';
  getComponent({ labelMode });
  const textAreaContainer = screen.getByTestId(testId);
  expect(textAreaContainer).toHaveStyle('grid-template-columns: 40% auto');
});

test('passing read only prop applys the is-read-only class to the textarea', () => {
  const isReadOnly = true;
  getComponent({ isReadOnly });
  const textArea = screen.getByLabelText(label);
  expect(textArea).toHaveClass('is-read-only');
});

test('form wrapper will have a max label column width when custom width set', () => {
  const labelMode = 'left';
  const containerProps = { sx: { gridTemplateColumns: '120px auto' } };
  getComponent({ labelMode, containerProps });
  const textAreaContainer = screen.getByTestId(testId);
  expect(textAreaContainer).toHaveStyle('grid-template-columns: 120px auto');
});

test('providing slot props causes slot to render', () => {
  const slot = <p data-testid="testSlot">testText</p>;
  const slots = {
    inContainer: slot,
  };
  getComponent({ slots });

  expect(screen.getByTestId('testSlot')).toBeInTheDocument();
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

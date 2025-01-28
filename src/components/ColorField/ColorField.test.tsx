import React from 'react';
import userEvent from '@testing-library/user-event';

import { ColorFieldProps } from '../../types';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { universalFieldComponentTests } from '../../utils/testUtils/universalFormSubmitTest';

import ColorField from './ColorField';

const testId = 'test-colorField';
const testLabel = 'test-colorField-label';
const hexLabel = 'hex';
const testColor1 = '#FFFFFF';
const testColor2 = '#fffff1';

const defaultProps = {
  'data-testid': testId,
  label: testLabel,
  helperText: 'test-helper-text',
};

const getComponent = (props: ColorFieldProps = {}) => render(
  <ColorField {...defaultProps} {...props} />,
);

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <ColorField {...defaultProps} {...props} /> });

universalFieldComponentTests({
  renderComponent: props => <ColorField {...defaultProps} {...props} />,
  testValue: testColor1,
  testLabel,
  componentType: 'ColorField',
});

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
  userEvent.click(screen.getByRole('presentation'));
  expect(screen.getByRole('presentation')).toBeInTheDocument();
});

test('renders detailed button preview mode correctly', () => {
  getComponent({ mode: 'detailed-button-preview', value: testColor1 });

  expect(screen.getByText(testLabel)).toBeInTheDocument();
  expect(screen.getByText(testColor1.toLocaleUpperCase())).toBeInTheDocument();
});

test('renders MenuUp / MenuDown icon correctly', () => {
  getComponent({ mode: 'detailed-button-preview', value: testColor1 });

  const button = screen.getByRole('button');
  userEvent.click(button);
  expect(screen.getByTitle('menu-up')).toBeInTheDocument();

  userEvent.click(button);
  expect(screen.getByTitle('menu-down')).toBeInTheDocument();
});

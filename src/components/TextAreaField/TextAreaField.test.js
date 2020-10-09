import React from 'react';
import { useFocusRing } from '@react-aria/focus';
import { render } from '@testing-library/react';
import TextAreaField from './TextAreaField';


jest.mock('@react-aria/focus', () => ({
  ...jest.requireActual('@react-aria/focus'),
  useFocusRing: jest.fn(() => ({
    isFocusVisible: false,
    focusProps: {},
  })),
}));

const testId = 'test-textAreaField';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(
  <TextAreaField {...defaultProps} {...props} label="test" />,
);


test('disabled prop disables input', () => {
  getComponent({ isDisabled: true });
  const textArea = document.querySelector('textArea');
  expect(textArea).toBeDisabled();
});

test('textAreaField has focus', () => {
  useFocusRing.mockImplementation(() => ({ isFocusVisible: true, focusProps: {} }));
  getComponent();
  const icon = document.querySelector('textArea');
  expect(icon).toHaveStyleRule('background-color', 'highlight', { target: ':focus' });
});


test('disabled prop disables text field label', () => {
  getComponent({ isDisabled: true, label: 'testLabel' });
  const label = document.querySelector('label');
  expect(label).toHaveStyleRule('opacity', '0.5');
});

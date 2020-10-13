import React from 'react';
import { useFocusRing } from '@react-aria/focus';
import { render, screen, within } from '@testing-library/react';
import Dropdown from '.';


jest.mock('@react-aria/focus', () => ({
  ...jest.requireActual('@react-aria/focus'),
  useFocusRing: jest.fn(() => ({
    isFocusVisible: false,
    focusProps: {},
  })),
}));

const testId = 'test-box';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(
  <Dropdown {...defaultProps} {...props}>
    {props.children}
  </Dropdown>,
);

test('dropdown renders', () => {
  getComponent();
  const dropdown = screen.getByTestId(testId);
  expect(dropdown).toBeInstanceOf(HTMLSelectElement);
  expect(dropdown).toBeInTheDocument();
});

test('hasNoneOption prop renders none option', () => {
  getComponent({ hasNoneOption: true, noneLabel: 'None' });
  expect(within(document).getByText('None')).toBeTruthy();
});

test('dropdown has focus styles', () => {
  useFocusRing.mockImplementation(() => ({ isFocusVisible: true, focusProps: {} }));
  getComponent();
  const dropdownMenu = document.querySelector('select');
  expect(dropdownMenu).toHaveStyleRule('box-shadow', 'focus', { target: ':focus' });
});

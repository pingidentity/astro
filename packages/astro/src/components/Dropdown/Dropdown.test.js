import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen, within } from '../../utils/testUtils/testWrapper';
import theme from '../../styles/theme';
import Dropdown from '.';

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
  getComponent();
  const dropdown = screen.getByTestId(testId);
  expect(dropdown).not.toHaveStyle({ boxShadow: theme.shadows.focus });

  userEvent.tab();
  expect(dropdown).toHaveStyle({ boxShadow: theme.shadows.focus });
});

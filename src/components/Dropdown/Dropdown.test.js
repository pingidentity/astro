import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen, within } from '../../utils/testUtils/testWrapper';
import theme from '../../styles/theme';
import Dropdown from '.';

const testId = 'test-box';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => {
  const { children } = props;
  return render(
    <Dropdown {...defaultProps} {...props}>
      {children}
    </Dropdown>,
  );
};

test('dropdown renders', () => {
  getComponent();
  const dropdown = screen.getByTestId(testId);
  expect(dropdown).toBeInstanceOf(HTMLSelectElement);
  expect(dropdown).toBeInTheDocument();
});

test('hasNoneOption prop renders none option', () => {
  getComponent({ hasNoneOption: true, noneLabel: 'None' });
  expect(within(document).getByText('None')).toBeInTheDocument();
});

test('dropdown has focus styles', () => {
  getComponent();
  const dropdown = screen.getByTestId(testId);
  expect(dropdown).not.toHaveStyle({ boxShadow: theme.shadows.focus });

  userEvent.tab();
  expect(dropdown).toHaveStyle({ boxShadow: theme.shadows.focus });
});

test('default option is first one', () => {
  getComponent();
  const firstOption = screen.getByRole('option');
  expect(firstOption.value).toEqual('');
  expect(firstOption).toHaveAttribute('selected', '');
  expect(firstOption).toBeEnabled();
});

test('default option is disabled when hasDisabledFirstOption is passed in', () => {
  getComponent({ hasDisabledFirstOption: true });
  const firstOption = screen.getByRole('option');
  expect(firstOption.value).toEqual('');
  expect(firstOption).toHaveAttribute('selected', '');
  expect(firstOption).toBeDisabled();
});

test('default option is not first one when custom defaultValue is passed in', () => {
  getComponent({ defaultValue: '1' });
  const firstOption = screen.getByRole('option');
  expect(firstOption).not.toHaveAttribute('selected', '');
});

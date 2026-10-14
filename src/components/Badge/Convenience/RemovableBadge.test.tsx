import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RemovableBadge } from '../../..';
import { RemovableBadgeProps } from '../../../types';

const testId = 'test-separator';

const defaultProps: Partial<RemovableBadgeProps> = {
  'data-testid': testId,
  label: 'Test Label',
};

const getComponent = (props: Partial<RemovableBadgeProps> = {}) => render(
  <RemovableBadge {...defaultProps} {...props} />,
);

test('renders RemovableBadge component', () => {
  getComponent();
  const badge = screen.getByTestId(testId);
  expect(badge).toBeInTheDocument();
});

test('renders inverted RemovableBadge component', () => {
  getComponent({ isInverted: true });
  const badge = screen.getByTestId(testId);
  expect(badge).toBeInTheDocument();
});

test('click on close button triggers onClose function', async () => {
  const closeFunc = jest.fn();
  getComponent({ id: 'test', onClose: closeFunc });
  const closeButton = screen.getByRole('button');
  await userEvent.click(closeButton);
  expect(closeFunc).toBeCalledWith('test');
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Chip from '../Chip/Chip';
import Button from '../Button/Button';
import axeTest from '../../utils/testUtils/testAxe';

const testId = 'test-separator';

const defaultProps = {
  'data-testid': testId,
  label: 'Test Label',
};

const getComponent = (props = {}) => render(
  <Chip {...defaultProps} {...props} />,
);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('renders Chip component', () => {
  getComponent();
  const separator = screen.getByTestId(testId);
  expect(separator).toBeInTheDocument();
});

test('renders children within Chip component', () => {
  const children = (
    <Button />
  );
  getComponent({ children });
  const mockedChildren = screen.getByRole('button');
  expect(mockedChildren).toBeInTheDocument();
});

test('renders Chip component with uppercase', () => {
  const label = 'uppercase';
  const isUppercase = true;

  getComponent({ label, isUppercase });
  expect(screen.queryByText('uppercase')).toHaveStyleRule('text-transform', 'uppercase');
});

test('renders Chip component with custom alignment', () => {
  const align = 'right';

  getComponent({ align });
  expect(screen.getByTestId(testId)).toHaveStyleRule('position', 'absolute');
  expect(screen.getByTestId(testId)).toHaveStyleRule('right', '15px');
});

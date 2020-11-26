import React from 'react';
import { render, screen } from '@testing-library/react';
import Chip from '../Chip/Chip';
import Button from '../Button/Button';

const testId = 'test-separator';

const defaultProps = {
  'data-testid': testId,
  label: 'Test Label',
};

const getComponent = (props = {}) => render(
  <Chip {...defaultProps} {...props} />,
);

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

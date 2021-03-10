import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import Button from '../Button';

const testId = 'test-separator';

const defaultProps = {
  'data-testid': testId,
  label: 'Test Label',
};

const getComponent = (props = {}) => render(
  <Card {...defaultProps} {...props} />,
);

test('renders Card component', () => {
  getComponent();
  const separator = screen.getByTestId(testId);
  expect(separator).toBeInTheDocument();
});

test('renders children within Card component', () => {
  const children = (
    <Button />
  );
  getComponent({ children });
  const mockedChildren = screen.getByRole('button');
  expect(mockedChildren).toBeInTheDocument();
});

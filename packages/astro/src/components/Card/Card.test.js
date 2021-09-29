import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import Button from '../Button';
import axeTest from '../../utils/testUtils/testAxe';

const testId = 'test-separator';

const defaultProps = {
  'data-testid': testId,
  label: 'Test Label',
};

const getComponent = (props = {}) => render(
  <Card {...defaultProps} {...props} />,
);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

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

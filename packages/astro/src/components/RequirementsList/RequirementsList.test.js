import React from 'react';
import { render, screen } from '@testing-library/react';
import RequirementsList from '.';

const testId = 'test-requirements-list';
const testRequirements = [
  {
    name: '6 characters',
    status: 'default',
  },
  {
    name: '1 UPPERCASE letter',
    status: 'success',
  },
  {
    name: '1 lowercase letter',
    status: 'success',
  },
  {
    name: '1 number',
    status: 'error',
  },
  {
    name: 'Password Strength',
    status: 'warning',
  },
];

const defaultProps = {
  'data-testid': testId,
  requirements: testRequirements,
};
const getComponent = (props = {}) => render(<RequirementsList {...defaultProps} {...props} />);

test('base case requirements list', () => {
  getComponent();
  const requirementsList = screen.getByTestId(testId);
  expect(requirementsList).toBeInstanceOf(HTMLDivElement);
  expect(requirementsList).toBeInTheDocument();
});

test('empty variables requirements list', () => {
  getComponent({ requirementsList: [] });
  const requirementsList = screen.getByTestId(testId);
  expect(requirementsList).toBeInstanceOf(HTMLDivElement);
  expect(requirementsList).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import PageHeader from './PageHeader';
import axeTest from '../../utils/testUtils/testAxe';

const testTitle = 'Test Title';
const defaultProps = {
  title: testTitle,
};

const getComponent = (props = {}) => render(
  <PageHeader {...defaultProps} {...props} />,
);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('renders pageheader and title', () => {
  getComponent();
  const title = screen.getByRole('heading');
  expect(title).toBeInTheDocument();
});

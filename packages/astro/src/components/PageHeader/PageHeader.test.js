import React from 'react';
import { render, screen } from '@testing-library/react';
import PageHeader from './PageHeader';

const testTitle = 'Test Title';
const defaultProps = {
  title: testTitle,
};

const getComponent = (props = {}) => render(
  <PageHeader {...defaultProps} {...props} />,
);

test('renders pageheader and title', () => {
  getComponent();
  const title = screen.getByRole('heading');
  expect(title).toBeInTheDocument();
});

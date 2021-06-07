import React from 'react';
import { render, screen } from '@testing-library/react';
import ListItem from './ListItem';

const testTitle = 'Test Title';
const defaultProps = {
  title: testTitle,
};

const getComponent = (props = {}) => render(
  <ListItem {...defaultProps} {...props} />,
);

test('renders ListItem component title', () => {
  getComponent();
  const title = screen.getByRole('listitem');
  expect(title).toBeInTheDocument();
});

test('renders ListItem component with selected state', () => {
  getComponent({ isSelected: true });
  const title = screen.getByRole('listitem');
  expect(title).toHaveClass('is-selected');
});

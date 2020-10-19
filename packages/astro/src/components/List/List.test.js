import React from 'react';
import { render, screen } from '@testing-library/react';
import List from './List';

const testLabel = 'Test Label';
const defaultProps = {
  title: testLabel,
};

const getComponent = (props = {}) => render(
  <List {...defaultProps} {...props} />,
);

test('renders List component', () => {
  getComponent();
  const list = screen.getByRole('list');
  expect(list).toBeInstanceOf(HTMLUListElement);
  expect(list).toBeInTheDocument();
});

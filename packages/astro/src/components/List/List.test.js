import React from 'react';
import { render, screen } from '@testing-library/react';
import List from './List';
import axeTest from '../../utils/testUtils/testAxe';

const testLabel = 'Test Label';
const defaultProps = {
  title: testLabel,
};

const getComponent = (props = {}) => render(
  <List {...defaultProps} {...props} />,
);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('renders List component', () => {
  getComponent();
  const list = screen.getByRole('list');
  expect(list).toBeInstanceOf(HTMLUListElement);
  expect(list).toBeInTheDocument();
});

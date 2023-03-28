import React from 'react';
import { render, screen } from '@testing-library/react';

import axeTest from '../../utils/testUtils/testAxe';

import Bracket from '.';

const testId = 'test-bracket';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(
  <Bracket {...defaultProps} {...props} />,
);

// // Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);


test('default bracket', () => {
  getComponent();
  const bracket = screen.getByTestId(testId);
  expect(bracket).toBeInTheDocument();
});

test('additional svg does not render if isLast=true', () => {
  getComponent({ isLast: true });
  expect(screen.queryByTestId('isLastLayer')).not.toBeInTheDocument();
});

test('additional svg does render if isLast=false', () => {
  getComponent({ isLast: false });
  expect(screen.queryByTestId('isLastLayer')).toBeInTheDocument();
});

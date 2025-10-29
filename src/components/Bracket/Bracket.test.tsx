import React from 'react';
import { render, screen } from '@testing-library/react';

import { BracketProps } from '../../types';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Bracket from '.';

const testId = 'test-bracket';
const defaultProps: BracketProps = {
  'data-testid': testId,
};

const getComponent = (props = {}) => render(
  <Bracket {...defaultProps} {...props} />,
);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <Bracket {...defaultProps} {...props} />
  ),
});

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

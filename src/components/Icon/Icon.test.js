import React from 'react';
import { render, screen } from '@testing-library/react';
import { Earth } from '@pingux/icons';
import Icon from '../Icon';

const testId = 'test-icon';
const defaultProps = {
  'data-testid': testId,
  icon: Earth,
};
const getComponent = (props = {}) => render((
  <Icon {...defaultProps} {...props} />
));

test('default icon', () => {
  getComponent();
  const icon = screen.getByTestId(testId);
  expect(icon).toBeInstanceOf(SVGSVGElement);
  expect(icon).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Earth from 'mdi-react/EarthIcon';
import Icon from '../Icon';
import axeTest from '../../utils/testUtils/testAxe';

const testId = 'test-icon';
const defaultProps = {
  'data-testid': testId,
  icon: Earth,
};
const getComponent = (props = {}) => render((
  <Icon {...defaultProps} {...props} />
));

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default icon', () => {
  getComponent();
  const icon = screen.getByTestId(testId);
  expect(icon).toBeInstanceOf(SVGSVGElement);
  expect(icon).toBeInTheDocument();
});

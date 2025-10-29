import React from 'react';
import Earth from '@pingux/mdi-react/EarthIcon';
import { render, screen } from '@testing-library/react';

import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import IconWrapper from './IconWrapper';

const testId = 'test-icon';
const defaultProps = {
  iconProps: {
    'data-testid': testId,
  },
  title: { name: 'earth icon' },
  icon: Earth,
  size: 'md',
};

const getComponent = () => render((
  <IconWrapper {...defaultProps} size="sm" />
));


// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <IconWrapper {...props} {...defaultProps} size="sm" />
  ),
});


test('default icon', () => {
  getComponent();
  const icon = screen.getByTestId(testId);
  expect(icon).toBeInstanceOf(SVGSVGElement);
  expect(icon).toBeInTheDocument();
});

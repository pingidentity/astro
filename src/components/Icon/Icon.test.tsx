import React, { forwardRef } from 'react';
import Earth from '@pingux/mdi-react/EarthIcon';
import { render, screen } from '@testing-library/react';

import { IconProps } from '../../types';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Icon from './Icon';

const testId = 'test-icon';
const defaultProps: IconProps = {
  'data-testid': testId,
  icon: Earth,
  title: {
    id: 'title-id',
    name: 'Earth Icon',
  },
};

const getComponent = (props: IconProps = {}) => render((
  <Icon {...defaultProps} {...props} />
));

// The mdi-react and @pingux/mid-react libraries don't support ref forwarding
// A simple implementation of an SVG component demonstrates ref forwarding
const SVGTestComponent = forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
  <svg ref={ref} {...props} aria-labelledby="id">
    <title id="id">title</title>
  </svg>
));

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <Icon icon={SVGTestComponent} {...props} />
  ),
});

test('default icon', () => {
  getComponent();
  const icon = screen.getByTestId(testId);
  expect(icon).toBeInstanceOf(SVGSVGElement);
  expect(icon).toBeInTheDocument();
});

test('icon render for type symbol', () => {
  getComponent({ icon: 'search' });
  const icon = screen.getByTestId(testId);
  expect(icon).toHaveClass('material-symbols-outlined');
  screen.getByText(/search/i);
});

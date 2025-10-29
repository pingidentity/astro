import React, { forwardRef } from 'react';
import Earth from '@pingux/mdi-react/EarthIcon';
import { render, screen } from '@testing-library/react';

import { IconProps, IconTypeExtended, Modify } from '../../types';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Icon from '.';

const testId = 'test-icon';
const defaultProps: IconProps = {
  'data-testid': testId,
  icon: Earth,
  title: {
    id: 'title-id',
    name: 'Earth Icon',
  },
};

type IconPropsWithDefaults = Modify<IconProps, {icon?: IconTypeExtended}>

const getComponent = (props: IconPropsWithDefaults = {}) => render((
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

test('icon renders correct xxsmall tshirt size', () => {
  getComponent({ size: 'xxs' });
  const xsIcon = screen.getByTestId(testId);
  expect(xsIcon).toHaveStyleRule('width', '9px');
});

test('icon renders correct xsmall tshirt size', () => {
  getComponent({ size: 'xs' });
  const xsIcon = screen.getByTestId(testId);
  expect(xsIcon).toHaveStyleRule('width', '15px');
});

test('icon renders correct small tshirt size', () => {
  getComponent({ size: 'sm' });
  const smIcon = screen.getByTestId(testId);
  expect(smIcon).toHaveStyleRule('width', '20px');
});

test('icon renders correct medium tshirt size', () => {
  getComponent({ size: 'md' });
  const mdIcon = screen.getByTestId(testId);
  expect(mdIcon).toHaveStyleRule('width', '25px');
});

test('icon renders with associated title', () => {
  getComponent();
  const icon = screen.getByTestId(testId);
  const title = screen.getByText('Earth Icon');
  expect(icon).toBeInstanceOf(SVGSVGElement);
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveAttribute('aria-labelledby', 'title-id');
  expect(title).toBeInTheDocument();
});

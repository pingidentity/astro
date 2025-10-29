import React, { forwardRef } from 'react';
import { render, screen } from '@testing-library/react';

import { Icon } from '../../index';
import { IconProps, IconTypeExtended, Modify } from '../../types';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import { Credentials, Verify } from './icons';

const testId = 'test-icon';
const defaultProps: IconProps = {
  'data-testid': testId,
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

test('Credentials icon', () => {
  getComponent({ icon: Credentials, title: { name: 'Credentials Icon' } });
  const icon = screen.getByTestId(testId);
  expect(icon).toBeInstanceOf(SVGSVGElement);
  expect(icon).toBeInTheDocument();
});


test('Verify icon', () => {
  getComponent({ icon: Verify, title: { name: 'Verify Icon' } });
  const icon = screen.getByTestId(testId);
  expect(icon).toBeInstanceOf(SVGSVGElement);
  expect(icon).toBeInTheDocument();
});

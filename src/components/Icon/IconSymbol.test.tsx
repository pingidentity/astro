import React, { forwardRef } from 'react';
import { render, screen } from '@testing-library/react';

import { IconProps } from '../../types';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import IconSymbol from './IconSymbol';

const testId = 'test-icon';
const testIcon = 'Search';

const defaultProps: IconProps = {
  'data-testid': testId,
  icon: testIcon,
  title: {
    id: 'title-id',
    name: 'Search Icon',
  },
};

const getComponent = (props: IconProps = {}) => render((
  <IconSymbol {...defaultProps} {...props} />
));

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <IconSymbol icon={testIcon} {...props} />
  ),
});

test('default icon', () => {
  getComponent();
  const icon = screen.getByTestId(testId);
  expect(icon).toHaveClass('material-symbols-outlined');
  screen.getByText(/search/i);
});

test('default icon', () => {
  getComponent({ icon: 'face' });
  const icon = screen.getByTestId(testId);
  expect(icon).toHaveClass('material-symbols-outlined');
  screen.getByText(/face/i);
});

test('size prop', () => {
  getComponent({ size: 'sm' });
  const icon = screen.getByTestId(testId);
  expect(icon).toHaveStyle('font-size: 20px');
});

test('color prop', () => {
  getComponent({ color: 'red' });
  const icon = screen.getByTestId(testId);
  expect(icon).toHaveStyle('color: red');
});

test('hasFill prop', () => {
  getComponent({ hasFill: true });
  const icon = screen.getByTestId(testId);
  expect(icon).toHaveStyle("font-variation-settings: 'FILL' 1");
});

test('title prop', () => {
  getComponent();
  const icon = screen.getByTestId(testId);
  expect(icon).toHaveAttribute('title', 'Search Icon');
});

test('className prop', () => {
  const customClass = 'custom-icon-class';
  getComponent({ className: customClass });
  const icon = screen.getByTestId(testId);
  expect(icon).toHaveClass(customClass);
});
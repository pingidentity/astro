import React from 'react';
import Earth from '@pingux/mdi-react/EarthIcon';
import { render, screen } from '@testing-library/react';

import { Badge, Button, Icon } from '../..';
import axeTest from '../../utils/testUtils/testAxe';

const testId = 'test-separator';

const defaultProps = {
  'data-testid': testId,
  label: 'Test Label',
};

const getComponent = (props = {}) => render(
  <Badge {...defaultProps} {...props} />,
);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('renders Badge component', () => {
  getComponent();
  const badge = screen.getByTestId(testId);
  expect(badge).toBeInTheDocument();
});

test('renders children within Badge component', () => {
  const children = (
    <Button />
  );
  getComponent({ children });
  const mockedChildren = screen.getByRole('button');
  expect(mockedChildren).toBeInTheDocument();
});

test('renders Badge component with uppercase', () => {
  const label = 'uppercase';
  const isUppercase = true;

  getComponent({ label, isUppercase });
  expect(screen.queryByText('uppercase')).toHaveStyleRule('text-transform', 'uppercase');
});

test('renders Badge component with custom alignment', () => {
  const align = 'right';

  getComponent({ align });
  expect(screen.getByTestId(testId)).toHaveStyleRule('position', 'absolute');
  expect(screen.getByTestId(testId)).toHaveStyleRule('right', '15px');
});

test('renders Badge component with left slot', () => {
  const slots = {
    leftIcon: <Icon icon={Earth} size={14} data-testid="iconId" />,
  };

  getComponent({ slots });
  expect(screen.getByTestId('iconId')).toBeInTheDocument();
});

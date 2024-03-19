import React from 'react';
import EyeOffIcon from '@pingux/mdi-react/EyeOffOutlineIcon';
import EyeIcon from '@pingux/mdi-react/EyeOutlineIcon';

import { IconButtonToggleProps } from '../../types';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import IconButtonToggle from '.';

const iconTestId = 'test-icon';

const OnIcon = props => (
  <EyeIcon data-testid={iconTestId} {...props} title={{ name: 'on-icon' }} />
);

const OffIcon = props => (
  <EyeOffIcon data-testid={iconTestId} {...props} title={{ name: 'off-icon' }} />
);

const testId = 'test-button';
const defaultProps: IconButtonToggleProps = {
  buttonProps: {
    'data-testid': testId,
    'aria-label': 'Eye',
  },
  defaultIcon: OffIcon,
  toggledIcon: OnIcon,
};
const getComponent = (props = {}) => render(<IconButtonToggle {...defaultProps} {...props} />);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <IconButtonToggle {...defaultProps} {...props} />,
});

test('default icon button', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('data-testid', testId);
  expect(button).toBeInstanceOf(HTMLButtonElement);
  expect(button).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  Icon,
  IconBadge,
} from '../../index';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const testId = 'test-icon';

const defaultProps = {
  'data-testid': testId,
};

const ThisIcon = args => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="this-icon-title" {...args}>
    <title id="this-icon-title">This Icon</title>
    <path d="M12.5 7.28125C14.1979 7.28125 15.6979 7.6875 16.9167 8.21875C18.0417 8.71875 18.75 9.84375 18.75 11.0625V12.75H6.25V11.0729C6.25 9.84375 6.95833 8.71875 8.08333 8.22917C9.30208 7.6875 10.8021 7.28125 12.5 7.28125ZM4.16667 7.54167C5.3125 7.54167 6.25 6.60417 6.25 5.45833C6.25 4.3125 5.3125 3.375 4.16667 3.375C3.02083 3.375 2.08333 4.3125 2.08333 5.45833C2.08333 6.60417 3.02083 7.54167 4.16667 7.54167ZM5.34375 8.6875C4.95833 8.625 4.57292 8.58333 4.16667 8.58333C3.13542 8.58333 2.15625 8.80208 1.27083 9.1875C0.5 9.52083 0 10.2708 0 11.1146V12.75H4.6875V11.0729C4.6875 10.2083 4.92708 9.39583 5.34375 8.6875ZM20.8333 7.54167C21.9792 7.54167 22.9167 6.60417 22.9167 5.45833C22.9167 4.3125 21.9792 3.375 20.8333 3.375C19.6875 3.375 18.75 4.3125 18.75 5.45833C18.75 6.60417 19.6875 7.54167 20.8333 7.54167ZM25 11.1146C25 10.2708 24.5 9.52083 23.7292 9.1875C22.8437 8.80208 21.8646 8.58333 20.8333 8.58333C20.4271 8.58333 20.0417 8.625 19.6563 8.6875C20.0729 9.39583 20.3125 10.2083 20.3125 11.0729V12.75H25V11.1146ZM12.5 0.25C14.2292 0.25 15.625 1.64583 15.625 3.375C15.625 5.10417 14.2292 6.5 12.5 6.5C10.7708 6.5 9.375 5.10417 9.375 3.375C9.375 1.64583 10.7708 0.25 12.5 0.25Z" fill="currentColor" />
  </svg>
);

const ThisSecondIcon = args => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="this-second-icon-title" {...args}>
    <title id="this-second-icon-title">This Second Icon</title>
    <path d="M1.71875 0.624999L7.96875 0.625L7.96875 6.875L6.09375 6.875L6.09375 3.89375L1.73125 8.125L0.46875 6.85625L4.75 2.5L1.71875 2.5L1.71875 0.624999Z" fill="currentColor" />
  </svg>
);

const getComponent = (props = {}) => render((
  <IconBadge {...props} backgroundColor="white" {...defaultProps}>
    <Icon
      icon={ThisIcon}
      size="25px"
      color="accent.40"
    />
    <Icon
      icon={ThisSecondIcon}
      size="9px"
      color="accent.40"
    />
  </IconBadge>
));

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <IconBadge {...props} {...defaultProps}>
      <Icon icon={ThisIcon} />
    </IconBadge>
  ),
});

test('default iconbadge render', () => {
  getComponent();
  const iconButton = screen.getByTestId(testId);
  expect(iconButton).toBeInTheDocument();
});

test('iconbadge borderRadius renders correctly', () => {
  const circleSize = 20;
  getComponent({ circleSize: 20 });
  const icons = screen.getAllByRole('img');
  const secondIcon = icons[1].closest('span');
  expect(secondIcon).toHaveStyle(`border-radius: ${circleSize / 2}px`);
});

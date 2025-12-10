import React from 'react';
import { faker } from '@faker-js/faker';

import { AvatarProps } from '../../types/avatar';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Avatar from '.';

const src = faker.image.lorempicsum.imageUrl(150, 150, false, undefined, '1');

const defaultProps: AvatarProps = {
  src,
};

const getComponent = (props = {}) => render((
  <Avatar {...defaultProps} {...props} />
));
// Needs to be added to each components test file
universalComponentTests({
  renderComponent: (props: AvatarProps) => <Avatar {...defaultProps} {...props} />,
});

test('an avatar is rendered', () => {
  getComponent();
  const img = screen.getByRole('img');
  expect(img).toBeInstanceOf(HTMLImageElement);
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('alt', 'Avatar');
});

test('an avatar is rendered with custom alt', () => {
  getComponent({ alt: 'Custom Alt' });
  const img = screen.getByRole('img');

  expect(img).toHaveAttribute('alt', 'Custom Alt');
});

test('an avatar is rendered with custom alt', () => {
  getComponent({ src: undefined, defaultText: 'KL' });
  const avatar = screen.getByText('KL');

  expect(avatar).toBeInTheDocument();
});

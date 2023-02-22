import React from 'react';
import { faker } from '@faker-js/faker';

import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';

import Avatar from '.';

const defaultProps = {
  src: faker.image.lorempicsum.imageUrl(150, 150, false, 0, '1'),
};

const getComponent = (props = {}) => render((
  <Avatar {...defaultProps} {...props} />
));

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

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

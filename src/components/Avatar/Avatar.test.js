import React from 'react';
import { faker } from '@faker-js/faker';

import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Avatar from '.';

const defaultProps = {
  src: faker.image.lorempicsum.imageUrl(150, 150, false, 0, '1'),
};

const getComponent = (props = {}) => render((
  <Avatar {...defaultProps} {...props} />
));
// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <Avatar {...defaultProps} {...props} /> });

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

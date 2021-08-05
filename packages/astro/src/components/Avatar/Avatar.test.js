import React from 'react';
import faker from 'faker';
import { render, screen } from '../../utils/testUtils/testWrapper';
import Avatar from '.';

const defaultProps = {
  src: faker.image.lorempicsum.imageUrl(150, 150, false, 0, '1'),
};

const getComponent = (props = {}) => render((
  <Avatar {...defaultProps} {...props} />
));

test('an avatar is rendered', () => {
  getComponent();
  const img = screen.getByRole('img');
  expect(img).toBeInstanceOf(HTMLImageElement);
  expect(img).toBeInTheDocument();
});

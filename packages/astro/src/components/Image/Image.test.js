import React from 'react';
import { render, screen } from '../../utils/testUtils/testWrapper';
import Image from '.';

const getComponent = (props = {}) => render(<Image {...props} />);

test('an image is rendered', () => {
  getComponent();
  const img = screen.getByRole('img');
  expect(img).toBeInstanceOf(HTMLImageElement);
  expect(img).toBeInTheDocument();
});

test('image shows disabled status', () => {
  getComponent({ isDisabled: true });
  const img = screen.getByRole('img');
  expect(img).toHaveClass('is-disabled');
  expect(img).toHaveStyle({ opacity: 0.5, pointerEvents: 'none' });
});

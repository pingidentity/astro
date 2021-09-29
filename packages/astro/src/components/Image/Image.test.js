import React from 'react';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';
import Image from '.';

const getComponent = (props = {}) => render(<Image {...props} />);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

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
});

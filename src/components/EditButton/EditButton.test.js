import React from 'react';

import { EditButton } from '../../index';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const testId = 'test-edit-button';
const defaultProps = {
  'data-testid': testId,
  'aria-label': 'Test edit button',
};
const getComponent = (props = {}) => render(<EditButton {...defaultProps} {...props} />);

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <EditButton {...props} /> });

test('renders edit button', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('data-testid', testId);
  expect(button).toBeInstanceOf(HTMLButtonElement);
  expect(button).toBeInTheDocument();
});

test('the component displays the small icon size', () => {
  getComponent({ size: 'sm' });
  const svg = screen.getByRole('img');
  expect(svg).toHaveAttribute('width', '10');
  expect(svg).toHaveAttribute('height', '10');
});

test('the component displays the medium icon size', () => {
  getComponent({ size: 'md' });
  const svg = screen.getByRole('img');
  expect(svg).toHaveAttribute('width', '15');
  expect(svg).toHaveAttribute('height', '15');
});

test('the component displays the large icon size', () => {
  getComponent({ size: 'lg' });
  const svg = screen.getByRole('img');
  expect(svg).toHaveAttribute('width', '20');
  expect(svg).toHaveAttribute('height', '20');
});

test('the component displays the correct icon size', () => {
  getComponent({ size: '22px' });
  const svg = screen.getByRole('img');
  expect(svg).toHaveAttribute('width', '22px');
  expect(svg).toHaveAttribute('height', '22px');
});

test('the component accepts IconButton Props', () => {
  const onPress = jest.fn();
  getComponent({ onPress });
  const button = screen.getByRole('button');

  // Hold down the button to test is-pressed class
  fireEvent.mouseDown(button);
  expect(button).toHaveClass('is-pressed');
  fireEvent.mouseUp(button);
  expect(onPress).toHaveBeenCalledTimes(1);
});

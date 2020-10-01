import React from 'react';
import { render, screen } from '@testing-library/react';
import Box from '.';

const testId = 'test-box';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(<Box {...defaultProps} {...props} />);

test('default box', () => {
  getComponent();
  const box = screen.getByTestId(testId);
  expect(box).toBeInstanceOf(HTMLDivElement);
  expect(box).toBeInTheDocument();
});

test('box as a row', () => {
  getComponent({ isRow: true });
  const box = screen.getByTestId(testId);
  expect(box).toHaveStyleRule('flex-direction', 'row');
});

test('box with default gap', () => {
  getComponent({ gap: '30px' });
  const box = screen.getByTestId(testId);
  expect(box).toHaveStyleRule('margin-top', '30px', { target: '> * + *' });
});

test('box as row with gap', () => {
  getComponent({ isRow: true, gap: '30px' });
  const box = screen.getByTestId(testId);
  expect(box).toHaveStyleRule('margin-left', '30px', { target: '> * + *' });
});

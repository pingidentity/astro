import React from 'react';
import { render, screen } from '../../utils/testUtils/testWrapper';
import ScrollBox from './ScrollBox';

const testId = 'scrollBoxTestId';

const defaultProps = {
  'data-testid': testId,
  'maxHeight': '100px',
};

const getComponent = (props = {}) => render(
  <ScrollBox
    {...defaultProps}
    {...props}
  />,
);


test('maxHeight passes into the component', () => {
  getComponent();
  const scrollBoxComponent = screen.getByTestId(testId);
  expect(scrollBoxComponent).toBeInTheDocument();
  expect(scrollBoxComponent).toHaveStyle({ maxHeight: '100px' });
});

test('passing hasShadows renders the shadow css', () => {
  getComponent({ hasShadows: true });
  const scrollBoxComponent = screen.getByTestId(testId);
  expect(scrollBoxComponent).toBeInTheDocument();
  expect(scrollBoxComponent).toHaveClass('has-shadows');
});

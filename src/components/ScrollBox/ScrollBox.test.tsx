import React from 'react';

import { ScrollBoxProps } from '../../types';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import ScrollBox from './ScrollBox';

const testId = 'scrollBoxTestId';

const defaultProps = {
  'data-testid': testId,
  'maxHeight': '100px',
};

const getComponent = (props: ScrollBoxProps = {}) => render(
  <ScrollBox
    {...defaultProps}
    {...props}
  />,
);

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <ScrollBox {...props} /> });

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
  const shadows = screen.getAllByRole('separator');
  expect(shadows[0]).toHaveClass('has-shadows');
  expect(shadows[1]).toHaveClass('has-shadows');
});

test('with hasShadows prop only the bottom shadow is rendered first', () => {
  getComponent({ hasShadows: true });
  const scrollBoxComponent = screen.getByTestId(testId);
  expect(scrollBoxComponent).toBeInTheDocument();
  const shadows = screen.getAllByRole('separator');
  expect(shadows[0]).not.toHaveClass('is-top-shadow-showing');
  expect(shadows[1]).toHaveClass('is-bottom-shadow-showing');
});

test('with hasShadows prop only the top shadow is rendered after scroll to down', () => {
  getComponent({ hasShadows: true });
  const scrollBoxComponent = screen.getByTestId(testId);
  expect(scrollBoxComponent).toBeInTheDocument();
  fireEvent.scroll(scrollBoxComponent, { target: { scrollY: 100 } });
  const shadows = screen.getAllByRole('separator');
  setTimeout(() => {
    expect(shadows[0]).toHaveClass('is-top-shadow-showing');
    expect(shadows[1]).not.toHaveClass('is-bottom-shadow-showing');
  }, 200);
});

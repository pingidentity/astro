import React from 'react';

import { AstroProvider, NextGenTheme } from '../../..';
import { render, screen } from '../../../utils/testUtils/testWrapper';

import Suggestion from './Suggestion';
import Suggestions from './Suggestions';

const containerTestId = 'suggestions-container';

const defaultProps = {
  isFullScreen: false,
  'data-testid': containerTestId,
};

const getComponent = (props = {}) => render(
  <AstroProvider theme={NextGenTheme}>
    <Suggestions {...defaultProps} {...props}>
      <Suggestion text="Suggestion 1" />
    </Suggestions>
  </AstroProvider>,
);

test('Suggestions component renders correctly', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: query === '(max-width: 993px)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
  });
  getComponent();
  expect(screen.getAllByText('Suggestion 1')[0]).toBeInTheDocument();
});

test('Suggestions component applies isFullScreen prop correctly', () => {
  getComponent({ isFullScreen: true });
  const suggestions = screen.getByTestId(containerTestId);
  expect(suggestions).toHaveClass('is-full-screen');
});

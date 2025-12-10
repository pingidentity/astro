import React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';

import { BoxProps } from '../../types';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Box from '.';

// Emotion Cache added as test fails otherwise, root cause of this failure is unknown.
// Failure occured with ThemeUI refactor.
// https://github.com/emotion-js/emotion/issues/1105#issuecomment-557726922
const emotionCache = createCache({ key: 'box-test' });
emotionCache.compat = true;

const testId = 'test-box';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props: BoxProps = {}) => render(
  <CacheProvider value={emotionCache}>
    <Box {...defaultProps} {...props} />
  </CacheProvider>,
);
// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <Box {...props} /> });

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
  expect(box).toHaveStyle('margin-top: 0px');
});

test('box as row with gap', () => {
  getComponent({ isRow: true, gap: '30px' });
  const box = screen.getByTestId(testId);
  expect(box).toHaveStyle('margin-left: 0px');
});

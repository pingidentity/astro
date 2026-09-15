import React from 'react';
import { useTheme } from '@emotion/react';
import { render, screen } from '@testing-library/react';

import { Box, PageWrapper } from '../../index';
import { AstroTheme } from '../../types';
import { themes } from '../../utils/devUtils/constants/themes';
import axeTest from '../../utils/testUtils/testAxe';

const testId = 'test-box';
const defaultProps = {
  bg: 'active',
  'data-testid': testId,
};

const getComponent = () => render(<Box {...defaultProps} />, { wrapper: PageWrapper });

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

// NOTE: This will fail if in the AstroProvider test file...
// Probably something to do with Jest / RTL
test('should provide theme styling through PageWrapper', () => {
  getComponent();
  const activeRgb = 'rgb(68, 98, 237)';
  const box = screen.queryByTestId(testId);
  expect(box).toBeInstanceOf(HTMLDivElement);
  expect(box).toBeInTheDocument();
  expect(box).toHaveStyle(`background-color: ${activeRgb}`);
});

const Probe = () => {
  const theme = useTheme() as AstroTheme;
  return <div data-testid="probe">{JSON.stringify({ colors: theme?.colors, name: theme?.name })}</div>;
};

// Regression coverage for the multi-override merge: PageWrapper must merge
// every themeOverrides entry (theme-ui's 2-arg merge would silently drop the
// second entry), with later entries winning clashes.
test('should merge all themeOverrides entries, later entries winning clashes', () => {
  render(
    <PageWrapper
      themeOverrides={[
        { colors: { probeOnlyFirst: 'first-value', probeClash: 'first-value' } },
        { colors: { probeClash: 'second-value', probeOnlySecond: 'second-value' } },
      ]}
    >
      <Probe />
    </PageWrapper>,
  );

  const theme = JSON.parse(screen.getByTestId('probe').textContent as string) as AstroTheme;
  const colors = theme.colors as Record<string, unknown>;
  expect(colors.probeOnlyFirst).toBe('first-value');
  expect(colors.probeOnlySecond).toBe('second-value');
  expect(colors.probeClash).toBe('second-value');
});

// The reduce also keeps an empty themeOverrides array safe: the reverted
// spread call would throw "Cannot convert undefined or null to object".
test('should mount with an empty themeOverrides array and keep the default theme', () => {
  render(
    <PageWrapper themeOverrides={[]}>
      <Probe />
    </PageWrapper>,
  );

  const theme = JSON.parse(screen.getByTestId('probe').textContent as string) as AstroTheme;
  expect(theme.name).toBe(themes.ASTRO);
});

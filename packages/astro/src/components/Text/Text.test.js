import React from 'react';
import { ThemeProvider } from 'theme-ui';

import axeTest from '../../utils/testUtils/testAxe';
import testTheme from '../../utils/testUtils/testTheme';
import { render, screen } from '../../utils/testUtils/testWrapper';

import Text from '.';

const testId = 'test-text';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => {
  const { children } = props;
  return render(
    <ThemeProvider theme={testTheme}>
      <Text {...defaultProps} {...props}>
        {children}
      </Text>
    </ThemeProvider>,
  );
};

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default text', () => {
  getComponent();
  const text = screen.getByTestId(testId);
  expect(text).toBeInstanceOf(HTMLSpanElement);
  expect(text).toBeInTheDocument();
});

test('typography props will be applied', () => {
  const customTypographyProps = {
    fontFamily: 'times',
    fontSize: 'xx',
    fontWeight: 900,
    lineHeight: '2em',
    letterSpacing: '5px',
    textAlign: 'right',
    fontStyle: 'italic',
  };

  getComponent({ ...customTypographyProps });
  const text = screen.getByTestId(testId);
  expect(text).toHaveStyle('fontFamily: times');
  expect(text).toHaveStyle('fontSize: xx');
  expect(text).toHaveStyle('fontWeight: 900');
  expect(text).toHaveStyle('lineHeight: 2em');
  expect(text).toHaveStyle('letterSpacing: 5px');
  expect(text).toHaveStyle('textAlign: right');
  expect(text).toHaveStyle('fontStyle: italic');
});

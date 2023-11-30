import React from 'react';
import { ThemeProvider, ThemeUICSSObject } from 'theme-ui';

import { TextProps } from '../../types';
import testTheme from '../../utils/testUtils/testTheme';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Text from '.';

const testId = 'test-text';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props: TextProps = {}) => {
  const { children } = props;

  return render(
    <ThemeProvider theme={testTheme}>
      <Text {...defaultProps} {...props}>
        {children}
      </Text>
    </ThemeProvider>,
  );
};

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <Text {...props}>text</Text> });

test('default text', () => {
  getComponent();
  const text = screen.getByTestId(testId);
  expect(text).toBeInstanceOf(HTMLSpanElement);
  expect(text).toBeInTheDocument();
});

test('typography props will be applied', () => {
  const customTypographyProps: ThemeUICSSObject = {
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

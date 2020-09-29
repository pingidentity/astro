import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { render, screen } from '@testing-library/react';
import Text from '.';
import testTheme from '../../utils/testUtils/testTheme';

const testId = 'test-text';
const defaultProps = {
  'data-testid': testId,
};
const getComponent = (props = {}) => render(
  <ThemeProvider theme={testTheme}>
    <Text {...defaultProps} {...props}>
      {props.children}
    </Text>
  </ThemeProvider>,
);

test('default text', () => {
  getComponent();
  const text = screen.getByTestId(testId);
  expect(text).toBeInstanceOf(HTMLDivElement);
  expect(text).toBeInTheDocument();
});

test('text with a variant', () => {
  getComponent({ variant: 'title' });
  const text = screen.getByTestId(testId);
  expect(text).toHaveStyleRule('font-weight', '500');
});

import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { render, screen } from '../../utils/testUtils/testWrapper';
import Text from '.';
import axeTest from '../../utils/testUtils/testAxe';
import testTheme from '../../utils/testUtils/testTheme';

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

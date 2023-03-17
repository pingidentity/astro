import React from 'react';
import { render, screen } from '@testing-library/react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import userEvent from '@testing-library/user-event';
import PasswordField from '.';
import axeTest from '../../utils/testUtils/testAxe';

// Emotion Cache added as test fails otherwise, root cause of this failure is unknown.
// Failure occured with ThemeUI refactor.
// https://github.com/emotion-js/emotion/issues/1105#issuecomment-557726922
const emotionCache = createCache({ key: 'password-field-test' });
emotionCache.compat = true;

const testId = 'test-text-field';
const testLabel = 'Test Label';
const helperProp = 'helperText';
const defaultProps = {
  'data-testid': testId,
  label: testLabel,
  helperTest: helperProp,
  viewHiddenIconTestId: 'view-hidden-test-id',
  viewIconTestId: 'view-icon-test-id',
};

const defaultRequirements = [
  {
    name: '6 characters',
    status: 'default',
  },
  {
    name: '1 UPPERCASE letter',
    status: 'default',
  },
  {
    name: '1 lowercase letter',
    status: 'default',
  },
  {
    name: '1 number',
    status: 'default',
  },
  {
    name: '1 special character',
    status: 'default',
  },
];

const successfultRequirements = [
  {
    name: '6 characters',
    status: 'success',
  },
  {
    name: '1 UPPERCASE letter',
    status: 'success',
  },
  {
    name: '1 lowercase letter',
    status: 'success',
  },
  {
    name: '1 number',
    status: 'success',
  },
  {
    name: '1 special character',
    status: 'success',
  },
];

const getComponent = (props = {}) => render(
  <CacheProvider value={emotionCache}>
    <PasswordField {...defaultProps} {...props} />
  </CacheProvider>,
);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('default password field', () => {
  getComponent();
  const field = screen.getByTestId(testId);
  const label = screen.getByText(testLabel);
  const control = screen.getByLabelText(testLabel);
  expect(field).toBeInstanceOf(HTMLDivElement);
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(control).toBeInstanceOf(HTMLInputElement);
  expect(field).toBeInTheDocument();
  expect(label).toBeInTheDocument();
  expect(control).toBeInTheDocument();
});

test('renders view icon', async () => {
  getComponent();
  const viewIcon = await screen.findByTestId(defaultProps.viewHiddenIconTestId);
  expect(viewIcon).toBeInTheDocument();
});

test('renders view-hidden icon', async () => {
  getComponent();
  const button = screen.getByRole('button');
  userEvent.click(button);

  const viewHiddenIcon = await screen.findByTestId(defaultProps.viewIconTestId);
  expect(viewHiddenIcon).toBeInTheDocument();

  userEvent.click(button);

  const viewIcon = await screen.findByTestId(defaultProps.viewHiddenIconTestId);
  expect(viewIcon).toBeInTheDocument();
});

test('renders view icon', async () => {
  getComponent();
  const button = screen.getByRole('button');
  userEvent.click(button);

  const viewHiddenIcon = await screen.findByTestId(defaultProps.viewIconTestId);
  expect(viewHiddenIcon).toBeInTheDocument();
});

test('renders password input', () => {
  getComponent();
  const input = screen.getByLabelText(testLabel);
  expect(input.type).toBe('password');
});

test('renders helper text', () => {
  getComponent();
  const helperText = screen.getByText(testLabel);
  expect(helperText).toBeInTheDocument();
});

test('clicking icon changes input type', () => {
  getComponent({ isVisible: true });
  const input = screen.getByLabelText(testLabel);
  expect(input.type).toBe('text');
});

test('passing in requirements and focusing renders the requirements popover', () => {
  getComponent({ requirements: defaultRequirements });
  const input = screen.getByRole('textbox');
  userEvent.click(input);
  const popover = screen.getByRole('presentation');
  expect(popover).toBeInTheDocument();
});

test('if all requirements are successful, do not render popover', () => {
  getComponent({ requirements: successfultRequirements });
  const input = screen.getByRole('textbox');
  userEvent.click(input);
  expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
});

test('passing in props to the requirements list works', () => {
  const requirementsListProps = { 'data-testid': 'my-custom-id' };
  getComponent({
    requirements: defaultRequirements,
    requirementsListProps,
  });
  expect(screen.queryByTestId(requirementsListProps['data-testid'])).not.toBeInTheDocument();

  userEvent.click(screen.getByRole('textbox'));
  expect(screen.queryByTestId(requirementsListProps['data-testid'])).toBeInTheDocument();
});

test('password field with helper text', () => {
  const helperText = 'helper text';
  getComponent({ helperText });
  const helper = screen.getByText(helperText);
  expect(helper).toBeInTheDocument();
});

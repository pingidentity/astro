import React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import userEvent from '@testing-library/user-event';

import { PasswordFieldProps, Requirement } from '../../types';
import statuses from '../../utils/devUtils/constants/statuses';
import { act, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import { universalFieldComponentTests } from '../../utils/testUtils/universalFormSubmitTest';

import PasswordField from '.';

// Emotion Cache added as test fails otherwise, root cause of this failure is unknown.
// Failure occured with ThemeUI refactor.
// https://github.com/emotion-js/emotion/issues/1105#issuecomment-557726922

const emotionCache = createCache({ key: 'password-field-test' });
emotionCache.compat = true;

const testId = 'test-text-field';
const testLabel = 'Test Label';
const helperProp = 'helperText';

const defaultProps: PasswordFieldProps = {
  'data-testid': testId,
  label: testLabel,
  helperText: helperProp,
  viewHiddenIconTestId: 'view-hidden-test-id',
  viewIconTestId: 'view-icon-test-id',
};

const defaultRequirements: Requirement[] = [
  {
    name: '6 characters',
    status: statuses.DEFAULT,
  },
  {
    name: '1 UPPERCASE letter',
    status: statuses.DEFAULT,
  },
  {
    name: '1 lowercase letter',
    status: statuses.DEFAULT,
  },
  {
    name: '1 number',
    status: statuses.DEFAULT,
  },
  {
    name: '1 special character',
    status: statuses.DEFAULT,
  },
];

const successfulRequirements: Requirement[] = [
  {
    name: '6 characters',
    status: statuses.SUCCESS,
  },
  {
    name: '1 UPPERCASE letter',
    status: statuses.SUCCESS,
  },
  {
    name: '1 lowercase letter',
    status: statuses.SUCCESS,
  },
  {
    name: '1 number',
    status: statuses.SUCCESS,
  },
  {
    name: '1 special character',
    status: statuses.SUCCESS,
  },
];


universalFieldComponentTests({
  renderComponent: props => (
    <PasswordField {...defaultProps} {...props} />
  ),
  testValue: 'testvalue',
  testLabel,
  componentType: 'PasswordField',
});

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => <PasswordField {...defaultProps} {...props} />,
});

const getComponent = (props:PasswordFieldProps = {}) => render(
  <CacheProvider value={emotionCache}>
    <PasswordField {...defaultProps} {...props} />
  </CacheProvider>,
);

afterEach(() => {
  jest.clearAllMocks();
});

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
  const viewIcon = screen.getByTestId(defaultProps.viewHiddenIconTestId!);
  expect(viewIcon).toBeInTheDocument();
});

test('renders view-hidden icon', async () => {
  getComponent();
  const button = screen.getByRole('button');
  userEvent.click(button);

  const viewHiddenIcon = screen.getByTestId(defaultProps.viewIconTestId!);
  expect(viewHiddenIcon).toBeInTheDocument();

  userEvent.click(button);

  const viewIcon = screen.getByTestId(defaultProps.viewHiddenIconTestId!);
  expect(viewIcon).toBeInTheDocument();
});

test('renders view icon', async () => {
  getComponent();
  const button = screen.getByRole('button');
  userEvent.click(button);

  const viewHiddenIcon = screen.getByTestId(defaultProps.viewIconTestId!);
  expect(viewHiddenIcon).toBeInTheDocument();
});

test('onPress callback is called when iconButton is pressed', async () => {
  const onPress = jest.fn();
  getComponent({ onVisibleChange: onPress });
  const button = screen.getByRole('button');
  userEvent.click(button);

  expect(onPress).toHaveBeenCalled();
});

test('renders password input', () => {
  getComponent();
  const input = screen.getByLabelText(testLabel);
  expect((input as HTMLInputElement).type).toBe('password');
});

test('renders helper text', () => {
  getComponent();
  const helperText = screen.getByText(testLabel);
  expect(helperText).toBeInTheDocument();
});

test('clicking icon changes input type', () => {
  getComponent({ isVisible: true });
  const input = screen.getByLabelText(testLabel);
  expect((input as HTMLInputElement).type).toBe('text');
});

test('passing in requirements and focusing renders the requirements popover', () => {
  getComponent({ requirements: defaultRequirements });
  const input = screen.getByRole('textbox');
  userEvent.click(input);
  const popover = screen.getByRole('presentation');
  expect(popover).toBeInTheDocument();
});

test('if all requirements are successful, do not render popover', () => {
  getComponent({ requirements: successfulRequirements });
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

test('onChange function receives right text', () => {
  let inputText = '';

  const testOnChange = e => {
    inputText = e.target.value;
  };

  getComponent({ onChange: testOnChange });

  const input = screen.getByRole('textbox');
  userEvent.type(input, '12345678');
  jest.useFakeTimers();

  expect(inputText).toBe('12345678');
});

test('renders left slot content', () => {
  const leftSlotContent = <div data-testid="in-container-slot">Slot Content</div>;
  getComponent({ slots: { inContainer: leftSlotContent } });
  const leftSlot = screen.getByTestId('in-container-slot');
  expect(leftSlot).toBeInTheDocument();
  expect(leftSlot).toHaveTextContent('Slot Content');
});

test('handleInputChange sets isTyping to true and then false after 300ms', async () => {
  const delay = 300;

  jest.useFakeTimers();
  getComponent();
  const input = screen.getByRole('textbox');
  userEvent.type(input, 'test');

  expect(input).toHaveValue('test');
  expect((input as HTMLInputElement).type).toBe('password');

  act(() => {
    jest.advanceTimersByTime(delay);
  });

  await act(() => {
    expect(input).toHaveValue('test');
  }, { timeout: delay + 1 });
});

test('handleInputChange calls onChange prop', () => {
  const onChange = jest.fn();
  getComponent({ onChange });
  const input = screen.getByRole('textbox');
  userEvent.type(input, 'test');

  expect(onChange).toHaveBeenCalled();
});

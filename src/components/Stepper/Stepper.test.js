import React from 'react';
import { Item } from 'react-stately';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import userEvent from '@testing-library/user-event';

import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import Text from '../Text';

import Stepper from './Stepper';

// Emotion Cache added as test fails otherwise, root cause of this failure is unknown.
// Failure occured with ThemeUI refactor.
// https://github.com/emotion-js/emotion/issues/1105#issuecomment-557726922
const emotionCache = createCache({ key: 'stepper-test' });
emotionCache.compat = true;

const steps = [
  { label: 'Name', children: 'Step 1', name: 'step1' },
  { label: 'Object', children: 'Step 2', name: 'step2' },
  { label: 'Content', children: 'Step 3', name: 'step3' },
];

const testId = 'test-stepper';

const defaultProps = {
  'data-testid': testId,
  activeStep: 1,
  items: steps,
};

const getComponent = (props = {}, { renderFn = render } = {}) => renderFn(
  <CacheProvider value={emotionCache}>
    <Stepper {...defaultProps} {...props}>
      {({ name, children }) => (
        <Item key={name || children} textValue={name || children}>
          <Text>{children}</Text>
        </Item>
      )}
    </Stepper>
  </CacheProvider>,
);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <Stepper {...defaultProps} {...props}>
      {({ name, children }) => (
        <Item key={name || children} textValue={name || children}>
          <Text>{children}</Text>
        </Item>
      )}
    </Stepper>
  ),
});

test('renders Stepper component in the default state', () => {
  getComponent();
  const stepper = screen.getByTestId(testId);
  expect(stepper).toBeInstanceOf(HTMLDivElement);
  expect(stepper).toBeInTheDocument();

  steps.forEach((_v, i) => {
    const stepIndex = i + 1;
    const step = screen.getByText(`${stepIndex}`);
    expect(step).toBeInTheDocument();
  });
});

test('should throw an error when float number passed as an active step', () => {
  const activeStep = 1.5;
  expect(() => getComponent({ activeStep })).toThrow(`instead received \`${activeStep}\``);
});

test('renders the stepper with the given active step', () => {
  const activeStep = 2;
  getComponent({ activeStep });
  const step = screen.getByText(`${activeStep}`);
  expect(step).toBeInTheDocument();
});

const getTabs = () => {
  const tabs = screen.queryAllByRole('tab');
  const [tab0, tab1, tab2] = tabs;
  return { tabs, tab0, tab1, tab2 };
};

test('click should fire `onStepChange` handler', () => {
  const onStepChange = jest.fn();

  getComponent({ onStepChange });
  const { tab1 } = getTabs();
  userEvent.click(tab1);
  expect(onStepChange).toHaveBeenCalledWith(2);
});

test('tooltip renders expected content based on props', async () => {
  // Should render label
  const { rerender } = getComponent();
  let { tab0 } = getTabs();
  fireEvent.mouseMove(tab0);
  fireEvent.mouseEnter(tab0);
  setTimeout(() => {
    expect(screen.queryByRole('tooltip')).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).toHaveTextContent(steps[0].label);
  }, 0);

  // Should render textValue
  const stepsWithoutLabels = steps.map(step => {
    const copy = step;
    delete copy.label;
    return copy;
  });
  getComponent({ items: stepsWithoutLabels }, { renderFn: rerender });
  ({ tab0 } = getTabs());
  fireEvent.mouseMove(tab0);
  fireEvent.mouseEnter(tab0);
  setTimeout(() => {
    expect(screen.queryByRole('tooltip')).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).toHaveTextContent(steps[0].name);
  }, 0);

  // Should render index
  const stepsWithNeither = stepsWithoutLabels.map(step => {
    const copy = step;
    delete copy.name;
    return copy;
  });
  getComponent({ items: stepsWithNeither }, { renderFn: rerender });
  ({ tab0 } = getTabs());
  fireEvent.mouseMove(tab0);
  fireEvent.mouseEnter(tab0);
  setTimeout(() => {
    expect(screen.queryByRole('tooltip')).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).toHaveTextContent('1');
  }, 0);
});

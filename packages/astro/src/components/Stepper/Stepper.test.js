import React from 'react';
import userEvent from '@testing-library/user-event';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import { active, accent, neutral, white } from '../../styles/colors';
import { render, screen, fireEvent } from '../../utils/testUtils/testWrapper';

import Text from '../Text';

import Stepper from './Stepper';
import Step from './Step';
import { stepStatuses } from './Stepper.constants';

const emotionCache = createCache({ key: 'stepper-test' });
emotionCache.compat = true;

const {
  ACTIVE,
  INACTIVE,
} = stepStatuses;


// eslint-disable-next-line no-unused-vars
const styles = {
  [ACTIVE]: `background-color: ${accent[95]}; border-color: ${active}; color: ${active}`,
  [INACTIVE]: `background-color: ${white}; border-color: ${neutral[80]}; color: ${neutral[40]}`,
};

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

const getComponent = (props = {}, { renderFn = render } = {}) => {
  const { children } = props;
  return renderFn(
    <CacheProvider value={emotionCache}>
      <Stepper {...defaultProps} {...props}>
        {item => (
          <Step key={item.name} textValue={item.name}>
            <Text>{children}</Text>
          </Step>
        )}
      </Stepper>,
    </CacheProvider>,
  );
};

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
  const stepsWithoutLabels = steps.map((step) => {
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
  const stepsWithNeither = stepsWithoutLabels.map((step) => {
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

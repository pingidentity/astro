/* istanbul ignore file */
import React, { forwardRef } from 'react';
import { useSingleSelectListState } from '@react-stately/list';
import PropTypes from 'prop-types';

import { Step, Tab, Tabs } from '../..';
import isValidPositiveInt from '../../utils/devUtils/props/isValidPositiveInt';

import Line from './Line';
import { stepStatuses } from './Stepper.constants';

const {
  ACTIVE,
  COMPLETED,
  INACTIVE,
} = stepStatuses;

const Stepper = forwardRef((props, ref) => {
  const {
    activeStep = 1,
    onStepChange,
    tabListProps,
    tooltipProps,
    ...others
  } = props;

  const state = useSingleSelectListState(props);

  const getStatus = i => {
    if (i === activeStep) {
      return ACTIVE;
    } if (i < activeStep) {
      return COMPLETED;
    }
    return INACTIVE;
  };

  const onStepChangeHandler = key => {
    if (onStepChange) {
      onStepChange(+key);
    }
  };

  const steps = Array.from(state.collection);
  const lines = steps.map((_v, i) => <Line status={getStatus(i + 2)} />);

  let isFirst = true; // make sure not to insert until there's at least one non-null child

  const render = steps.map((item, i) => {
    const stepIndex = i + 1;
    const stepStatus = getStatus(stepIndex);
    const step = (
      <Step
        key={item.key}
        value={stepIndex}
        status={stepStatus}
      />
    );

    const line = Array.isArray(lines) ? lines[i - 1] : lines;

    /* istanbul ignore next */
    const textValue = (item && item.value && item.value.label)
      || item.textValue
      || stepIndex.toString();

    const container = (
      <Tab
        key={stepIndex}
        variant="stepper.tab"
        tabLineProps={{ display: 'none' }}
        tabLabelProps={{ variant: 'stepper.tabLabel' }}
        textValue={textValue}
        title={step}
        aria-label={textValue}
        content={item.rendered}
        separator={!isFirst && line}
        tooltipTriggerProps={tooltipProps}
      />
    );

    isFirst = isFirst && !container;

    return container;
  });

  return (
    <Tabs
      ref={ref}
      variant="stepper.wrapper"
      tabListProps={{ variant: 'stepper.tabs', gap: '0', ...tabListProps }}
      onSelectionChange={onStepChangeHandler}
      selectedKey={activeStep?.toString()}
      mode="tooltip"
      {...others}
    >
      {render}
    </Tabs>
  );
});

Stepper.propTypes = {
  /**
   * *For performance reasons,
use this prop instead of Array.map when iteratively rendering Items*.
   * For use with [dynamic collections](https://react-spectrum.adobe.com/react-stately/collections.html#dynamic-collections).
  */
  items: PropTypes.arrayOf(PropTypes.shape({
    /** The primary option for the tooltip label. */
    label: PropTypes.string,
    children: PropTypes.node,
    name: PropTypes.string,
  })),
  /** The number of the current step (using one-based indexing) */
  activeStep: isValidPositiveInt,
  /**
  * Handler that is called when the current step changes
  * `(index: number) => void`
  */
  onStepChange: PropTypes.func,
  /** A props object that is subsequently spread into the rendered tablist. */
  tabListProps: PropTypes.shape({}),
  tooltipProps: PropTypes.shape({}),
};

Stepper.displayName = 'Stepper';
export default Stepper;

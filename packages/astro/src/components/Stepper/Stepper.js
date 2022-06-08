import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSingleSelectListState } from '@react-stately/list';

import isValidPositiveInt from '../../utils/devUtils/props/isValidPositiveInt';
import { stepStatuses } from './Stepper.constants';
import { CollectionStep } from './Step';
import Line from './Line';
import Tab from '../Tab';
import Tabs from '../Tabs';

const {
  ACTIVE,
  COMPLETED,
  INACTIVE,
} = stepStatuses;

/**
 * The Stepper component acts as a wrapper for individual Step components.
 * Stepper is used to display progress through a sequence of logical and numbered steps
 *  usually within a configuration wizard.
 */

const Stepper = forwardRef((props, ref) => {
  const {
    activeStep,
    onStepChange,
    tabListProps,
    ...others
  } = props;

  const state = useSingleSelectListState(props);

  const getStatus = (i) => {
    if (i === activeStep) {
      return ACTIVE;
    } else if (i < activeStep) {
      return COMPLETED;
    }
    return INACTIVE;
  };

  const onStepChangeHandler = (key) => {
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
      <CollectionStep
        key={item.key}
        value={stepIndex}
        status={stepStatus}
      />
    );

    const line = <>{Array.isArray(lines) ? lines[i - 1] : lines}</>;

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
   * *For performance reasons, use this prop instead of Array.map when iteratively rendering Items*.
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
};

Stepper.defaultProps = {
  activeStep: 1,
};

Stepper.displayName = 'Stepper';
export default Stepper;

/* istanbul ignore file */
import React, { forwardRef } from 'react';
import { useSingleSelectListState } from '@react-stately/list';
import PropTypes from 'prop-types';

import { Box, Step, Tab, Tabs, Text } from '../..';
import { useStatusClasses } from '../../hooks';
import ORIENTATION from '../../utils/devUtils/constants/orientation';
import isValidPositiveInt from '../../utils/devUtils/props/isValidPositiveInt';

import Line from './Line';
import { stepStatuses } from './Stepper.constants';
import { verticalLine } from './Stepper.styles';

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
    orientation,
    className,
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

  const { classNames } = useStatusClasses(className, {
    'is-vertical': orientation === ORIENTATION.VERTICAL,
    'is-horizontal': orientation === ORIENTATION.HORIZONTAL,
  });

  const steps = Array.from(state.collection);
  const lines = steps.map((_v, i) => <Line className={classNames} status={getStatus(i + 2)} />);

  let isFirst = true; // make sure not to insert until there's at least one non-null child

  const render = steps.map((item, i) => {
    const stepIndex = i + 1;
    const stepStatus = getStatus(stepIndex);
    const line = Array.isArray(lines) ? lines[i - 1] : lines;
    const defaultIndicator = <Box variant="forms.label.indicator">*</Box>;
    const step = (
      <Step
        key={item.key}
        value={stepIndex}
        status={stepStatus}
        className={classNames}
        orientation={orientation}
      />
    );
    const verticalStep = (
      <Box isRow>
        <Step
          key={item.key}
          value={stepIndex}
          status={stepStatus}
          className={classNames}
          orientation={orientation}
        />
        <Text variant="stepperLabel">
          {item.textValue}
          {item?.props?.isRequired && defaultIndicator}
        </Text>
      </Box>
    );


    /* istanbul ignore next */
    const textValue = (item && item.value && item.value.label)
      || item.textValue
      || stepIndex.toString();

    const container = (
      <Tab
        key={stepIndex}
        variant="stepper.tab"
        tabLineProps={{ display: 'none' }}
        tabLabelProps={{
          variant: 'stepper.tabLabel',
        }}
        textValue={textValue}
        title={orientation === ORIENTATION.VERTICAL ? verticalStep : step}
        aria-label={textValue}
        content={item.rendered}
        separator={!isFirst && orientation === ORIENTATION.HORIZONTAL && (!isFirst && line)}
        tooltipTriggerProps={tooltipProps}
        sx={
          i !== steps.length - 1 && orientation === ORIENTATION.VERTICAL && verticalLine
        }
      />
    );

    isFirst = isFirst && !container;

    return container;
  });

  return (
    <Tabs
      ref={ref}
      variant="stepper.wrapper"
      tabListProps={{
        variant: 'stepper.tabs',
        gap: '0',
        ...tabListProps,
      }}
      onSelectionChange={onStepChangeHandler}
      selectedKey={activeStep?.toString()}
      mode="tooltip"
      orientation={orientation}
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
  orientation: PropTypes.oneOf([
    'vertical',
    'horizontal',
  ]),

};

Stepper.displayName = 'Stepper';
Stepper.defaultProps = {
  orientation: 'horizontal',
};
export default Stepper;

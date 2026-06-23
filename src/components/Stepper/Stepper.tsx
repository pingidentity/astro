/* istanbul ignore file */
import React, { forwardRef } from 'react';
import type { SingleSelectListProps } from '@react-stately/list';
import { useSingleSelectListState } from '@react-stately/list';

import { Box, Step, Tabs, Text } from '../..';
import { useLocalOrForwardRef, useStatusClasses } from '../../hooks';
import { StepperProps } from '../../types';
import ORIENTATION from '../../utils/devUtils/constants/orientation';
import isValidPositiveInt from '../../utils/devUtils/props/isValidPositiveInt';
import Tab from '../Tab';

import Line from './Line';
import { stepStatuses } from './Stepper.constants';
import { verticalLine } from './Stepper.styles';

const {
  ACTIVE,
  COMPLETED,
  INACTIVE,
} = stepStatuses;

const Stepper = forwardRef<HTMLElement, StepperProps>((props, ref) => {
  const {
    activeStep = 1,
    onStepChange,
    tabListProps,
    tooltipProps,
    orientation,
    className,
    ...others
  } = props;

  const stepperRef = useLocalOrForwardRef<HTMLElement>(ref);

  if (process.env.NODE_ENV !== 'production' && props.activeStep !== undefined) {
    const validationError = isValidPositiveInt({ activeStep: props.activeStep }, 'activeStep', 'Stepper');
    if (validationError) {
      console.error(validationError.message);
    }
  }
  const state = useSingleSelectListState(props as SingleSelectListProps<object>);

  const getStatus = (i: number) => {
    if (i === activeStep) {
      return ACTIVE;
    } if (i < activeStep) {
      return COMPLETED;
    }
    return INACTIVE;
  };

  const onStepChangeHandler = (key: React.Key) => {
    if (onStepChange) {
      onStepChange(Number(key));
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
    const textValue = (item && item.value && (item.value as { label?: string }).label)
      || item.textValue
      || stepIndex.toString();

    const TabItem = Tab as React.ElementType;

    const container = (
      <TabItem
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
          i !== steps.length - 1 && orientation === ORIENTATION.VERTICAL ? verticalLine : undefined
        }
      />
    );

    isFirst = isFirst && !container;

    return container;
  });

  return (
    <Tabs
      ref={stepperRef}
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

Stepper.displayName = 'Stepper';
Stepper.defaultProps = {
  orientation: 'horizontal',
};
export default Stepper;

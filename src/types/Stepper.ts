import { ReactNode } from 'react';

import { TestingAttributes } from './shared/test';
import { ValidPositiveInteger } from './shared/validPositiveInteger';
import { BoxProps } from './box';

export interface StepperItemProps {
  /** The primary option for the tooltip label. */
  label?: string;
  children?: ReactNode;
  name?: string;
  /** Whether the step is required. */
  isRequired?: boolean;
}

export interface StepperProps extends BoxProps, TestingAttributes {
  /**
   * *For performance reasons,
   * use this prop instead of Array.map when iteratively rendering Items*.
   * For use with [dynamic collections](https://react-spectrum.adobe.com/react-stately/collections.html#dynamic-collections).
   */
  items?: Array<StepperItemProps>;
  /** The number of the current step (using one-based indexing) */
  activeStep?: ValidPositiveInteger;
  /**
   * Handler that is called when the current step changes.
   * `(index: number) => void`
   */
  onStepChange?: (index: number) => void;
  /** A props object that is subsequently spread into the rendered tablist. */
  tabListProps?: Record<string, unknown>;
  /** A props object that is subsequently spread into the rendered tooltip. */
  tooltipProps?: Record<string, unknown>;
  /** The orientation of the stepper. */
  orientation?: 'vertical' | 'horizontal';
}

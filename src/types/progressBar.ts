import React from 'react';

import { TestingAttributes } from './shared/test';

export interface ProgressBarProps extends TestingAttributes {
  isIndeterminate?: boolean,
  label?: React.ReactNode,
  formatOptions?: Intl.NumberFormatOptions,
  valueLabel?: React.ReactNode,
  value: number,
  minValue?: number,
  maxValue?: number,
  showValueLabel?: boolean,
}

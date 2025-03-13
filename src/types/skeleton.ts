import { TestingAttributes } from './shared/test';
import { BoxProps } from './box';

export interface SkeletonProps extends BoxProps, TestingAttributes {
  animation?: 'pulsate';
  variant?: 'text' | 'circular' | 'rounded';
}

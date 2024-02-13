import { TestingAttributes } from './shared/test';
import { BoxProps } from './box';

export interface ButtonBarProps extends BoxProps, TestingAttributes {
  /** Justifies the component's children. */
  align?: 'left' | 'right';
}

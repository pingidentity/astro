import { TestingAttributes } from './shared/test';
import { BoxProps } from './box';
import { Status } from './item';

export interface Requirement {
  name: string;
  status?: Status;
}

export type Requirements = Array<Requirement>;

export interface RequirementsListProps extends BoxProps, TestingAttributes {
  /** Requirements and their status. */
  requirements?: Requirements;
  label?: string;
}

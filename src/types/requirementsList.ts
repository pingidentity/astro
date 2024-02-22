import { BoxProps } from './box';
import { Status } from './item';

export interface Requirement extends Status{
  name: string;
}

export type Requirements = Array<Requirement>;

export interface RequirementsListProps extends BoxProps {
  /** Requirements and their status. */
  requirements?: Requirements;
  label?: string;
}

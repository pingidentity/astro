import { Status } from './item';
import { DOMAttributes, StyleProps } from './shared';

export interface CalloutProps extends StyleProps, DOMAttributes {
  status?: Status;
}
